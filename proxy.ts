import { NextResponse, type NextRequest } from "next/server";
import { attributionValue } from "./lib/attribution-values";
const KEYS = ["gclid", "gbraid", "wbraid", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gad_campaignid"] as const;
const FIRST_COOKIE = "gc_attribution_first";
const LATEST_COOKIE = "gc_attribution_latest";
export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const incoming: Record<string, string> = Object.fromEntries(KEYS.flatMap(key => {
    const value = attributionValue(key, request.nextUrl.searchParams.get(key));
    return value ? [[key, value]] : [];
  }));
  const hasCampaign = Object.keys(incoming).length > 0;
  incoming.timestamp = new Date().toISOString();
  try { incoming.referrer = new URL(request.headers.get("referer") || "").origin; } catch {}
  incoming.landing_page = request.nextUrl.origin + request.nextUrl.pathname;
  if (hasCampaign || (!request.cookies.get(FIRST_COOKIE) && request.headers.get("accept")?.includes("text/html"))) {
    let first: Record<string, string> = {};
    try { first = JSON.parse(decodeURIComponent(request.cookies.get(FIRST_COOKIE)?.value ?? "{}")); } catch {}
    if (!Object.keys(first).length) {
      try {
        const legacy = JSON.parse(decodeURIComponent(request.cookies.get("gc_attribution")?.value ?? "{}")) as Record<string, unknown>;
        first = Object.fromEntries(KEYS.flatMap((key) => typeof legacy[key] === "string" ? [[key, legacy[key] as string]] : []));
      } catch {}
    }
    const weakIncoming = ["direct", "referral", "(none)"].includes(incoming.utm_medium?.toLowerCase()) || ["direct", "syndicatedsearch.goog"].includes(incoming.utm_source?.toLowerCase());
    if (weakIncoming && !incoming.gclid && !incoming.gbraid && !incoming.wbraid && (request.cookies.get(LATEST_COOKIE) || Object.keys(first).length)) return response;
    const options = { maxAge: 60 * 60 * 24 * 90, sameSite: "lax" as const, secure: process.env.NODE_ENV === "production", path: "/" };
    if (!request.cookies.get(FIRST_COOKIE)) response.cookies.set(FIRST_COOKIE, JSON.stringify(Object.keys(first).length ? first : incoming), options);
    if (hasCampaign) response.cookies.set(LATEST_COOKIE, JSON.stringify(incoming), options);
  }
  return response;
}
export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] };
