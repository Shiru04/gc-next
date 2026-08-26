// lib/promotions.ts
import { SITE } from "./site";
import { scheduleServiceHref } from "./scheduling";
export type PromotionKey = "new-installation" | "repairs" | "tune-ups";

export const PROMOTIONS: Record<
  PromotionKey,
  {
    key: PromotionKey;
    slug: string;
    pageTitle: string;
    metaTitle: string;
    metaDescription: string;
    heroKicker: string;
    heroHeadline: string;
    heroSubheadline: string;
    primaryOfferTitle: string;
    primaryOfferValue: string;
    primaryOfferDetails: string[];
    secondaryPoints: string[];
    faq: { q: string; a: string }[];
    ctaPrimary: { label: string; href: string };
    ctaSecondary: { label: string; href: string };
  }
> = {
  "new-installation": {
    key: "new-installation",
    slug: "/promotions/new-installation",
    pageTitle: "New HVAC Installation",
    metaTitle:
      "New HVAC Installation in Los Angeles & Orange County | Up to $2,000 Rebates",
    metaDescription:
      "Replace or install a new HVAC system with GC Heating & Cooling. Up to $2,000 rebates available. Fast scheduling for Los Angeles & Orange County.",
    heroKicker: "Priority Scheduling",
    heroHeadline: "New HVAC Installation — done right, without the wait",
    heroSubheadline:
      "Install or replace your system with a licensed, bonded & insured team. Serving Los Angeles & Orange County with fast scheduling and clean workmanship.",
    primaryOfferTitle: "Up to",
    primaryOfferValue: "$2,000 Rebates",
    primaryOfferDetails: [
      "Equipment starting at $6,800 (installation quoted separately).",
      "Rebates vary by equipment and program availability.",
      "Final rebate amount is confirmed during your consultation.",
      "We’ll help you choose the best option for comfort and efficiency.",
    ],
    secondaryPoints: [
      "Licensed, Bonded & Insured",
      "Professional install & clean jobsite",
      "Energy-efficient equipment options",
      "Clear scope, transparent recommendations",
    ],
    faq: [
      {
        q: "How do rebates work?",
        a: "Rebate eligibility depends on the equipment selected and the active rebate programs at the time of purchase. We’ll confirm the exact amount during your consultation.",
      },
      {
        q: "How does pricing work?",
        a: "We provide a clear consultation and scope review to recommend the right system. If you want a price range before the visit, call and we’ll guide you with common scenarios.",
      },
      {
        q: "How fast can you install?",
        a: "Scheduling depends on demand and equipment availability. Our goal is to get you on the calendar as soon as possible—especially during peak heat.",
      },
    ],
    ctaPrimary: { label: "Request a Free Installation Estimate", href: scheduleServiceHref("installation") },
    ctaSecondary: {
      label: "Call (714) 715-9569",
      href: `tel:${SITE.phoneE164}`,
    },
  },

  repairs: {
    key: "repairs",
    slug: "/promotions/repairs",
    pageTitle: "HVAC Repairs",
    metaTitle: "HVAC Repair in Los Angeles & Orange County | Fast Diagnostics",
    metaDescription:
      "Need HVAC repair fast? GC Heating & Cooling offers expert diagnostics and quick scheduling in Los Angeles & Orange County. Call or book online.",
    heroKicker: "Fast Help, Real Diagnostics",
    heroHeadline: "HVAC Repairs — get your system running again, fast",
    heroSubheadline:
      "When your AC or heater stops working, you need an experienced team that shows up and fixes it. Serving Los Angeles & Orange County.",
    primaryOfferTitle: "",
    primaryOfferValue: "Fast Diagnostics",
    primaryOfferDetails: [
      "We diagnose the issue and provide a clear repair quote upfront.",
      "If parts are required, we’ll explain options clearly before work begins.",
      "Urgent scheduling available based on demand.",
    ],
    secondaryPoints: [
      "Clear diagnosis and straightforward recommendations",
      "Residential & light commercial repairs",
      "Trusted local service (LA/OC)",
      "Book online or call for urgent scheduling",
    ],
    faq: [
      {
        q: "How does repair pricing work?",
        a: "We evaluate the issue and provide a quote for the repair. If additional diagnostics are required, we’ll explain it before proceeding.",
      },
      {
        q: "Do you repair all brands?",
        a: "We work with many major HVAC brands. If you’re unsure, call us with your model info and we’ll confirm.",
      },
      {
        q: "Can I book urgent service online?",
        a: "Yes. Book online and include notes about urgency, or call for the fastest routing and availability.",
      },
    ],
    ctaPrimary: { label: "Schedule HVAC Repair", href: scheduleServiceHref("ac_repair") },
    ctaSecondary: {
      label: "Call (714) 715-9569",
      href: `tel:${SITE.phoneE164}`,
    },
  },

  "tune-ups": {
    key: "tune-ups",
    slug: "/promotions/tune-ups",
    pageTitle: "HVAC Tune-Up",
    metaTitle: "HVAC Tune-Up | Regularly $174 — Save $25 — Now $149",
    metaDescription:
      "Regularly $174 — save $25 — now $149 for a standard residential HVAC tune-up with coupon code GC149. Serving Los Angeles & Orange County.",
    heroKicker: "Seasonal Maintenance",
    heroHeadline: "HVAC Tune-Up — keep your system running at its best",
    heroSubheadline:
      "Regularly $174 — save $25 — now $149. Use coupon code GC149 when you schedule or mention it when you call.",
    primaryOfferTitle: "Regularly $174 · Save $25 with code GC149",
    primaryOfferValue: "Now $149 Tune-Up",
    primaryOfferDetails: [
      "Multi-point inspection of your heating & cooling system.",
      "Performance check to catch small issues before they become costly repairs.",
      "Recommended once or twice a year for best efficiency.",
      "Mention coupon code GC149 when calling or add it to your booking notes.",
      "Price applies to standard residential systems—additional units quoted separately.",
    ],
    secondaryPoints: [
      "Improve efficiency and lower energy bills",
      "Catch problems early and avoid breakdowns",
      "Extend the life of your equipment",
      "Licensed, Bonded & Insured",
    ],
    faq: [
      {
        q: "What's included in the $149 tune-up?",
        a: "Our technician performs a multi-point inspection and performance check on your system. If we find anything that needs attention, we'll explain your options clearly before any additional work.",
      },
      {
        q: "How often should I get a tune-up?",
        a: "We recommend a tune-up once or twice a year—ideally before the cooling season and before the heating season—to keep your system efficient and reliable.",
      },
      {
        q: "How do I get the $149 promotional price?",
        a: "Mention coupon code GC149 when you call or include it in your online booking notes. Regularly $174 — save $25 — now $149 for one standard residential system. Additional units are quoted separately and the offer cannot be combined with other discounts.",
      },
    ],
    ctaPrimary: { label: "Schedule Now $149 — Code GC149", href: scheduleServiceHref("maintenance", "en", "GC149") },
    ctaSecondary: {
      label: "Call & mention GC149",
      href: `tel:${SITE.phoneE164}`,
    },
  },
};
