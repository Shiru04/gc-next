import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { BUSINESS } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Financing | GC Heating & Cooling",
  description:
    "Explore flexible financing options for HVAC installation and upgrades in Los Angeles & Orange County.",
  path: "/financing",
});

export default function FinancingPage() {
  return (
    <>
      <Section className="pt-10 sm:pt-14">
        <div className="max-w-3xl">
          <div className="text-sm font-extrabold tracking-wide text-black/60">
            FINANCING
          </div>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Financing Available
          </h1>
          <p className="mt-4 text-lg text-black/70">
            We offer short and long term financing options for qualified
            customers. If you’re planning an upgrade or a new system, we’ll help
            you find a comfortable path forward.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button href={BUSINESS.bookingUrl} variant="primary" size="lg">
              Book Onsite Consultation
            </Button>
            <Button
              href={`tel:${BUSINESS.phoneE164}`}
              variant="secondary"
              size="lg"
            >
              Call {BUSINESS.phoneDisplay}
            </Button>
          </div>
        </div>
      </Section>

      <Section className="bg-brand-gray">
        <div className="grid gap-5 lg:grid-cols-3">
          {[
            {
              title: "Clear options",
              desc: "We explain equipment choices and what matters for comfort and efficiency.",
            },
            {
              title: "Budget-friendly upgrades",
              desc: "Financing can make upgrades more accessible when timing matters.",
            },
            {
              title: "Fast scheduling",
              desc: "Book online and we’ll confirm your appointment quickly.",
            },
          ].map((x) => (
            <Card key={x.title} className="p-6">
              <div className="text-xl font-extrabold">{x.title}</div>
              <p className="mt-2 text-black/70">{x.desc}</p>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
