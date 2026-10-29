"use client";
import { attributionValue } from "./attribution-values";

export const ATTRIBUTION_FIRST_STORAGE_KEY = "gc_attribution_first_v2";
export const ATTRIBUTION_LATEST_STORAGE_KEY = "gc_attribution_latest_v2";
const DAYS_90 = 90 * 24 * 60 * 60 * 1000;

export const ATTRIBUTION_KEYS = [
  "gclid", "gbraid", "wbraid", "utm_source", "utm_medium",
  "utm_campaign", "utm_content", "utm_term", "gad_campaignid",
] as const;

export type AttributionKey = (typeof ATTRIBUTION_KEYS)[number];
export type AttributionTouch = Partial<Record<AttributionKey, string>> & { landing_page?: string; referrer?: string; timestamp?: string; createdAt?: number; expiresAt?: number };
export type StoredAttribution = { firstTouch: AttributionTouch; latestTouch?: AttributionTouch };



function readTouch(key: string): AttributionTouch {
  try {
    const value = JSON.parse(localStorage.getItem(key) ?? "{}") as AttributionTouch;
    return value.expiresAt && value.expiresAt > Date.now() ? value : {};
  } catch { return {}; }
}

/** The server-side cookies in proxy.ts preserve the same attribution for HCP,
 * including before optional analytics/advertising consent is granted. */
export function captureFirstAttribution(consentGranted: boolean): StoredAttribution | null {
  if (!consentGranted || typeof window === "undefined") return null;
  try {
    const query = new URLSearchParams(location.search);
    const incoming = Object.fromEntries(ATTRIBUTION_KEYS.flatMap((key) => {
      const value = attributionValue(key, query.get(key));
      return value ? [[key, value]] : [];
    })) as AttributionTouch;
    const existingFirst = readTouch(ATTRIBUTION_FIRST_STORAGE_KEY);
    if (Object.keys(incoming).length) {
      const now = Date.now();
      let referrer = "";
      try { referrer = new URL(document.referrer).origin; } catch {}
      const touch = { ...incoming, referrer, timestamp: new Date(now).toISOString(), landing_page: location.origin + location.pathname, createdAt: now, expiresAt: now + DAYS_90 };
      if (!Object.keys(existingFirst).length) localStorage.setItem(ATTRIBUTION_FIRST_STORAGE_KEY, JSON.stringify(touch));
      localStorage.setItem(ATTRIBUTION_LATEST_STORAGE_KEY, JSON.stringify(touch));
    }
    return readStoredAttribution();
  } catch { return null; }
}

export function readStoredAttribution(): StoredAttribution {
  if (typeof window === "undefined") return { firstTouch: {} };
  const cookieTouch = (name: string): AttributionTouch => {
    try {
      const raw = document.cookie.split(";").map(item => item.trim()).find(item => item.startsWith(`${name}=`));
      return raw ? JSON.parse(decodeURIComponent(raw.slice(name.length + 1))) : {};
    } catch { return {}; }
  };
  const first = cookieTouch("gc_attribution_first");
  const latest = cookieTouch("gc_attribution_latest");
  return { firstTouch: Object.keys(first).length ? first : readTouch(ATTRIBUTION_FIRST_STORAGE_KEY), latestTouch: Object.keys(latest).length ? latest : readTouch(ATTRIBUTION_LATEST_STORAGE_KEY) };
}
