import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { BUSINESS } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Financiamiento | Calefacción y refrigeración GC",
  description:
    "Contacte a GC Heating & Cooling para conocer los requisitos, la documentación y los próximos pasos del financiamiento.",
  path: "/es/financiamiento",
});

export default function FinancingPage() {
  return (
    <>
      <Section className="pt-10 sm:pt-14">
        <div className="max-w-3xl">
          <div className="text-sm font-extrabold tracking-wide text-black/60">
            FINANCIACIÓN
          </div>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Consulte sobre financiamiento
          </h1>
          <p className="mt-4 text-lg text-black/70">
            El financiamiento puede estar disponible según el proyecto.
            Contáctenos y le explicaremos los requisitos, la documentación y
            los próximos pasos para su instalación o reemplazo.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button href={BUSINESS.bookingUrl} variant="primary" size="lg">
              Reservar consulta in situ
            </Button>
            <Button
              href={`tel:${BUSINESS.phoneE164}`}
              variant="secondary"
              size="lg"
            >
              Llamar {BUSINESS.phoneDisplay}
            </Button>
          </div>
        </div>
      </Section>

      <Section className="bg-brand-gray">
        <div className="grid gap-5 lg:grid-cols-3">
          {[
            {
              title: "Comience con una conversación",
              desc: "Cuéntenos sobre su proyecto y le explicaremos el proceso de financiamiento que podría aplicar.",
            },
            {
              title: "Sepa qué necesita",
              desc: "Nuestro equipo le explicará la información y documentación requerida.",
            },
            {
              title: "Próximos pasos claros",
              desc: "Revisaremos con usted el proceso disponible antes de que tome una decisión.",
            },
          ].map((x) => (
            <Card key={x.title} className="p-6">
              <div className="text-xl font-extrabold">{x.title}</div>
              <p className="mt-2 text-black/70">{x.desc}</p>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
