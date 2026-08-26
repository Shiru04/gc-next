export const BUSINESS = {
  name: "GC Heating & Cooling",
  phoneDisplay: "(714) 715-9569",
  phone: "+17147159569",
  phoneE164: "+17147159569",
  officePhoneDisplay: "(562) 867-4123",
  officePhoneE164: "+15628674123",
  bookingUrl:
    "https://customer.dispatch.me/booking?account_id=37&org_id=257895",

  // Keep these (often used in UI)
  addressLine1: "17777 Center Court Dr, Suite 600",
  cityStateZip: "Cerritos, CA 90703",

  // ✅ This is what layout.tsx expects for JSON-LD
  address: {
    street: "17777 Center Court Dr, Suite 600",
    city: "Cerritos",
    state: "CA",
    zip: "90703",
  },

  // ✅ Keep a formatted string for any UI spots that want one line
  addressText: "17777 Center Court Dr, Suite 600, Cerritos, CA 90703",

  licenseLabel: "License # 794228",
  trustLine: "Insured and Bonded",
  serviceRegionShort: "Serving Los Angeles & Orange County",
  hoursShort: "Customer service 24/7 | Online booking 7am - 7pm",

  // ✅ Optional, but layout.tsx references it, so define it to avoid undefined noise
  socials: ["https://www.facebook.com/GCHeatingandCooling", "https://www.instagram.com/gchcooling/"],
};

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
  { href: "/financing", label: "Financing" },
  { href: "/promotions", label: "Promotions" },
] as const;

export const RESIDENTIAL_SERVICE_LINKS = [
  { href: "/residential/residential-ac-repair", label: "AC Repair" },
  { href: "/residential/residential-heating-repair", label: "Heating Repair" },
  { href: "/residential/residential-hvac-maintenance", label: "Maintenance" },
  { href: "/residential/residential-ac-installation", label: "AC Installation" },
  { href: "/residential/residential-attic-insulation", label: "Attic Insulation" },
] as const;

export const COMMERCIAL_SERVICE_LINKS = [
  { href: "/commercial/commercial-repair", label: "Repair" },
  { href: "/commercial/commercial-maintenance", label: "Maintenance" },
  { href: "/commercial/commercial-installation", label: "Installation" },
] as const;
