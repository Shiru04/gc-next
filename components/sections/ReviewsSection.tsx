import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { REVIEWS, REVIEW_BADGES, type Review } from "@/lib/reviews";
import type { GoogleReview, GooglePlaceData } from "@/lib/google-reviews";

function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`h-5 w-5 ${i < full ? "fill-brand-red text-brand-red" : "fill-black/15 text-black/15"}`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function SourceBadge({ source }: { source: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-brand-gray px-3 py-1 text-xs font-semibold text-black/70">
      {source}
    </span>
  );
}

/** Normalised review used internally by the component. */
type NormalisedReview = {
  name: string;
  source: string;
  rating: number;
  date: string;
  text: string;
  photoUrl?: string;
};

function normaliseGoogleReview(r: GoogleReview): NormalisedReview {
  return {
    name: r.author_name,
    source: "Google",
    rating: r.rating,
    date: r.relative_time_description,
    text: r.text,
    photoUrl: r.profile_photo_url,
  };
}

function normaliseFallbackReview(r: Review): NormalisedReview {
  return {
    name: r.name,
    source: r.source,
    rating: r.rating,
    date: r.date,
    text: r.text,
  };
}

type Props = {
  /** Google Places data — when provided, live reviews are shown. */
  googleData?: GooglePlaceData | null;
  /** Show at most N reviews (default: all) */
  limit?: number;
  /** Show "View all" link */
  showViewAll?: boolean;
  /** Show rating badges row */
  showBadges?: boolean;
  /** Heading override */
  heading?: string;
};

export function ReviewsSection({
  googleData,
  limit,
  showViewAll = true,
  showBadges = true,
  heading = "What our customers say",
}: Props) {
  // Build the review list: prefer live Google reviews, fallback to static data
  const allReviews: NormalisedReview[] = googleData
    ? googleData.reviews.map(normaliseGoogleReview)
    : REVIEWS.map(normaliseFallbackReview);

  const reviews = limit ? allReviews.slice(0, limit) : allReviews;

  if (!googleData || reviews.length === 0) return null;

  // If Google data is available, show a prominent Google rating summary
  const hasGoogleData = googleData && googleData.totalReviews > 0;

  return (
    <div>
      {/* Heading */}
      <div className="text-center">
        <div className="text-sm font-extrabold tracking-wide text-black/60">
          REVIEWS
        </div>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
          {heading}
        </h2>

        {/* Google aggregate rating */}
        {hasGoogleData ? (
          <div className="mt-4 flex flex-col items-center gap-1">
            <Stars rating={googleData.rating} />
            <p className="text-sm text-black/60">
              Rated{" "}
              <span className="font-bold text-black/80">
                {googleData.rating}
              </span>{" "}
              out of 5 based on{" "}
              <span className="font-bold text-black/80">
                {googleData.totalReviews}
              </span>{" "}
              Google reviews
            </p>
          </div>
        ) : null}
      </div>

      {/* Rating badges (platform mix) — shown only for fallback data */}
      {showBadges && !hasGoogleData ? (
        <div className="mt-8 grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {REVIEW_BADGES.map((b) => (
            <Card key={b.label} className="p-4 text-center">
              <div className="text-sm font-extrabold">{b.label}</div>
              <div className="mt-1">
                <Stars rating={b.rating} />
              </div>
              <div className="mt-1 text-2xl font-extrabold">
                {b.rating.toFixed(1)}
              </div>
              <div className="text-xs text-black/60">{b.count} reviews</div>
            </Card>
          ))}
        </div>
      ) : null}

      {/* Review cards */}
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {reviews.map((r) => (
          <Card key={`${r.name}-${r.date}`} className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                {r.photoUrl ? (
                  <Image
                    src={r.photoUrl}
                    alt={r.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                    unoptimized
                  />
                ) : null}
                <div>
                  <div className="font-extrabold">{r.name}</div>
                  <div className="mt-1 flex items-center gap-2">
                    <SourceBadge source={r.source} />
                    <span className="text-xs text-black/65">{r.date}</span>
                  </div>
                </div>
              </div>
              <Stars rating={r.rating} />
            </div>
            <blockquote className="mt-4 text-black/70 leading-relaxed">
              &ldquo;{r.text}&rdquo;
            </blockquote>
          </Card>
        ))}
      </div>

      {/* View all link */}
      {showViewAll ? (
        <div className="mt-8 text-center">
          <Button href="/reviews" variant="secondary" size="lg">
            View all reviews
          </Button>
        </div>
      ) : null}
    </div>
  );
}
