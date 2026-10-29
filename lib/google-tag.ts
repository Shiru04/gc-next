"use client";

import { googleContext } from "./google-context";
import { hasAnalyticsConsent } from "@/lib/google-consent";

export const GA4_MEASUREMENT_ID = "G-ZK4MCMR8P9";
export const GOOGLE_ADS_ID = "AW-800582055";

export const GOOGLE_ADS_CONVERSIONS = {
  service: `${GOOGLE_ADS_ID}/j7wKCKeVyukcEKfT3_0C`,
  installation: `${GOOGLE_ADS_ID}/Ix72CKqVyukcEKfT3_0C`,
  phone: `${GOOGLE_ADS_ID}/0pMLCI_U4YocEKfT3_0C`,
} as const;

export type GoogleEventName =
  | "page_view"
  | "service_request_start"
  | "service_request_submit"
  | "installation_page_view"
  | "installation_form_start"
  | "installation_contact_step_view"
  | "installation_submit_attempt"
  | "installation_form_error"
  | "installation_lead_submit"
  | "phone_click"
  | "financing_click"
  | "installation_guide_open"
  | "housecall_pro_booking_start"
  | "hcp_booking_start"
  | "schedule_service_click"
  | "dispatch_booking_start"
  | "dispatch_booking_complete"
  | "installation_consultation_click"
  | "repair_request_start"
  | "maintenance_request_start"
  | "contact_form_start"
  | "contact_form_submit"
  | "installation_estimate_request"
  | "installation_guide_step";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const ALLOWED_PARAMETERS = new Set([
  "form_name", "form_location", "step", "error_type",
  "service_type",
  "cta_location",
  "device_type",
  "link_url",
  "lead_type",
  "system_type",
  "project_type",
  "timeline",
  "financing_interest",
  "source",
  "error_fields",
  "error_category",
  "error_stage",
  "error_code",
  "field_name",
  "form_step",
  "http_status",
  "request_id",
  "backup_preserved",
  "step_number",
  "step_name",
  "language",
]);

function ensureGoogleTag(): NonNullable<Window["gtag"]> {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function (...args: unknown[]) {
    window.dataLayer?.push(args);
  };
  return window.gtag;
}

function sanitizeLink(value: string): string | undefined {
  try {
    const url = new URL(value, window.location.origin);
    return `${url.origin}${url.pathname}`.slice(0, 300);
  } catch {
    return undefined;
  }
}

function sanitizeParameters(input: Record<string, unknown>) {
  const output: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(input)) {
    if (!ALLOWED_PARAMETERS.has(key)) continue;
    if (key === "link_url" && typeof value === "string") {
      const link = sanitizeLink(value);
      if (link) output[key] = link;
      continue;
    }
    if (typeof value === "string") output[key] = value.trim().slice(0, 100);
    else if (typeof value === "number" && Number.isFinite(value)) output[key] = value;
    else if (typeof value === "boolean") output[key] = value;
  }
  return output;
}

export function sendGoogleEvent(
  eventName: GoogleEventName,
  parameters: Record<string, unknown> = {},
): void {
  if (typeof window === "undefined" || !hasAnalyticsConsent()) return;
  ensureGoogleTag()("event", eventName, {
    send_to: GA4_MEASUREMENT_ID,
    ...googleContext(window.location.href || `${window.location.origin}${window.location.pathname}`, typeof document === "undefined" ? "" : document.cookie, typeof document === "undefined" ? "" : document.referrer),
    page_path: window.location.pathname,
    language: window.location.pathname === "/es" || window.location.pathname.startsWith("/es/") ? "es" : "en",
    ...sanitizeParameters(parameters),
  });
}

export function sendGoogleEventAfterConsent(
  eventName: GoogleEventName,
  parameters: Record<string, unknown> = {},
): boolean {
  if (!hasAnalyticsConsent()) return false;
  sendGoogleEvent(eventName, parameters);
  return true;
}

export function sendGoogleAdsConversion(
  kind: keyof typeof GOOGLE_ADS_CONVERSIONS,
  transactionId?: string,
): boolean {
  if (typeof window === "undefined" || !hasAnalyticsConsent()) return false;
  ensureGoogleTag()("event", "conversion", {
    send_to: GOOGLE_ADS_CONVERSIONS[kind],
    ...(transactionId && /^[0-9a-f-]{36}$/i.test(transactionId) ? { transaction_id: transactionId } : {}),
    value: 1,
    currency: "USD",
    restricted_data_processing: true,
    allow_ad_personalization_signals: false,
    ...googleContext(window.location.href || `${window.location.origin}${window.location.pathname}`, typeof document === "undefined" ? "" : document.cookie, typeof document === "undefined" ? "" : document.referrer),
  });
  return true;
}

const confirmedConversions = new Set<string>();

/** Measure a confirmed lead only at confirmation time; never replay an opted-out lead later. */
export function sendConfirmedLeadConversion(
  kind: "installation" | "service",
  transactionId: string,
  parameters: Record<string, unknown> = {},
): boolean {
  if (typeof window === "undefined" || !/^[0-9a-f-]{36}$/i.test(transactionId)) return false;
  const marker = `gc-converted-${transactionId}`;
  if (confirmedConversions.has(marker)) return false;
  try { if (window.sessionStorage.getItem(marker)) return false; } catch {}
  confirmedConversions.add(marker);
  const allowed = hasAnalyticsConsent();
  try { window.sessionStorage.setItem(marker, allowed ? "sent" : "suppressed"); } catch {}
  if (!allowed) return false;
  try {
    sendGoogleEvent(kind === "installation" ? "installation_lead_submit" : "service_request_submit", parameters);
  } catch {
    // A tracking failure must not turn a confirmed Housecall Pro lead into a form error.
  }
  try { sendGoogleAdsConversion(kind, transactionId); } catch {}
  return true;
}
