import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { BUSINESS } from "@/lib/constants";
import { PROMOTIONS } from "@/lib/promotions.es";
import { PromoCard } from "@/components/sections/PromoCard";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Promociones | Calefacción y refrigeración GC",
  description:
    "Promociones actuales de HVAC para instalación y reparación en Los Ángeles y el condado de Orange. Es posible que se apliquen ofertas y reembolsos por tiempo limitado.",
  path: "/es/promociones",
});

export default function PromotionsHubPage() {
  const promoNewInstall = PROMOTIONS["new-installation"];
  const promoRepairs = PROMOTIONS.repairs;
  const promoTuneUps = PROMOTIONS["tune-ups"];

  return (
    <>
      {/* Header */}
      <Section className="pt-10 sm:pt-14">
        <div className="max-w-3xl">
          <div className="text-sm font-extrabold tracking-wide text-brand-red">
            OFERTAS POR TIEMPO LIMITADO
          </div>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Promociones actuales
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-black/70">
            Selecciona la opción que coincida con lo que necesitas. Programación rápida para
            Los Ángeles y el condado de Orange.
          </p>
        </div>
      </Section>

      {/* Promo cards */}
      <Section className="bg-brand-gray">
        <div className="grid gap-6 md:grid-cols-2">
          <PromoCard
            kicker="INSTALACIÓN NUEVA"
            title={promoNewInstall.primaryOfferValue}
            description="Reemplace o instale un nuevo sistema HVAC con un equipo autorizado y confiable. Opciones de equipos energéticamente eficientes disponibles."
            ctaLabel="Agendar una consulta HVAC gratuita"
            ctaHref="/es/residencial/residential-ac-installation/#free-hvac-quote"
            highlight="Popular"
          />
          <PromoCard
            kicker="REPARACIONES"
            title={promoRepairs.primaryOfferValue}
            description="Diagnóstico rápido, recomendaciones sencillas y programación urgente disponibles. Residencial y comercial ligero."
            ctaLabel="Solicitar reparación de HVAC"
            ctaHref="/es/programar-servicio/?service=ac_repair"
            highlight="Fast Service"
          />
          <PromoCard
            kicker="MANTENIMIENTO"
            title={promoTuneUps.primaryOfferValue}
            description="Precio regular $174 — Ahorre $25 — Ahora $149 con el código GC149. Afinación multipunto para un sistema residencial estándar."
            ctaLabel="Solicitar una afinación"
            ctaHref="/es/programar-servicio/?service=maintenance&coupon=GC149"
            highlight="Best Value"
          />
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="text-center">
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            ¿No estás seguro de qué servicio necesitas?
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-black/70">
            Elija su servicio para solicitar una cita. Para un sistema nuevo o reemplazo, agende una consulta HVAC gratuita en sitio; evaluaremos sus necesidades antes de proporcionar precios.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button
              href={`tel:${BUSINESS.phoneE164}`}
              variant="secondary"
              size="lg"
            >
              Llamar {BUSINESS.phoneDisplay}
            </Button>
            <Button href="/es/programar-servicio/" variant="primary" size="lg">
              Solicitar servicio
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
