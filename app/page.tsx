import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { BUSINESS } from "@/lib/constants";
import { SERVICES } from "@/lib/services";
import { REVIEW_BADGES, REVIEWS } from "@/lib/reviews";

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

export default function HomePage() {
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

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-black/60">
              <span className="font-semibold">{BUSINESS.trustLine}</span>
              <span>•</span>
              <span className="font-semibold">{BUSINESS.licenseLabel}</span>
              <span>•</span>
              <span>{BUSINESS.cityStateZip}</span>
            </div>

            {/* Proof row */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <Card className="p-4">
                <div className="text-2xl font-extrabold">25+</div>
                <div className="text-sm text-black/60">Years experience</div>
              </Card>
              <Card className="p-4">
                <div className="text-2xl font-extrabold">10,000+</div>
                <div className="text-sm text-black/60">Happy clients</div>
              </Card>
              <Card className="p-4">
                <div className="text-2xl font-extrabold">12+</div>
                <div className="text-sm text-black/60">Qualified experts</div>
              </Card>
            </div>
          </div>

          {/* Hero media placeholder (Phase 2: you’ll drop optimized images) */}
          <Card className="overflow-hidden">
            <div className="relative h-[360px] bg-brand-gray">
              <div className="absolute inset-0 p-8">
                <div className="max-w-sm rounded-2xl bg-white/90 p-5 shadow-soft">
                  <div className="text-xs font-bold uppercase tracking-wide text-black/50">
                    Serving
                  </div>
                  <div className="mt-1 text-lg font-extrabold">
                    Los Angeles & Orange County
                  </div>
                  <div className="mt-2 text-sm text-black/70">
                    Reliable scheduling. Clear options. Professional
                    workmanship.
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* TRUST BADGES */}
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

      {/* SERVICES HIGHLIGHTS (unified) */}
      <Section className="bg-brand-red text-white">
        <div className="text-center">
          <div className="text-sm font-extrabold tracking-wide text-white/80">
            OUR SERVICES
          </div>
          <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
            Residential and commercial HVAC services
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/85">
            From fast repairs to complete installations — we’ll help you get
            comfortable and stay efficient.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {SERVICES.slice(0, 3).map((s) => (
            <Card key={s.slug} className="bg-white text-brand-black">
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
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button href="/services" variant="secondary" size="lg">
            Browse all services
          </Button>
        </div>
      </Section>

      {/* VALUE PROPS */}
      <Section>
        <div className="text-center">
          <div className="text-sm font-extrabold tracking-wide text-black/60">
            OUR VALUE
          </div>
          <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
            Why choose us?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-black/70">
            We focus on quality, clear communication, and professional service —
            with strong local reputation.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-4">
          {[
            {
              title: "Peace of mind",
              desc: "Licensed, bonded, and insured for liability and workers compensation.",
            },
            {
              title: "Transparency",
              desc: "Clear options and guidance to help you make an informed decision.",
            },
            {
              title: "Trustworthy",
              desc: "Knowledgeable team with professional workmanship standards.",
            },
            {
              title: "Financing available",
              desc: "Short and long term financing options for qualified customers.",
            },
          ].map((x) => (
            <Card key={x.title} className="p-6">
              <div className="text-lg font-extrabold">{x.title}</div>
              <p className="mt-2 text-black/70">{x.desc}</p>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button href="/financing" variant="secondary" size="lg">
            Explore financing
          </Button>
        </div>
      </Section>

      {/* REVIEWS PREVIEW */}
      <Section className="bg-brand-gray">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="text-sm font-extrabold tracking-wide text-black/60">
              WHAT CUSTOMERS SAY
            </div>
            <h2 className="mt-2 text-3xl font-extrabold">Recent feedback</h2>
          </div>
          <div className="hidden sm:block">
            <Button href="/reviews" variant="secondary" size="md">
              View all reviews
            </Button>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {REVIEWS.map((r) => (
            <Card key={`${r.name}-${r.date}`} className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-extrabold">{r.name}</div>
                  <div className="text-sm text-black/60">
                    {r.source} • {r.date}
                  </div>
                </div>
                <Stars rating={r.rating} />
              </div>
              <p className="mt-4 text-black/70">{r.text}</p>
            </Card>
          ))}
        </div>

        <div className="mt-8 sm:hidden">
          <Button href="/reviews" variant="secondary" size="lg">
            View all reviews
          </Button>
        </div>
      </Section>

      {/* CTA STRIP */}
      <Section className="bg-brand-red text-white">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Ready to make your home or business comfortable?
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-white/85">
            Talk to our team about repairs, maintenance, or a new system. We’ll
            guide you to the right option.
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
