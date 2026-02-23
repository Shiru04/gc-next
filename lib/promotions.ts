// lib/promotions.ts
import { SITE } from "./site";
export type PromotionKey = "new-installation" | "repairs";

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
        q: "Do you offer free estimates?",
        a: "We provide a clear consultation and scope review to recommend the right system. If you want a price range before the visit, call and we’ll guide you with common scenarios.",
      },
      {
        q: "How fast can you install?",
        a: "Scheduling depends on demand and equipment availability. Our goal is to get you on the calendar as soon as possible—especially during peak heat.",
      },
    ],
    ctaPrimary: { label: "Book Now", href: SITE.bookingUrl },
    ctaSecondary: {
      label: "Call (800) 706-4822",
      href: `tel:${SITE.phoneE164}`,
    },
  },

  repairs: {
    key: "repairs",
    slug: "/promotions/repairs",
    pageTitle: "HVAC Repairs",
    metaTitle: "HVAC Repair in Los Angeles & Orange County | Free Estimates",
    metaDescription:
      "Need HVAC repair fast? GC Heating & Cooling offers free estimates for repairs and quick scheduling in Los Angeles & Orange County. Call or book online.",
    heroKicker: "Fast Help, Real Diagnostics",
    heroHeadline: "HVAC Repairs — get your system running again, fast",
    heroSubheadline:
      "When your AC or heater stops working, you need an experienced team that shows up and fixes it. Serving Los Angeles & Orange County.",
    primaryOfferTitle: "",
    primaryOfferValue: "Free Estimates",
    primaryOfferDetails: [
      "Free estimate applies to repair evaluation/quote.",
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
        q: "What does free estimate mean for repairs?",
        a: "We evaluate the issue and provide an estimate for the repair. If additional diagnostics are required, we’ll explain it before proceeding.",
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
    ctaPrimary: { label: "Book Now", href: SITE.bookingUrl },
    ctaSecondary: {
      label: "Call (800) 706-4822",
      href: `tel:${SITE.phoneE164}`,
    },
  },
};
