export type Review = { name: string; source: "Google"; rating: number; date: string; text: string };
// Only Google Places results are permitted. No static testimonials or ratings.
export const REVIEWS: Review[] = [];
export const REVIEW_BADGES: Array<{ label: string; rating: number; count: number }> = [];
