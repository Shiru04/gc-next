import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { BUSINESS } from "@/lib/constants";
import { PROMOTIONS } from "@/lib/promotions";
import { PromoCard } from "@/components/sections/PromoCard";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Promotions | GC Heating & Cooling",
  description:
    "Current HVAC promotions for installation and repairs across Los Angeles & Orange County. Limited-time offers and rebates may apply.",
  path: "/promotions",
});

export default function PromotionsHubPage() {
  const promoNewInstall = PROMOTIONS["new-installation"];
  const promoRepairs = PROMOTIONS.repairs;
  const promoTuneUps = PROMOTIONS["tune-ups"];

  return (
    <>
      {/* Header */}
      <Section className="pt-10 sm:pt-14">
        <div className="max-w-3xl">
          <div className="text-sm font-extrabold tracking-wide text-brand-red">
            LIMITED-TIME OFFERS
          </div>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Current promotions
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-black/70">
            Select the option that matches what you need. Fast scheduling for
            Los Angeles &amp; Orange County.
          </p>
        </div>
      </Section>

      {/* Promo cards */}
      <Section className="bg-brand-gray">
        <div className="grid gap-6 md:grid-cols-2">
          <PromoCard
            kicker="New Installation"
            title={promoNewInstall.primaryOfferValue}
            description="Replace or install a new HVAC system with a trusted, licensed team. Energy-efficient equipment options available."
            ctaLabel="Book a Free HVAC Consultation"
            ctaHref="/residential/residential-ac-installation/#free-hvac-quote"
            highlight="Popular"
          />
          <PromoCard
            kicker="Repairs"
            title={promoRepairs.primaryOfferValue}
            description="Quick diagnosis, straightforward recommendations, and urgent scheduling available. Residential & light commercial."
            ctaLabel="Request HVAC Repair"
            ctaHref="/schedule-service/?service=ac_repair"
            highlight="Fast Service"
          />
          <PromoCard
            kicker="Tune-Ups"
            title={promoTuneUps.primaryOfferValue}
            description="Regularly $174 — Save $25 — Now $149 with code GC149. Seasonal multi-point tune-up for one standard residential system."
            ctaLabel="Request a Tune-Up"
            ctaHref="/schedule-service/?service=maintenance&coupon=GC149"
            highlight="Best Value"
          />
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="text-center">
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            Not sure which service you need?
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-black/70">
            Choose your service to request an appointment. For a new system or replacement, book a free onsite HVAC consultation; we&apos;ll assess your needs before providing pricing.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button
              href={`tel:${BUSINESS.phoneE164}`}
              variant="secondary"
              size="lg"
            >
              Call {BUSINESS.phoneDisplay}
            </Button>
            <Button href="/schedule-service/" variant="primary" size="lg">
              Request Service
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
