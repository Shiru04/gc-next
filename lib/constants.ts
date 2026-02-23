import { SocketAddress } from "net";

export const BUSINESS = {
  name: "GC Heating & Cooling",
  phoneDisplay: "(800) 706-4822",
  phoneE164: "+18007064822",
  bookingUrl:
    "https://customer.dispatch.me/booking?account_id=37&org_id=257895",
  addressLine1: "6940 Knott Ave. Suite H",
  cityStateZip: "Buena Park, CA 90621",
  address: "6940 Knott Ave. Suite H, Buena Park, CA 90621 ",
  licenseLabel: "License # 794228",
  trustLine: "Insured and Bonded",
  serviceRegionShort: "Serving Los Angeles & Orange County",
  hoursShort: "Mon - Fri | 8:30am - 4:30pm",
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
