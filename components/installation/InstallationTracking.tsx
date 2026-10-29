"use client";

import { useEffect } from "react";
import { hasAnalyticsConsent } from "@/lib/google-consent";
import { sendGoogleEvent } from "@/lib/google-tag";

export function InstallationTracking() {
  useEffect(() => {
    let pageViewSent = false;
    const sendPageViewAfterConsent = (event?: Event) => {
      const justAccepted = event instanceof CustomEvent && event.detail === "accepted";
      if (pageViewSent || (!justAccepted && !hasAnalyticsConsent())) return;
      sendGoogleEvent("installation_page_view", { lead_type: "installation" });
      pageViewSent = true;
      if (location.hash === "#free-hvac-quote") sendGoogleEvent("installation_guide_open", { lead_type: "installation", cta_location: "direct_link" });
    };

    sendPageViewAfterConsent();
    window.addEventListener("gc:consent-updated", sendPageViewAfterConsent);
    return () => window.removeEventListener("gc:consent-updated", sendPageViewAfterConsent);
  }, []);
  return null;
}
