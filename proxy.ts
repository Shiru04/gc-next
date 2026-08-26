import { NextResponse, type NextRequest } from "next/server";
const KEYS = ["gclid", "gbraid", "wbraid", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const incoming = Object.fromEntries(KEYS.flatMap(key => request.nextUrl.searchParams.get(key)?.slice(0, 300) ? [[key, request.nextUrl.searchParams.get(key)!.slice(0, 300)]] : []));
  if (Object.keys(incoming).length) {
    let existing: Record<string, unknown> = {};
    try { existing = JSON.parse(request.cookies.get("gc_attribution")?.value ?? "{}"); } catch {}
    response.cookies.set("gc_attribution", JSON.stringify({ ...existing, ...incoming, landingUrl: existing.landingUrl ?? request.nextUrl.href, referrer: existing.referrer ?? request.headers.get("referer") ?? "", capturedAt: existing.capturedAt ?? new Date().toISOString() }), { maxAge: 60 * 60 * 24 * 90, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/" });
  }
  return response;
}
export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] };
