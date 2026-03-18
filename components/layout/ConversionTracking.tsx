"use client";

import { useEffect } from "react";

const GADS_ID = process.env.NEXT_PUBLIC_GADS_ID!;

const CONVERSION_LABELS = {
  phoneClick: "0pMLCI_U4YocEKfT3_0C",
  bookingClick: "ljhICK7O64ocEKfT3_0C",
};

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

function fireConversion(label: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "conversion", {
      send_to: `${GADS_ID}/${label}`,
    });
  }
}

export function ConversionTracking() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href") || "";

      // Phone click — any tel: link
      if (href.startsWith("tel:")) {
        fireConversion(CONVERSION_LABELS.phoneClick);
      }

      // Booking click — dispatch.me booking URL
      if (href.includes("dispatch.me")) {
        fireConversion(CONVERSION_LABELS.bookingClick);
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
