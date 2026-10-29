"use client";

import { useEffect } from "react";
import { hasGlobalPrivacyControl, readGoogleConsent } from "@/lib/google-consent";

const HOTJAR_SCRIPT_ID = "gc-hotjar-script";
const HOTJAR_SITE_ID = 6415624;

function maskForms() {
  document.querySelectorAll("form, input, textarea, select").forEach(element => {
    element.setAttribute("data-cs-mask", "");
  });
}

export function HotjarTracking() {
  useEffect(() => {
    const observer = new MutationObserver(maskForms);
    maskForms();
    observer.observe(document.body, { childList: true, subtree: true });

    function update() {
      const allowed = readGoogleConsent() === "accepted" && !hasGlobalPrivacyControl();
      if (!allowed) {
        // A loaded replay script cannot be reliably unloaded in place.
        if (document.getElementById(HOTJAR_SCRIPT_ID)) window.location.reload();
        return;
      }
      if (document.getElementById(HOTJAR_SCRIPT_ID)) return;
      maskForms();
      const hotjarWindow = window as typeof window & {
        hj?: (...args: unknown[]) => void;
        _hjSettings?: { hjid: number; hjsv: number };
      };
      if (!hotjarWindow.hj) {
        const queue = function (...args: unknown[]) { (queue.q ||= []).push(args); } as ((...args: unknown[]) => void) & { q?: unknown[][] };
        hotjarWindow.hj = queue;
      }
      hotjarWindow._hjSettings = { hjid: HOTJAR_SITE_ID, hjsv: 6 };
      const script = document.createElement("script");
      script.id = HOTJAR_SCRIPT_ID;
      script.async = true;
      script.src = `https://static.hotjar.com/c/hotjar-${HOTJAR_SITE_ID}.js?sv=6`;
      document.head.appendChild(script);
    }

    update();
    window.addEventListener("gc:consent-updated", update);
    document.addEventListener("visibilitychange", update);
    window.addEventListener("pageshow", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("gc:consent-updated", update);
      document.removeEventListener("visibilitychange", update);
      window.removeEventListener("pageshow", update);
    };
  }, []);
  return null;
}
