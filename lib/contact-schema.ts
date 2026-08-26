import { isServiceType, type ServiceType } from "@/lib/service-types";
export type ContactInput = { name: string; email: string; phone: string; service: ServiceType; zip: string; message: string; consent: boolean; turnstileToken: string; website?: string };
export type ContactErrors = Partial<Record<keyof ContactInput, string>>;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^[+()\d\s.-]{7,24}$/;
const ZIP = /^\d{5}(?:-\d{4})?$/;
const text = (value: unknown, max: number) => typeof value === "string" ? value.trim().replace(/[\u0000-\u001f\u007f]/g, " ").slice(0, max) : "";
export function validateContact(value: unknown): { success: true; data: ContactInput } | { success: false; errors: ContactErrors } {
  const raw = value && typeof value === "object" ? value as Record<string, unknown> : {};
  const data = { name: text(raw.name, 80), email: text(raw.email, 160).toLowerCase(), phone: text(raw.phone, 24), service: isServiceType(raw.service) ? raw.service : "other", zip: text(raw.zip, 10), message: text(raw.message, 2000), consent: raw.consent === true, turnstileToken: text(raw.turnstileToken, 2048), website: text(raw.website, 120) } satisfies ContactInput;
  const errors: ContactErrors = {};
  if (data.name.length < 2) errors.name = "Enter your name.";
  if (!EMAIL.test(data.email)) errors.email = "Enter a valid email.";
  if (data.phone && !PHONE.test(data.phone)) errors.phone = "Enter a valid phone number.";
  if (!ZIP.test(data.zip)) errors.zip = "Enter a valid ZIP code.";
  if (data.message.length < 10) errors.message = "Please add a little more detail.";
  if (!data.consent) errors.consent = "Consent is required to respond to this request.";
  if (!data.turnstileToken && process.env.NODE_ENV === "production") errors.turnstileToken = "Verification is required.";
  return Object.keys(errors).length ? { success: false, errors } : { success: true, data };
}
