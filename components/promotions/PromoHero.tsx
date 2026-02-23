// components/promotions/PromoHero.tsx
import Image from "next/image";

export function PromoHero({
  kicker,
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
}: {
  kicker: string;
  headline: string;
  subheadline: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/hero/promotions-hero.webp"
          alt="HVAC service technician"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="max-w-2xl">
          <p className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/15">
            {kicker}
          </p>

          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white md:text-6xl">
            {headline}
          </h1>

          <p className="mt-5 text-base leading-relaxed text-white/90 md:text-lg">
            {subheadline}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={primaryCta.href}
              className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-bold text-black shadow-sm transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/60"
            >
              {primaryCta.label}
            </a>

            <a
              href={secondaryCta.href}
              className="inline-flex items-center justify-center rounded-xl bg-white/10 px-6 py-3 text-sm font-bold text-white ring-1 ring-white/20 transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/60"
            >
              {secondaryCta.label}
            </a>
          </div>

          <p className="mt-4 text-xs text-white/75">
            Serving Los Angeles & Orange County • Licensed, Bonded & Insured
          </p>
        </div>
      </div>
    </section>
  );
}
