export type HeroKey =
  | "home"
  | "services"
  | "reviews"
  | "contact"
  | "promotions"
  | "serviceAreas";

export const HERO_MEDIA: Record<
  HeroKey,
  { src: string; alt: string; priority?: boolean }
> = {
  home: {
    src: "/hero/home-hero.webp",
    alt: "Comfortable family home with HVAC airflow graphics",
    priority: true,
  },
  services: {
    src: "/hero/services-hero.webp",
    alt: "HVAC technician servicing an air conditioning unit",
  },
  reviews: {
    src: "/hero/reviews-hero.webp",
    alt: "Customer reviews and service satisfaction background",
  },
  contact: {
    src: "/hero/contact-hero.webp",
    alt: "Contact GC Heating & Cooling background",
  },
  promotions: {
    src: "/hero/promotions-hero.webp",
    alt: "Limited-time HVAC promotions background",
    priority: true,
  },
  serviceAreas: {
    src: "/hero/service-areas-map.webp",
    alt: "Service area map for Los Angeles and Orange County",
  },
};

export const SECTION_MEDIA = {
  techWorking: {
    src: "/sections/tech-working.webp",
    alt: "HVAC technician working on equipment",
  },
  reviewsBg: {
    src: "/sections/reviews-bg.webp",
    alt: "Home exterior background for reviews section",
  },
  serviceAreaMap: {
    src: "/sections/service-area-map.webp",
    alt: "Map showing coverage area in LA and Orange County",
  },
} as const;

export const SERVICE_CARD_MEDIA: Record<
  "installation" | "repairs" | "maintenance",
  { src: string; alt: string }
> = {
  installation: {
    src: "/services/installation.webp",
    alt: "New HVAC installation service",
  },
  repairs: {
    src: "/services/repair.webp",
    alt: "HVAC repair service",
  },
  maintenance: {
    src: "/services/maintenance.webp",
    alt: "HVAC maintenance service",
  },
};
