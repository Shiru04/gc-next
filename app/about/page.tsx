import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SectionBlock } from "@/components/sections/SectionBlock";
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
      className="mt-[2px] inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-red/10 text-brand-red"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
        <path d="M9.0 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
      </svg>
    </span>
  );
}

function ValueIcon({ kind }: { kind: string }) {
  const common = "h-7 w-7 text-white";
  const icons: Record<string, React.ReactNode> = {
    shield: (
      <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
        <path fill="currentColor" d="M12 2 4 5v6c0 5.55 3.84 10.74 8 11 4.16-.26 8-5.45 8-11V5l-8-3zm0 18.02c-2.94-.5-6-4.55-6-9.02V6.3l6-2.25 6 2.25V11c0 4.47-3.06 8.52-6 9.02z" />
      </svg>
    ),
    list: (
      <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
        <path fill="currentColor" d="M7 5h14v2H7V5zm0 6h14v2H7v-2zm0 6h14v2H7v-2zM3 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
      </svg>
    ),
    id: (
      <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
        <path fill="currentColor" d="M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h5v2H8V8zm0 4h8v2H8v-2zm0 4h6v2H8v-2z" />
      </svg>
    ),
    star: (
      <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
        <path fill="currentColor" d="m12 17.3-6.18 3.73 1.64-7.03L2 9.24l7.19-.61L12 2l2.81 6.63 7.19.61-5.46 4.76 1.64 7.03z" />
      </svg>
    ),
    card: (
      <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
        <path fill="currentColor" d="M20 6H4c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 4H4V8h16v2zm-9 6H4v-2h7v2z" />
      </svg>
    ),
    calendar: (
      <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
        <path fill="currentColor" d="M7 2h2v2h6V2h2v2h3v18H4V4h3V2zm13 6H6v12h14V8z" />
      </svg>
    ),
    gear: (
      <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
        <path fill="currentColor" d="M19.14 12.94c.04-.31.06-.63.06-.94s-.02-.63-.06-.94l2.03-1.58-1.92-3.32-2.39.96a7.2 7.2 0 0 0-1.63-.94l-.36-2.54H9.13l-.36 2.54c-.58.23-1.12.54-1.63.94l-2.39-.96-1.92 3.32 2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94L2.83 14.5l1.92 3.32 2.39-.96c.5.4 1.05.71 1.63.94l.36 2.54h5.74l.36-2.54c.58-.23 1.12-.54 1.63-.94l2.39.96 1.92-3.32-2.03-1.56zM12 15.5A3.5 3.5 0 1 1 12 8a3.5 3.5 0 0 1 0 7.5z" />
      </svg>
    ),
    user: (
      <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
        <path fill="currentColor" d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5z" />
      </svg>
    ),
  };

  return icons[kind] ?? (
    <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="currentColor" />
    </svg>
  );
}

