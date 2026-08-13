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
 * Conversion VALUE per lead, in USD — expected revenue from one lead, i.e.
 * average ticket x close rate on LEADS (not on appointments).
 *
 * Calibrated 2026-08-13 with Silvio:
 *   maintenance       $99 ticket    x 85% close  =  $84
 *   emergency_repair  ~$430 ticket  x 70% close  = $300   ($99 service call + work)
 *   installation      ~$6,000       x 12% close  = $720   <- CONSERVATIVE on purpose
 *   commercial        placeholder, needs its own read     = $400
 *
 * On the installation number: an earlier pass used $2,250 ($9,000 x 25%) and
 * that was too aggressive — install leads close nowhere near 25%, most never
 * get past the estimate. $720 assumes a mid-range condenser/system swap and a
 * realistic 12%. Better to under-value it and raise it once real close data
 * exists than to have the algorithm chase leads that don't pay for themselves.
 *
 * The ratio is what the bidding actually reads: an installation lead is ~2.4x
 * a repair lead and ~9x a tune-up. That spread is coherent — installs are
 * worth far more per JOB but close far less often, and the two effects
 * partially cancel.
 *
 * NOTE: GC-Installations currently runs MAXIMIZE_CLICKS, so these values do
 * not drive bidding yet. They start mattering when the campaign moves to
 * value-based bidding, which should only happen after the Form Submit
 * conversion action exists and has ~15-30 conversions of history.
 */
export const INTENT_VALUE: Record<Intent, number> = {
  installation: 720,
  commercial: 400,
  emergency_repair: 300,
  maintenance: 84,
  general: 120,
};

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

const INTENT_KEY = "gc-intent";

const INTENTS: readonly Intent[] = [
  "emergency_repair",
  "installation",
  "maintenance",
  "commercial",
  "general",
];

function isIntent(v: string): v is Intent {
  return (INTENTS as readonly string[]).includes(v);
}

/**
 * Remember the most specific intent seen this session.
 *
 * Call this on every route change. It deliberately never stores "general", so
 * a later visit to a page with no intent (/contact, /about, the home page)
 * cannot erase the real intent the visitor arrived with.
 *
 * Uses sessionStorage, not a cookie: the value is a non-identifying string, it
 * dies with the tab, and it falls under functionality_storage — which Consent
 * Mode grants by default — so it works before the visitor answers the banner.
 */
export function rememberIntent(pathname: string): void {
  if (typeof window === "undefined") return;
  const intent = intentFromPath(pathname);
  if (intent === "general") return;
  try {
    sessionStorage.setItem(INTENT_KEY, intent);
  } catch {
    /* private mode / storage disabled — fall back to referrer or general */
  }
}

/**
 * The intent to attribute a conversion to.
 *
 * Resolution order:
 *   1. The current path, when it says something specific.
 *   2. The intent remembered earlier in this session.
 *   3. The referring page, when it is same-origin.
 *   4. "general".
 *
 * Why this exists: the contact page has no intent of its own, so before this
 * every form sent from /contact was valued at the generic fallback — a $6,000
 * installation enquiry and a $99 tune-up counted the same. Someone who reads
 * /residential/residential-ac-installation and then clicks through to Contact
 * is an installation lead, and the bidding needs to know that.
 */
export function resolveIntent(pathname: string): Intent {
  const direct = intentFromPath(pathname);
  if (direct !== "general") return direct;
  if (typeof window === "undefined") return direct;

  try {
    const stored = sessionStorage.getItem(INTENT_KEY);
    if (stored && isIntent(stored)) return stored;
  } catch {
    /* ignore */
  }

  try {
    if (document.referrer) {
      const ref = new URL(document.referrer);
      if (ref.origin === window.location.origin) {
        const fromRef = intentFromPath(ref.pathname);
        if (fromRef !== "general") return fromRef;
      }
    }
  } catch {
    /* ignore */
  }

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
