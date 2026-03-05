const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ?? "";

export function aggregateRatingSchema(
  ratingValue: number,
  reviewCount: number,
) {
  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    itemReviewed: {
      "@type": "HVACBusiness",
      name: "GC Heating & Cooling",
      ...(SITE_URL ? { url: `${SITE_URL}/` } : {}),
    },
    ratingValue: String(ratingValue),
    bestRating: "5",
    reviewCount: String(reviewCount),
  };
}

export function reviewSchema(author: string, reviewBody: string, rating = 5) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "HVACBusiness",
      name: "GC Heating & Cooling",
      ...(SITE_URL ? { url: `${SITE_URL}/` } : {}),
    },
    author: { "@type": "Person", name: author },
    reviewRating: {
      "@type": "Rating",
      ratingValue: String(rating),
      bestRating: "5",
    },
    reviewBody,
  };
}
