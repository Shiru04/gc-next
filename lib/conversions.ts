"use client";
import type { ServiceType } from "@/lib/service-types";
import { sendGoogleAdsConversion, sendGoogleEvent, type GoogleEventName } from "@/lib/google-tag";
export type ConversionEventName = GoogleEventName;
const recent = new Map<string, number>();
export function pushConversionEvent(event: ConversionEventName, input: { serviceType?: ServiceType; ctaLocation: string; linkUrl?: string }): boolean {
  if (typeof window === "undefined") return false;
  const serviceType = input.serviceType ?? "other";
  const key = `${event}:${input.ctaLocation}:${serviceType}:${location.pathname}`; const now = performance.now();
  if (now - (recent.get(key) ?? -Infinity) < 800) return false; recent.set(key, now);
  let linkUrl: string | undefined;
  try {
    const url = input.linkUrl ? new URL(input.linkUrl, location.origin) : null;
    linkUrl = url && (url.protocol === "http:" || url.protocol === "https:") ? `${url.origin}${url.pathname}` : undefined;
  } catch { linkUrl = undefined; }
  const width = innerWidth;
  sendGoogleEvent(event, { service_type: serviceType, cta_location: input.ctaLocation, device_type: width < 768 ? "mobile" : width < 1024 ? "tablet" : "desktop", link_url: linkUrl });
  if (event === "phone_click") sendGoogleAdsConversion("phone");
  return true;
}
