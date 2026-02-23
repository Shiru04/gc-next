import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { BUSINESS } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import Image from "next/image";

export const metadata = buildMetadata({
  title: "About | GC Heating & Cooling",
  description:
    "Family-owned HVAC company serving Los Angeles & Orange County with friendly, reliable installation, repair, and maintenance.",
  path: "/about",
});

function CheckIcon() {
  return (
    <span
      aria-hidden="true"
      className="mt-[2px] inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-red/10 text-brand-red"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
        <path d="M9.0 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
      </svg>
    </span>
  );
}

function ValueIcon({ kind }: { kind: string }) {
  const common = "h-7 w-7 text-white";
  switch (kind) {
    case "shield":
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 2 4 5v6c0 5.55 3.84 10.74 8 11 4.16-.26 8-5.45 8-11V5l-8-3zm0 18.02c-2.94-.5-6-4.55-6-9.02V6.3l6-2.25 6 2.25V11c0 4.47-3.06 8.52-6 9.02z"
          />
        </svg>
      );
    case "list":
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
          <path
            fill="currentColor"
            d="M7 5h14v2H7V5zm0 6h14v2H7v-2zm0 6h14v2H7v-2zM3 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
          />
        </svg>
      );
    case "id":
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
          <path
            fill="currentColor"
            d="M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h5v2H8V8zm0 4h8v2H8v-2zm0 4h6v2H8v-2z"
          />
        </svg>
      );
    case "star":
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
          <path
            fill="currentColor"
            d="m12 17.3-6.18 3.73 1.64-7.03L2 9.24l7.19-.61L12 2l2.81 6.63 7.19.61-5.46 4.76 1.64 7.03z"
          />
        </svg>
      );
    case "card":
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
          <path
            fill="currentColor"
            d="M20 6H4c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 4H4V8h16v2zm-9 6H4v-2h7v2z"
          />
        </svg>
      );
    case "calendar":
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
          <path
            fill="currentColor"
            d="M7 2h2v2h6V2h2v2h3v18H4V4h3V2zm13 6H6v12h14V8z"
          />
        </svg>
      );
    case "gear":
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
          <path
            fill="currentColor"
            d="M19.14 12.94c.04-.31.06-.63.06-.94s-.02-.63-.06-.94l2.03-1.58-1.92-3.32-2.39.96a7.2 7.2 0 0 0-1.63-.94l-.36-2.54H9.13l-.36 2.54c-.58.23-1.12.54-1.63.94l-2.39-.96-1.92 3.32 2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94L2.83 14.5l1.92 3.32 2.39-.96c.5.4 1.05.71 1.63.94l.36 2.54h5.74l.36-2.54c.58-.23 1.12-.54 1.63-.94l2.39.96 1.92-3.32-2.03-1.56zM12 15.5A3.5 3.5 0 1 1 12 8a3.5 3.5 0 0 1 0 7.5z"
          />
        </svg>
      );
    case "user":
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5z"
          />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
          <circle cx="12" cy="12" r="9" fill="currentColor" />
        </svg>
      );
  }
}

