"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { sendGoogleEvent } from "@/lib/google-tag";
import { hasAnalyticsConsent } from "@/lib/google-consent";
export function JourneyTracking({ installation, guide }: { installation: boolean; guide: boolean }) {
  const pathname = usePathname();
  useEffect(() => {
    let sent = false;
    const track = () => { if (sent || !hasAnalyticsConsent()) return; sent = true; if (installation) sendGoogleEvent("installation_page_view", { form_location: pathname }); if (guide) sendGoogleEvent("installation_guide_open", { form_location: pathname }); };
    track(); window.addEventListener("gc:consent-updated", track);
    return () => window.removeEventListener("gc:consent-updated", track);
  }, [pathname, installation, guide]);
  return null;
}
