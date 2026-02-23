import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { BUSINESS } from "@/lib/constants";
import { SERVICE_AREAS, getAreaBySlug } from "@/lib/areas";
import { SERVICES } from "@/lib/services";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return SERVICE_AREAS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) return {};
  return buildMetadata({
    title: area.seoTitle,
    description: area.seoDescription,
    path: `/service-areas/${area.slug}`,
  });
}

export default async function AreaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const area = getAreaBySlug(slug);
  if (!area) return notFound();

  return (
    <>
      <Section className="pt-10 sm:pt-14">
        <div className="max-w-3xl">
          <div className="text-sm font-extrabold tracking-wide text-black/60">
            SERVICE AREA
          </div>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
            HVAC Services in {area.name}
          </h1>
          <p className="mt-4 text-lg text-black/70">{area.intro}</p>

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
            <div className="text-xl font-extrabold">
              Popular services in {area.name}
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {SERVICES.slice(0, 6).map((s) => (
                <Card key={s.slug} className="p-5">
                  <div className="font-extrabold">{s.name}</div>
                  <p className="mt-1 text-sm text-black/70">{s.short}</p>
                  <div className="mt-3">
                    <Button
                      href={`/services/${s.slug}`}
                      variant="secondary"
                      size="sm"
                    >
                      Learn more
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="text-xl font-extrabold">About this location</div>
            <p className="mt-2 text-black/70">
              We serve {area.county}. If you’re nearby and not listed, call us —
              we may still be able to schedule service.
            </p>

            <div className="mt-5 text-sm text-black/60">
              {BUSINESS.trustLine} • {BUSINESS.licenseLabel}
            </div>

            <div className="mt-5">
              <Button href="/service-areas" variant="secondary" size="md">
                Back to service areas
              </Button>
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
}
