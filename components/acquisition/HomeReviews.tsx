"use client";

import { useRef } from "react";
import type { GooglePlaceData } from "@/lib/google-reviews";
import { RatingStars } from "./RatingStars";

export function HomeReviews({ locale = "en", data }: { locale?: "en" | "es"; data: GooglePlaceData | null }) {
  const es = locale === "es";
  const rail = useRef<HTMLDivElement>(null);
  const reviews = data?.reviews || [];
  if (!data || !reviews.length) return null;
  const move = (direction: number) => rail.current?.scrollBy({ left: direction * Math.min(430, rail.current.clientWidth * .85), behavior: "smooth" });
  return <section className="gc-section gc-google-reviews">
    <div className="gc-wrap">
      <div className="gc-reviews-heading"><div><p className="gc-eyebrow">{es ? "RESEÑAS DE GOOGLE" : "GOOGLE REVIEWS"}</p><h2>{es ? "Experiencias Reales De Clientes" : "Real Customer Experiences"}</h2></div><div className="gc-review-metric"><RatingStars rating={data.rating} label={`${data.rating} ${es ? "de 5 estrellas" : "out of 5 stars"}`}/><strong>{data.rating.toFixed(1)} / 5</strong><span>{data.totalReviews.toLocaleString()} {es ? "reseñas verificadas en Google" : "verified Google reviews"}</span></div></div>
      <div className="gc-review-controls" role="group" aria-label={es ? "Controles del carrusel de reseñas" : "Review carousel controls"}>
        <button type="button" onClick={() => move(-1)} aria-label={es ? "Reseña anterior" : "Previous review"}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
        </button>
        <button className="gc-review-next" type="button" onClick={() => move(1)} aria-label={es ? "Siguiente reseña" : "Next review"}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </button>
      </div>
      <div className="gc-review-rail" ref={rail}>{reviews.map((review, i) => <figure className="gc-review-card" key={`${review.author_name}-${i}`}><RatingStars rating={review.rating} label={`${review.rating} ${es ? "de 5 estrellas" : "out of 5 stars"}`}/><blockquote>“{review.text}”</blockquote><figcaption><span className="gc-review-avatar" aria-hidden="true">{review.author_name.charAt(0)}</span><span><strong>{review.author_name}</strong><small>Google · {review.relative_time_description}</small></span></figcaption></figure>)}</div>
      <a className="gc-text-link gc-review-link" href="https://www.google.com/maps/search/?api=1&query=GC+Heating+%26+Cooling+Cerritos" target="_blank" rel="noopener noreferrer">{es ? "Ver Todas Las Reseñas En Google" : "Read All Reviews On Google"}</a>
    </div>
  </section>;
}
