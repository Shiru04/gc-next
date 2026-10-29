import { attributionValue } from "./attribution-values";
export const HOMEOWNER_STATUSES = ["homeowner", "property_manager", "renter", "not_sure"] as const;
export const PROJECT_TYPES = ["replace_existing_system", "upgrade_existing_system", "new_system_installation", "not_sure"] as const;
export const COMFORT_NEEDS = ["uneven_temperatures", "high_energy_bills", "frequent_breakdowns", "poor_air_quality", "add_cooling_or_heating", "other", "not_sure"] as const;
export const SYSTEM_TYPES = ["central_ac", "heat_pump", "mini_split", "not_sure"] as const;
export const TIMELINES = ["asap", "within_30_days", "within_3_months", "researching"] as const;
export const FINANCING_INTERESTS = ["yes", "no", "maybe"] as const;
export const SERVICE_REQUEST_TYPES = ["ac_repair", "maintenance", "commercial_repair", "commercial_maintenance", "other"] as const;

export type InstallationInput = {
  formMode: string; serviceIntent: string; company: string; propertyType: string; equipmentType: string; serviceNeeded: string; urgency: string;
  firstName: string; lastName: string; phone: string; email: string; zipCode: string;
  homeownerStatus: typeof HOMEOWNER_STATUSES[number]; projectType: typeof PROJECT_TYPES[number];
  comfortNeeds: typeof COMFORT_NEEDS[number][]; systemType: typeof SYSTEM_TYPES[number]; timeline: typeof TIMELINES[number];
  financingInterest: typeof FINANCING_INTERESTS[number]; comments: string; consent: boolean;
  turnstileToken: string; website: string; attribution: Record<string, unknown>; ctaSource: string; serviceRequestType?: typeof SERVICE_REQUEST_TYPES[number];
};
export type InstallationErrors = Partial<Record<keyof InstallationInput, string>>;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^\d{10}$/;
const ZIP = /^\d{5}$/;
const text = (v: unknown, max: number) => typeof v === "string" ? v.trim().replace(/[\u0000-\u001f\u007f]/g, " ").slice(0, max) : "";
const oneOf = <T extends readonly string[]>(value: unknown, values: T, fallback: T[number]) => values.includes(value as T[number]) ? value as T[number] : fallback;

function cleanAttribution(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const allowed = ["gclid", "gbraid", "wbraid", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gad_campaignid", "landing_page", "referrer", "timestamp"];
  const cleanTouch = (touch: unknown) => !touch || typeof touch !== "object" || Array.isArray(touch) ? {} : Object.fromEntries(Object.entries(touch as Record<string, unknown>).filter(([key]) => allowed.includes(key)).map(([key, item]) => [key, (() => {
    if (key === "landing_page" || key === "referrer") {
      try { const url = new URL(String(item)); return ["https:", "http:"].includes(url.protocol) ? url.origin + (key === "landing_page" ? url.pathname : "") : ""; } catch { return ""; }
    }
    if (key === "timestamp") return typeof item === "string" && /^\d{4}-\d{2}-\d{2}T/.test(item) && Number.isFinite(Date.parse(item)) ? new Date(item).toISOString() : "";
    return attributionValue(key, item) || "";
  })()]).filter(([, item]) => item));
  const source = value as Record<string, unknown>;
  if (source.firstTouch || source.latestTouch) return { firstTouch: cleanTouch(source.firstTouch), latestTouch: cleanTouch(source.latestTouch) };
  return cleanTouch(source);
}

export function validateInstallation(value: unknown): { success: true; data: InstallationInput } | { success: false; errors: InstallationErrors } {
  const raw = value && typeof value === "object" ? value as Record<string, unknown> : {};
  const comfortNeeds = Array.isArray(raw.comfortNeeds) ? raw.comfortNeeds.filter((item): item is InstallationInput["comfortNeeds"][number] => COMFORT_NEEDS.includes(item as InstallationInput["comfortNeeds"][number])).slice(0, COMFORT_NEEDS.length) : [];
  const data: InstallationInput = {
    formMode: text(raw.formMode, 30), serviceIntent: text(raw.serviceIntent, 30), company: text(raw.company, 120), propertyType: text(raw.propertyType, 120), equipmentType: text(raw.equipmentType, 120), serviceNeeded: text(raw.serviceNeeded, 200), urgency: text(raw.urgency, 120),
    firstName: text(raw.firstName, 60), lastName: text(raw.lastName, 60), phone: text(raw.phone, 24),
    email: text(raw.email, 160).toLowerCase(), zipCode: text(raw.zipCode, 5),
    homeownerStatus: oneOf(raw.homeownerStatus, HOMEOWNER_STATUSES, "not_sure"),
    projectType: oneOf(raw.projectType, PROJECT_TYPES, "not_sure"), comfortNeeds,
    systemType: oneOf(raw.systemType, SYSTEM_TYPES, "not_sure"), timeline: oneOf(raw.timeline, TIMELINES, "researching"),
    financingInterest: oneOf(raw.financingInterest, FINANCING_INTERESTS, "maybe"),
    comments: text(raw.comments, 2000), consent: raw.consent === true, turnstileToken: text(raw.turnstileToken, 2048),
    website: text(raw.website, 120), attribution: cleanAttribution(raw.attribution), ctaSource: text(raw.ctaSource, 120) || "installation_page", serviceRequestType: SERVICE_REQUEST_TYPES.includes(raw.serviceRequestType as typeof SERVICE_REQUEST_TYPES[number]) ? raw.serviceRequestType as typeof SERVICE_REQUEST_TYPES[number] : undefined,
  };
  const errors: InstallationErrors = {};
  if (!data.firstName.length) errors.firstName = "Enter your first name.";
  if (data.formMode === "installation" && !data.lastName.length) errors.lastName = "Enter your last name.";
  if (!PHONE.test(data.phone)) errors.phone = "Enter your 10-digit phone number (digits only).";
  if (data.email && !EMAIL.test(data.email)) errors.email = "Enter a valid email address.";
  if (!ZIP.test(data.zipCode)) errors.zipCode = "Enter a five-digit ZIP code.";
  if (data.formMode === "commercial" && !data.company) errors.company = "Enter your company name.";
  if (!data.consent) errors.consent = "Consent is required so we can respond.";
  if (!data.turnstileToken && process.env.NODE_ENV === "production") errors.turnstileToken = "Verification is required.";
  return Object.keys(errors).length ? { success: false, errors } : { success: true, data };
}
