export type ServiceAudience = "residential" | "commercial";

export type Service = {
  slug: string;
  audience: ServiceAudience;
  name: string;
  short: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  intro: string;
  bullets: string[];
  faqs: Array<{ q: string; a: string }>;
};

export const SERVICES: Service[] = [
  {
    slug: "residential-ac-repair",
    audience: "residential",
    name: "Residential Air Conditioning Repair",
    short: "Fast diagnostics and reliable AC repairs for homes across LA & OC.",
    seoTitle: "Residential AC Repair in Los Angeles & Orange County",
    seoDescription:
      "AC not cooling? GC Heating & Cooling provides fast, reliable residential air conditioning repair across Los Angeles & Orange County. Call or book online.",
    h1: "Residential Air Conditioning Repair",
    intro:
      "If your home AC isn’t cooling, is making unusual noise, or your energy bills spiked, our technicians can diagnose the issue quickly and get you comfortable again.",
    bullets: [
      "No cool air, weak airflow, or uneven temperatures",
      "Refrigerant issues, electrical faults, capacitor & contactor replacement",
      "Thermostat troubleshooting and system safety checks",
      "Clear recommendations and repair options",
    ],
    faqs: [
      {
        q: "How quickly can you come out for AC repair?",
        a: "We prioritize no-cooling calls and schedule the earliest available appointment. Call now or use Book Now to reserve a time.",
      },
      {
        q: "Do you repair all AC brands?",
        a: "Yes — we service most major residential HVAC brands. If parts are needed, we’ll confirm availability and timelines.",
      },
      {
        q: "Should I repair or replace my AC?",
        a: "If repairs are frequent, the unit is older, or efficiency is poor, replacement can be more cost-effective. We’ll explain the best option for your home.",
      },
    ],
  },
  {
    slug: "residential-heating-repair",
    audience: "residential",
    name: "Residential Heating Repair",
    short: "Safe, dependable heating repair to restore home comfort fast.",
    seoTitle: "Residential Heating Repair in Los Angeles & Orange County",
    seoDescription:
      "Heater not working? GC Heating & Cooling provides safe, reliable residential heating repair across Los Angeles & Orange County. Call or book online.",
    h1: "Residential Heating Repair",
    intro:
      "When your home heating system isn’t keeping up, you need a quick, safe fix. We troubleshoot the root cause and restore heat efficiently.",
    bullets: [
      "No heat, short cycling, strange odors, or loud operation",
      "Ignition, flame sensor, and safety switch diagnostics",
      "Thermostat and airflow checks",
      "Upfront recommendations with options",
    ],
    faqs: [
      {
        q: "Is a burning smell normal when turning on heat?",
        a: "A brief dust-burn smell can be normal at first. If it persists or smells like gas, turn off the system and call immediately.",
      },
      {
        q: "Do you service furnaces and heat pumps?",
        a: "Yes — we service common residential heating systems including furnaces and heat pumps.",
      },
    ],
  },
  {
    slug: "residential-hvac-maintenance",
    audience: "residential",
    name: "Residential HVAC Maintenance",
    short:
      "Scheduled home maintenance to improve efficiency and extend equipment life.",
    seoTitle: "Residential HVAC Maintenance in Los Angeles & Orange County",
    seoDescription:
      "Prevent breakdowns and lower energy costs with residential HVAC maintenance in LA & OC. GC Heating & Cooling offers scheduled service plans.",
    h1: "Residential HVAC Maintenance",
    intro:
      "Maintenance helps your home system run efficiently, reduces surprise breakdowns, and can extend equipment life. Ideal before peak summer and winter seasons.",
    bullets: [
      "Tune-ups starting at $99",
      "Maintenance bundles from $99 — protect your system year-round",
      "Filter and airflow inspection",
      "Electrical & safety checks",
      "Coil and drain line inspection",
      "Performance testing and recommendations",
    ],
    faqs: [
      {
        q: "How often should HVAC be serviced?",
        a: "Typically 1–2 times per year (spring for cooling, fall for heating) depending on usage and home conditions.",
      },
      {
        q: "Does maintenance help lower energy bills?",
        a: "Yes — a tuned system can run more efficiently and reduce strain on components.",
      },
    ],
  },
  {
    slug: "residential-ac-installation",
    audience: "residential",
    name: "Residential AC Installation & Replacement",
    short:
      "New AC installs and replacements for homes — options for efficiency and financing.",
    seoTitle: "Residential AC Installation in Los Angeles & Orange County",
    seoDescription:
      "Upgrade your home comfort with residential AC installation in LA & OC. GC Heating & Cooling offers free estimates and financing options. Call or book now.",
    h1: "Residential AC Installation & Replacement",
    intro:
      "If your home system struggles to keep up or needs frequent repairs, a replacement can improve comfort and efficiency. We’ll help you choose the right fit.",
    bullets: [
      "Equipment starting at $6,800 (installation quoted separately)",
      "Right-sized system recommendations (comfort + efficiency)",
      "Removal and professional installation",
      "Ductwork and airflow considerations",
      "Financing options available",
    ],
    faqs: [
      {
        q: "Do you offer free estimates for installs?",
        a: "Yes — book an onsite consultation and we’ll review options based on your space and comfort goals.",
      },
      {
        q: "Can I finance a new system?",
        a: "Yes — we offer financing options. We’ll guide you through available terms during consultation.",
      },
    ],
  },
  {
    slug: "residential-attic-insulation",
    audience: "residential",
    name: "Residential Attic Insulation",
    short: "Improve home comfort and efficiency with attic insulation.",
    seoTitle: "Residential Attic Insulation in Los Angeles & Orange County",
    seoDescription:
      "Residential attic insulation can improve comfort and efficiency. Serving Los Angeles & Orange County. Call or book an onsite consultation.",
    h1: "Residential Attic Insulation",
    intro:
      "Attic insulation can help keep indoor temperatures stable and reduce HVAC workload — especially during hot seasons.",
    bullets: [
      "Insulation assessment and recommendations",
      "Improved comfort in hot/cold seasons",
      "Reduced HVAC strain and potential energy savings",
    ],
    faqs: [
      {
        q: "Is attic insulation worth it in Southern California?",
        a: "Often, yes — it can reduce heat gain and help your HVAC maintain comfort more efficiently.",
      },
    ],
  },
  {
    slug: "commercial-repair",
    audience: "commercial",
    name: "Commercial HVAC Repair",
    short:
      "Fast commercial HVAC repairs to keep your business comfortable and operational.",
    seoTitle: "Commercial HVAC Repair in Los Angeles & Orange County",
    seoDescription:
      "Commercial HVAC repair for offices, retail, and light commercial properties across LA & OC. GC Heating & Cooling responds fast. Call or book now.",
    h1: "Commercial HVAC Repair",
    intro:
      "When your business HVAC fails, comfort and productivity take a hit. We respond quickly, diagnose the root cause, and get your system back online with clear recommendations.",
    bullets: [
      "Rooftop units, split systems, and package units",
      "Compressor, capacitor, contactor, and electrical diagnostics",
      "Refrigerant and airflow troubleshooting",
      "Scheduling aligned with business hours to minimize downtime",
      "Clear estimates before work begins",
    ],
    faqs: [
      {
        q: "Do you service offices, retail, and light commercial?",
        a: "Yes — we support offices, retail, restaurants (front-of-house comfort), and other light commercial setups. Call to confirm your equipment.",
      },
      {
        q: "Can you come outside of business hours?",
        a: "We try to align with your operating hours so service doesn’t interrupt customers or staff. Call to discuss scheduling.",
      },
    ],
  },
  {
    slug: "commercial-maintenance",
    audience: "commercial",
    name: "Commercial HVAC Maintenance",
    short:
      "Preventative maintenance plans for commercial properties to reduce breakdowns and energy costs.",
    seoTitle: "Commercial HVAC Maintenance in Los Angeles & Orange County",
    seoDescription:
      "Keep your business comfortable year-round with commercial HVAC maintenance plans across LA & OC. GC Heating & Cooling offers scheduled service.",
    h1: "Commercial HVAC Maintenance",
    intro:
      "Scheduled maintenance keeps your business HVAC efficient, protects equipment investment, and reduces surprise downtime that hurts your bottom line.",
    bullets: [
      "Multi-visit maintenance plans (spring + fall)",
      "Filter, coil, and drain line inspection",
      "Electrical safety and performance checks",
      "Documented reports for property managers",
      "Priority response on plan members",
    ],
    faqs: [
      {
        q: "Do you offer maintenance agreements?",
        a: "Yes — we can structure a plan around your equipment, hours, and property needs. Call to discuss.",
      },
      {
        q: "Do you work with property managers?",
        a: "Yes — we provide documented service reports and can coordinate access for multi-tenant properties.",
      },
    ],
  },
  {
    slug: "commercial-installation",
    audience: "commercial",
    name: "Commercial HVAC Installation & Replacement",
    short:
      "New installs and replacements for commercial properties — efficient systems sized for your space.",
    seoTitle: "Commercial HVAC Installation in Los Angeles & Orange County",
    seoDescription:
      "Commercial HVAC installation and replacement across LA & OC. Right-sized systems for offices and light commercial. Free onsite consultation.",
    h1: "Commercial HVAC Installation & Replacement",
    intro:
      "If your commercial system is aging, oversized, or no longer efficient, a replacement can lower operating costs and improve comfort. We design for your space and operating hours.",
    bullets: [
      "Onsite load and equipment assessment",
      "Right-sized rooftop, split, or package systems",
      "Removal and professional installation",
      "Ductwork and zoning considerations",
      "Financing options for qualifying projects",
    ],
    faqs: [
      {
        q: "Do you provide free commercial estimates?",
        a: "Yes — we’ll review your space, current equipment, and goals before quoting options.",
      },
      {
        q: "Can installs be scheduled around business hours?",
        a: "Often yes — we coordinate timing to minimize disruption to staff and customers.",
      },
    ],
  },
];

export const RESIDENTIAL_SERVICES = SERVICES.filter(
  (s) => s.audience === "residential",
);
export const COMMERCIAL_SERVICES = SERVICES.filter(
  (s) => s.audience === "commercial",
);

export function getServiceBySlug(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

/**
 * Maps old flat /services/<slug> URLs to their new audience-scoped path.
 * Used by the legacy /services/[slug] route to render SEO-safe redirects.
 */
export const LEGACY_SERVICE_REDIRECTS: Record<string, string> = {
  "ac-repair": "/residential/residential-ac-repair",
  "heating-repair": "/residential/residential-heating-repair",
  "hvac-maintenance": "/residential/residential-hvac-maintenance",
  "ac-installation": "/residential/residential-ac-installation",
  "attic-insulation": "/residential/residential-attic-insulation",
  "commercial-hvac": "/commercial",
};
