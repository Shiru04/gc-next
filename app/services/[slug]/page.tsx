import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { BUSINESS } from "@/lib/constants";
import { SERVICES, getServiceBySlug } from "@/lib/services";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const service = getServiceBySlug(slug);
  if (!service) return notFound();

  return (
    <>
      <Section className="pt-10 sm:pt-14">
        <div className="max-w-3xl">
          <div className="text-sm font-extrabold tracking-wide text-black/60">
            SERVICE
          </div>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
            {service.h1}
          </h1>
          <p className="mt-4 text-lg text-black/70">{service.intro}</p>

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
        </div>
      </Section>

      <Section className="bg-brand-gray">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="p-6 lg:col-span-2">
            <div className="text-xl font-extrabold">What’s included</div>
            <ul className="mt-4 space-y-2 text-black/80">
              {service.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="mt-1 text-brand-red">✓</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6">
            <div className="text-xl font-extrabold">Service area</div>
            <p className="mt-2 text-black/70">
              Serving Los Angeles and Orange County. If you’re unsure whether
              you’re in range, call us — we’ll confirm.
            </p>
            <div className="mt-5">
              <Button href="/service-areas" variant="secondary" size="md">
                View service areas
              </Button>
            </div>
          </Card>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <div className="text-xl font-extrabold">FAQ</div>
            <div className="mt-4 space-y-4">
              {service.faqs.map((f) => (
                <div key={f.q}>
                  <div className="font-bold">{f.q}</div>
                  <div className="mt-1 text-black/70">{f.a}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="text-xl font-extrabold">Next steps</div>
            <p className="mt-2 text-black/70">
              Book an onsite consultation for an accurate diagnosis, options,
              and clear recommendations.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button href={BUSINESS.bookingUrl} variant="primary" size="md">
                Book Onsite Consultation
              </Button>
              <Button href="/promotions" variant="secondary" size="md">
                View promotions
              </Button>
            </div>
            <div className="mt-5 text-sm text-black/60">
              {BUSINESS.trustLine} • {BUSINESS.licenseLabel}
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
}
