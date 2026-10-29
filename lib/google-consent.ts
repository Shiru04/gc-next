"use client";

export const GOOGLE_CONSENT_KEY = "cookieConsent";

export type GoogleConsentChoice = "accepted" | "denied";

let currentChoice: GoogleConsentChoice | null = null;

export function setGoogleConsentChoice(choice: GoogleConsentChoice) { currentChoice = choice; }

export function readGoogleConsent(): GoogleConsentChoice | null {
  if (typeof window === "undefined") return null;
  if (currentChoice) return currentChoice;
  try {
    const value = window.localStorage.getItem(GOOGLE_CONSENT_KEY);
    return value === "accepted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function hasGlobalPrivacyControl(): boolean {
  return typeof navigator !== "undefined"
    && (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
}

export function effectiveGoogleConsent(): GoogleConsentChoice {
  if (hasGlobalPrivacyControl()) return "denied";
  return readGoogleConsent() ?? "accepted";
}

export function hasAnalyticsConsent(): boolean {
  return effectiveGoogleConsent() === "accepted";
}

