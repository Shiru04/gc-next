import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { BUSINESS } from "@/lib/constants";
import { SERVICES } from "@/lib/services";
import { REVIEW_BADGES, REVIEWS } from "@/lib/reviews";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import Image from "next/image";

function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="text-brand-red">
          {i < full ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}

const ASSETS = {
  heroFamily: "/hero/home-hero.webp",
  redGradient: "/brand/red-gradient.webp",
  reviewsBg: "/sections/reviews-bg.webp",
  techWorking: "/sections/tech-working.webp",
  trust: [
    {
      src: "/trust/american-standard.webp",
      alt: "American Standard Customer Care Dealer",
    },
    { src: "/trust/angieslist.webp", alt: "Angi's List" },
    { src: "/trust/homeadvisor.webp", alt: "HomeAdvisor" },
  ],
};

/**

 * Solo 3 servicios principales: Installation, Repairs, Maintenance.
 * Se filtra por includes para que sea robusto contra slugs distintos.
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

  // Si algo no existe por naming raro, caemos al siguiente match “parecido”
  const fallback = candidates.filter(
    (x) => x !== maintenance && x !== repair && x !== install,
  );

  return [install, repair, maintenance]
    .filter(Boolean)
    .concat(fallback)
    .slice(0, 3);
}

/**
 * Imagen por servicio (estilo Wix).
 * Ajusta estas rutas si tus imágenes viven en otro path dentro de /public.
 */
function getServiceCardImage(slug: string) {
  const s = (slug ?? "").toLowerCase();

  // Si tus imágenes están organizadas como /public/services/<category>/<category>-hero.webp
  if (s.includes("maintenance"))
    return "/services/maintenance/maintenance-hero.webp";
  if (s.includes("repair") || s.includes("repairs"))
    return "/services/repairs/repairs-hero.webp";
  if (s.includes("install") || s.includes("installation"))
    return "/services/installation/installation-hero.webp";

  // Fallback seguro
  return "/hero/services-hero.webp";
}

