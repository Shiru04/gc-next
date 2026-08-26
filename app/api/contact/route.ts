import { NextResponse } from "next/server";
import { validateContact } from "@/lib/contact-schema";
export const runtime = "nodejs";
async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return process.env.NODE_ENV !== "production";
  const body = new URLSearchParams({ secret, response: token });
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body, cache: "no-store" });
  if (!response.ok) return false;
  return Boolean((await response.json() as { success?: boolean }).success);
}
export async function POST(request: Request) {
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 }); }
  const parsed = validateContact(body);
  if (!parsed.success) return NextResponse.json({ ok: false, errors: parsed.errors }, { status: 422 });
  if (parsed.data.website) return NextResponse.json({ ok: true });
  if (!(await verifyTurnstile(parsed.data.turnstileToken))) return NextResponse.json({ ok: false, error: "verification_failed" }, { status: 403 });
  const endpoint = process.env.OPERATIONS_HUB_FORM_ENDPOINT; const formId = process.env.OPERATIONS_HUB_CONTACT_FORM_ID;
  if (!endpoint || !formId) return NextResponse.json({ ok: false, error: "service_unavailable" }, { status: 503 });
  const response = await fetch(`${endpoint.replace(/\/$/, "")}/${encodeURIComponent(formId)}/submit`, { method: "POST", headers: { "Content-Type": "application/json", ...(process.env.OPERATIONS_HUB_API_KEY ? { Authorization: `Bearer ${process.env.OPERATIONS_HUB_API_KEY}` } : {}) }, body: JSON.stringify({ data: { name: parsed.data.name, email: parsed.data.email, phone: parsed.data.phone, service: parsed.data.service, zip: parsed.data.zip, message: parsed.data.message, consent: parsed.data.consent } }), cache: "no-store" });
  if (!response.ok) return NextResponse.json({ ok: false, error: "upstream_failed" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
