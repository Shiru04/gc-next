export type VerificationStatus = "pending" | "verified";

export type VerifiedValue<T> = Readonly<{
  value: T;
  status: VerificationStatus;
  source?: string;
}>;

const pending = <T>(value: T): VerifiedValue<T> => ({ value, status: "pending" });
const verified = <T>(value: T, source: string): VerifiedValue<T> => ({
  value,
  status: "verified",
  source,
});

/**
 * Editorial source of truth. A pending value may be used for internal routing,
 * but must never be rendered as a customer-facing promise or emitted in schema.
 */
export const COMMERCIAL = {
  name: verified("GC Heating & Cooling", "existing brand identity"),
  phone: verified("+17147159569", "existing site phone"),
  phoneDisplay: verified("(714) 715-9569", "existing site phone"),
  dispatchUrl: verified(
    "https://customer.dispatch.me/booking?account_id=37&org_id=257895",
    "current public Dispatch booking URL",
  ),
  address: verified({
    street: "17777 Center Court Dr, Suite 600",
    city: "Cerritos",
    state: "CA",
    zip: "90703",
  }, "confirmed by client on 2026-08-20"),
  hours: verified("Customer service available 24/7; online booking available 7:00 AM–7:00 PM", "confirmed by client on 2026-08-20"),
  serviceAreas: verified(["Orange County", "Los Angeles County"], "confirmed by client on 2026-08-20"),
  diagnosticFee: verified("$89 and up for repair diagnostics", "confirmed by client on 2026-08-20"),
  afterHoursFee: verified<string | null>(null, "no after-hours fee; 24/7 call center confirmed by client on 2026-08-20"),
  tuneUpOffer: verified("$99", "confirmed by client on 2026-08-20"),
  freeEstimate: verified("Free estimates for replacements and installations", "confirmed by client on 2026-08-20"),
  financing: verified("Contact GC Heating & Cooling for requirements, documentation, and next steps", "confirmed by client on 2026-08-20"),
  brands: verified(["American Standard", "Mitsubishi"], "confirmed by client on 2026-08-20"),
  warranties: verified(["Minimum one-year warranty; coverage depends on the project and equipment"], "confirmed by client on 2026-08-20"),
  sameAs: verified(["https://www.facebook.com/GCHeatingandCooling", "https://www.instagram.com/gchcooling/"], "confirmed by client on 2026-08-20"),
} as const;

export const PRODUCTION_BLOCKING_FIELDS = [
  "address",
  "hours",
  "serviceAreas",
  "diagnosticFee",
  "afterHoursFee",
  "tuneUpOffer",
  "freeEstimate",
  "financing",
  "brands",
  "warranties",
  "sameAs",
] as const satisfies readonly (keyof typeof COMMERCIAL)[];

export function pendingProductionFields(): string[] {
  return PRODUCTION_BLOCKING_FIELDS.filter(
    (field) => COMMERCIAL[field].status !== "verified",
  );
}

export function assertProductionReady(): void {
  const missing = pendingProductionFields();
  if (missing.length > 0) {
    throw new Error(`Commercial approval required: ${missing.join(", ")}`);
  }
}
