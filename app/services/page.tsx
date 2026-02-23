import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SERVICES } from "@/lib/services";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "HVAC Services | GC Heating & Cooling",
  description:
    "Explore our HVAC services: installation, repair, and maintenance across Los Angeles & Orange County. Fast scheduling and friendly techs.",
  path: "/services",
});

function Icon({
  name,
  className = "h-14 w-14",
}: {
  name:
    | "repairs"
    | "maintenance"
    | "installations"
    | "commercial"
    | "attic"
    | "default";
  className?: string;
}) {
  // Minimal inline SVG set (no external deps).
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
  };

  switch (name) {
    case "repairs":
      return (
        <svg {...common}>
          <path
            d="M14.7 6.3a4.5 4.5 0 0 0-6.36 6.36l-4.6 4.6a1.5 1.5 0 1 0 2.12 2.12l4.6-4.6a4.5 4.5 0 0 0 6.36-6.36Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 9.5 9.5 12"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );
    case "maintenance":
      return (
        <svg {...common}>
          <path
            d="M7 7h10v3H7V7Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M6 10h12v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V10Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M9 10V6.5A2.5 2.5 0 0 1 11.5 4h1A2.5 2.5 0 0 1 15 6.5V10"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );
    case "installations":
      return (
        <svg {...common}>
          <path
            d="M4 10a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M7 12h10M7 15h10M7 18h6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M12 2v4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M10.5 3.5 12 2l1.5 1.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "commercial":
      return (
        <svg {...common}>
          <path
            d="M4 20V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v14"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M18 20V10a2 2 0 0 1 2-2h0"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M7 8h4M7 12h4M7 16h4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );
    case "attic":
      return (
        <svg {...common}>
          <path
            d="M3 11.5 12 4l9 7.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.5 10.8V20a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-9.2"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M9.5 22v-6a2.5 2.5 0 0 1 5 0v6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path
            d="M12 2v4M12 18v4M4 12H2M22 12h-2"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M17 7 19 5M5 19l2-2M7 7 5 5M19 19l-2-2"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </svg>
      );
  }
}

function iconFromService(s: { slug: string; name: string }) {
  const key = `${s.slug} ${s.name}`.toLowerCase();
  if (key.includes("repair")) return "repairs";
  if (key.includes("maint")) return "maintenance";
  if (key.includes("install")) return "installations";
  if (key.includes("commercial")) return "commercial";
  if (
    key.includes("attic") ||
    key.includes("insulation") ||
    key.includes("isolation")
  )
    return "attic";
  return "default";
}

export default function ServicesPage() {
  return (
    <>
      {/* HERO (Wix-like split) */}
      <Section className="pt-10 sm:pt-14">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          {/* Image */}
          <div className="relative overflow-hidden rounded-3xl shadow-soft ring-1 ring-black/5">
            {/* Keep a nice “photo-card” ratio on desktop */}
            <div className="relative aspect-[16/11] sm:aspect-[16/10] lg:aspect-[16/11]">
              <Image
                src="/hero/services-hero.webp"
                alt="HVAC technician servicing an outdoor condenser"
                fill
                priority
                className="object-cover"
              />
              {/* subtle overlay to match premium look */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/25 via-black/0 to-black/0" />
            </div>

            {/* little badge strip (optional but helps polish) */}
            <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-extrabold tracking-wide text-black shadow-soft backdrop-blur">
              Serving Los Angeles & Orange County
            </div>
          </div>

          {/* Copy */}
          <div className="max-w-xl">
            <div className="text-sm font-extrabold tracking-wide text-black/60">
              WHAT WE DO
            </div>

            <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Our Services
            </h1>

            <p className="mt-4 text-lg text-black/70">
              We provide a wide variety of residential and commercial HVAC
              services across Los Angeles and Orange County. Choose a service
              below to learn more.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/contact" variant="primary" size="md">
                Book now
              </Button>
              <Button href="tel:+18007064822" variant="secondary" size="md">
                Call (800) 706-4822
              </Button>
            </div>

            {/* small trust bullets */}
            <ul className="mt-6 grid gap-2 text-sm text-black/70 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-brand-red" />
                Licensed • Insured • Bonded
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-brand-red" />
                Fast scheduling & clear estimates
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-brand-red" />
                Residential & commercial support
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-brand-red" />
                Repairs, maintenance, installs
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* SERVICES GRID (Wix-like cards) */}
      <Section className="bg-brand-gray">
        <div className="mx-auto max-w-4xl text-center">
          <div className="text-xs font-extrabold tracking-wide text-black/60">
            HOW CAN WE HELP?
          </div>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            GC Heating &amp; Cooling Services
          </h2>
          <p className="mt-3 text-black/70">
            We provide a wide variety of services, so let’s get you to the right
            option.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => {
            const icon = iconFromService(s);
            return (
              <Card
                key={s.slug}
                className="group overflow-hidden rounded-3xl p-0 shadow-soft ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                {/* red header */}
                <div className="relative flex h-28 items-center justify-center bg-brand-red">
                  <div className="text-white/95 transition group-hover:scale-[1.03]">
                    <Icon name={icon} />
                  </div>

                  {/* tiny decorative highlight */}
                  <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/10" />
                </div>

                {/* body */}
                <div className="bg-white px-6 pb-6 pt-5">
                  <div className="text-lg font-extrabold">{s.name}</div>

                  <p className="mt-2 min-h-[44px] text-sm text-black/70">
                    {s.short}
                  </p>

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
      </Section>
    </>
  );
}
