import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { COMMERCIAL_SERVICES } from "@/lib/services.es";
import { ServiceCardGrid } from "@/components/sections/ServiceCardGrid";
import { buildMetadata } from "@/lib/seo";
import { INSTALLATION_CONSULTATION_HREF_ES } from "@/lib/consultation";

export const metadata = buildMetadata({
  title: "Servicios comerciales de HVAC | Calefacción y refrigeración GC",
  description:
    "Servicios comerciales de HVAC en Los Ángeles y el condado de Orange: reparación, mantenimiento preventivo e instalación para oficinas y propiedades comerciales ligeras.",
  path: "/es/comercial",
});

export default function CommercialPage() {
  return (
    <>
      <Section className="pt-10 sm:pt-14">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl shadow-soft ring-1 ring-black/5">
            <div className="relative aspect-[16/11] sm:aspect-[16/10] lg:aspect-[16/11]">
              <Image
                src="/hero/services-hero.webp"
                alt="Técnico de HVAC dando servicio a una unidad de techo comercial"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/25 via-black/0 to-black/0" />
            </div>
            <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-extrabold tracking-wide text-black shadow-soft backdrop-blur">
              Oficinas y comercio ligero en Los Ángeles y OC
            </div>
          </div>

          <div className="max-w-xl">
            <div className="text-sm font-extrabold tracking-wide text-black/60">
              PARA EMPRESAS
            </div>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Servicios comerciales de climatización
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-black/70">
              Mantenga su negocio cómodo y operativo. Entregamos
              Reparación confiable de HVAC comercial, mantenimiento preventivo y
              instalación: programada según su horario.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={INSTALLATION_CONSULTATION_HREF_ES} variant="primary" size="md">
                Obtener un estimado comercial gratuito
              </Button>
              <Button href="tel:+15628674123" variant="secondary" size="md">
                Llama al 562-867-4123
              </Button>
            </div>

            <ul className="mt-6 grid gap-2 text-sm text-black/70 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-brand-red" />
                Licenciado • Asegurado • Garantizado
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-brand-red" />
                Programación con mínimas interrupciones
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-brand-red" />
                Amigable con el administrador de propiedades
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-brand-red" />
                Acuerdos de mantenimiento disponibles
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <Section className="bg-brand-gray">
        <div className="mx-auto max-w-4xl text-center">
          <div className="text-xs font-extrabold tracking-wide text-black/60">
            PARA TU NEGOCIO
          </div>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Servicios Comerciales
          </h2>
          <p className="mt-3 text-black/70">
            Elija un servicio para obtener más información o llámenos para discutir un plan personalizado
            para su propiedad.
          </p>
        </div>

        <div className="mt-10">
          <ServiceCardGrid
            services={COMMERCIAL_SERVICES}
            basePath="commercial"
            locale="es"
          />
        </div>

        <div className="mt-10 text-center">
          <Button href="/es/residencial" variant="ghost" size="md">
            ¿Busca servicios residenciales? →
          </Button>
        </div>
      </Section>
    </>
  );
}
