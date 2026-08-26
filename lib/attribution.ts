"use client";
import { isServiceType, type ServiceType } from "@/lib/service-types";
export const ATTRIBUTION_STORAGE_KEY = "gc_attribution_v1";
const DAYS_90 = 90 * 24 * 60 * 60 * 1000;
export type StoredAttribution = { trafficSource: string; campaign: string; landingPage: string; serviceType?: ServiceType; clickIds: Partial<Record<"gclid" | "gbraid" | "wbraid", string>>; gclid?: string; gbraid?: string; wbraid?: string; utm_source?: string; utm_medium?: string; utm_campaign?: string; utm_content?: string; utm_term?: string; createdAt: number; expiresAt: number; };
const clean = (value: string | null) => value?.trim().slice(0, 160) || undefined;
export function captureFirstAttribution(consentGranted: boolean): StoredAttribution | null {
  if (!consentGranted || typeof window === "undefined") return null;
  try {
    const current = localStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (current) { const parsed = JSON.parse(current) as StoredAttribution; if (parsed.expiresAt > Date.now()) return parsed; }
    const query = new URLSearchParams(location.search); const service = query.get("service");
    const gclid = clean(query.get("gclid")); const gbraid = clean(query.get("gbraid")); const wbraid = clean(query.get("wbraid"));
    const utm_source = clean(query.get("utm_source")); const utm_medium = clean(query.get("utm_medium")); const utm_campaign = clean(query.get("utm_campaign")); const utm_content = clean(query.get("utm_content")); const utm_term = clean(query.get("utm_term"));
    const record: StoredAttribution = { trafficSource: utm_source ?? "direct", campaign: utm_campaign ?? "(not set)", landingPage: `${location.pathname}${location.search}`, serviceType: isServiceType(service) ? service : undefined, clickIds: { gclid, gbraid, wbraid }, gclid, gbraid, wbraid, utm_source, utm_medium, utm_campaign, utm_content, utm_term, createdAt: Date.now(), expiresAt: Date.now() + DAYS_90 };
    localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(record)); return record;
  } catch { return null; }
}
