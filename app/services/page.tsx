import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import {
  RESIDENTIAL_SERVICES,
  COMMERCIAL_SERVICES,
} from "@/lib/services";
import { ServiceCardGrid } from "@/components/sections/ServiceCardGrid";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "HVAC Services | GC Heating & Cooling",
  description:
    "Residential and commercial HVAC services across Los Angeles & Orange County. Browse our residential and commercial service categories.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      {/* HERO */}
      <Section className="pt-10 sm:pt-14">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl shadow-soft ring-1 ring-black/5">
            <div className="relative aspect-[16/11] sm:aspect-[16/10] lg:aspect-[16/11]">
              <Image
                src="/hero/services-hero.webp"
                alt="HVAC technician servicing an outdoor condenser"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/25 via-black/0 to-black/0" />
            </div>
            <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-extrabold tracking-wide text-black shadow-soft backdrop-blur">
              Serving Los Angeles & Orange County
            </div>
          </div>

          <div className="max-w-xl">
            <div className="text-sm font-extrabold tracking-wide text-black/60">
              WHAT WE DO
            </div>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Our Services
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-black/70">
              We provide HVAC services for both homes and businesses across Los
              Angeles and Orange County. Choose the category that fits you.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/residential" variant="primary" size="md">
                Residential services
              </Button>
              <Button href="/commercial" variant="secondary" size="md">
                Commercial services
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* RESIDENTIAL SECTION */}
      <Section className="bg-brand-gray">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="text-xs font-extrabold tracking-wide text-black/60">
              FOR HOMEOWNERS
            </div>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Residential HVAC
            </h2>
            <p className="mt-3 text-black/70">
              Repairs, maintenance, installs, and attic insulation for your
              home.
            </p>
          </div>
          <Button href="/residential" variant="ghost" size="md">
            View residential hub →
          </Button>
        </div>

        <div className="mt-8">
          <ServiceCardGrid
            services={RESIDENTIAL_SERVICES}
            basePath="residential"
          />
        </div>
      </Section>

      {/* COMMERCIAL SECTION */}
      <Section>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="text-xs font-extrabold tracking-wide text-black/60">
              FOR BUSINESSES
            </div>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Commercial HVAC
            </h2>
            <p className="mt-3 text-black/70">
              Repair, preventative maintenance, and installation for offices
              and light commercial properties.
            </p>
          </div>
          <Button href="/commercial" variant="ghost" size="md">
            View commercial hub →
          </Button>
        </div>

        <div className="mt-8">
          <ServiceCardGrid
            services={COMMERCIAL_SERVICES}
            basePath="commercial"
          />
        </div>
      </Section>
    </>
  );
}
