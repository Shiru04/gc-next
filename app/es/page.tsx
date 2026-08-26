import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { BUSINESS } from "@/lib/constants";
import { SERVICES } from "@/lib/services.es";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { SectionBlock } from "@/components/sections/SectionBlock";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { fetchGoogleReviews } from "@/lib/google-reviews";
import { aggregateRatingSchema, reviewSchema } from "@/lib/schema";

/**
 * Solo 3 servicios principales: Installation, Repairs, Maintenance.
 */
function pickTop3CoreServices() {
  const candidates = SERVICES.map((s) => ({
    ...s,
    _slug: (s.slug ?? "").toLowerCase(),
    _name: (s.name ?? "").toLowerCase(),
  }));

  const isMaintenance = (x: any) =>
    x._slug.includes("maintenance") || x._name.includes("maintenance");
  const isRepair = (x: any) =>
    x._slug.includes("repair") ||
    x._slug.includes("repairs") ||
    x._name.includes("repair");
  const isInstall = (x: any) =>
    x._slug.includes("install") ||
    x._slug.includes("installation") ||
    x._name.includes("install");

  const maintenance = candidates.find(isMaintenance);
  const repair = candidates.find(isRepair);
  const install = candidates.find(isInstall);

  const fallback = candidates.filter(
    (x) => x !== maintenance && x !== repair && x !== install,
  );

  return [install, repair, maintenance]
    .filter(Boolean)
    .concat(fallback)
    .slice(0, 3);
}

function getServiceCardImage(slug: string) {
  const s = (slug ?? "").toLowerCase();
  if (s.includes("maintenance"))
    return "/services/maintenance/maintenance-hero.webp";
  if (s.includes("repair") || s.includes("repairs"))
    return "/services/repairs/repairs-hero.webp";
  if (s.includes("install") || s.includes("installation"))
    return "/services/installation/installation-hero.webp";
  return "/hero/services-hero.webp";
}

const ASSETS = {
  heroFamily: "/hero/home-hero.webp",
  redGradient: "/brand/red-gradient.webp",
  techWorking: "/sections/tech-working.webp",
  trust: [
    {
      src: "/trust/american-standard.webp",
      alt: "American Standard Customer Care Dealer",
      widths: [96, 128, 192, 256],
    },
    { src: "/trust/angieslist.webp", alt: "Angi's List", widths: [64, 96, 128, 192] },
    { src: "/trust/homeadvisor.webp", alt: "HomeAdvisor", widths: [64, 96, 128, 192] },
  ],
};

