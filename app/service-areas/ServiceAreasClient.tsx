"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { BUSINESS } from "@/lib/constants";
import { SERVICE_AREAS } from "@/lib/areas";
import Link from "next/link";

export default function ServiceAreasClient() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SERVICE_AREAS;
    return SERVICE_AREAS.filter((a) => a.name.toLowerCase().includes(q));
  }, [query]);

  return (
    <>
      <Section
        className="pt-14 pb-10 bg-brand-gray"
        containerClassName="grid gap-8 lg:grid-cols-2 items-center"
      >
        <div className="space-y-5">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Service Areas
          </h1>
          <p className="text-lg text-black/70 max-w-prose">
            We proudly serve homeowners across Los Angeles & Orange County with
            reliable HVAC installation, repairs, and maintenance.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button href="/contact" variant="primary" size="lg">
              Get a Free Estimate
            </Button>
            <Button
              href={`tel:${BUSINESS.phone}`}
              variant="secondary"
              size="lg"
            >
              Call {BUSINESS.phoneDisplay}
            </Button>
          </div>
        </div>

        <Card className="relative overflow-hidden">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src="/hero/service-areas-map.webp"
              alt="GC Heating & Cooling service areas map"
              fill
              className="object-cover"
              priority
              sizes="(min-width: 1024px) 520px, 100vw"
            />
          </div>

          <div className="absolute inset-x-0 bottom-0 p-5">
            <div className="rounded-2xl bg-white/80 backdrop-blur border border-black/10 p-4">
              <p className="font-semibold">Serving LA & OC</p>
              <p className="text-sm text-black/70">
                Not sure if you&apos;re in range? Contact us and we&apos;ll
                confirm.
              </p>
            </div>
          </div>
        </Card>
      </Section>

      <Section className="py-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold">
              Find your city
            </h2>
            <p className="text-black/70">
              Browse our service areas and discover HVAC services near you.
            </p>
          </div>

          <div className="w-full md:w-[360px]">
            <label className="sr-only" htmlFor="city-search">
              Search city
            </label>
            <input
              id="city-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by city…"
              className="w-full h-11 rounded-xl border border-black/10 px-4 outline-none focus:ring-2 focus:ring-brand-red/60"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((area) => (
            <Card key={area.slug} className="p-5 flex flex-col gap-3">
              <div className="space-y-1">
                <p className="font-bold text-lg">{area.name}</p>
                <p className="text-sm text-black/70">
                  HVAC Installation, Repairs & Maintenance
                </p>
              </div>

              <div className="flex gap-3 mt-auto">
                <Link
                  href={`/service-areas/${area.slug}`}
                  className="text-sm font-semibold underline underline-offset-4 hover:text-brand-red"
                >
                  View details
                </Link>
                <Link
                  href="/contact"
                  className="text-sm font-semibold underline underline-offset-4 hover:text-brand-red"
                >
                  Free estimate
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
