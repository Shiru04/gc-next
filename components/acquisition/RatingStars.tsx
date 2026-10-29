export function RatingStars({ rating, label }: { rating: number; label: string }) {
  return <span className="gc-rating-stars" role="img" aria-label={label}>{Array.from({ length: 5 }, (_, index) => <svg key={index} viewBox="0 0 20 20" aria-hidden="true" className={index < Math.round(rating) ? "is-filled" : ""}><path d="m10 1.9 2.35 4.76 5.25.76-3.8 3.7.9 5.23L10 13.88l-4.7 2.47.9-5.23-3.8-3.7 5.25-.76L10 1.9Z"/></svg>)}</span>;
}