export default async function HomePage() {
  const top3 = pickTop3CoreServices();
  const googleData = await fetchGoogleReviews();

  return (
    <>
      {/* JSON-LD: aggregate rating + individual reviews for SEO */}
      {googleData ? (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(
                aggregateRatingSchema(googleData.rating, googleData.totalReviews),
              ),
            }}
          />
          {googleData.reviews.map((r) => (
            <script
              key={r.author_name}
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(
                  reviewSchema(r.author_name, r.text, r.rating),
                ),
              }}
            />
          ))}
        </>
      ) : null}

      {/* ═══════════════════════════════════════
          HERO — improved hierarchy & badge space
          ═══════════════════════════════════════ */}
      <Section className="pt-10 sm:pt-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="text-sm font-extrabold tracking-wide text-brand-red">
              AIRE ACONDICIONADO Y CALEFACCIÓN
            </div>

            <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
              Servicios HVAC asequibles y de alta calidad para su hogar o negocio
            </h1>

            <p className="mt-4 max-w-xl text-lg leading-relaxed text-black/70">
              Reparaciones, mantenimiento e instalación de expertos: sirviendo con orgullo
              Los Ángeles y el condado de Orange.
            </p>

            {/* CTAs */}
            <div className="mt-7 flex flex-wrap gap-3">
              <Button
                href={BUSINESS.bookingUrl}
                variant="primary"
                size="lg"
                cta={{
                  id: "home-hero-book",
                  location: "home-hero",
                  type: "booking",
                }}
              >
                Reservar consulta in situ
              </Button>
              <Button
                href={`tel:${BUSINESS.phoneE164}`}
                variant="secondary"
                size="lg"
                cta={{
                  id: "home-hero-call",
                  location: "home-hero",
                  type: "phone",
                }}
              >
                Llamar {BUSINESS.phoneDisplay}
              </Button>
            </div>

            {/* Trust line */}
            <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-black/60">
              <span className="font-semibold">{BUSINESS.trustLine}</span>
              <span aria-hidden>•</span>
              <span className="font-semibold">{BUSINESS.licenseLabel}</span>
              <span aria-hidden>•</span>
              <span>{BUSINESS.cityStateZip}</span>
            </div>

            {/* License badges container — ready for future assets */}
            <div className="mt-8" aria-label="Insignias de licencia y certificación">
              <div className="grid gap-3 sm:grid-cols-3">
                {ASSETS.trust.map((x) => (
                  <div
                    key={x.src}
                    className="relative rounded-2xl bg-white ring-1 ring-black/10 shadow-soft px-4 py-3 h-[100px] sm:h-[110px] flex items-center justify-center"
                  >
                    <ResponsiveImage
                      srcBase={x.src.replace(".webp", "")}
                      alt={x.alt}
                      widths={x.widths}
                      sizes="128px"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-black/55">
                <span className="font-semibold text-black/60">Confiable</span>
                <span>•</span>
                <span>Licenciado y asegurado</span>
                <span className="hidden sm:inline">•</span>
                <span className="hidden sm:inline">
                  Calificado por propietarios de viviendas en Los Ángeles y OC
                </span>
              </div>
            </div>

            {/* Proof metrics */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <Card className="p-4">
                <div className="text-2xl font-extrabold">25+</div>
                <div className="text-sm text-black/60">años de experiencia</div>
              </Card>
              <Card className="p-4">
                <div className="text-2xl font-extrabold">10,000+</div>
                <div className="text-sm text-black/60">Clientes felices</div>
              </Card>
              <Card className="p-4 col-span-2 sm:col-span-1">
                <div className="text-2xl font-extrabold">12+</div>
                <div className="text-sm text-black/60">Expertos calificados</div>
              </Card>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative overflow-hidden rounded-3xl border border-black/10 shadow-sm min-h-[520px] lg:min-h-[560px]">
            <ResponsiveImage
              srcBase={ASSETS.heroFamily.replace(".webp", "")}
              alt="Hogar cómodo con flujo de aire HVAC"
              fill
              priority
              widths={[420, 640, 768]}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />

            <div className="absolute inset-x-0 bottom-10 flex justify-center px-8 sm:px-10">
              <div className="w-full max-w-md rounded-2xl bg-white/85 p-6 shadow-xl border border-white/40 md:backdrop-blur-md md:bg-white/75">
                <div className="text-xs font-bold uppercase tracking-wide text-black/65">
                  Servicio
                </div>
                <div className="mt-1 text-lg font-extrabold">
                  Los Ángeles y el condado de Orange
                </div>
                <div className="mt-2 text-sm text-black/70">
                  Programación confiable. Opciones claras. Mano de obra profesional.
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════
          SATISFACTION — alternating layout (text left, image right)
          ═══════════════════════════════════════ */}
      <SectionBlock
        eyebrow="SERVICIO AL CLIENTE ÚNICO EN SU TIPO"
        title="La satisfacción del cliente al 100% no es sólo un eslogan"
        description="Asumimos la responsabilidad de asegurarnos de que los clientes estén completamente satisfechos. Nuestros teléfonos son respondidos de inmediato y nuestro equipo está listo para ayudar."
        media={{
          src: ASSETS.techWorking,
          alt: "Technician working on HVAC system",
        }}
      >
        <div className="grid grid-cols-3 gap-4 rounded-3xl bg-black/[0.03] p-6 ring-1 ring-black/10">
          <div className="text-center">
            <div className="text-3xl font-extrabold tracking-tight">25+</div>
            <div className="mt-1 text-sm text-black/60">Años de experiencia</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-extrabold tracking-tight">10,000+</div>
            <div className="mt-1 text-sm text-black/60">Clientes felices</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-extrabold tracking-tight">12+</div>
            <div className="mt-1 text-sm text-black/60">Expertos calificados</div>
          </div>
        </div>
        <div className="mt-6">
          <Button href="/es/servicios" variant="primary" size="lg">
            Explora nuestros servicios
          </Button>
        </div>
      </SectionBlock>

      {/* ═══════════════════════════════════════
          SERVICES — 3 core (red section)
          ═══════════════════════════════════════ */}
      <Section className="relative overflow-hidden text-white">
        <div className="absolute inset-0">
          <ResponsiveImage
            srcBase="/brand/red-gradient"
            alt="Fondo degradado rojo"
            fill
            widths={[640, 960, 1280, 1600]}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-brand-red/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/15" />
        </div>

        <div className="relative">
          <div className="text-center">
            <div className="text-sm font-extrabold tracking-wide text-white/85">
              NUESTROS SERVICIOS
            </div>
            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
              Servicios de climatización residencial y comercial.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-white/90">
              Desde reparaciones rápidas hasta instalaciones completas, le ayudaremos
              Póngase cómodo y manténgase eficiente.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {top3.map((s: any) => {
              const img = getServiceCardImage(s.slug);
              return (
                <Card
                  key={s.slug}
                  className="overflow-hidden bg-white text-brand-black ring-1 ring-black/10 shadow-soft"
                >
                  <div className="relative h-44">
                    <ResponsiveImage
                      srcBase={img.replace(".webp", "")}
                      alt={s.name}
                      fill
                      widths={[420, 640, 820]}
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-extrabold">{s.name}</h3>
                    <p className="mt-2 text-black/70">{s.short}</p>
                    <div className="mt-5">
                      <Button
                        href={`/${s.audience}/${s.slug}`}
                        variant="primary"
                        size="md"
                      >
                        Leer más<span className="sr-only"> about {s.name}</span>
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="mt-6 text-center">
            <Button href="/es/servicios" variant="secondary" size="lg">
              Explorar todos los servicios
            </Button>
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════
          REVIEWS — new ReviewsSection component
          ═══════════════════════════════════════ */}
      <Section className="bg-brand-gray">
        <ReviewsSection googleData={googleData} limit={4} showViewAll showBadges />
      </Section>

      {/* ═══════════════════════════════════════
          CTA final
          ═══════════════════════════════════════ */}
      <Section className="relative overflow-hidden text-white">
        <div className="absolute inset-0">
          <ResponsiveImage
            srcBase="/brand/red-gradient"
            alt="Fondo degradado rojo"
            fill
            widths={[640, 960, 1280, 1600]}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-brand-red/75" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />
        </div>

        <div className="relative text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl max-w-3xl mx-auto">
            Listo para hacer cómodo su hogar o negocio sin importar el
            ¿el clima?
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-white/85">
            Programación rápida, opciones claras y mano de obra profesional: cada
            tiempo.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button
              href={`tel:${BUSINESS.phoneE164}`}
              variant="secondary"
              size="lg"
              cta={{
                id: "home-footer-cta-call",
                location: "home-final-cta",
                type: "phone",
              }}
            >
              Llamar {BUSINESS.phoneDisplay}
            </Button>
            <Button
              href={BUSINESS.bookingUrl}
              variant="primary"
              size="lg"
              cta={{
                id: "home-footer-cta-book",
                location: "home-final-cta",
                type: "booking",
              }}
            >
              Reservar consulta in situ
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