export default function HomePage() {
  const top3 = pickTop3CoreServices();
  return (
    <>
      {/* HERO */}
      <Section className="pt-10 sm:pt-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="text-sm font-extrabold tracking-wide text-black/60">
              AIR CONDITIONING & HEATING
            </div>

            <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
              High-quality, affordable HVAC services for your home or business
            </h1>

            <p className="mt-4 text-lg text-black/70">
              Expert repairs, maintenance, and installation — proudly serving
              Los Angeles and Orange County.
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

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-black/60">
              <span className="font-semibold">{BUSINESS.trustLine}</span>
              <span>•</span>
              <span className="font-semibold">{BUSINESS.licenseLabel}</span>
              <span>•</span>
              <span>{BUSINESS.cityStateZip}</span>
            </div>

            {/* TRUST LOGOS (como Wix) */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {ASSETS.trust.map((x) => (
                <div
                  key={x.src}
                  className="
          flex items-center justify-center
          rounded-2xl bg-white
          ring-1 ring-black/10 shadow-soft
          px-4 py-3
          h-16 sm:h-20
        "
                >
                  {/* logos: chiquitos + srcset real */}
                  <ResponsiveImage
                    srcBase={x.src.replace(".webp", "")}
                    alt={x.alt}
                    widths={[64, 96, 128, 192, 256]}
                    sizes="(min-width: 640px) 180px, 45vw"
                    className="object-contain p-2"
                    disableSrcSet
                  />
                </div>
              ))}
            </div>

            {/* Proof row (tu layout original) */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <Card className="p-4">
                <div className="text-2xl font-extrabold">25+</div>
                <div className="text-sm text-black/60">Years experience</div>
              </Card>
              <Card className="p-4">
                <div className="text-2xl font-extrabold">10,000+</div>
                <div className="text-sm text-black/60">Happy clients</div>
              </Card>
              <Card className="p-4 sm:col-span-1 col-span-2">
                <div className="text-2xl font-extrabold">12+</div>
                <div className="text-sm text-black/60">Qualified experts</div>
              </Card>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative overflow-hidden rounded-3xl border border-black/10 shadow-sm min-h-[520px] lg:min-h-[560px]">
            <ResponsiveImage
              srcBase={ASSETS.heroFamily.replace(".webp", "")}
              alt="Comfortable home with HVAC airflow"
              fill
              priority
              widths={[420, 640, 768, 960, 1200]}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />

            <div className="absolute inset-x-0 bottom-10 flex justify-center px-8 sm:px-10">
              <div className="w-full max-w-md rounded-2xl bg-white/85 p-6 shadow-xl border border-white/40 md:backdrop-blur-md md:bg-white/75">
                <div className="text-xs font-bold uppercase tracking-wide text-black/50">
                  Serving
                </div>
                <div className="mt-1 text-lg font-extrabold">
                  Los Angeles &amp; Orange County
                </div>
                <div className="mt-2 text-sm text-black/70">
                  Reliable scheduling. Clear options. Professional workmanship.
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* TRUST BADGES (ratings) - dejamos esto pero ya no es lo único */}
      <Section className="py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {REVIEW_BADGES.map((b) => (
            <Card key={b.label} className="p-4 text-center">
              <div className="text-sm font-extrabold">{b.label}</div>
              <div className="mt-2 text-3xl font-extrabold">
                {b.rating.toFixed(1)}
              </div>
              <div className="mt-1 text-xs text-black/60">
                {b.count} reviews
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* SATISFACTION / TECH (como Wix) */}
      <Section className="py-12 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
          <div className="relative overflow-hidden rounded-3xl border border-black/10 shadow-sm min-h-[320px] sm:min-h-[380px] lg:min-h-[420px]">
            <ResponsiveImage
              srcBase={ASSETS.techWorking.replace(".webp", "")}
              alt="Technician working on HVAC system"
              fill
              widths={[420, 640, 768, 960]}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent" />
          </div>

          <div className="flex flex-col justify-center">
            <div className="text-sm font-extrabold tracking-wide text-black/60">
              ONE OF A KIND CUSTOMER SERVICE
            </div>
            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
              The 100% customer satisfaction is not just a slogan
            </h2>
            <p className="mt-4 text-black/70">
              We take responsibility to make sure customers are completely
              satisfied. Our phones are answered immediately and our team is
              ready to help.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4 rounded-3xl bg-black/[0.03] p-6 ring-1 ring-black/10">
              <div className="text-center">
                <div className="text-3xl font-extrabold tracking-tight">
                  25+
                </div>
                <div className="mt-1 text-sm text-black/60">
                  Years of experience
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-extrabold tracking-tight">
                  10,000+
                </div>
                <div className="mt-1 text-sm text-black/60">Happy clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-extrabold tracking-tight">
                  12+
                </div>
                <div className="mt-1 text-sm text-black/60">
                  Qualified experts
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button href="/services" variant="primary" size="lg">
                Browse our services
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* SERVICES (solo 3 principales) con imagen por card */}
      <Section className="relative overflow-hidden text-white">
        <div className="absolute inset-0">
          <Image
            src={ASSETS.redGradient}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-brand-red/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/15" />
        </div>

        <div className="relative">
          <div className="text-center">
            <div className="text-sm font-extrabold tracking-wide text-white/85">
              OUR SERVICES
            </div>
            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
              Residential and commercial HVAC services
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-white/90">
              From fast repairs to complete installations — we&apos;ll help you
              get comfortable and stay efficient.
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
                    <Image
                      src={img}
                      alt={s.name}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />
                  </div>

                  <div className="p-6">
                    <div className="text-xl font-extrabold">{s.name}</div>
                    <p className="mt-2 text-black/70">{s.short}</p>

                    <div className="mt-5">
                      <Button
                        href={`/services/${s.slug}`}
                        variant="primary"
                        size="md"
                      >
                        Read more
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="mt-6 text-center">
            <Button href="/services" variant="secondary" size="lg">
              Browse all services
            </Button>
          </div>
        </div>
      </Section>

      {/* REVIEWS con background (como Wix) */}
      <Section className="relative overflow-hidden py-14">
        <div className="absolute inset-0">
          <Image
            src={ASSETS.reviewsBg}
            alt="GC Branding Reviews"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/35" />
        </div>

        <div className="relative">
          <div className="text-center text-white">
            <div className="text-sm font-extrabold tracking-wide text-white/85">
              WHAT OUR CUSTOMERS SAY
            </div>
            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
              Trusted by homeowners across LA &amp; OC
            </h2>
          </div>

          <div className="mx-auto mt-8 max-w-4xl">
            <Card className="p-6 sm:p-8 bg-white/85 backdrop-blur-md ring-1 ring-white/40 shadow-xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-extrabold">
                    {REVIEWS[0]?.name ?? "Customer"}
                  </div>
                  <div className="text-sm text-black/60">
                    {REVIEWS[0]?.source ?? "Google"} •{" "}
                    {REVIEWS[0]?.date ?? "Recently"}
                  </div>
                </div>
                <Stars rating={REVIEWS[0]?.rating ?? 5} />
              </div>
              <p className="mt-4 text-black/75">
                {REVIEWS[0]?.text ??
                  "Great service, clear communication, and professional workmanship. Highly recommended."}
              </p>

              <div className="mt-6">
                <Button href="/reviews" variant="secondary" size="md">
                  View all reviews
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* CTA final con red-gradient */}
      <Section className="relative overflow-hidden text-white">
        <div className="absolute inset-0">
          <Image
            src={ASSETS.redGradient}
            alt="'GC Red branding"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-brand-red/75" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />
        </div>

        <div className="relative text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Ready to make your home or business comfortable no matter how the
            weather is outside?
          </h2>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button
              href={`tel:${BUSINESS.phoneE164}`}
              variant="secondary"
              size="lg"
            >
              Call {BUSINESS.phoneDisplay}
            </Button>
            <Button href={BUSINESS.bookingUrl} variant="primary" size="lg">
              Book Onsite Consultation
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
