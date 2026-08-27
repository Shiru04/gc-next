import type { ServiceType } from "@/lib/service-types";

const DISPATCH_URL = "https://customer.dispatch.me/booking?account_id=37&org_id=257895";

export function housecallProBookingHref(service: ServiceType, coupon?: string) {
  const configured = process.env.NEXT_PUBLIC_HOUSECALL_PRO_ONLINE_BOOKING_URL;
  // Dispatch intentionally remains the fallback until Housecall Pro passes production QA.
  if (!configured) return dispatchServiceHref(service, coupon);
  const url = new URL(configured);
  url.searchParams.set("service", service);
  url.searchParams.set("utm_source", "gc-website");
  url.searchParams.set("utm_medium", "online-booking");
  if (coupon) { url.searchParams.set("coupon", coupon); url.searchParams.set("utm_content", coupon); }
  return url.toString();
}

export function customerFlowHref(service: ServiceType, locale: "en" | "es" = "en", coupon?: string) {
  if (service === "installation" || service === "commercial_installation") {
    const path = locale === "es" ? "/es/residencial/residential-ac-installation/" : "/residential/residential-ac-installation/";
    return `${path}#free-hvac-quote`;
  }
  if (["ac_repair", "heating_repair", "maintenance"].includes(service)) return `/request-service/?service=${encodeURIComponent(service === "heating_repair" ? "ac_repair" : service)}`;
  return scheduleServiceHref(service, locale, coupon);
}

export function scheduleServiceHref(service: ServiceType, locale: "en" | "es" = "en", coupon?: string) {
  const base = locale === "es" ? "/es/programar-servicio/" : "/schedule-service/";
  const query = new URLSearchParams({ service });
  if (coupon) query.set("coupon", coupon);
  return `${base}?${query.toString()}`;
}

export function dispatchServiceHref(service: ServiceType, coupon?: string) {
  const url = new URL(DISPATCH_URL);
  url.searchParams.set("service", service);
  url.searchParams.set("utm_source", "gc-website");
  url.searchParams.set("utm_medium", "service-scheduler");
  url.searchParams.set("utm_campaign", service);
  if (coupon) {
    url.searchParams.set("coupon", coupon);
    url.searchParams.set("utm_content", coupon);
    url.searchParams.set("promotion", "HVAC Tune-Up — Regularly $174 — Save $25 — Now $149");
    url.searchParams.set("service_label", "HVAC Tune-Up — Regularly $174 — Save $25 — Now $149");
  }
  return url.toString();
}

export function serviceIntentFromSlug(slug: string): ServiceType {
  if (slug.includes("installation") || slug.includes("insulation")) return slug.startsWith("commercial-") ? "commercial_installation" : "installation";
  if (slug.includes("maintenance")) return slug.startsWith("commercial-") ? "commercial_maintenance" : "maintenance";
  if (slug.includes("heating")) return "heating_repair";
  if (slug.startsWith("commercial-")) return "commercial_repair";
  return "ac_repair";
}

export function serviceCtaLabel(service: ServiceType) {
  if (service === "installation" || service === "commercial_installation") return "Request a Free Installation Estimate";
  if (service === "maintenance" || service === "commercial_maintenance") return "Schedule Maintenance";
  return "Schedule HVAC Repair";
}
