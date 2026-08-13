"use client";

import { useState, useEffect } from "react";
import Script from "next/script";

const CONSENT_KEY = "gc-cookie-consent";
const HOTJAR_ID = 6415624;

type Consent = "granted" | "denied" | null;

/**
 * Consent banner.
 *
 * This component no longer loads the Google tags — `ConsentMode` does that,
 * with Consent Mode v2 defaults set to denied. All this does is flip consent
 * to granted/denied and gate the tools that have no consent-mode equivalent
 * (Hotjar), which must stay fully blocked until the visitor opts in.
 */
export function CookieConsent() {
  const [consent, setConsent] = useState<Consent>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === "granted" || stored === "denied") {
      setConsent(stored);
    } else {
      setVisible(true);
    }
  }, []);

  function updateGoogleConsent(state: "granted" | "denied") {
    if (typeof window === "undefined") return;

    if (window.gtag) {
      window.gtag("consent", "update", {
        ad_storage: state,
        ad_user_data: state,
        ad_personalization: state,
        analytics_storage: state,
      });
    }

    if (window.fbq) {
      window.fbq("consent", state === "granted" ? "grant" : "revoke");
    }
  }

  function accept() {
    localStorage.setItem(CONSENT_KEY, "granted");
    setConsent("granted");
    setVisible(false);
    updateGoogleConsent("granted");
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, "denied");
    setConsent("denied");
    setVisible(false);
    updateGoogleConsent("denied");
  }

  return (
    <>
      {consent === "granted" && (
        <Script id="hotjar-init" strategy="afterInteractive">
          {`
            (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:${HOTJAR_ID},hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `}
        </Script>
      )}

      {visible && (
        <div
          role="dialog"
          aria-label="Cookie consent"
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            background: "#1a1a1a",
            color: "#fff",
            padding: "16px 24px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            fontSize: "14px",
            boxShadow: "0 -2px 12px rgba(0,0,0,0.3)",
          }}
        >
          <p style={{ margin: 0, maxWidth: "600px", lineHeight: 1.5 }}>
            We use cookies and tracking tools to improve your experience and
            analyze site traffic. You can accept or decline non-essential
            cookies.
          </p>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={accept}
              style={{
                background: "#2563eb",
                color: "#fff",
                border: "none",
                padding: "8px 20px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "14px",
              }}
            >
              Accept
            </button>
            <button
              onClick={decline}
              style={{
                background: "transparent",
                color: "#fff",
                border: "1px solid #555",
                padding: "8px 20px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "14px",
              }}
            >
              Decline
            </button>
          </div>
        </div>
      )}
    </>
  );
}
