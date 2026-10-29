import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { NextRequest } from "next/server";
import { POST } from "../app/api/installation-leads/route";
import { googleContext } from "../lib/google-context";
import { sendConfirmedLeadConversion, sendGoogleAdsConversion, sendGoogleEvent } from "../lib/google-tag";
import { fireOnce } from "../components/installation/InstallationThankYou";

async function main() {
  const originalFetch = globalThis.fetch;
  const savedEnv = { ...process.env };
  Object.assign(process.env, { TURNSTILE_SECRET_KEY: "test-only", HOUSECALL_PRO_MODE: "api", HOUSECALL_PRO_API_KEY: "test-only", HOUSECALL_PRO_API_BASE_URL: "https://hcp.test", OPERATIONS_HUB_FORM_ENDPOINT: "https://hub.test", OPERATIONS_HUB_INSTALLATION_FORM_ID: "test", LEAD_REDIS_REST_URL: "https://redis.test", LEAD_REDIS_REST_TOKEN: "test-only" });
  const journal = new Map<string,string>();
  let mode = "success";
  let customers = 0, leads = 0;
  const payload = { firstName: "Synthetic", lastName: "QA", phone: "2025550100", email: "qa@example.invalid", zipCode: "90703", homeownerStatus: "homeowner", projectType: "replace_existing_system", comfortNeeds: ["high_energy_bills"], systemType: "heat_pump", timeline: "within_30_days", financingInterest: "maybe", consent: true, comments: "PRIVATE TEST COMMENT", turnstileToken: "test-token", attribution: { firstTouch: { gclid: "TEST_ONLY_GC_INSTALLATION", utm_source: "google", utm_medium: "cpc", utm_campaign: "gc_installation_qa", landing_page: "https://gc.test/install/" } } };
  const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
  globalThis.fetch = async (input, init) => {
    const url = String(input);
    if (url === "https://redis.test") {
      const command = JSON.parse(String(init?.body)); const [operation,key,value] = command;
      if(operation === "GET") return json({result:journal.get(key) || null});
      if(operation === "SET") { if(journal.has(key)) return json({result:null}); journal.set(key,value); return json({result:"OK"}); }
      if(operation === "EVAL") { const [, , , recordKey, old, next] = command; if(journal.get(recordKey)!==old)return json({result:0});journal.set(recordKey,next);return json({result:1}); }
      throw new Error("Unexpected Redis command");
    }
    if (url.includes("siteverify")) return json({ success: mode !== "turnstile" });
    if (url.startsWith("https://hub.test")) return json({ ok: true }, mode === "backup" ? 503 : 200);
    if (url.endsWith("/customers")) { customers++; return json({ id: `customer_${customers}` }); }
    if (url.endsWith("/leads")) {
      if (mode === "rejected") return json({ message: "PRIVATE PROVIDER ERROR" }, 422);
      if (mode === "outage") return json({ message: "PRIVATE PROVIDER ERROR" }, 503);
      leads++;
      if (mode === "lost_response") throw new TypeError("PRIVATE NETWORK DETAILS");
      if (mode === "missing_id") return json({ lead: {} });
      return json({ id: `lead_${leads}` });
    }
    throw new Error(`Unexpected mocked destination: ${url}`);
  };
  const request = (id = randomUUID(), data: unknown = payload) => POST(new NextRequest("https://gc.test/api/installation-leads/", { method: "POST", headers: { "Content-Type": "application/json", "Idempotency-Key": id }, body: JSON.stringify(data) }));
  try {
    const invalid = await request(randomUUID(), { ...payload, phone: "1" });
    assert.equal(invalid.status, 422); assert.equal((await invalid.json()).error_stage, "validation"); assert.equal(customers, 0);
    mode = "turnstile";
    const captcha = await request(); assert.equal(captcha.status, 403); assert.equal((await captcha.json()).error_stage, "cloudflare"); assert.equal(customers, 0);
    mode = "success";
    const id = randomUUID();
    const success = await request(id);
    assert.equal(success.status, 200); assert.equal(customers, 1); assert.equal(leads, 1);
    const confirmed = await success.json();
    mode = "rejected";
    const retryId = randomUUID(); assert.equal((await request(retryId)).status, 502);
    mode = "success";
    assert.equal((await request(retryId)).status, 200); assert.equal(leads, 2);
    mode = "outage";
    const outageId = randomUUID(); const outage = await request(outageId); const failedBody = await outage.json();
    assert.equal(failedBody.ok, false); assert.equal(failedBody.error_stage, "hcp"); assert.equal(leads, 2);
    mode = "success";
    assert.equal((await request(outageId)).status, 409); assert.equal(leads, 2);
    mode = "lost_response";
    const lostId = randomUUID(); assert.equal((await request(lostId)).status, 503);
    mode = "success";
    assert.equal((await request(lostId)).status, 409);
    mode = "missing_id";
    const missingProviderId = await request();
    assert.equal(missingProviderId.status, 503);
    assert.equal((await missingProviderId.json()).ok, false);
    mode = "backup";
    const backupId = randomUUID(); assert.equal((await request(backupId)).status, 200);
    mode = "success"; assert.equal((await request(backupId)).status, 200);

    const events: unknown[][] = [];
    const storage = new Map<string, string>();
    Object.defineProperty(globalThis, "window", { configurable: true, value: { location: { href: "https://gc.test/install/?email=qa@example.invalid&gclid=TEST_ONLY_GC_INSTALLATION&utm_campaign=gc_installation_qa", pathname: "/install/" }, gtag: (...args: unknown[]) => events.push(args) } });
    Object.defineProperty(globalThis, "localStorage", { configurable: true, value: { getItem: (key: string) => storage.get(key), setItem: (key: string, value: string) => storage.set(key, value) } });
    Object.defineProperty(window, "localStorage", { configurable: true, value: globalThis.localStorage });
    fireOnce("installation", confirmed); assert.equal(events.length, 2);
    storage.set("cookieConsent", "accepted");
    fireOnce("installation", failedBody); assert.equal(events.length, 2);
    fireOnce("installation", { ...confirmed, email: payload.email, phone: payload.phone, comments: payload.comments });
    fireOnce("installation", confirmed);
    const beforeUnconfirmed = events.length;
    assert.equal(fireOnce("installation", { ...confirmed, leadId: randomUUID(), providerLeadId: "" }), false);
    assert.equal(events.length, beforeUnconfirmed);
    assert.equal(events.filter(event => event[1] === "installation_lead_submit").length, 1);
    assert.equal(events.filter(event => event[1] === "conversion").length, 1);
    assert.equal(events.some(event => event[1] === "service_request_submit"), false);
    assert.equal((events[1][2] as Record<string, unknown>).send_to, "AW-800582055/Ix72CKqVyukcEKfT3_0C");
    sendGoogleEvent("installation_form_error", { error_stage: "hcp", error_code: "hcp_unavailable", request_id: outageId, http_status: 503, form_step: "contact", device_type: "mobile", email: payload.email, phone: payload.phone, comments: payload.comments });
    const tagAssistantContext = googleContext("https://gc.test/?gad_campaignid=24126455679", "", "https://tagassistant.google.com/");
    assert.equal(tagAssistantContext.ignore_referrer, true);
    assert.match(tagAssistantContext.page_location, /gad_campaignid=24126455679/);
    storage.set("cookieConsent", "denied");
    const beforeDenied = events.length;
    sendGoogleEvent("installation_submit_attempt");
    const deferredLead = { ...confirmed, leadId: randomUUID() };
    assert.equal(fireOnce("installation", deferredLead), false);
    assert.equal(sendGoogleAdsConversion("installation", deferredLead.leadId), false);
    assert.equal(events.length, beforeDenied);
    storage.set("cookieConsent", "accepted");
    assert.equal(fireOnce("installation", deferredLead), false);
    assert.equal(events.length, beforeDenied);
    const acceptedLead = { ...confirmed, leadId: randomUUID() };
    assert.equal(fireOnce("installation", acceptedLead), true);
    assert.equal(fireOnce("installation", acceptedLead), true);
    assert.equal(events.length, beforeDenied + 2);
    assert.equal(events.at(-1)?.[1], "conversion");
    assert.equal((events.at(-1)?.[2] as Record<string, unknown>).restricted_data_processing, true);
    Object.defineProperty(globalThis, "navigator", { configurable: true, value: { globalPrivacyControl: true } });
    const beforeGpc = events.length;
    const gpcLead = { ...confirmed, leadId: randomUUID() };
    assert.equal(fireOnce("installation", gpcLead), false);
    assert.equal(events.length, beforeGpc);
    delete (globalThis as { navigator?: unknown }).navigator;
    assert.equal(fireOnce("installation", gpcLead), false);
    assert.equal(events.length, beforeGpc);
    assert.equal(sendConfirmedLeadConversion("installation", randomUUID(), { request_id: randomUUID() }), true);
    assert.equal(events.length, beforeGpc + 2);
    const serialized = JSON.stringify(events);
    for (const privateValue of [payload.email, payload.phone, payload.zipCode, payload.comments, "PRIVATE PROVIDER ERROR"]) assert.equal(serialized.includes(privateValue), false);
    const context = googleContext("https://gc.test/contact/?email=private@example.invalid", `gc_attribution_latest=${encodeURIComponent(JSON.stringify(payload.attribution.firstTouch))}`, "https://syndicatedsearch.goog/path?email=private@example.invalid");
    assert.equal(context.ignore_referrer, true); assert.match(context.page_location, /gclid=TEST_ONLY/); assert.equal(context.page_location.includes("email"), false);
    assert.equal(context.page_referrer, "https://syndicatedsearch.goog");
    const qaStorage = new Map<string, string>();
    Object.defineProperty(window, "sessionStorage", { configurable: true, value: { getItem: (key: string) => qaStorage.get(key), setItem: (key: string, value: string) => qaStorage.set(key, value) } });
    assert.equal(googleContext("https://gc.test/?test_event=true").test_event, true);
    assert.equal(googleContext("https://gc.test/thank-you/").test_event, true);
    assert.equal(googleContext("https://gc.test/thank-you/").debug_mode, true);
    assert.equal(googleContext("https://gc.test/?test_event=false").test_event, undefined);
    assert.equal(googleContext("https://gc.test/").test_event, undefined);
    console.log("Installation integration tests passed: validation, CAPTCHA failure, confirmed submission, rejected retry, HCP outage, lost response, backup retry, conversion deduplication, attribution and PII filtering. All providers mocked; no real leads or Google requests.");
  } finally {
    globalThis.fetch = originalFetch;
    for (const key of Object.keys(process.env)) if (!(key in savedEnv)) delete process.env[key];
    Object.assign(process.env, savedEnv);
    delete (globalThis as { window?: unknown }).window;
    delete (globalThis as { localStorage?: unknown }).localStorage;
    delete (globalThis as { navigator?: unknown }).navigator;
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
