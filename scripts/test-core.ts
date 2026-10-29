import assert from "node:assert/strict";
import { pendingProductionFields } from "../lib/commercial-config";
import { validateContact } from "../lib/contact-schema";
import { isServiceType } from "../lib/service-types";
import { LOCALIZED_ROUTES, alternateLocalePath } from "../lib/routes";
import { customerFlowHref, dispatchServiceHref, scheduleServiceHref } from "../lib/scheduling";
import { PROMOTIONS } from "../lib/promotions";
import { SYSTEM_TYPES, validateInstallation } from "../lib/installation-schema";
import { NextRequest } from "next/server";
import { proxy } from "../proxy";
import { sendGoogleEventAfterConsent } from "../lib/google-tag";
import { trackCta } from "../lib/analytics";
assert.equal(isServiceType("installation"), true);
assert.equal(isServiceType("free_quote"), false);
assert.equal(SYSTEM_TYPES.includes("window_ac" as never), false);
assert.equal(scheduleServiceHref("ac_repair"), "/repair/#free-hvac-quote");
assert.equal(scheduleServiceHref("installation", "es"), "/es/installation-replacement/#free-hvac-quote");
assert.notEqual(dispatchServiceHref("ac_repair"), dispatchServiceHref("maintenance"));
assert.match(PROMOTIONS.repairs.ctaPrimary.href, /\/repair\//);
assert.equal(PROMOTIONS["new-installation"].ctaPrimary.href, "/installation-replacement/#free-hvac-quote");
assert.equal(customerFlowHref("installation"), "/installation-replacement/#free-hvac-quote");
assert.match(PROMOTIONS["tune-ups"].ctaPrimary.href, /\/maintenance\//);
assert.match(PROMOTIONS["tune-ups"].ctaPrimary.href, /coupon=GC149/);
assert.match(PROMOTIONS["tune-ups"].metaTitle, /Regularly \$174.*Save \$25.*Now \$149/);
const obsoletePrices = ["$" + "99", "$" + "199", "Save $" + "50"];
for (const obsolete of obsoletePrices) assert.equal(JSON.stringify(PROMOTIONS["tune-ups"]).includes(obsolete), false);
const tuneUpDispatch = new URL(dispatchServiceHref("maintenance", "GC149"), "https://gc-heatingandcooling.com");
assert.equal(tuneUpDispatch.searchParams.get("coupon"), "GC149");
assert.equal(tuneUpDispatch.pathname, "/maintenance/");
assert.deepEqual(pendingProductionFields(), []);
assert.equal(new Set(Object.values(LOCALIZED_ROUTES).flatMap((route) => [route.en, route.es])).size, Object.keys(LOCALIZED_ROUTES).length * 2);
assert.deepEqual(alternateLocalePath("/"), { en: "/", es: "/es/" });
assert.deepEqual(alternateLocalePath("/es"), { en: "/", es: "/es/" });
assert.deepEqual(alternateLocalePath("/es/"), { en: "/", es: "/es/" });
assert.deepEqual(alternateLocalePath("/es/repair/"), { en: "/repair", es: "/es/repair" });
assert.deepEqual(alternateLocalePath("/es/installation-replacement/heat-pumps/"), { en: "/installation-replacement/heat-pumps", es: "/es/installation-replacement/heat-pumps" });
const valid = validateContact({ name: "Test User", email: "test@example.com", phone: "714 555 1212", service: "ac_repair", zip: "90703", message: "Air conditioner is not cooling.", consent: true, turnstileToken: "test" });
assert.equal(valid.success, true);
const invalid = validateContact({ name: "", email: "not-email", service: "unknown", zip: "1", message: "short", consent: false });
assert.equal(invalid.success, false);
if (!invalid.success) { assert.ok(invalid.errors.email); assert.ok(invalid.errors.zip); assert.ok(invalid.errors.consent); }
const installation = validateInstallation({ firstName: "Test", lastName: "Homeowner", phone: "7145551212", email: "test@example.com", zipCode: "90703", homeownerStatus: "homeowner", projectType: "upgrade_existing_system", comfortNeeds: ["high_energy_bills"], systemType: "heat_pump", timeline: "within_30_days", financingInterest: "maybe", consent: true, turnstileToken: "test", attribution: { firstTouch: { gclid: "test-click", utm_source: "google", gad_campaignid: "123", ved: "forbidden" }, latestTouch: { utm_campaign: "latest" } }, ctaSource: "hero" });
assert.equal(installation.success, true);
if (installation.success) {
  const firstTouch = installation.data.attribution.firstTouch as Record<string, unknown>;
  assert.equal(firstTouch.gclid, "test-click");
  assert.equal(firstTouch.gad_campaignid, "123");
  assert.equal("ved" in firstTouch, false);
}
const firstCookie = encodeURIComponent(JSON.stringify({ gclid: "FIRST", utm_campaign: "first" }));
const attributionResponse = proxy(new NextRequest("https://gc-heatingandcooling.com/request-service/?gclid=LATEST&utm_campaign=latest&ved=drop", { headers: { cookie: `gc_attribution_first=${firstCookie}` } }));
assert.equal(attributionResponse.cookies.get("gc_attribution_first"), undefined);
const latestCookie = attributionResponse.cookies.get("gc_attribution_latest")?.value ?? "{}";
const latestTouch = JSON.parse(latestCookie);
assert.ok(Number.isFinite(Date.parse(latestTouch.timestamp)));
delete latestTouch.timestamp;
assert.deepEqual(latestTouch, { gclid: "LATEST", utm_campaign: "latest", landing_page: "https://gc-heatingandcooling.com/request-service/" });

const keywordAttribution = proxy(new NextRequest("https://gc-heatingandcooling.com/?utm_term=air%20conditioning"));
assert.equal(JSON.parse(keywordAttribution.cookies.get("gc_attribution_latest")!.value).utm_term, "air conditioning");
const privateAttribution = proxy(new NextRequest("https://gc-heatingandcooling.com/?utm_source=private@example.invalid&utm_term=2025550100"));
assert.equal(privateAttribution.cookies.get("gc_attribution_latest"), undefined);
const returnVisit = proxy(new NextRequest("https://gc-heatingandcooling.com/contact/?gclid=", { headers: { cookie: `gc_attribution_first=${firstCookie}; gc_attribution_latest=${encodeURIComponent(latestCookie)}` } }));
assert.equal(returnVisit.cookies.get("gc_attribution_latest"), undefined);
assert.equal(returnVisit.cookies.get("gc_attribution_first"), undefined);

const dispatchedGoogleEvents: unknown[][] = [];
let storedGoogleConsent = "denied";
Object.defineProperty(globalThis, "window", {
  configurable: true,
  value: {
    dataLayer: [],
    gtag: (...args: unknown[]) => dispatchedGoogleEvents.push(args),
    localStorage: { getItem: () => storedGoogleConsent },
    location: { origin: "https://gc-heatingandcooling.com", pathname: "/residential/residential-ac-installation/" },
  },
});
Object.defineProperty(globalThis, "location", {
  configurable: true,
  value: { origin: "https://gc-heatingandcooling.com", pathname: "/residential/residential-ac-installation/" },
});
Object.defineProperty(globalThis, "innerWidth", { configurable: true, value: 390 });
assert.equal(sendGoogleEventAfterConsent("installation_form_start"), false);
assert.equal(dispatchedGoogleEvents.length, 0);
storedGoogleConsent = "accepted";
assert.equal(sendGoogleEventAfterConsent("installation_form_start"), true);
assert.equal(dispatchedGoogleEvents.length, 1);
assert.equal(dispatchedGoogleEvents[0]?.[1], "installation_form_start");
trackCta({ id: "hero-phone", location: "home-hero", type: "phone", label: "Call 562-867-4123", page: "/", href: "tel:+15628674123" });
assert.equal(dispatchedGoogleEvents.length, 3);
assert.equal(dispatchedGoogleEvents[1]?.[0], "event");
assert.equal(dispatchedGoogleEvents[1]?.[1], "phone_click");
assert.deepEqual(dispatchedGoogleEvents[1]?.[2], {
  send_to: "G-ZK4MCMR8P9",
  page_location: "https://gc-heatingandcooling.com/residential/residential-ac-installation/",
  page_referrer: "",
  page_path: "/residential/residential-ac-installation/",
  language: "en",
  service_type: "other",
  cta_location: "home-hero",
  device_type: "mobile",
});
assert.deepEqual(dispatchedGoogleEvents[2], ["event", "conversion", {
  send_to: "AW-800582055/0pMLCI_U4YocEKfT3_0C",
  value: 1,
  currency: "USD",
  restricted_data_processing: true,
  allow_ad_personalization_signals: false,
  page_location: "https://gc-heatingandcooling.com/residential/residential-ac-installation/",
  page_referrer: "",
}]);
delete (globalThis as { window?: unknown }).window;
delete (globalThis as { location?: unknown }).location;
delete (globalThis as { innerWidth?: unknown }).innerWidth;
console.log("Core validation tests passed.");