export default function AboutPage() {
  const bullets = [
    "Licensed, bonded & insured (peace of mind).",
    "Clear communication, no surprises.",
    "Repairs, maintenance & new installations done right.",
    "Serving Los Angeles & Orange County since 1999.",
  ];

  const values = [
    {
      title: "Peace of mind",
      desc: "We’re licensed, bonded, and insured for liability and workers compensation.",
      icon: "shield",
    },
    {
      title: "Transparency",
      desc: "Clear options, simple explanations, and upfront recommendations.",
      icon: "list",
    },
    {
      title: "Trustworthy",
      desc: "A local, family-operated team focused on long-term relationships.",
      icon: "id",
    },
    {
      title: "Proven record",
      desc: "Strong customer satisfaction and repeat clients across LA & OC.",
      icon: "star",
    },
    {
      title: "Financing",
      desc: "Options available to make comfort upgrades easier to afford.",
      icon: "card",
    },
    {
      title: "Scheduled service",
      desc: "Maintenance plans to protect equipment life and efficiency.",
      icon: "calendar",
    },
    {
      title: "Reliable",
      desc: "Quality installs and repairs with warranty-backed workmanship.",
      icon: "gear",
    },
    {
      title: "Personalized service",
      desc: "Every home is different — we size and design properly, not guess.",
      icon: "user",
    },
  ];

  return (
    <>
      {/* HERO (LCP optimized) */}
      <Section className="pt-10 sm:pt-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="text-sm font-extrabold tracking-wide text-black/60">
              GC HEATING & COOLING
            </div>

            <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Quality service <span className="text-brand-red">since 1999</span>
            </h1>

            <p className="mt-4 text-lg text-black/70">
              Family-operated HVAC company focused on comfort, value, and
              professional workmanship — proudly serving Los Angeles and Orange
              County.
            </p>

            <ul className="mt-6 space-y-3 text-black/75">
              {bullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <CheckIcon />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
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

            <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-black/60">
              <span className="font-semibold text-black/70">
                {BUSINESS.trustLine}
              </span>
              <span aria-hidden="true">•</span>
              <span>{BUSINESS.licenseLabel}</span>
              <span aria-hidden="true">•</span>
              <span>Fast scheduling + friendly support</span>
            </div>
          </div>

          <Card className="overflow-hidden">
            {/* 
              Key LCP trick:
              - DO NOT use `fill` unless necessary; use width/height for stable sizing + faster layout.
              - Use `priority`
              - Provide `sizes` that matches layout breakpoints
              - Keep a consistent aspect ratio so CLS is 0.
            */}
            <div className="p-0">
              <div className="relative">
                <Image
                  src="/hero/about-hero.webp"
                  alt="Golden Gate Bridge – serving Los Angeles and Orange County"
                  width={1200}
                  height={900}
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="h-auto w-full object-cover"
                />

                {/* badge */}
                <div className="absolute left-4 top-4 rounded-2xl bg-white/90 px-4 py-3 shadow-soft backdrop-blur">
                  <div className="text-xs font-extrabold tracking-wide text-black/60">
                    SERVING
                  </div>
                  <div className="text-sm font-extrabold">
                    Los Angeles & Orange County
                  </div>
                  <div className="mt-1 text-xs text-black/60">
                    Repairs • Maintenance • Installations
                  </div>
                </div>

                {/* CTA strip */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex flex-col gap-3 rounded-2xl bg-white/90 p-4 shadow-soft backdrop-blur sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="text-sm font-extrabold">
                        Need help today?
                      </div>
                      <div className="text-sm text-black/70">
                        Call now or book an on-site consultation.
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        href={`tel:${BUSINESS.phoneE164}`}
                        variant="secondary"
                      >
                        Call
                      </Button>
                      <Button href={BUSINESS.bookingUrl} variant="primary">
                        Book
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* small footer under image (no heavy overlays) */}
              <div className="border-t border-black/10 bg-white px-5 py-4">
                <div className="text-sm text-black/70">
                  Licensed • Bonded • Insured • {BUSINESS.licenseLabel}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* VALUE GRID */}
      <Section className="bg-brand-gray">
        <div className="text-center">
          <div className="text-xs font-extrabold tracking-wide text-black/60">
            OUR VALUE
          </div>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Why choose us?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-black/70">
            We combine professional HVAC workmanship with a family-operated
            approach — clear communication, reliable results, and respect for
            your home.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <Card key={v.title} className="overflow-hidden">
              <div className="flex items-center gap-3 bg-brand-red p-5">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15">
                  <ValueIcon kind={v.icon} />
                </div>
                <div className="text-lg font-extrabold text-white">
                  {v.title}
                </div>
              </div>
              <div className="p-5">
                <p className="text-black/70">{v.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* MID CTA */}
      <Section>
        <Card className="overflow-hidden">
          <div className="grid gap-6 p-7 sm:p-10 lg:grid-cols-[1.4fr,1fr] lg:items-center">
            <div>
              <div className="text-sm font-extrabold tracking-wide text-black/60">
                READY TO GET COMFORT BACK?
              </div>
              <h3 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                Talk to a technician — get a clear recommendation.
              </h3>
              <p className="mt-3 text-black/70">
                Whether you need a fast repair, seasonal maintenance, or a new
                system quote, we’ll help you choose the right option for your
                home and budget.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  href={`tel:${BUSINESS.phoneE164}`}
                  variant="primary"
                  size="lg"
                >
                  Call {BUSINESS.phoneDisplay}
                </Button>
                <Button
                  href={BUSINESS.bookingUrl}
                  variant="secondary"
                  size="lg"
                >
                  Book On-Site Consultation
                </Button>
              </div>

              <div className="mt-4 text-sm text-black/60">
                {BUSINESS.trustLine} • {BUSINESS.licenseLabel}
              </div>
            </div>

            <div className="rounded-2xl bg-brand-gray p-6">
              <div className="text-sm font-extrabold">What you can expect</div>
              <ul className="mt-4 space-y-3 text-black/70">
                <li className="flex gap-3">
                  <CheckIcon />
                  <span>Fast scheduling and clear next steps.</span>
                </li>
                <li className="flex gap-3">
                  <CheckIcon />
                  <span>Options explained in plain English.</span>
                </li>
                <li className="flex gap-3">
                  <CheckIcon />
                  <span>Respect for your home and clean work.</span>
                </li>
                <li className="flex gap-3">
                  <CheckIcon />
                  <span>Quality parts + warranty-backed workmanship.</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </Section>

      {/* STORY / TRUST */}
      <Section className="bg-brand-gray">
        <div className="grid gap-8 lg:grid-cols-3">
          <Card className="p-7">
            <div className="text-sm font-extrabold tracking-wide text-black/60">
              OUR STORY
            </div>
            <h3 className="mt-2 text-2xl font-extrabold">
              Built on craftsmanship and customer care.
            </h3>
            <p className="mt-3 text-black/70">
              GC Heating & Cooling has served local homeowners since 1999 with
              one goal: deliver professional HVAC service that feels honest,
              clear, and dependable — every time.
            </p>
          </Card>

          <Card className="p-7">
            <div className="text-sm font-extrabold tracking-wide text-black/60">
              CREDENTIALS
            </div>
            <h3 className="mt-2 text-2xl font-extrabold">
              Licensed. Bonded. Insured.
            </h3>
            <p className="mt-3 text-black/70">
              We maintain the protections and professionalism you should expect
              from a contractor working in your home.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button href={BUSINESS.bookingUrl} variant="primary">
                Book Now
              </Button>
              <Button href={`tel:${BUSINESS.phoneE164}`} variant="secondary">
                Call
              </Button>
            </div>
          </Card>

          <Card className="p-7">
            <div className="text-sm font-extrabold tracking-wide text-black/60">
              SERVICE AREA
            </div>
            <h3 className="mt-2 text-2xl font-extrabold">
              Los Angeles & Orange County
            </h3>
            <p className="mt-3 text-black/70">
              From repairs to full installations, we’re set up for the local
              climate demands and typical home layouts across LA & OC.
            </p>
            <div className="mt-5 rounded-2xl bg-white p-4">
              <div className="text-sm font-extrabold">Popular requests</div>
              <div className="mt-2 text-sm text-black/70">
                AC not cooling • Furnace issues • Maintenance tune-ups • New
                system estimates
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* FINAL CTA */}
      <Section>
        <Card className="overflow-hidden">
          <div className="flex flex-col gap-5 p-7 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="text-sm font-extrabold tracking-wide text-black/60">
                GET STARTED
              </div>
              <h3 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                Call now or book online — we’ll take it from there.
              </h3>
              <div className="mt-2 text-black/70">
                Fast scheduling • Clear options • Professional workmanship
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
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
        </Card>
      </Section>
    </>
  );
}
