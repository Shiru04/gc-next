// app/promotions/repairs/page.tsx
import { Metadata } from "next";
import { SITE } from "@/lib/site";
import { PROMOTIONS } from "@/lib/promotions";
import { PromoHero } from "@/components/promotions/PromoHero";
import { OfferCard } from "@/components/promotions/OfferCard";
import { PointsGrid } from "@/components/promotions/PointsGrid";
import { FAQ } from "@/components/promotions/FAQ";
import { PromoJsonLd } from "@/components/promotions/PromoJsonLd";

const promo = PROMOTIONS.repairs;

export const metadata: Metadata = {
  title: promo.metaTitle,
  description: promo.metaDescription,
  alternates: {
    canonical: promo.slug,
  },
  openGraph: {
    title: promo.metaTitle,
    description: promo.metaDescription,
    type: "website",
    url: promo.slug,
  },
};

export default function RepairsPromoPage() {
  const pageUrl = promo.slug;
  return (
    <>
      <PromoJsonLd
        pageUrl={pageUrl}
        pageName={`${SITE.name} — ${promo.pageTitle}`}
        pageDescription={promo.metaDescription}
        faq={promo.faq}
      />

      <PromoHero
        kicker={promo.heroKicker}
        headline={promo.heroHeadline}
        subheadline={promo.heroSubheadline}
        primaryCta={promo.ctaPrimary}
        secondaryCta={promo.ctaSecondary}
      />

      <main className="mx-auto max-w-6xl px-6 py-14">
        <section className="grid gap-8 md:grid-cols-2 md:items-start">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900 md:text-3xl">
              Don’t wait while your home gets hotter.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-700">
              If your AC isn’t cooling, your system is short-cycling, or you’re
              hearing unusual sounds, we’ll diagnose the problem and give you a
              clear repair plan. No vague answers—just straightforward options.
            </p>

            <div className="mt-6">
              <PointsGrid points={promo.secondaryPoints} />
            </div>
          </div>

          <div className="space-y-4">
            <OfferCard
              title={promo.primaryOfferTitle}
              value={promo.primaryOfferValue}
              details={promo.primaryOfferDetails}
            />

            <div className="rounded-2xl bg-neutral-950 p-6 text-white">
              <p className="text-sm font-bold">Need urgent scheduling?</p>
              <p className="mt-2 text-sm text-white/85">
                Book online now or call us to route you as fast as possible.
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <a
                  href={SITE.bookingUrl}
                  className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-black transition hover:opacity-90"
                >
                  Book Now
                </a>
                <a
                  href={`tel:${SITE.phoneE164}`}
                  className="inline-flex items-center justify-center rounded-xl bg-white/10 px-5 py-3 text-sm font-extrabold text-white ring-1 ring-white/20 transition hover:bg-white/15"
                >
                  Call {SITE.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900 md:text-3xl">
            FAQ
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-neutral-700">
            Common questions before you book.
          </p>
          <div className="mt-6">
            <FAQ items={promo.faq} />
          </div>
        </section>

        <section className="mt-14 rounded-3xl bg-red-600 px-7 py-10 text-white">
          <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
            Free estimates for repairs — schedule now
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-white/90">
            We’ll evaluate the issue and provide a clear estimate before repair
            work begins.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={SITE.bookingUrl}
              className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-extrabold text-black transition hover:opacity-90"
            >
              Book Now
            </a>
            <a
              href={`tel:${SITE.phoneE164}`}
              className="inline-flex items-center justify-center rounded-xl bg-black/20 px-6 py-3 text-sm font-extrabold text-white ring-1 ring-white/25 transition hover:bg-black/30"
            >
              Call {SITE.phoneDisplay}
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
