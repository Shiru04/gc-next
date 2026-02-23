import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { BUSINESS } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About GC Heating & Cooling",
  description:
    "Family-operated HVAC company serving Los Angeles & Orange County. Licensed, bonded, and insured.",
});

export default function AboutPage() {
  return (
    <>
      <Section className="pt-10 sm:pt-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="text-sm font-extrabold tracking-wide text-black/60">
              GC HEATING & COOLING
            </div>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Quality service since 1999
            </h1>
            <p className="mt-4 text-lg text-black/70">
              We’re a family-operated HVAC company focused on comfort, value,
              and professional workmanship — serving Los Angeles and Orange
              County.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button
                href={`tel:${BUSINESS.phoneE164}`}
                variant="secondary"
                size="lg"
              >
                Call {BUSINESS.phoneDisplay}
              </Button>
              <Button href={BUSINESS.bookingUrl} variant="primary" size="lg">
                Book Now
              </Button>
            </div>

            <div className="mt-6 text-sm text-black/60">
              {BUSINESS.trustLine} • {BUSINESS.licenseLabel}
            </div>
          </div>

          <Card className="overflow-hidden">
            <div className="h-[320px] bg-brand-gray p-8">
              <div className="text-sm font-bold text-black/60">
                About image placeholder
              </div>
              <div className="mt-2 text-black/70">
                In Phase 2+ you’ll drop the real media from Wix (optimized). We
                can add parallax later.
              </div>
            </div>
          </Card>
        </div>
      </Section>

      <Section className="bg-brand-gray">
        <div className="grid gap-5 md:grid-cols-4">
          {[
            { title: "Peace of mind", desc: "Licensed, bonded, and insured." },
            {
              title: "Customer care",
              desc: "Clear communication and professional service.",
            },
            {
              title: "Quality work",
              desc: "Reliable installs, repairs, and maintenance.",
            },
            {
              title: "Local expertise",
              desc: "Focused on LA & Orange County needs.",
            },
          ].map((x) => (
            <Card key={x.title} className="p-6">
              <div className="text-lg font-extrabold">{x.title}</div>
              <p className="mt-2 text-black/70">{x.desc}</p>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
