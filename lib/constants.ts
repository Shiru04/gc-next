import { SocketAddress } from "net";

export const BUSINESS = {
  name: "GC Heating & Cooling",
  phoneDisplay: "(714) 715-9569",
  phone: "+17147159569",
  phoneE164: "+17147159569",
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
  hoursShort: "Mon - Fri | 8:30am - 4:30pm",

  // ✅ Optional, but layout.tsx references it, so define it to avoid undefined noise
  socials: [] as string[],
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

export const SERVICE_LINKS = [
  { href: "/services/ac-repair", label: "Air Conditioning Repair" },
  { href: "/services/heating-repair", label: "Heating Repair" },
  { href: "/services/hvac-maintenance", label: "Maintenance" },
  { href: "/services/ac-installation", label: "AC Installation" },
  { href: "/services/commercial-hvac", label: "Commercial HVAC" },
  { href: "/services/attic-insulation", label: "Attic Insulation" },
] as const;
