import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { BUSINESS } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import { INSTALLATION_CONSULTATION_CTA, INSTALLATION_CONSULTATION_HREF } from "@/lib/consultation";

export const metadata = buildMetadata({
  title: "Financing | GC Heating & Cooling",
  description:
    "Contact GC Heating & Cooling to learn about financing requirements, documentation, and next steps.",
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
            Ask Us About Financing
          </h1>
          <p className="mt-4 text-lg text-black/70">
            Financing may be available depending on the project. Contact our
            team and we’ll explain the requirements, documentation, and next
            steps that apply to your installation or replacement.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button
              href={INSTALLATION_CONSULTATION_HREF}
              variant="primary"
              size="lg"
            >
              {INSTALLATION_CONSULTATION_CTA}
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
              title: "Start with a conversation",
              desc: "Tell us about your project and we’ll explain the financing process that may apply.",
            },
            {
              title: "Know what you need",
              desc: "Our team will walk you through the required information and documentation.",
            },
            {
              title: "Clear next steps",
              desc: "We’ll review the available path with you before you make a decision.",
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