export default function AboutPage() {
  const highlights = [
    { stat: "25+", label: "Years serving LA & OC" },
    { stat: "10,000+", label: "Happy clients" },
    { stat: "12+", label: "Qualified technicians" },
    { stat: "#794228", label: "CA License" },
  ];

  const values = [
    { title: "Peace of mind", desc: "Licensed, bonded, and insured for liability and workers compensation.", icon: "shield" },
    { title: "Transparency", desc: "Clear options, simple explanations, and upfront recommendations.", icon: "list" },
    { title: "Trustworthy", desc: "A local, family-operated team focused on long-term relationships.", icon: "id" },
    { title: "Proven record", desc: "Strong customer satisfaction and repeat clients across LA & OC.", icon: "star" },
    { title: "Financing", desc: "Options available to make comfort upgrades easier to afford.", icon: "card" },
    { title: "Scheduled service", desc: "Maintenance plans to protect equipment life and efficiency.", icon: "calendar" },
    { title: "Reliable", desc: "Quality installs and repairs with warranty-backed workmanship.", icon: "gear" },
    { title: "Personalized", desc: "Every home is different — we size and design properly, not guess.", icon: "user" },
  ];

  const timeline = [
    { year: "1999", event: "Founded as a family HVAC business in Southern California" },
    { year: "2005", event: "Expanded to serve all of Los Angeles & Orange County" },
    { year: "2015", event: "Became American Standard Customer Care Dealer" },
    { year: "Today", event: "25+ years, 10,000+ clients, and still family-operated" },
  ];

  return (
    <>
      {/* HERO — 2-col with highlights */}
      <Section className="pt-10 sm:pt-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="text-sm font-extrabold tracking-wide text-black/60">
              GC HEATING &amp; COOLING
            </div>

            <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Quality service{" "}
              <span className="text-brand-red">since 1999</span>
            </h1>

            <p className="mt-4 max-w-xl text-lg leading-relaxed text-black/70">
              Family-operated HVAC company focused on comfort, value, and
              professional workmanship — proudly serving Los Angeles and Orange
              County.
            </p>

            {/* Highlights grid (replaces long bullet list) */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              {highlights.map((h) => (
                <Card key={h.label} className="p-4">
                  <div className="text-2xl font-extrabold">{h.stat}</div>
                  <div className="text-sm text-black/60">{h.label}</div>
                </Card>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/schedule-service/" variant="primary" size="lg">
                Request Service
              </Button>
              <Button
                href={`tel:${BUSINESS.phoneE164}`}
                variant="secondary"
                size="lg"
              >
                Call {BUSINESS.phoneDisplay}
              </Button>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-black/60">
              <span className="font-semibold text-black/70">
                {BUSINESS.trustLine}
              </span>
              <span aria-hidden>•</span>
              <span>{BUSINESS.licenseLabel}</span>
            </div>
          </div>

          <Card className="overflow-hidden">
            <div className="p-0">
              <div className="relative">
                <Image
                  src="/hero/about-hero.webp"
                  alt="GC Heating & Cooling — serving Los Angeles and Orange County"
                  width={1200}
                  height={900}
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="h-auto w-full object-cover"
                />
                <div className="absolute left-4 top-4 rounded-2xl bg-white/90 px-4 py-3 shadow-soft backdrop-blur">
                  <div className="text-xs font-extrabold tracking-wide text-black/60">
                    SERVING
                  </div>
                  <div className="text-sm font-extrabold">
                    Los Angeles &amp; Orange County
                  </div>
                  <div className="mt-1 text-xs text-black/60">
                    Repairs • Maintenance • Installations
                  </div>
                </div>
              </div>
              <div className="border-t border-black/10 bg-white px-5 py-4">
                <div className="text-sm text-black/70">
                  Licensed • Bonded • Insured • {BUSINESS.licenseLabel}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* TIMELINE — our story as a visual timeline */}
      <Section className="bg-brand-gray">
        <div className="text-center">
          <div className="text-sm font-extrabold tracking-wide text-black/60">
            OUR STORY
          </div>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Built on craftsmanship and customer care
          </h2>
        </div>

        <div className="mt-10 relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-brand-red/20 sm:left-1/2 sm:-translate-x-px" />

          <div className="space-y-8">
            {timeline.map((t, i) => (
              <div
                key={t.year}
                className={`relative flex items-start gap-6 sm:gap-0 ${
                  i % 2 === 0
                    ? "sm:flex-row"
                    : "sm:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 mt-1 h-3 w-3 rounded-full bg-brand-red ring-4 ring-white z-10" />

                {/* Content */}
                <div className={`ml-10 sm:ml-0 sm:w-1/2 ${i % 2 === 0 ? "sm:pr-12 sm:text-right" : "sm:pl-12"}`}>
                  <Card className="inline-block p-5">
                    <div className="text-lg font-extrabold text-brand-red">
                      {t.year}
                    </div>
                    <p className="mt-1 text-sm text-black/70">{t.event}</p>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* VALUE GRID */}
      <Section>
        <div className="text-center">
          <div className="text-sm font-extrabold tracking-wide text-black/60">
            OUR VALUES
          </div>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Why choose us?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-black/70">
            Professional HVAC workmanship with a family-operated approach —
            clear communication, reliable results, and respect for your home.
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
                <p className="text-sm leading-relaxed text-black/70">
                  {v.desc}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* MID CTA — what to expect */}
      <Section className="bg-brand-gray">
        <Card className="overflow-hidden">
          <div className="grid gap-6 p-7 sm:p-10 lg:grid-cols-[1.4fr,1fr] lg:items-center">
            <div>
              <div className="text-sm font-extrabold tracking-wide text-black/60">
                READY TO GET COMFORT BACK?
              </div>
              <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                Talk to a technician — get a clear recommendation
              </h2>
              <p className="mt-3 max-w-lg text-black/70 leading-relaxed">
                Whether you need a fast repair, seasonal maintenance, or a new
                system quote, we&apos;ll help you choose the right option for
                your home and budget.
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
                  href="/residential/residential-ac-installation/#free-hvac-quote"
                  variant="secondary"
                  size="lg"
                >
                  Book a Free HVAC Consultation
                </Button>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6">
              <div className="text-sm font-extrabold">What you can expect</div>
              <ul className="mt-4 space-y-3 text-sm text-black/70">
                {[
                  "Fast scheduling and clear next steps.",
                  "Options explained in plain English.",
                  "Respect for your home and clean work.",
                  "Quality parts + warranty-backed workmanship.",
                ].map((b) => (
                  <li key={b} className="flex gap-3">
                    <CheckIcon />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </Section>

      {/* STORY CARDS */}
      <Section>
        <div className="grid gap-8 lg:grid-cols-3">
          <Card className="p-7">
            <div className="text-sm font-extrabold tracking-wide text-black/60">
              CREDENTIALS
            </div>
            <h3 className="mt-2 text-xl font-extrabold">
              Licensed. Bonded. Insured.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-black/70">
              We maintain the protections and professionalism you should expect
              from a contractor working in your home.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button href="/schedule-service/" variant="primary" size="sm">
                Request Service
              </Button>
              <Button
                href={`tel:${BUSINESS.phoneE164}`}
                variant="secondary"
                size="sm"
              >
                Call
              </Button>
            </div>
          </Card>

          <Card className="p-7">
            <div className="text-sm font-extrabold tracking-wide text-black/60">
              SERVICE AREA
            </div>
            <h3 className="mt-2 text-xl font-extrabold">
              Los Angeles &amp; Orange County
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-black/70">
              From repairs to full installations, set up for local climate
              demands and typical home layouts across LA &amp; OC.
            </p>
            <div className="mt-5 rounded-2xl bg-brand-gray p-4">
              <div className="text-sm font-extrabold">Popular requests</div>
              <div className="mt-2 text-sm text-black/70">
                AC not cooling • Furnace issues • Maintenance tune-ups • New
                system estimates
              </div>
            </div>
          </Card>

          <Card className="p-7">
            <div className="text-sm font-extrabold tracking-wide text-black/60">
              COMMITMENT
            </div>
            <h3 className="mt-2 text-xl font-extrabold">
              Your comfort is our priority
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-black/70">
              We answer calls promptly, show up on time, and explain things
              clearly. No surprises, no pressure — just honest service.
            </p>
          </Card>
        </div>
      </Section>

      {/* FINAL CTA */}
      <Section className="bg-brand-gray">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            Call now or book online — we&apos;ll take it from there
          </h2>
          <p className="mt-3 text-black/70">
            Fast scheduling • Clear options • Professional workmanship
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button
              href={`tel:${BUSINESS.phoneE164}`}
              variant="secondary"
              size="lg"
            >
              Call {BUSINESS.phoneDisplay}
            </Button>
            <Button href="/schedule-service/" variant="primary" size="lg">
              Request Service
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
