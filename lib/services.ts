export type Service = {
  slug: string;
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
    slug: "ac-repair",
    name: "Air Conditioning Repair",
    short: "Fast diagnostics and reliable AC repairs across LA & OC.",
    seoTitle: "Air Conditioning Repair in Los Angeles & Orange County",
    seoDescription:
      "AC not cooling? GC Heating & Cooling provides fast, reliable air conditioning repair across Los Angeles & Orange County. Call or book online.",
    h1: "Air Conditioning Repair",
    intro:
      "If your AC isn’t cooling, is making unusual noise, or your energy bills spiked, our technicians can diagnose the issue quickly and get you comfortable again.",
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
        a: "Yes — we service most major HVAC brands. If parts are needed, we’ll confirm availability and timelines.",
      },
      {
        q: "Should I repair or replace my AC?",
        a: "If repairs are frequent, the unit is older, or efficiency is poor, replacement can be more cost-effective. We’ll explain the best option for your home.",
      },
    ],
  },
  {
    slug: "heating-repair",
    name: "Heating Repair",
    short: "Safe, dependable heating repair to restore comfort fast.",
    seoTitle: "Heating Repair in Los Angeles & Orange County",
    seoDescription:
      "Heater not working? GC Heating & Cooling provides safe, reliable heating repair across Los Angeles & Orange County. Call or book online.",
    h1: "Heating Repair",
    intro:
      "When your heating system isn’t keeping up, you need a quick, safe fix. We troubleshoot the root cause and restore heat efficiently.",
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
        a: "Yes — we service common heating systems including furnaces and heat pumps.",
      },
    ],
  },
  {
    slug: "hvac-maintenance",
    name: "HVAC Maintenance",
    short:
      "Scheduled maintenance to improve efficiency and extend equipment life.",
    seoTitle: "HVAC Maintenance in Los Angeles & Orange County",
    seoDescription:
      "Prevent breakdowns and lower energy costs with HVAC maintenance in LA & OC. GC Heating & Cooling offers scheduled service plans.",
    h1: "HVAC Maintenance",
    intro:
      "Maintenance helps your system run efficiently, reduces surprise breakdowns, and can extend equipment life. Ideal before peak summer and winter seasons.",
    bullets: [
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
    slug: "ac-installation",
    name: "AC Installation & Replacement",
    short:
      "New AC installs and replacements with options for efficiency and financing.",
    seoTitle: "AC Installation in Los Angeles & Orange County",
    seoDescription:
      "Upgrade your comfort with AC installation in LA & OC. GC Heating & Cooling offers free estimates and financing options. Call or book now.",
    h1: "AC Installation & Replacement",
    intro:
      "If your system struggles to keep up or needs frequent repairs, a replacement can improve comfort and efficiency. We’ll help you choose the right fit.",
    bullets: [
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
    slug: "commercial-hvac",
    name: "Commercial HVAC",
    short: "Reliable commercial HVAC service, repairs, and maintenance.",
    seoTitle: "Commercial HVAC in Los Angeles & Orange County",
    seoDescription:
      "Commercial HVAC service in LA & OC. Repairs, maintenance, and installation for offices and small businesses. Call or book now.",
    h1: "Commercial HVAC Services",
    intro:
      "For businesses, HVAC downtime impacts comfort and productivity. We provide dependable service and clear communication so you can stay operational.",
    bullets: [
      "Commercial repairs and troubleshooting",
      "Preventative maintenance options",
      "System recommendations and upgrades",
      "Scheduling aligned with business needs",
    ],
    faqs: [
      {
        q: "Do you service small commercial properties?",
        a: "Yes — we support many offices and light commercial setups. Call to confirm your specific equipment.",
      },
    ],
  },
  {
    slug: "attic-insulation",
    name: "Attic Insulation",
    short: "Improve comfort and efficiency with attic insulation services.",
    seoTitle: "Attic Insulation in Los Angeles & Orange County",
    seoDescription:
      "Attic insulation can improve comfort and efficiency. Serving Los Angeles & Orange County. Call or book an onsite consultation.",
    h1: "Attic Insulation",
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
];

export function getServiceBySlug(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
