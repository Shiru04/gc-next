import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { REVIEW_BADGES, REVIEWS } from "@/lib/reviews";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Reviews | GC Heating & Cooling",
  description:
    "Read verified customer reviews for GC Heating & Cooling across Los Angeles & Orange County.",
  path: "/reviews",
});

function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="text-brand-red">
          {i < full ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <>
      <Section className="pt-10 sm:pt-14">
        <div className="max-w-3xl">
          <div className="text-sm font-extrabold tracking-wide text-black/60">
            REVIEWS
          </div>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
            What customers say
          </h1>
          <p className="mt-4 text-lg text-black/70">
            We’re proud to be trusted across Los Angeles and Orange County.
          </p>
        </div>
      </Section>

      <Section className="bg-brand-gray">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {REVIEW_BADGES.map((b) => (
            <Card key={b.label} className="p-4 text-center">
              <div className="text-sm font-extrabold">{b.label}</div>
              <div className="mt-2 text-3xl font-extrabold">
                {b.rating.toFixed(1)}
              </div>
              <div className="mt-1 text-xs text-black/60">
                {b.count} reviews
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {REVIEWS.map((r) => (
            <Card key={`${r.name}-${r.date}`} className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-extrabold">{r.name}</div>
                  <div className="text-sm text-black/60">
                    {r.source} • {r.date}
                  </div>
                </div>
                <Stars rating={r.rating} />
              </div>
              <p className="mt-4 text-black/70">{r.text}</p>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
