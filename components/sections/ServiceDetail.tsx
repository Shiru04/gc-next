import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { BUSINESS } from "@/lib/constants";
import type { Service } from "@/lib/services";

const SITE_URL = "https://gc-heatingandcooling.com";

export function ServiceDetail({
  service,
  basePath,
}: {
  service: Service;
  basePath: "residential" | "commercial";
}) {
  const hubLabel = basePath === "residential" ? "Residential" : "Commercial";

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.seoDescription,
    serviceType: "HVAC",
    audience: {
      "@type": "Audience",
      audienceType: hubLabel,
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Los Angeles County" },
      { "@type": "AdministrativeArea", name: "Orange County" },
    ],
    provider: {
      "@type": "HVACBusiness",
      name: BUSINESS.name,
      url: SITE_URL,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: hubLabel,
        item: `${SITE_URL}/${basePath}`,
      },
      { "@type": "ListItem", position: 3, name: service.name },
    ],
  };

  return (
    <>
      <Section className="pt-10 sm:pt-14">
        <div className="max-w-3xl">
          <div className="text-sm font-extrabold tracking-wide text-black/60">
            {hubLabel.toUpperCase()} SERVICE
          </div>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
            {service.h1}
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-black/70">
            {service.intro}
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
        </div>
      </Section>

      <Section className="bg-brand-gray">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="p-6 lg:col-span-2">
            <h2 className="text-xl font-extrabold">What&apos;s included</h2>
            <ul className="mt-4 space-y-3 text-black/80">
              {service.bullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <span className="mt-0.5 shrink-0 text-brand-red">✓</span>
                  <span className="leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-extrabold">Service area</h2>
            <p className="mt-2 leading-relaxed text-black/70">
              Serving Los Angeles and Orange County. If you’re unsure whether
              you’re in range, call us — we’ll confirm.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button href="/service-areas" variant="secondary" size="md">
                View service areas
              </Button>
              <Button href={`/${basePath}`} variant="ghost" size="md">
                All {hubLabel.toLowerCase()} services
              </Button>
            </div>
          </Card>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-xl font-extrabold">FAQ</h2>
            <div className="mt-4 space-y-5">
              {service.faqs.map((f) => (
                <div key={f.q}>
                  <h3 className="font-bold">{f.q}</h3>
                  <p className="mt-1 leading-relaxed text-black/70">{f.a}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-extrabold">Next steps</h2>
            <p className="mt-2 leading-relaxed text-black/70">
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

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}
