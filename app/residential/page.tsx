import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { RESIDENTIAL_SERVICES } from "@/lib/services";
import { ServiceCardGrid } from "@/components/sections/ServiceCardGrid";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Residential HVAC Services | GC Heating & Cooling",
  description:
    "Residential HVAC services across Los Angeles & Orange County: AC repair, heating repair, maintenance, installation, and attic insulation.",
  path: "/residential",
});

export default function ResidentialPage() {
  return (
    <>
      <Section className="pt-10 sm:pt-14">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl shadow-soft ring-1 ring-black/5">
            <div className="relative aspect-[16/11] sm:aspect-[16/10] lg:aspect-[16/11]">
              <Image
                src="/hero/services-hero.webp"
                alt="HVAC technician servicing a residential outdoor condenser"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/25 via-black/0 to-black/0" />
            </div>
            <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-extrabold tracking-wide text-black shadow-soft backdrop-blur">
              Homes across LA & OC
            </div>
          </div>

          <div className="max-w-xl">
            <div className="text-sm font-extrabold tracking-wide text-black/60">
              FOR HOMEOWNERS
            </div>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Residential HVAC Services
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-black/70">
              Comfort solutions designed for your home — fast repairs,
              preventative maintenance, energy-efficient installations, and
              attic insulation. Serving Los Angeles and Orange County.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/schedule-service/" variant="primary" size="md">
                Request Residential HVAC Service
              </Button>
              <Button href="tel:+15628674123" variant="secondary" size="md">
                Call 562-867-4123
              </Button>
            </div>

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
                Financing options available
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-brand-red" />
                Repairs, maintenance, installs
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <Section className="bg-brand-gray">
        <div className="mx-auto max-w-4xl text-center">
          <div className="text-xs font-extrabold tracking-wide text-black/60">
            FOR YOUR HOME
          </div>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Residential Services
          </h2>
          <p className="mt-3 text-black/70">
            Pick a service to learn more, or call us — we’ll point you to the
            right option.
          </p>
        </div>

        <div className="mt-10">
          <ServiceCardGrid
            services={RESIDENTIAL_SERVICES}
            basePath="residential"
          />
        </div>

        <div className="mt-10 text-center">
          <Button href="/commercial" variant="ghost" size="md">
            Looking for commercial services? →
          </Button>
        </div>
      </Section>
    </>
  );
}
