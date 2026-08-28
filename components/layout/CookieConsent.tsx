"use client";
import { useEffect, useState } from "react";
import { captureFirstAttribution } from "@/lib/attribution";
const KEY = "cookieConsent";

/** Loads the Google Ads destination only after analytics/ads consent is granted. */
function initializeGoogleAds(): void {
  if (typeof window === "undefined" || document.getElementById("gc-google-ads-tag")) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || ((...args: any[]) => { window.dataLayer?.push(args as unknown as Record<string, unknown>); });
  window.gtag("js", new Date());
  window.gtag("config", "AW-800582055");

  const tag = document.createElement("script");
  tag.id = "gc-google-ads-tag";
  tag.async = true;
  tag.src = "https://www.googletagmanager.com/gtag/js?id=AW-800582055";
  document.head.appendChild(tag);
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const consent = localStorage.getItem(KEY);
    if (consent === "accepted") {
      captureFirstAttribution(true);
      initializeGoogleAds();
    }
    setVisible(!consent);
  }, []);
  function choose(value: "accepted" | "denied") {
    localStorage.setItem(KEY, value); if (value === "accepted") { captureFirstAttribution(true); initializeGoogleAds(); }
    window.gtag?.("consent", "update", { ad_storage: value === "accepted" ? "granted" : "denied", analytics_storage: value === "accepted" ? "granted" : "denied", ad_user_data: value === "accepted" ? "granted" : "denied", ad_personalization: value === "accepted" ? "granted" : "denied" });
    window.dispatchEvent(new Event("gc:consent-updated")); setVisible(false);
  }
  if (!visible) return null;
  return <aside role="dialog" aria-label="Cookie preferences" className="fixed bottom-[4.5rem] left-3 right-3 z-50 mx-auto max-w-3xl rounded-xl bg-neutral-950 p-4 text-white shadow-2xl md:bottom-4">
    <p className="text-sm">We use optional analytics cookies only with your permission. Your service request details are never sent to analytics.</p>
    <div className="mt-3 flex gap-2"><button onClick={() => choose("accepted")} className="rounded-lg bg-white px-4 py-2 font-semibold text-black">Accept analytics</button><button onClick={() => choose("denied")} className="rounded-lg border border-white/50 px-4 py-2 font-semibold">Decline</button></div>
  </aside>;
}
