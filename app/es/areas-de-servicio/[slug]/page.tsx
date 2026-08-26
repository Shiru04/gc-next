import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { BUSINESS } from "@/lib/constants";
import { SERVICE_AREAS, getAreaBySlug } from "@/lib/areas.es";
import { getAreaContent } from "@/lib/area-content.es";
import { SERVICES } from "@/lib/services.es";
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
    path: `/es/areas-de-servicio/${area.slug}`,
  });
}

const SITE_URL = "https://gc-heatingandcooling.com";

export default async function AreaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const area = getAreaBySlug(slug);
  if (!area) return notFound();

  const content = getAreaContent(slug);
  const nearbyAreas =
    content?.nearby
      .map((n) => getAreaBySlug(n))
      .filter((a): a is NonNullable<typeof a> => Boolean(a)) ?? [];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Hogar", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Áreas de servicio", item: `${SITE_URL}/service-areas` },
      { "@type": "ListItem", position: 3, name: area.name },
    ],
  };

  const faqJsonLd = content
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: content.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  return (
    <>
      <Section className="pt-10 sm:pt-14">
        <div className="max-w-3xl">
          <div className="text-sm font-extrabold tracking-wide text-black/60">
            VÍA DE SERVÍCIO
          </div>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Servicios de climatización en {area.name}
          </h1>
          <p className="mt-4 text-lg text-black/70">{area.intro}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button
              href={`tel:${BUSINESS.phoneE164}`}
              variant="secondary"
              size="lg"
            >
              Llamar {BUSINESS.phoneDisplay}
            </Button>
            <Button href={BUSINESS.bookingUrl} variant="primary" size="lg">
              Reserva ahora
            </Button>
          </div>
        </div>
      </Section>

      {content ? (
        <Section>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-extrabold tracking-tight">
              Calefacción y refrigeración en {area.name}
            </h2>
            <div className="mt-4 space-y-4">
              {content.about.map((p) => (
                <p
                  key={p.slice(0, 40)}
                  className="leading-relaxed text-black/75"
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </Section>
      ) : null}

      <Section className="bg-brand-gray">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="p-6 lg:col-span-2">
            <h2 className="text-xl font-extrabold">
              Servicios populares en {area.name}
            </h2>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {SERVICES.slice(0, 6).map((s) => (
                <Card key={s.slug} className="p-5">
                  <div className="font-extrabold">{s.name}</div>
                  <p className="mt-1 text-sm text-black/70">{s.short}</p>
                  <div className="mt-3">
                    <Button
                      href={`/${s.audience}/${s.slug}`}
                      variant="secondary"
                      size="sm"
                    >
                      Más información
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-extrabold">Acerca de esta ubicación</h2>
            <p className="mt-2 text-black/70">
              servimos {area.county}. Si estás cerca y no figura en la lista, llámanos.
              Es posible que aún podamos programar el servicio.
            </p>

            {nearbyAreas.length > 0 ? (
              <div className="mt-5">
                <div className="text-sm font-extrabold">
                  Áreas cercanas que servimos
                </div>
                <ul className="mt-2 space-y-1">
                  {nearbyAreas.map((n) => (
                    <li key={n.slug}>
                      <a
                        href={`/es/areas-de-servicio/${n.slug}`}
                        className="text-sm font-bold text-brand-red hover:underline"
                      >
                        Climatización en {n.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="mt-5 text-sm text-black/60">
              {BUSINESS.trustLine} • {BUSINESS.licenseLabel}
            </div>

            <div className="mt-5">
              <Button href="/es/areas-de-servicio" variant="secondary" size="md">
                Volver a áreas de servicio
              </Button>
            </div>
          </Card>
        </div>

        {content ? (
          <Card className="mt-6 p-6">
            <h2 className="text-xl font-extrabold">
              Preguntas frecuentes
            </h2>
            <div className="mt-4 grid gap-6 lg:grid-cols-3">
              {content.faqs.map((f) => (
                <div key={f.q}>
                  <h3 className="font-bold">{f.q}</h3>
                  <p className="mt-1 leading-relaxed text-black/70">{f.a}</p>
                </div>
              ))}
            </div>
          </Card>
        ) : null}
      </Section>

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}
    </>
  );
}
