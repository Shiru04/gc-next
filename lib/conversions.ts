"use client";
import type { ServiceType } from "@/lib/service-types";
export type ConversionEventName = "schedule_service_click" | "phone_click" | "dispatch_booking_start" | "dispatch_booking_complete" | "housecall_pro_booking_start" | "installation_guide_open" | "contact_form_start" | "contact_form_submit" | "installation_estimate_request" | "financing_click";
declare global { interface Window { dataLayer?: Array<Record<string, unknown>>; } }
const recent = new Map<string, number>();
export function readAttribution(): { trafficSource?: string; campaign?: string; serviceType?: ServiceType } {
  try { const parsed = JSON.parse(localStorage.getItem("gc_attribution_v1") ?? "{}") as { trafficSource?: string; campaign?: string; serviceType?: ServiceType; expiresAt?: number }; return parsed.expiresAt && parsed.expiresAt > Date.now() ? parsed : {}; } catch { return {}; }
}
export function pushConversionEvent(event: ConversionEventName, input: { serviceType?: ServiceType; ctaLocation: string; linkUrl?: string }): boolean {
  if (typeof window === "undefined") return false;
  const attribution = readAttribution(); const serviceType = input.serviceType ?? attribution.serviceType ?? "other";
  const key = `${event}:${input.ctaLocation}:${serviceType}:${location.pathname}`; const now = performance.now();
  if (now - (recent.get(key) ?? -Infinity) < 800) return false; recent.set(key, now);
  let linkUrl: string | undefined;
  try { const url = input.linkUrl ? new URL(input.linkUrl, location.origin) : null; linkUrl = url ? `${url.origin}${url.pathname}` : undefined; } catch { linkUrl = undefined; }
  const width = innerWidth; window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, service_type: serviceType, page_path: location.pathname, cta_location: input.ctaLocation, traffic_source: attribution.trafficSource ?? "direct", campaign: attribution.campaign ?? "(not set)", device_type: width < 768 ? "mobile" : width < 1024 ? "tablet" : "desktop", link_url: linkUrl });
  return true;
}
