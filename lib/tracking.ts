/**
 * Conversion tracking — single source of truth.
 *
 * Design notes:
 * - Every conversion is tagged with an INTENT so Google Ads and GA4 can report
 *   emergency repair, installation, maintenance and commercial separately.
 * - Conversion labels come from env vars so they can be rotated without a deploy.
 *   Create the conversion actions in Google Ads first, then set the vars.
 * - A click is NOT a conversion. `phone_click` and `booking_click` are kept as
 *   SECONDARY (observation-only) signals. The primary conversions are
 *   `form_submit` (fired here) plus call-duration and booking-completed
 *   conversions, which are imported server-side / offline.
 */

export type Intent =
  | "emergency_repair"
  | "installation"
  | "maintenance"
  | "commercial"
  | "general";

export type ConversionAction =
  | "form_submit"
  | "phone_click"
  | "booking_click";

const GADS_ID = process.env.NEXT_PUBLIC_GADS_ID;

/** Google Ads conversion labels, one per action. Set these in .env.local. */
const LABELS: Record<ConversionAction, string | undefined> = {
  // PRIMARY — a real lead. Create this conversion action in Google Ads.
  form_submit: process.env.NEXT_PUBLIC_GADS_LABEL_FORM,
  // SECONDARY — observation only. These are the pre-existing labels.
  phone_click:
    process.env.NEXT_PUBLIC_GADS_LABEL_PHONE_CLICK || "0pMLCI_U4YocEKfT3_0C",
  booking_click:
    process.env.NEXT_PUBLIC_GADS_LABEL_BOOKING_CLICK ||
    "ljhICK7O64ocEKfT3_0C",
};

/**
 * Rough lead value per intent, in USD. Used so Maximize Conversion Value and
 * Target ROAS can tell a $99 tune-up apart from a $12k system replacement.
 * These are LEAD values (expected value of one lead), not job values.
 */
export const INTENT_VALUE: Record<Intent, number> = {
  emergency_repair: 120,
  installation: 400,
  maintenance: 40,
  commercial: 250,
  general: 100,
};

/**
 * Derive the intent from the current URL path. Order matters — the most
 * specific patterns are checked first.
 */
export function intentFromPath(pathname: string): Intent {
  const p = pathname.toLowerCase();

  if (p.startsWith("/commercial")) return "commercial";

  if (
    p.includes("installation") ||
    p.includes("replacement") ||
    p.includes("new-installation") ||
    p.includes("attic-insulation")
  ) {
    return "installation";
  }

  if (
    p.includes("maintenance") ||
    p.includes("tune-up") ||
    p.includes("tune-ups")
  ) {
    return "maintenance";
  }

  if (p.includes("repair")) return "emergency_repair";

  return "general";
}

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: Gtag;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Fire a conversion to Google Ads, GA4 and Meta.
 *
 * Safe to call before consent is granted: Consent Mode queues or models the
 * hit rather than dropping it, and the guards below keep it from throwing when
 * a tag is blocked.
 */
export function trackConversion(
  action: ConversionAction,
  intent: Intent,
  opts?: { value?: number; transactionId?: string },
): void {
  if (typeof window === "undefined") return;

  const value = opts?.value ?? INTENT_VALUE[intent];
  const label = LABELS[action];

  // --- Google Ads ---
  if (window.gtag && GADS_ID && label) {
    window.gtag("event", "conversion", {
      send_to: `${GADS_ID}/${label}`,
      value,
      currency: "USD",
      ...(opts?.transactionId ? { transaction_id: opts.transactionId } : {}),
    });
  }

  // --- GA4 (separate event so intent is a reportable dimension) ---
  if (window.gtag) {
    window.gtag("event", action, {
      intent,
      value,
      currency: "USD",
    });
  }

  // --- Meta ---
  if (window.fbq) {
    window.fbq("track", action === "form_submit" ? "Lead" : "Contact", {
      content_category: intent,
      value,
      currency: "USD",
    });
  }
}
