import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { fetchGoogleReviews } from "@/lib/google-reviews";
import { aggregateRatingSchema, reviewSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Reseñas | Calefacción y refrigeración GC",
  description:
    "Lea reseñas de clientes verificados sobre GC Heating & Cooling en Los Ángeles y el condado de Orange.",
  path: "/es/resenas",
});

export default async function ReviewsPage() {
  const googleData = await fetchGoogleReviews();

  return (
    <>
      {/* JSON-LD: aggregate rating + individual reviews */}
      {googleData ? (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(
                aggregateRatingSchema(
                  googleData.rating,
                  googleData.totalReviews,
                ),
              ),
            }}
          />
          {googleData.reviews.map((r) => (
            <script
              key={r.author_name}
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(
                  reviewSchema(r.author_name, r.text, r.rating),
                ),
              }}
            />
          ))}
        </>
      ) : null}

      <Section className="pt-10 sm:pt-14">
        <div className="max-w-3xl">
          <div className="text-sm font-extrabold tracking-wide text-black/60">
            RESEÑAS
          </div>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Lo que dicen los clientes
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-black/70">
            Estamos orgullosos de contar con la confianza en Los Ángeles y el condado de Orange.
          </p>
        </div>
      </Section>

      <Section className="bg-brand-gray">
        <ReviewsSection
          googleData={googleData}
          showViewAll={false}
          showBadges
          heading="Con la confianza de propietarios de viviendas en Los Ángeles y OC"
        />
      </Section>

      {/* Google Review CTA */}
      <Section>
        <div className="text-center">
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            Comparte tu experiencia
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-black/70">
            ¿Feliz con nuestro servicio? Tarda 30 segundos y ayuda a otros.
            los propietarios nos encuentran.
          </p>
          <div className="mt-6">
            <Button
              href="https://search.google.com/local/writereview?placeid=PLACEHOLDER"
              variant="primary"
              size="lg"
            >
              Déjanos una reseña de Google
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
