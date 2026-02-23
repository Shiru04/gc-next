"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SERVICE_AREAS } from "@/lib/areas";

function PinIcon({ className = "h-14 w-14" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 22s7-5.2 7-12a7 7 0 1 0-14 0c0 6.8 7 12 7 12Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M12 13.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function normalize(s: string) {
  return s.toLowerCase().trim();
}

export default function ServiceAreasPage() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const query = normalize(q);
    if (!query) return SERVICE_AREAS;

    return SERVICE_AREAS.filter((a) => {
      const hay = `${a.name} ${a.county}`.toLowerCase();
      return hay.includes(query);
    });
  }, [q]);

  const oc = useMemo(
    () => filtered.filter((a) => a.county === "Orange County"),
    [filtered],
  );
  const la = useMemo(
    () => filtered.filter((a) => a.county === "Los Angeles County"),
    [filtered],
  );

  const totalCount = SERVICE_AREAS.length;
  const filteredCount = filtered.length;

  return (
    <>
      {/* HERO (matching Services style) */}
      <Section className="pt-10 sm:pt-14">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          {/* Image */}
          <div className="relative overflow-hidden rounded-3xl shadow-soft ring-1 ring-black/5">
            <div className="relative aspect-[16/11] sm:aspect-[16/10] lg:aspect-[16/11]">
              <Image
                src="/hero/service-areas-map.webp"
                alt="GC Heating & Cooling service areas in Los Angeles and Orange County"
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

          {/* Copy */}
          <div className="max-w-xl">
            <div className="text-sm font-extrabold tracking-wide text-black/60">
              SERVICE AREAS
            </div>

            <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Los Angeles &amp; Orange County
            </h1>

            <p className="mt-4 text-lg text-black/70">
              We provide heating and air conditioning services for residential
              and commercial properties across LA &amp; OC. Choose your city
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

            {/* Search */}
            <div className="mt-6">
              <label className="text-sm font-extrabold tracking-wide text-black/60">
                FIND YOUR CITY
              </label>
              <div className="mt-2 flex items-center gap-3">
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search city (e.g., Anaheim, Pasadena, Torrance)…"
                  className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-black shadow-soft outline-none transition focus:border-brand-red focus:ring-2 focus:ring-brand-red/30"
                />
                {q ? (
                  <button
                    type="button"
                    onClick={() => setQ("")}
                    className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-extrabold shadow-soft hover:bg-black/5"
                    aria-label="Clear search"
                  >
                    Clear
                  </button>
                ) : null}
              </div>

              <div className="mt-2 text-sm text-black/60">
                Showing{" "}
                <span className="font-extrabold text-black">
                  {filteredCount}
                </span>{" "}
                of{" "}
                <span className="font-extrabold text-black">{totalCount}</span>{" "}
                locations
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Lists */}
      <Section className="bg-brand-gray">
        <div className="grid gap-8 lg:grid-cols-2">
          <CountyBlock
            title="Orange County"
            items={oc}
            emptyText="No Orange County locations match your search."
          />
          <CountyBlock
            title="Los Angeles County"
            items={la}
            emptyText="No Los Angeles County locations match your search."
          />
        </div>

        {/* Bottom CTA */}
        <div className="mt-10">
          <Card className="rounded-3xl border border-black/5 bg-white p-6 shadow-soft">
            <div className="grid gap-6 lg:grid-cols-[1.2fr_auto] lg:items-center">
              <div>
                <div className="text-xs font-extrabold tracking-wide text-black/60">
                  NOT SURE?
                </div>
                <h2 className="mt-1 text-2xl font-extrabold tracking-tight">
                  Don’t see your city listed?
                </h2>
                <p className="mt-2 text-black/70">
                  Contact us with your address or zip code and we’ll confirm
                  availability and the next appointment options.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 lg:justify-end">
                <Button href="/contact" variant="primary" size="md">
                  Check my area
                </Button>
                <Button href="/services" variant="secondary" size="md">
                  View services
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </Section>
    </>
  );

  function CountyBlock({
    title,
    items,
    emptyText,
  }: {
    title: string;
    items: typeof SERVICE_AREAS;
    emptyText: string;
  }) {
    return (
      <div>
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-extrabold">{title}</h2>
          <div className="text-sm font-semibold text-black/60">
            {items.length} locations
          </div>
        </div>

        {items.length === 0 ? (
          <Card className="mt-4 rounded-3xl border border-black/5 bg-white p-6 shadow-soft">
            <div className="text-sm font-semibold text-black/70">
              {emptyText}
            </div>
          </Card>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {items.map((a) => (
              <Card
                key={a.slug}
                className="group overflow-hidden rounded-3xl p-0 shadow-soft ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                {/* red header */}
                <div className="relative flex h-24 items-center justify-center bg-brand-red">
                  <div className="text-white/95 transition group-hover:scale-[1.03]">
                    <PinIcon className="h-12 w-12" />
                  </div>
                  <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-white/10" />
                </div>

                <div className="bg-white px-5 pb-5 pt-4">
                  <div className="font-extrabold">{a.name}</div>
                  <p className="mt-2 line-clamp-2 text-sm text-black/70">
                    {a.intro}
                  </p>
                  <div className="mt-4">
                    <Button
                      href={`/service-areas/${a.slug}`}
                      variant="secondary"
                      size="sm"
                    >
                      View details
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  }
}
