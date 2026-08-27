export const HOMEOWNER_STATUSES = ["homeowner", "property_manager", "renter"] as const;
export const PROJECT_TYPES = ["replace_existing_system", "upgrade_existing_system", "new_system_installation", "not_sure"] as const;
export const COMFORT_NEEDS = ["uneven_temperatures", "high_energy_bills", "frequent_breakdowns", "poor_air_quality", "add_cooling_or_heating", "other", "not_sure"] as const;
export const SYSTEM_TYPES = ["central_ac", "heat_pump", "mini_split", "not_sure"] as const;
export const TIMELINES = ["asap", "within_30_days", "within_3_months", "researching"] as const;
export const FINANCING_INTERESTS = ["yes", "no", "maybe"] as const;

export type InstallationInput = {
  firstName: string; lastName: string; phone: string; email: string; zipCode: string;
  homeownerStatus: typeof HOMEOWNER_STATUSES[number]; projectType: typeof PROJECT_TYPES[number];
  comfortNeeds: typeof COMFORT_NEEDS[number][]; systemType: typeof SYSTEM_TYPES[number]; timeline: typeof TIMELINES[number];
  financingInterest: typeof FINANCING_INTERESTS[number]; comments: string; consent: boolean;
  turnstileToken: string; website: string; attribution: Record<string, unknown>; ctaSource: string;
};
export type InstallationErrors = Partial<Record<keyof InstallationInput, string>>;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^\d{10}$/;
const ZIP = /^\d{5}$/;
const text = (v: unknown, max: number) => typeof v === "string" ? v.trim().replace(/[\u0000-\u001f\u007f]/g, " ").slice(0, max) : "";
const oneOf = <T extends readonly string[]>(value: unknown, values: T, fallback: T[number]) => values.includes(value as T[number]) ? value as T[number] : fallback;

function cleanAttribution(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const allowed = ["gclid", "gbraid", "wbraid", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "landingPage", "landingUrl", "referrer", "trafficSource", "campaign", "device", "submittedAt", "clickIds"];
  return Object.fromEntries(Object.entries(value as Record<string, unknown>).filter(([key]) => allowed.includes(key)).map(([key, item]) => [key, typeof item === "string" ? text(item, 500) : item]));
}

export function validateInstallation(value: unknown): { success: true; data: InstallationInput } | { success: false; errors: InstallationErrors } {
  const raw = value && typeof value === "object" ? value as Record<string, unknown> : {};
  const comfortNeeds = Array.isArray(raw.comfortNeeds) ? raw.comfortNeeds.filter((item): item is InstallationInput["comfortNeeds"][number] => COMFORT_NEEDS.includes(item as InstallationInput["comfortNeeds"][number])).slice(0, COMFORT_NEEDS.length) : [];
  const data: InstallationInput = {
    firstName: text(raw.firstName, 60), lastName: text(raw.lastName, 60), phone: text(raw.phone, 24),
    email: text(raw.email, 160).toLowerCase(), zipCode: text(raw.zipCode, 5),
    homeownerStatus: oneOf(raw.homeownerStatus, HOMEOWNER_STATUSES, "homeowner"),
    projectType: oneOf(raw.projectType, PROJECT_TYPES, "not_sure"), comfortNeeds,
    systemType: oneOf(raw.systemType, SYSTEM_TYPES, "not_sure"), timeline: oneOf(raw.timeline, TIMELINES, "researching"),
    financingInterest: oneOf(raw.financingInterest, FINANCING_INTERESTS, "maybe"),
    comments: text(raw.comments, 2000), consent: raw.consent === true, turnstileToken: text(raw.turnstileToken, 2048),
    website: text(raw.website, 120), attribution: cleanAttribution(raw.attribution), ctaSource: text(raw.ctaSource, 120) || "installation_page",
  };
  const errors: InstallationErrors = {};
  if (data.firstName.length < 2) errors.firstName = "Enter your first name.";
  if (data.lastName.length < 2) errors.lastName = "Enter your last name.";
  if (!PHONE.test(data.phone)) errors.phone = "Enter your 10-digit phone number (digits only).";
  if (!EMAIL.test(data.email)) errors.email = "Enter a valid email address.";
  if (!ZIP.test(data.zipCode)) errors.zipCode = "Enter a five-digit ZIP code.";
  if (!data.comfortNeeds.length) errors.comfortNeeds = "Choose at least one comfort priority.";
  if (!data.consent) errors.consent = "Consent is required so we can respond.";
  if (!data.turnstileToken && process.env.NODE_ENV === "production") errors.turnstileToken = "Verification is required.";
  return Object.keys(errors).length ? { success: false, errors } : { success: true, data };
}
