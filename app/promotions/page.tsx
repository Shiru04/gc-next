import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingCta } from "@/components/layout/FloatingCta";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { BUSINESS } from "@/lib/constants";
import { SERVICES } from "@/lib/services";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "HVAC Promotions for Los Angeles & Orange County",
  description:
    "Limited-time HVAC promotions for LA & OC. Fast booking, reliable service, and financing options available. Call or book online.",
});

export default function PromotionsPage() {
  // Ads-first landing: minimal distractions, maximum CTA visibility.
  return (
    <>
      <Header variant="landing" />
      <main>
        <Section className="pt-10 sm:pt-14">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="text-sm font-extrabold tracking-wide text-brand-red">
                LIMITED-TIME PROMOTIONS
              </div>
              <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
                Fast HVAC service in Los Angeles & Orange County
              </h1>
              <p className="mt-4 text-lg text-black/70">
                Book in minutes or call now. We’ll guide you to the right
                service and schedule quickly.
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

              <div className="mt-5 text-sm text-black/60">
                {BUSINESS.trustLine} • {BUSINESS.licenseLabel} •{" "}
                {BUSINESS.cityStateZip}
              </div>
            </div>

            <Card className="p-6">
              <div className="text-sm font-extrabold tracking-wide text-black/60">
                POPULAR REASONS TO BOOK
              </div>
              <div className="mt-4 space-y-3 text-black/80">
                {[
                  "AC not cooling or weak airflow",
                  "System making unusual noises",
                  "High energy bills / poor efficiency",
                  "Old system needing replacement options",
                  "Maintenance before peak season",
                ].map((x) => (
                  <div key={x} className="flex gap-2">
                    <span className="text-brand-red">✓</span>
                    <span>{x}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl bg-brand-gray p-5">
                <div className="text-sm font-bold">What happens next?</div>
                <div className="mt-2 text-sm text-black/70">
                  You book → we confirm → technician visits → clear options and
                  recommendations.
                </div>
              </div>
            </Card>
          </div>
        </Section>

        <Section className="bg-brand-gray">
          <div className="text-center">
            <div className="text-sm font-extrabold tracking-wide text-black/60">
              CHOOSE A SERVICE
            </div>
            <h2 className="mt-2 text-3xl font-extrabold">
              Most requested services
            </h2>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.slice(0, 6).map((s) => (
              <Card key={s.slug} className="p-6">
                <div className="text-xl font-extrabold">{s.name}</div>
                <p className="mt-2 text-black/70">{s.short}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button
                    href={`/services/${s.slug}`}
                    variant="secondary"
                    size="md"
                  >
                    Details
                  </Button>
                  <Button
                    href={BUSINESS.bookingUrl}
                    variant="primary"
                    size="md"
                  >
                    Book
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Section>

        <Section className="bg-brand-red text-white">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Need help choosing the right option?
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-white/85">
              Call now — we’ll ask a few quick questions and guide you to the
              correct service.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
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
          </div>
        </Section>

        <Section>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-extrabold">FAQ</h2>
            <div className="mt-6 space-y-4">
              {[
                {
                  q: "Do you offer financing?",
                  a: "Yes — we offer financing options. See Financing or ask during your consultation.",
                },
                {
                  q: "Do you serve both residential and commercial?",
                  a: "Yes — we support residential and commercial HVAC service across LA & Orange County.",
                },
                {
                  q: "Where are you located?",
                  a: `${BUSINESS.addressLine1}, ${BUSINESS.cityStateZip}.`,
                },
              ].map((f) => (
                <Card key={f.q} className="p-6">
                  <div className="font-extrabold">{f.q}</div>
                  <div className="mt-2 text-black/70">{f.a}</div>
                </Card>
              ))}
            </div>
          </div>
        </Section>
      </main>
      <Footer />
      <FloatingCta />
    </>
  );
}
