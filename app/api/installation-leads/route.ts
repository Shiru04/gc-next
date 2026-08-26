import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { validateInstallation } from "@/lib/installation-schema";
export const runtime = "nodejs";

async function verifyTurnstile(token: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return process.env.NODE_ENV !== "production";
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: new URLSearchParams({ secret, response: token }), cache: "no-store" });
  return response.ok && Boolean((await response.json() as { success?: boolean }).success);
}
async function deliver(url: string | undefined, payload: unknown, authorization?: string) {
  if (!url) return { skipped: true };
  const response = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json", ...(authorization ? { Authorization: authorization } : {}) }, body: JSON.stringify(payload), cache: "no-store" });
  if (!response.ok) throw new Error(`delivery_${response.status}`);
  return { delivered: true };
}
export async function POST(request: Request) {
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 }); }
  const parsed = validateInstallation(body);
  if (!parsed.success) return NextResponse.json({ ok: false, errors: parsed.errors }, { status: 422 });
  if (parsed.data.website) return NextResponse.json({ ok: true, leadId: randomUUID() });
  if (!(await verifyTurnstile(parsed.data.turnstileToken))) return NextResponse.json({ ok: false, error: "verification_failed" }, { status: 403 });

  const leadId = randomUUID();
  const receivedAt = new Date().toISOString();
  const lead = { leadId, leadType: "installation", label: "GC â€” Installation Lead", status: "new_installation_lead", receivedAt, ...parsed.data, turnstileToken: undefined };
  const endpoint = process.env.OPERATIONS_HUB_FORM_ENDPOINT;
  const formId = process.env.OPERATIONS_HUB_INSTALLATION_FORM_ID;
  if (!endpoint || !formId) return NextResponse.json({ ok: false, error: "primary_storage_unavailable" }, { status: 503 });

  // Durable primary write must succeed before the browser receives a conversion.
  try {
    await deliver(`${endpoint.replace(/\/$/, "")}/${encodeURIComponent(formId)}/submit`, { data: lead }, process.env.OPERATIONS_HUB_API_KEY ? `Bearer ${process.env.OPERATIONS_HUB_API_KEY}` : undefined);
  } catch { return NextResponse.json({ ok: false, error: "primary_storage_failed" }, { status: 502 }); }

  // Downstream failures never erase or reject the primary record.
  const downstream = await Promise.allSettled([
    deliver(process.env.INSTALLATION_EMAIL_WEBHOOK_URL, { to: process.env.INSTALLATION_NOTIFICATION_EMAIL, subject: "GC — Installation Lead", lead }, process.env.INSTALLATION_NOTIFICATION_TOKEN ? `Bearer ${process.env.INSTALLATION_NOTIFICATION_TOKEN}` : undefined),
    deliver(process.env.INSTALLATION_SLACK_WEBHOOK_URL, { text: `GC — Installation Lead\n${lead.firstName} ${lead.lastName}\n${lead.phone} · ${lead.email}\nSystem: ${lead.systemType} · ZIP: ${lead.zipCode} · Timeline: ${lead.timeline}\nSource: ${String(lead.attribution.utm_campaign || lead.attribution.utm_source || lead.attribution.gclid || "direct")}` }),
  ]);
  const deliveryWarnings = downstream.flatMap((result, index) => result.status === "rejected" ? [["email", "slack"][index]] : []);
  return NextResponse.json({ ok: true, leadId, deliveryWarnings });
}


