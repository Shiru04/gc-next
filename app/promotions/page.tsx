// app/promotions/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { PROMOTIONS } from "@/lib/promotions";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Promotions | GC Heating & Cooling",
  description:
    "Current HVAC promotions for installation and repairs across Los Angeles & Orange County. Limited-time offers and rebates may apply.",
  path: "/promotions",
});

export default function PromotionsHubPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-14">
      <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 md:text-4xl">
        Choose your service
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-700">
        Select the option that matches what you need right now. Fast scheduling
        for Los Angeles & Orange County.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Link
          href={PROMOTIONS["new-installation"].slug}
          className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-black/5 transition hover:shadow-md"
        >
          <p className="text-xs font-bold uppercase tracking-wide text-red-600">
            New Installation
          </p>
          <p className="mt-2 text-2xl font-extrabold text-neutral-900">
            Up to $2,000 Rebates
          </p>
          <p className="mt-3 text-sm text-neutral-700">
            Replace or install a new HVAC system with a trusted team.
          </p>
          <p className="mt-6 inline-flex text-sm font-bold text-neutral-900">
            View details →
          </p>
        </Link>

        <Link
          href={PROMOTIONS.repairs.slug}
          className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-black/5 transition hover:shadow-md"
        >
          <p className="text-xs font-bold uppercase tracking-wide text-red-600">
            Repairs
          </p>
          <p className="mt-2 text-2xl font-extrabold text-neutral-900">
            Free Estimates
          </p>
          <p className="mt-3 text-sm text-neutral-700">
            Quick diagnosis, straightforward recommendations, urgent scheduling.
          </p>
          <p className="mt-6 inline-flex text-sm font-bold text-neutral-900">
            View details →
          </p>
        </Link>
      </div>
    </main>
  );
}
