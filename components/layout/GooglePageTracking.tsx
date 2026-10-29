"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { hasAnalyticsConsent } from "@/lib/google-consent";
import { sendGoogleEvent } from "@/lib/google-tag";

export function GooglePageTracking() {
  const pathname = usePathname();

  useEffect(() => {
    let sent = false;
    const handleConsent = () => {
      if (sent || !hasAnalyticsConsent()) return;
      sendGoogleEvent("page_view");
      sent = true;
    };
    handleConsent();
    window.addEventListener("gc:consent-updated", handleConsent);
    return () => window.removeEventListener("gc:consent-updated", handleConsent);
  }, [pathname]);

  return null;
}
