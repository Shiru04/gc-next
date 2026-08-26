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
  overview: string[];
  process: Array<{ step: string; desc: string }>;
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
    overview: [
      "Southern California cooling season puts real strain on residential AC systems. When a system fails during a heat wave, the cause is usually one of a handful of issues: a failed capacitor or contactor, low refrigerant from a slow leak, a clogged condensate line, or an airflow problem hiding in the ductwork. Our technicians test the electrical components, measure refrigerant pressures, and check airflow before recommending anything — so you’re paying to fix the actual problem, not to swap parts until something works.",
      "We repair most major residential brands, including systems we didn’t install. After every repair we run the system through a full cycle and verify supply and return temperatures, so you know it’s cooling the way it should before we leave. If a repair doesn’t make financial sense because of the system’s age or condition, we’ll tell you directly and walk you through replacement options — with no pressure either way.",
    ],
    process: [
      {
        step: "Tell us the symptoms",
        desc: "Call or book online and describe what you’re noticing — no cooling, weak airflow, noises, or rising bills.",
      },
      {
        step: "Onsite diagnosis",
        desc: "A technician tests electrical components, refrigerant pressures, and airflow to find the root cause.",
      },
      {
        step: "Clear options before work begins",
        desc: "You get a straightforward explanation of the issue and repair options with pricing — before we touch anything.",
      },
      {
        step: "Repair and verify",
        desc: "We complete the repair, run the system through a full cycle, and confirm it’s cooling properly.",
      },
    ],
    bullets: [
      "No cool air, weak airflow, or uneven temperatures",
      "Refrigerant issues, electrical faults, capacitor & contactor replacement",
      "Thermostat troubleshooting and system safety checks",
      "Clear recommendations and repair options",
    ],
    faqs: [
      {
        q: "How quickly can you come out for AC repair?",
        a: "We prioritize no-cooling calls and schedule the earliest available appointment. Call now or schedule HVAC repair online.",
      },
      {
        q: "Do you repair all AC brands?",
        a: "Yes — we service most major residential HVAC brands. If parts are needed, we’ll confirm availability and timelines.",
      },
      {
        q: "Why is my AC running but not cooling?",
        a: "Common causes include low refrigerant from a leak, a failed capacitor, a frozen evaporator coil, or restricted airflow from a dirty filter. A proper diagnosis identifies which one — guessing usually costs more in the long run.",
      },
      {
        q: "How much does AC repair cost?",
        a: "It depends on the failed component. We diagnose first and give you clear pricing and options before any work begins, so there are no surprises on the invoice.",
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
    overview: [
      "In Los Angeles and Orange County, furnaces sit unused for most of the year — and then get asked to perform on the first cold night. That’s exactly when ignition failures, dirty flame sensors, and worn blower components show up. Because gas furnaces involve combustion, we treat every heating repair as a safety visit first: we check the heat exchanger, gas connections, and safety switches before focusing on comfort.",
      "We service common residential heating systems, including gas furnaces and heat pumps. Most repairs come down to ignition components, flame sensors, control boards, or airflow restrictions — and most are completed in a single visit once the cause is confirmed. If your system is older and repairs are becoming a pattern, we’ll give you an honest read on whether replacement makes better sense, with options that fit your budget.",
    ],
    process: [
      {
        step: "Describe the problem",
        desc: "No heat, short cycling, odd smells, or loud operation — tell us what changed and when it started.",
      },
      {
        step: "Safety-first diagnosis",
        desc: "We inspect ignition, flame sensor, safety switches, and the heat exchanger before anything else.",
      },
      {
        step: "Upfront options",
        desc: "You get the cause, the fix, and clear pricing before work begins — with honest advice if replacement makes more sense.",
      },
      {
        step: "Repair and test",
        desc: "We complete the repair and run full heating cycles to confirm safe, steady operation.",
      },
    ],
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
      {
        q: "Why does my furnace turn on and off repeatedly?",
        a: "Short cycling is often caused by a dirty flame sensor, restricted airflow, or an overheating limit switch. It wastes energy and wears components, so it’s worth diagnosing before it causes a bigger failure.",
      },
      {
        q: "How long does a heating repair take?",
        a: "Most repairs are completed in a single visit once the cause is confirmed. If a special-order part is needed, we’ll confirm availability and timelines upfront.",
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
    overview: [
      "Most of the emergency repair calls we get in July and August trace back to problems that a spring tune-up would have caught: weak capacitors, dirty condenser coils, clogged drain lines, low refrigerant. A maintenance visit is a systematic inspection — we test electrical components under load, clean what’s restricting performance, and measure how the system is actually running versus how it should run.",
      "For Southern California homes, the ideal rhythm is a cooling tune-up in spring and a heating check in fall. Tune-ups start at $99, and our maintenance bundles cover both visits so your system is ready before each season peaks. After every visit you get plain-language findings and recommendations — what’s fine, what’s wearing, and what’s worth addressing before it becomes a breakdown.",
    ],
    process: [
      {
        step: "Pick a time",
        desc: "Book online or call — spring for cooling, fall for heating, or a bundle that covers both.",
      },
      {
        step: "Full-system inspection",
        desc: "Filters, airflow, electrical components, coils, drain lines, refrigerant charge, and safety checks.",
      },
      {
        step: "Performance testing",
        desc: "We measure how the system is running against how it should run, under real operating conditions.",
      },
      {
        step: "Findings and recommendations",
        desc: "A plain-language report: what’s healthy, what’s wearing, and what’s worth handling early.",
      },
    ],
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
      {
        q: "What’s included in the $99 tune-up?",
        a: "A full inspection and tune-up of your cooling or heating system: filters, airflow, electrical checks, coil and drain inspection, and performance testing — with findings explained in plain language.",
      },
      {
        q: "Is maintenance really worth it if my system seems fine?",
        a: "Weak capacitors, dirty coils, and clogged drains don’t show symptoms until they fail — usually during peak season. Catching them early is significantly cheaper than an emergency repair in a heat wave.",
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
    overview: [
      "The most important part of an AC installation happens before any equipment arrives: sizing. An oversized system short-cycles and leaves rooms clammy; an undersized one runs constantly and never quite catches up. We assess your home’s square footage, insulation, ductwork, and sun exposure to recommend a system that’s right-sized for how your home actually holds heat — not just a like-for-like swap of whatever was there before.",
      "Modern high-efficiency systems can meaningfully cut cooling costs compared to equipment from ten or fifteen years ago, and we’ll walk you through the realistic efficiency and comfort trade-offs at each price point. Equipment starts at $6,800 with installation quoted separately, estimates are free, and financing options are available — so you can decide based on clear numbers instead of pressure.",
    ],
    process: [
      {
        step: "Free onsite consultation",
        desc: "We assess your home, existing equipment, ductwork, and comfort goals — and answer your questions.",
      },
      {
        step: "Options and quote",
        desc: "Right-sized system recommendations at clear price points, with efficiency trade-offs explained.",
      },
      {
        step: "Installation day",
        desc: "Removal of the old equipment and clean, professional installation of the new system.",
      },
      {
        step: "Walkthrough",
        desc: "We test the system, walk you through operation and thermostat settings, and review warranty coverage.",
      },
    ],
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
      {
        q: "How long does an AC installation take?",
        a: "A straightforward replacement is typically completed in about a day. Jobs involving ductwork changes or added components can take longer — we’ll give you a clear timeline with your quote.",
      },
      {
        q: "What size AC does my home need?",
        a: "It depends on square footage, insulation, ductwork, and sun exposure — not just what was installed before. We size systems based on your home’s actual heat load so you get comfort without wasted energy.",
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
    overview: [
      "On a hot Southern California afternoon, an under-insulated attic can radiate heat down into living spaces for hours after sunset — which is why some homes stay warm all evening no matter how hard the AC runs. Many homes in the region, especially those built decades ago, still have their original insulation, compressed and degraded well below today’s recommended levels.",
      "Because we work on both the insulation and the HVAC system, we look at the whole picture: how much heat your attic is letting through, how hard your system works to compensate, and where the best return on investment is. Sometimes the right answer is insulation before a bigger AC — a properly insulated attic can let a correctly sized system do the job the old one struggled with.",
    ],
    process: [
      {
        step: "Attic assessment",
        desc: "We inspect your current insulation depth, coverage, and condition, and identify air leaks.",
      },
      {
        step: "Recommendation",
        desc: "Clear options for target insulation levels, with expected comfort and efficiency impact explained.",
      },
      {
        step: "Installation",
        desc: "Clean, professional installation to the recommended level with attention to vents and clearances.",
      },
      {
        step: "Review",
        desc: "We confirm coverage and walk you through what changed and what to expect.",
      },
    ],
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
      {
        q: "How do I know if my attic insulation is enough?",
        a: "If your insulation is decades old, visibly compressed, or your upstairs stays hot into the evening, it’s worth an assessment. We inspect depth, coverage, and condition and give you a straight answer.",
      },
      {
        q: "Should I insulate before replacing my AC?",
        a: "Sometimes, yes. Better insulation reduces the heat load on your system — which can mean a smaller, less expensive replacement that still keeps you comfortable. We evaluate both together so you invest in the right order.",
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
    overview: [
      "A failed HVAC system in a business isn’t just uncomfortable — it sends customers out the door and makes staff miserable. We service the equipment light commercial properties actually run on: rooftop package units, split systems, and package units serving offices, retail spaces, and restaurant front-of-house areas across Los Angeles and Orange County.",
      "Commercial diagnostics follow the same discipline as our residential work but at commercial scale: compressor and electrical testing, refrigerant and airflow troubleshooting, and economizer and control checks on rooftop units. You get a clear estimate before work begins, and we coordinate scheduling around your operating hours so the repair doesn’t cost you more business than the breakdown already has.",
    ],
    process: [
      {
        step: "Call with symptoms",
        desc: "Tell us the equipment type and what’s happening — we’ll prioritize accordingly.",
      },
      {
        step: "Onsite diagnosis",
        desc: "Compressor, electrical, refrigerant, and airflow testing on rooftop, split, or package systems.",
      },
      {
        step: "Estimate before work",
        desc: "Clear findings and pricing, with repair-versus-replace guidance when equipment age warrants it.",
      },
      {
        step: "Repair and report",
        desc: "We complete the work, verify performance, and document what was done.",
      },
    ],
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
      {
        q: "Do you repair rooftop units (RTUs)?",
        a: "Yes — rooftop package units are a core part of our commercial work, including compressor, electrical, refrigerant, and economizer diagnostics.",
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
    overview: [
      "Commercial HVAC equipment runs far more hours than residential systems — and a mid-summer failure in an occupied building is an expensive way to find out maintenance was overdue. Our commercial plans are built around multi-visit schedules (typically spring and fall) that catch wearing components, dirty coils, and drainage problems before they become downtime.",
      "For property managers, documentation matters as much as the work itself. Every plan visit produces a written service report — what was inspected, what was found, what was done, and what to budget for — so you have a maintenance record for owners and tenants. Plan members also get priority response when something does come up between visits.",
    ],
    process: [
      {
        step: "Plan design",
        desc: "We structure visit frequency around your equipment, run hours, and property needs.",
      },
      {
        step: "Scheduled visits",
        desc: "Filter, coil, drain, electrical, and performance checks — coordinated around your operating hours.",
      },
      {
        step: "Written reports",
        desc: "Documented findings and completed work after every visit, ready for owners and tenants.",
      },
      {
        step: "Priority support",
        desc: "Plan members get priority response when issues come up between scheduled visits.",
      },
    ],
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
      {
        q: "How often should commercial HVAC be serviced?",
        a: "Most light commercial equipment benefits from at least two visits per year — before cooling season and before heating season. High-run-hour equipment or dusty environments may warrant more frequent filter and coil service.",
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
    overview: [
      "Replacing commercial HVAC equipment is a chance to fix problems the old system baked in: wrong sizing for how the space is actually used, poor zoning that leaves some areas hot and others cold, and efficiency levels that made sense fifteen years ago but drive up operating costs today. We start with an onsite load and equipment assessment — occupancy, hours, layout, and existing ductwork — before recommending anything.",
      "We install right-sized rooftop, split, and package systems for offices and light commercial spaces, and we plan the logistics around your business: staging, equipment access, and timing that minimizes disruption to staff and customers. Estimates are free, and financing options are available for qualifying projects.",
    ],
    process: [
      {
        step: "Onsite assessment",
        desc: "Load calculation and equipment review based on your space, occupancy, and operating hours.",
      },
      {
        step: "Proposal",
        desc: "Right-sized system options with clear pricing and realistic efficiency expectations.",
      },
      {
        step: "Coordinated installation",
        desc: "Staging, access, and timing planned to minimize disruption to your operations.",
      },
      {
        step: "Startup and handoff",
        desc: "Full system testing, controls walkthrough, and documentation of the installed equipment.",
      },
    ],
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
      {
        q: "How long does a commercial HVAC replacement take?",
        a: "It depends on equipment type and access — a straightforward rooftop unit changeout moves quickly, while multi-zone projects take longer. Your proposal includes a clear timeline before work is scheduled.",
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
