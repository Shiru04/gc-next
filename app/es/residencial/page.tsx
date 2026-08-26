import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { RESIDENTIAL_SERVICES } from "@/lib/services.es";
import { ServiceCardGrid } from "@/components/sections/ServiceCardGrid";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Servicios residenciales de HVAC | Calefacción y refrigeración GC",
  description:
    "Servicios de HVAC residencial en Los Ángeles y el condado de Orange: reparación de aire acondicionado, reparación de calefacción, mantenimiento, instalación y aislamiento de áticos.",
  path: "/es/residencial",
});

export default function ResidentialPage() {
  return (
    <>
      <Section className="pt-10 sm:pt-14">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl shadow-soft ring-1 ring-black/5">
            <div className="relative aspect-[16/11] sm:aspect-[16/10] lg:aspect-[16/11]">
              <Image
                src="/hero/services-hero.webp"
                alt="Técnico de HVAC dando servicio a un condensador exterior residencial"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/25 via-black/0 to-black/0" />
            </div>
            <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-extrabold tracking-wide text-black shadow-soft backdrop-blur">
              Casas en Los Ángeles y OC
            </div>
          </div>

          <div className="max-w-xl">
            <div className="text-sm font-extrabold tracking-wide text-black/60">
              PARA PROPIETARIOS
            </div>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Servicios residenciales de climatización
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-black/70">
              Soluciones de confort diseñadas para su hogar: reparaciones rápidas,
              mantenimiento preventivo, instalaciones energéticamente eficientes y
              aislamiento del ático. Sirviendo a Los Ángeles y el Condado de Orange.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/es/contacto" variant="primary" size="md">
                Reserva ahora
              </Button>
              <Button href="tel:+17147159569" variant="secondary" size="md">
                Llama al (714) 715-9569
              </Button>
            </div>

            <ul className="mt-6 grid gap-2 text-sm text-black/70 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-brand-red" />
                Licenciado • Asegurado • Garantizado
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-brand-red" />
                Programación rápida y estimaciones claras
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-brand-red" />
                Opciones de financiación disponibles
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-brand-red" />
                Reparaciones, mantenimiento, instalaciones.
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <Section className="bg-brand-gray">
        <div className="mx-auto max-w-4xl text-center">
          <div className="text-xs font-extrabold tracking-wide text-black/60">
            PARA TU CASA
          </div>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Servicios residenciales
          </h2>
          <p className="mt-3 text-black/70">
            Elija un servicio para obtener más información o llámenos; le indicaremos el
            opción correcta.
          </p>
        </div>

        <div className="mt-10">
          <ServiceCardGrid
            services={RESIDENTIAL_SERVICES}
            basePath="residential"
          />
        </div>

        <div className="mt-10 text-center">
          <Button href="/es/comercial" variant="ghost" size="md">
            ¿Busca servicios comerciales? →
          </Button>
        </div>
      </Section>
    </>
  );
}
