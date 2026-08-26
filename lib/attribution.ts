"use client";
import { isServiceType, type ServiceType } from "@/lib/service-types";
export const ATTRIBUTION_STORAGE_KEY = "gc_attribution_v1";
const DAYS_90 = 90 * 24 * 60 * 60 * 1000;
export type StoredAttribution = { trafficSource: string; campaign: string; landingPage: string; serviceType?: ServiceType; clickIds: Partial<Record<"gclid" | "gbraid" | "wbraid", string>>; createdAt: number; expiresAt: number; };
const clean = (value: string | null) => value?.trim().slice(0, 160) || undefined;
export function captureFirstAttribution(consentGranted: boolean): StoredAttribution | null {
  if (!consentGranted || typeof window === "undefined") return null;
  try {
    const current = localStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (current) { const parsed = JSON.parse(current) as StoredAttribution; if (parsed.expiresAt > Date.now()) return parsed; }
    const query = new URLSearchParams(location.search); const service = query.get("service");
    const record: StoredAttribution = { trafficSource: clean(query.get("utm_source")) ?? "direct", campaign: clean(query.get("utm_campaign")) ?? "(not set)", landingPage: location.pathname, serviceType: isServiceType(service) ? service : undefined, clickIds: { gclid: clean(query.get("gclid")), gbraid: clean(query.get("gbraid")), wbraid: clean(query.get("wbraid")) }, createdAt: Date.now(), expiresAt: Date.now() + DAYS_90 };
    localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(record)); return record;
  } catch { return null; }
}
