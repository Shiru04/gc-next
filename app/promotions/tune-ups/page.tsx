// app/promotions/tune-ups/page.tsx
import { Metadata } from "next";
import { SITE } from "@/lib/site";
import { PROMOTIONS } from "@/lib/promotions";
import { PromoHero } from "@/components/promotions/PromoHero";
import { OfferCard } from "@/components/promotions/OfferCard";
import { PointsGrid } from "@/components/promotions/PointsGrid";
import { FAQ } from "@/components/promotions/FAQ";
import { PromoJsonLd } from "@/components/promotions/PromoJsonLd";

const promo = PROMOTIONS["tune-ups"];

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

export default function TuneUpsPromoPage() {
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
              A small step now saves you big later.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-700">
              Regular maintenance keeps your system efficient and reliable. A
              seasonal tune-up helps catch small issues early, lowers your energy
              bills, and protects the life of your equipment—so you’re not caught
              off guard when you need it most.
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
              <p className="text-sm font-bold">Ready to schedule your tune-up?</p>
              <p className="mt-2 text-sm text-white/85">
                Book online or call and mention coupon code <strong>GC149</strong>.
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <a
                  href={promo.ctaPrimary.href}
                  className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-black transition hover:opacity-90"
                >
                  {promo.ctaPrimary.label}
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
            $149 Tune-Up — use coupon code GC149
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-white/90">
            Keep your system running efficiently all season long. Schedule your
            tune-up online or give us a call. Regular price $199; coupon saves $50.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={promo.ctaPrimary.href}
              className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-extrabold text-black transition hover:opacity-90"
            >
              {promo.ctaPrimary.label}
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
