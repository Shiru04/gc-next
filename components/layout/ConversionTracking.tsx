"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { rememberIntent, resolveIntent, trackConversion } from "@/lib/tracking";

/**
 * Global click listener for phone and booking CTAs.
 *
 * IMPORTANT: both of these are SECONDARY (observation-only) conversions.
 * A click on a tel: link is not a lead — on desktop the same visitor often
 * clicks the number several times, which is why this signal showed a 149%
 * "conversion rate" on desktop in the August 2026 audit.
 *
 * The primary conversions are:
 *   - form_submit          → fired in ContactForm
 *   - call 60s+            → imported from the call-tracking provider
 *   - booking completed    → imported from Dispatch (offline conversion import)
 *
 * Keep phone_click and booking_click marked as "Secondary" in Google Ads so
 * they are reported but never used for bidding.
 */
export function ConversionTracking() {
  const pathname = usePathname();

  // Record the intent of every page visited, so a later conversion from a
  // page with no intent of its own (/contact) still attributes correctly.
  useEffect(() => {
    rememberIntent(pathname || "/");
  }, [pathname]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = (e.target as HTMLElement | null)?.closest("a");
      if (!target) return;

      const href = target.getAttribute("href") || "";
      const intent = resolveIntent(pathname || "/");

      if (href.startsWith("tel:")) {
        trackConversion("phone_click", intent);
        return;
      }

      if (href.includes("dispatch.me")) {
        trackConversion("booking_click", intent);
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname]);

  return null;
}
