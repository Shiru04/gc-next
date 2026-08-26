export type PostSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // display
  sections: PostSection[];
  related: Array<{ href: string; label: string }>;
};

export const POSTS: Post[] = [
  {
    slug: "how-to-know-if-your-ac-needs-repair",
    title: "How to know if your AC needs repair",
    description:
      "Common warning signs, what to check, and when to schedule service.",
    date: "2026-02-22",
    sections: [
      {
        heading: "Why early warning signs matter",
        paragraphs: [
          "Most air conditioning failures don’t happen out of nowhere. A compressor that dies during a July heat wave usually spent weeks — sometimes months — sending signals that something was wrong: longer run times, warmer air, new noises, a creeping electric bill. Catching those signals early is the difference between a modest repair and an emergency replacement at the worst possible time.",
          "In Los Angeles and Orange County, the pattern is predictable. Systems sit lightly used through spring, then get pushed hard when the first hot stretch arrives. That first heavy-load week is when weak components fail. The good news: almost every one of the warning signs below is something you can notice yourself, without any tools.",
        ],
      },
      {
        heading: "Warning sign 1: The air isn’t as cold as it used to be",
        paragraphs: [
          "If your AC runs but the air from the vents feels weak or only slightly cool, don’t wait for it to quit entirely. Common causes include a refrigerant leak, a failing capacitor that keeps the compressor from starting properly, a frozen evaporator coil, or airflow restrictions from a clogged filter or dirty coil.",
          "A quick self-check: hold your hand at a supply vent while the system runs. The air should feel distinctly cold, not just “moving.” If rooms far from the unit never cool down, or the system runs for hours without reaching the thermostat setting, it’s working harder than it should — and burning money doing it.",
        ],
      },
      {
        heading: "Warning sign 2: New noises or smells",
        paragraphs: [
          "A healthy system is boring: a steady hum from the outdoor unit and quiet airflow inside. Changes are worth attention. Grinding or screeching can point to motor bearing wear. Buzzing often signals an electrical problem such as a failing contactor. Repeated clicking without startup usually means a component is trying and failing to engage.",
          "Smells tell their own story. A musty odor when the system starts often points to moisture or microbial growth in the ducts or drain pan. A burning or electrical smell warrants shutting the system off and calling for service — that one shouldn’t wait.",
        ],
      },
      {
        heading: "Warning sign 3: Short cycling or constant running",
        paragraphs: [
          "Your AC should run in complete cycles — long enough to cool the space and remove humidity, then rest. Two patterns signal trouble. Short cycling, where the system starts and stops every few minutes, stresses the compressor (the most expensive component in the system) and often traces to an oversized unit, a refrigerant issue, or an electrical fault. Constant running, where the system never seems to shut off, suggests it can no longer keep up — from lost refrigerant, dirty coils, failing components, or heat gain the system wasn’t sized for.",
        ],
      },
      {
        heading: "Warning sign 4: Your electric bill jumped",
        paragraphs: [
          "If your usage habits haven’t changed but your summer bill is noticeably higher than the same month last year, your system may be losing efficiency. Failing components force longer run times to deliver the same cooling. A bill increase paired with any other sign on this list is a strong indicator it’s time for a professional diagnosis.",
        ],
      },
      {
        heading: "What you can check before calling",
        paragraphs: [
          "A few minutes of checking can rule out the simple stuff:",
        ],
        bullets: [
          "Air filter — a badly clogged filter can cause weak airflow, ice on the coil, and short cycling on its own. If it’s gray and matted, replace it.",
          "Thermostat — confirm it’s set to cool, batteries are good, and the setpoint is below room temperature.",
          "Breakers — check that the AC breakers haven’t tripped. If a breaker trips again after resetting, stop and call; that’s an electrical fault.",
          "Outdoor unit — make sure the condenser isn’t choked by leaves, dirt, or plants. It needs clear space to move air.",
        ],
      },
      {
        heading: "When to call a professional",
        paragraphs: [
          "If the basics check out and the symptoms persist — warm air, noises, short cycling, rising bills — the remaining causes (refrigerant, electrical components, motors, coils) need diagnostic equipment and training to confirm safely. Guessing gets expensive: replacing parts one at a time until something works usually costs more than a proper diagnosis up front.",
          "Our approach at GC Heating & Cooling is diagnosis first: we test electrical components, measure refrigerant pressures, and check airflow, then explain what we found and what your options cost before any work begins. And if your system is old enough that a repair doesn’t make financial sense, we’ll say so directly and walk you through replacement options instead.",
          "One more thing worth knowing: the cheapest repair is the one you never need. Most of the failures on this list start small and get caught during routine maintenance — which is exactly what a seasonal tune-up is for.",
        ],
      },
    ],
    related: [
      { href: "/residential/residential-ac-repair", label: "AC Repair" },
      {
        href: "/residential/residential-hvac-maintenance",
        label: "HVAC Maintenance",
      },
      {
        href: "/residential/residential-ac-installation",
        label: "AC Installation",
      },
      { href: "/promotions", label: "Current Promotions" },
    ],
  },
  {
    slug: "hvac-maintenance-checklist",
    title: "HVAC maintenance checklist for LA & OC",
    description:
      "Simple steps to reduce breakdown risk and improve efficiency.",
    date: "2026-02-22",
    sections: [
      {
        heading: "Why maintenance matters more here than you’d think",
        paragraphs: [
          "Southern California is easy on heating systems and hard on cooling systems. Long cooling seasons, dusty inland air, salt air near the coast, and heat waves that push systems to their limits for days at a time — all of it adds wear. Most of the emergency calls we run in July and August trace back to problems that were quietly developing in April: a weakening capacitor, a coil coated in dust, a drain line slowly clogging.",
          "The goal of maintenance isn’t just avoiding breakdowns. A clean, tuned system simply uses less electricity to do the same job. Dirty coils and clogged filters force longer run times, and longer run times show up on your bill every month.",
        ],
      },
      {
        heading: "Monthly: the two-minute checks",
        paragraphs: [
          "These take almost no time and prevent the most common problems:",
        ],
        bullets: [
          "Check the air filter — hold it up to light; if you can’t see through it, replace it. During heavy use or wildfire smoke periods, check more often.",
          "Listen and look — new noises, weak airflow, or ice on the refrigerant lines are early warnings worth acting on.",
          "Keep vents clear — furniture and rugs blocking supply or return vents unbalance the whole system.",
        ],
      },
      {
        heading: "Seasonally: what homeowners can do",
        paragraphs: [
          "A few times a year, give the system fifteen minutes:",
        ],
        bullets: [
          "Rinse the outdoor condenser coil gently with a hose (system off) to clear dust and debris — especially after Santa Ana wind events.",
          "Trim plants and clear leaves at least two feet around the outdoor unit so it can breathe.",
          "Check the condensate drain line outlet for dripping when the AC runs; a blocked drain can shut the system down or cause water damage.",
          "Test the thermostat by switching modes and confirming the system responds; replace batteries yearly.",
          "Near the coast: look for corrosion on the outdoor unit’s cabinet and coil fins — salt air accelerates it.",
        ],
      },
      {
        heading: "Twice a year: the professional tune-up",
        paragraphs: [
          "The homeowner checks above keep a system breathing, but they can’t catch the failures that actually strand people in heat waves — those are electrical and mechanical, and they need testing equipment. A professional tune-up measures what you can’t see: capacitor values, motor amp draws, refrigerant pressures, temperature split across the coil, and safety controls.",
          "The rhythm that works for our climate: a cooling tune-up in spring, before the first hot stretch, and a heating check in fall, before the first cold night. Spring matters most here — that’s when a weak capacitor or low refrigerant charge gets caught at a convenient time instead of failing during a 100-degree week when every HVAC company in the county is booked out.",
          "A proper tune-up visit should include filter and airflow inspection, electrical testing under load, coil and drain line inspection, refrigerant charge verification, and performance measurement — finished with a plain-language rundown of what’s healthy and what’s wearing. That last part is the real value: knowing a component is weakening lets you replace it on your schedule, not the failure’s.",
        ],
      },
      {
        heading: "What maintenance actually saves",
        paragraphs: [
          "The math favors prevention. A standard residential tune-up is currently $149 with coupon code GC149 (regularly $199). The repairs it most often prevents — compressor damage from a failed capacitor, water damage from a clogged drain, coil replacement after years of running dirty — run into the hundreds or thousands. Add the efficiency loss of a neglected system quietly inflating every monthly bill, and skipping maintenance is usually the more expensive choice, it just spreads the cost out where it’s harder to see.",
          "Maintenance also protects the lifespan question. Well-maintained systems commonly deliver years of extra service compared to neglected ones, and when the time for replacement does come, a documented service history helps you make that call deliberately instead of during an outage.",
          "If you’d rather not track any of this yourself, that’s what maintenance bundles are for: we schedule the spring and fall visits, and you get a report after each one. Your system stays ready for the seasons — and you stay off the emergency-call list in August.",
        ],
      },
    ],
    related: [
      {
        href: "/residential/residential-hvac-maintenance",
        label: "HVAC Maintenance",
      },
      { href: "/promotions/tune-ups", label: "$149 Tune-Up Coupon" },
      { href: "/residential/residential-ac-repair", label: "AC Repair" },
      {
        href: "/residential/residential-attic-insulation",
        label: "Attic Insulation",
      },
    ],
  },
];

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}
