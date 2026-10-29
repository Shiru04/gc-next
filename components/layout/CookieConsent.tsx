"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { captureFirstAttribution } from "@/lib/attribution";
import {
  hasAnalyticsConsent,
  hasGlobalPrivacyControl,
  GOOGLE_CONSENT_KEY,
  type GoogleConsentChoice,
  readGoogleConsent,
  setGoogleConsentChoice,
} from "@/lib/google-consent";

const GOOGLE_CONSENT_GRANTED = {
  ad_storage: "granted",
  analytics_storage: "granted",
  ad_user_data: "denied",
  ad_personalization: "denied",
} as const;

const GOOGLE_CONSENT_DENIED = {
  ad_storage: "denied",
  analytics_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
} as const;

export function CookieConsent() {
  const es = usePathname().startsWith("/es");
  const [consent, setConsent] = useState<GoogleConsentChoice | null>();
  const [gpc, setGpc] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const banner = useRef<HTMLElement>(null);
  const open = consent === null || preferencesOpen;

  useEffect(() => {
    if (!open || !banner.current) return;
    const measure = () => document.documentElement.style.setProperty("--gc-cookie-height", `${banner.current?.getBoundingClientRect().height || 0}px`);
    const observer = new ResizeObserver(measure); observer.observe(banner.current); measure();
    const protectFocus = (event: FocusEvent) => {
      const target = event.target;
      if (!(target instanceof HTMLElement) || banner.current?.contains(target)) return;
      requestAnimationFrame(() => {
        const overlay = banner.current?.getBoundingClientRect(); const field = target.getBoundingClientRect();
        if (overlay && field.right > overlay.left && field.left < overlay.right && field.bottom > overlay.top - 16 && field.top < overlay.bottom) target.scrollIntoView({ block: "center", behavior: "instant" });
      });
    };
    document.addEventListener("focusin", protectFocus);
    return () => { observer.disconnect(); document.removeEventListener("focusin", protectFocus); document.documentElement.style.removeProperty("--gc-cookie-height"); };
  }, [open]);

  useEffect(() => {
    const openPreferences = () => setPreferencesOpen(true);
    window.addEventListener("gc:open-privacy", openPreferences);
    return () => window.removeEventListener("gc:open-privacy", openPreferences);
  }, []);

  useEffect(() => {
    const globalOptOut = hasGlobalPrivacyControl();
    const restoredConsent = readGoogleConsent();
    setGpc(globalOptOut);
    if (globalOptOut) setGoogleConsentChoice("denied");
    else if (restoredConsent) setGoogleConsentChoice(restoredConsent);
    if (hasAnalyticsConsent()) {
      captureFirstAttribution(true);
    }
    const effectiveConsent = globalOptOut ? "denied" : restoredConsent ?? "accepted";
    window.gtag?.(
      "consent",
      "update",
      effectiveConsent === "accepted" ? GOOGLE_CONSENT_GRANTED : GOOGLE_CONSENT_DENIED,
    );
    setConsent(globalOptOut ? "denied" : restoredConsent);
  }, []);

  function choose(value: GoogleConsentChoice) {
    setGoogleConsentChoice(value);
    try {
      window.localStorage.setItem(GOOGLE_CONSENT_KEY, value);
    } catch {}
    if (value === "accepted" && !gpc) captureFirstAttribution(true);
    window.gtag?.(
      "consent",
      "update",
      value === "accepted" && !gpc ? GOOGLE_CONSENT_GRANTED : GOOGLE_CONSENT_DENIED,
    );
    setConsent(value);
    setPreferencesOpen(false);
    window.dispatchEvent(new CustomEvent("gc:consent-updated", { detail: value }));
  }

  if (consent === undefined) return null;
  if (consent !== null && !preferencesOpen) return null;

  return <aside ref={banner} aria-label={es ? "Preferencias de cookies" : "Cookie preferences"} className="gc-cookie-banner">
    <strong>{es ? "Sus opciones de privacidad" : "Your Privacy Choices"}</strong>
    <p>{gpc
      ? es ? "Detectamos Global Privacy Control y respetamos su exclusión. La analítica y las cookies publicitarias están desactivadas." : "We detected Global Privacy Control and honored your opt-out. Analytics and advertising cookies are off."
      : es ? "Usamos analítica y medición publicitaria limitada para entender visitas y conversiones. La medición está activa a menos que decida excluirse. La personalización de anuncios permanece desactivada." : "We use analytics and limited advertising measurement to understand visits and conversions. Measurement is on unless you opt out. Advertising personalization stays off."} <a href={es ? "/es/politica-de-privacidad/" : "/privacy-policy/"}>{es ? "Política de privacidad" : "Privacy policy"}</a></p>
    {!gpc ? <p className="gc-cookie-status" role="status">{consent === "denied" ? es ? "Estado: excluido" : "Status: opted out" : es ? "Estado: medición activa" : "Status: measurement on"}</p> : null}
    <div className="gc-cookie-actions">{gpc
      ? <button onClick={() => setPreferencesOpen(false)}>{es ? "Cerrar" : "Close"}</button>
      : <><button onClick={() => choose("accepted")}>{es ? "Mantener medición" : "Keep measurement"}</button><button onClick={() => choose("denied")}>{es ? "Excluirme" : "Opt out"}</button></>}
    </div>
  </aside>;
}
