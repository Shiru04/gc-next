import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { BUSINESS } from "@/lib/constants";
import { SERVICES } from "@/lib/services";
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
              AIR CONDITIONING &amp; HEATING
            </div>

            <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
              High-quality, affordable HVAC services for your home or business
            </h1>

            <p className="mt-4 max-w-xl text-lg leading-relaxed text-black/70">
              Expert repairs, maintenance, and installation — proudly serving
              Los Angeles and Orange County.
            </p>

            {/* CTAs */}
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

            {/* Trust line */}
            <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-black/60">
              <span className="font-semibold">{BUSINESS.trustLine}</span>
              <span aria-hidden>•</span>
              <span className="font-semibold">{BUSINESS.licenseLabel}</span>
              <span aria-hidden>•</span>
              <span>{BUSINESS.cityStateZip}</span>
            </div>

            {/* License badges container — ready for future assets */}
            <div className="mt-8" aria-label="License and certification badges">
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
                <span className="font-semibold text-black/60">Trusted</span>
                <span>•</span>
                <span>Licensed &amp; Insured</span>
                <span className="hidden sm:inline">•</span>
                <span className="hidden sm:inline">
                  Rated by homeowners across LA &amp; OC
                </span>
              </div>
            </div>

            {/* Proof metrics */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <Card className="p-4">
                <div className="text-2xl font-extrabold">25+</div>
                <div className="text-sm text-black/60">Years experience</div>
              </Card>
              <Card className="p-4">
                <div className="text-2xl font-extrabold">10,000+</div>
                <div className="text-sm text-black/60">Happy clients</div>
              </Card>
              <Card className="p-4 col-span-2 sm:col-span-1">
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
              widths={[420, 640, 768]}
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

      {/* ═══════════════════════════════════════
          SATISFACTION — alternating layout (text left, image right)
          ═══════════════════════════════════════ */}
      <SectionBlock
        eyebrow="ONE OF A KIND CUSTOMER SERVICE"
        title="The 100% customer satisfaction is not just a slogan"
        description="We take responsibility to make sure customers are completely satisfied. Our phones are answered immediately and our team is ready to help."
        media={{
          src: ASSETS.techWorking,
          alt: "Technician working on HVAC system",
        }}
      >
        <div className="grid grid-cols-3 gap-4 rounded-3xl bg-black/[0.03] p-6 ring-1 ring-black/10">
          <div className="text-center">
            <div className="text-3xl font-extrabold tracking-tight">25+</div>
            <div className="mt-1 text-sm text-black/60">Years of experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-extrabold tracking-tight">10,000+</div>
            <div className="mt-1 text-sm text-black/60">Happy clients</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-extrabold tracking-tight">12+</div>
            <div className="mt-1 text-sm text-black/60">Qualified experts</div>
          </div>
        </div>
        <div className="mt-6">
          <Button href="/services" variant="primary" size="lg">
            Browse our services
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
            alt="Red gradient background"
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
                        href={`/services/${s.slug}`}
                        variant="primary"
                        size="md"
                      >
                        Read more<span className="sr-only"> about {s.name}</span>
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
            alt="Red gradient background"
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
            Ready to make your home or business comfortable no matter the
            weather?
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-white/85">
            Fast scheduling, clear options, and professional workmanship — every
            time.
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
              Book Onsite Consultation
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
