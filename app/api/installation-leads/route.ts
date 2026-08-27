import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { validateInstallation, type InstallationInput } from "@/lib/installation-schema";
export const runtime = "nodejs";

async function verifyTurnstile(token: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  // Preview deployments can be exercised without production CAPTCHA secrets;
  // Production still requires server-side Turnstile verification.
  if (!secret) return process.env.VERCEL_ENV !== "production";
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: new URLSearchParams({ secret, response: token }), cache: "no-store" });
  return response.ok && Boolean((await response.json() as { success?: boolean }).success);
}
async function deliver(url: string | undefined, payload: unknown, authorization?: string, extraHeaders: Record<string, string> = {}) {
  if (!url) return { skipped: true };
  const response = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json", ...(authorization ? { Authorization: authorization } : {}), ...extraHeaders }, body: JSON.stringify(payload), cache: "no-store" });
  const body = await response.json().catch(() => ({})) as Record<string, unknown>;
  if (!response.ok) {
    const providerErrors = Array.isArray(body)
      ? body.map((item) => typeof item === "string" ? item : item && typeof item === "object" && typeof (item as Record<string, unknown>).message === "string" ? (item as Record<string, string>).message : "").filter(Boolean).join("; ")
      : Array.isArray(body.errors)
      ? body.errors.map((item) => {
        if (!item || typeof item !== "object") return "";
        const candidate = item as Record<string, unknown>;
        const field = typeof candidate.field === "string" ? candidate.field : typeof candidate.path === "string" ? candidate.path : "";
        const message = typeof candidate.message === "string" ? candidate.message : typeof candidate.detail === "string" ? candidate.detail : "";
        return [field, message].filter(Boolean).join(": ");
      }).filter(Boolean).join("; ")
      : "";
    const nestedError = body.error && typeof body.error === "object" ? body.error as Record<string, unknown> : null;
    const providerMessage = providerErrors || (typeof body.message === "string"
      ? body.message
      : typeof body.error === "string"
        ? body.error
        : typeof nestedError?.message === "string"
          ? nestedError.message
          : typeof nestedError?.code === "string"
            ? nestedError.code
            : typeof body.detail === "string" ? body.detail : "");
    const shape = Object.keys(body).sort().join(",") || "empty_body";
    throw new Error(`delivery_${response.status}${providerMessage ? `_${providerMessage.slice(0, 160)}` : ""}_body_${shape}`);
  }
  return { delivered: true, body };
}
function value(source: Record<string, unknown>, key: string) {
  const direct = source[key]; if (typeof direct === "string") return direct;
  const clickIds = source.clickIds; if (clickIds && typeof clickIds === "object" && typeof (clickIds as Record<string, unknown>)[key] === "string") return (clickIds as Record<string, string>)[key];
  return undefined;
}
function serviceDetails(lead: InstallationInput, leadId: string) {
  const a = lead.attribution;
  return [
    `GC website lead: ${leadId}`, `Project: ${lead.projectType}`, `Comfort needs: ${lead.comfortNeeds.join(", ")}`,
    `Preferred system: ${lead.systemType}`, `Timeline: ${lead.timeline}`, `Financing: ${lead.financingInterest}`,
    `Property relationship: ${lead.homeownerStatus}`, `ZIP: ${lead.zipCode}`, `CTA source: ${lead.ctaSource}`,
    `GCLID: ${value(a, "gclid") || ""}`, `GBRAID: ${value(a, "gbraid") || ""}`, `WBRAID: ${value(a, "wbraid") || ""}`,
    `UTM source: ${value(a, "utm_source") || value(a, "trafficSource") || "direct"}`, `UTM medium: ${value(a, "utm_medium") || ""}`,
    `UTM campaign: ${value(a, "utm_campaign") || value(a, "campaign") || ""}`, `UTM content: ${value(a, "utm_content") || ""}`, `UTM term: ${value(a, "utm_term") || ""}`,
    `Landing page: ${value(a, "landingPage") || value(a, "landingUrl") || ""}`, lead.comments ? `Comments: ${lead.comments}` : "",
  ].filter(Boolean).join("\n");
}
async function createHousecallProLead(lead: InstallationInput, leadId: string, idempotencyKey: string) {
  if (process.env.HOUSECALL_PRO_MODE !== "api") throw new Error("housecall_pro_api_not_enabled");
  const apiKey = process.env.HOUSECALL_PRO_API_KEY; const base = process.env.HOUSECALL_PRO_API_BASE_URL || "https://api.housecallpro.com";
  if (!apiKey) throw new Error("housecall_pro_credentials_missing");
  const authorization = `Token ${apiKey}`; const headers = { "Idempotency-Key": idempotencyKey };
  // HCP requires a complete address object when `addresses` is supplied. The
  // quote guide only collects ZIP, so omit the partial address and retain ZIP
  // in the lead note instead of causing a provider-side 400.
  let customer;
  try {
    // Housecall Pro validates lead_source against the account's configured source
    // list even on customer creation. Keep attribution in the note and avoid
    // failing the customer creation when that account-specific source is absent.
    customer = await deliver(`${base.replace(/\/$/, "")}/customers`, { first_name: lead.firstName, last_name: lead.lastName, email: lead.email, mobile_number: lead.phone, notifications_enabled: true }, authorization, headers);
  } catch (error) {
    throw new Error(`housecall_pro_customer_${error instanceof Error ? error.message : "failed"}`);
  }
  const customerBody = customer.body ?? {}; const customerId = String(customerBody.id || (customerBody.customer as Record<string, unknown> | undefined)?.id || "");
  if (!customerId) throw new Error("housecall_pro_customer_unconfirmed");
  let created;
  try {
    created = await deliver(`${base.replace(/\/$/, "")}/leads`, { customer_id: customerId, lead_source: "GC Website — Free HVAC Quote", note: serviceDetails(lead, leadId) }, authorization, headers);
  } catch (error) {
    throw new Error(`housecall_pro_lead_${error instanceof Error ? error.message : "failed"}`);
  }
  const createdBody = created.body ?? {}; const providerLeadId = String(createdBody.id || (createdBody.lead as Record<string, unknown> | undefined)?.id || "");
  if (!providerLeadId) throw new Error("housecall_pro_lead_unconfirmed");
  return providerLeadId;
}

