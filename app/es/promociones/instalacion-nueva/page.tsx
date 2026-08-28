// app/promotions/new-installation/page.tsx
import { Metadata } from "next";
import { SITE } from "@/lib/site";
import { PROMOTIONS } from "@/lib/promotions.es";
import { PromoHero } from "@/components/promotions/PromoHero";
import { OfferCard } from "@/components/promotions/OfferCard";
import { PointsGrid } from "@/components/promotions/PointsGrid";
import { FAQ } from "@/components/promotions/FAQ";
import { PromoJsonLd } from "@/components/promotions/PromoJsonLd";

const promo = PROMOTIONS["new-installation"];

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

export default function NewInstallationPromoPage() {
  const pageUrl = promo.slug; // en export estático, lo dejamos relativo; luego si tienes dominio lo cambiamos.
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
              Mejora la comodidad. Mejorar la eficiencia. Instálelo limpio.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-700">
              Si su sistema tiene problemas, está sobredimensionado/infradimensionado o constantemente
              necesitar reparaciones, una nueva instalación puede reducir las averías y
              mejorar la comodidad. Le recomendaremos la opción correcta según su
              casa y goles.
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
              <p className="text-sm font-bold">Obtenga su estimado HVAC gratuito</p>
              <p className="mt-2 text-sm text-white/85">
                Obtenga un estimado gratuito de instalación o reemplazo antes de elegir una cita.
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
                  Llamar {SITE.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900 md:text-3xl">
            Preguntas frecuentes
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-neutral-700">
            Respuestas rápidas antes de reservar.
          </p>
          <div className="mt-6">
            <FAQ items={promo.faq} />
          </div>
        </section>

        <section className="mt-14 rounded-3xl bg-red-600 px-7 py-10 text-white">
          <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
            Estimados HVAC gratuitos para Los Ángeles y el condado de Orange
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-white/90">
            Comience con un estimado gratuito en sitio. Le recomendaremos la mejor opción de instalación para su hogar.
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
              Llamar {SITE.phoneDisplay}
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
