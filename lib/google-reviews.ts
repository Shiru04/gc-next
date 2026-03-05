export interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
  profile_photo_url: string;
}

export interface GooglePlaceData {
  name: string;
  rating: number;
  totalReviews: number;
  reviews: GoogleReview[];
}

/**
 * Fetches reviews from the Google Places API.
 * Runs at build-time only (static export).
 *
 * Returns `null` when env vars are missing so the build
 * can proceed with fallback / dummy reviews.
 */
export async function fetchGoogleReviews(): Promise<GooglePlaceData | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    console.warn(
      "[google-reviews] GOOGLE_PLACES_API_KEY or GOOGLE_PLACE_ID not set — using fallback reviews.",
    );
    return null;
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews&reviews_sort=newest&key=${apiKey}`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.status !== "OK") {
      console.error(`[google-reviews] API error: ${data.status}`);
      return null;
    }

    const result = data.result;

    return {
      name: result.name,
      rating: result.rating,
      totalReviews: result.user_ratings_total,
      reviews: (result.reviews || [])
        .filter((r: GoogleReview) => r.text && r.text.length > 0)
        .map((r: GoogleReview) => ({
          author_name: r.author_name,
          rating: r.rating,
          text: r.text,
          relative_time_description: r.relative_time_description,
          profile_photo_url: r.profile_photo_url,
        })),
    };
  } catch (err) {
    console.error("[google-reviews] Fetch failed:", err);
    return null;
  }
}