export async function POST(request: Request) {
  let body: unknown; try { body = await request.json(); } catch { return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 }); }
  const parsed = validateInstallation(body); if (!parsed.success) return NextResponse.json({ ok: false, errors: parsed.errors }, { status: 422 });
  if (parsed.data.website) return NextResponse.json({ ok: true, leadId: randomUUID(), provider: "spam_trap" });
  if (!(await verifyTurnstile(parsed.data.turnstileToken))) return NextResponse.json({ ok: false, error: "verification_failed" }, { status: 403 });

  const leadId = randomUUID(); const receivedAt = new Date().toISOString(); const idempotencyKey = request.headers.get("Idempotency-Key") || leadId;
  const lead = { leadId, leadType: "installation", label: "GC — Free HVAC Quote Lead", status: "new_installation_lead", receivedAt, ...parsed.data, turnstileToken: undefined };
  const endpoint = process.env.OPERATIONS_HUB_FORM_ENDPOINT; const formId = process.env.OPERATIONS_HUB_INSTALLATION_FORM_ID;
  if (!endpoint || !formId) return NextResponse.json({ ok: false, error: "primary_storage_unavailable" }, { status: 503 });
  try { await deliver(`${endpoint.replace(/\/$/, "")}/${encodeURIComponent(formId)}/submit`, { data: lead }, process.env.OPERATIONS_HUB_API_KEY ? `Bearer ${process.env.OPERATIONS_HUB_API_KEY}` : undefined, { "Idempotency-Key": idempotencyKey }); }
  catch { return NextResponse.json({ ok: false, error: "primary_storage_failed" }, { status: 502 }); }

  const notification = Promise.allSettled([
    deliver(process.env.INSTALLATION_EMAIL_WEBHOOK_URL, { to: process.env.INSTALLATION_NOTIFICATION_EMAIL, subject: "GC — Free HVAC Quote Lead", lead }, process.env.INSTALLATION_NOTIFICATION_TOKEN ? `Bearer ${process.env.INSTALLATION_NOTIFICATION_TOKEN}` : undefined),
    deliver(process.env.INSTALLATION_SLACK_WEBHOOK_URL, { text: `GC — Free HVAC Quote Lead\n${lead.firstName} ${lead.lastName}\n${lead.phone} · ${lead.email}\nProject: ${lead.projectType} · System: ${lead.systemType}\nZIP: ${lead.zipCode} · Timeline: ${lead.timeline}\nSource: ${String(value(lead.attribution, "utm_campaign") || value(lead.attribution, "gclid") || "direct")}` }),
  ]);
  try {
    const providerLeadId = await createHousecallProLead(parsed.data, leadId, idempotencyKey); await notification;
    return NextResponse.json({ ok: true, leadId, provider: "housecall_pro", providerLeadId });
  } catch (error) {
    // Keep the customer-facing response generic, but retain the provider
    // failure reason in Vercel logs for integration diagnostics. Never log
    // credentials or the submitted contact payload.
    console.error("[installation-leads] Housecall Pro delivery failed", {
      reason: error instanceof Error ? error.message : "unknown_error",
      leadId,
      backupSaved: true,
    });
    await notification;
    return NextResponse.json({ ok: false, error: "housecall_pro_unconfirmed", leadId, backupSaved: true }, { status: 502 });
  }
}
