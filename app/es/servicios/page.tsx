import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import {
  RESIDENTIAL_SERVICES,
  COMMERCIAL_SERVICES,
} from "@/lib/services.es";
import { ServiceCardGrid } from "@/components/sections/ServiceCardGrid";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Servicios de climatización | Calefacción y refrigeración GC",
  description:
    "Servicios de HVAC residenciales y comerciales en Los Ángeles y el condado de Orange. Explore nuestras categorías de servicios residenciales y comerciales.",
  path: "/es/servicios",
});

export default function ServicesPage() {
  return (
    <>
      {/* HERO */}
      <Section className="pt-10 sm:pt-14">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl shadow-soft ring-1 ring-black/5">
            <div className="relative aspect-[16/11] sm:aspect-[16/10] lg:aspect-[16/11]">
              <Image
                src="/hero/services-hero.webp"
                alt="Técnico de HVAC dando servicio a un condensador exterior"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/25 via-black/0 to-black/0" />
            </div>
            <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-extrabold tracking-wide text-black shadow-soft backdrop-blur">
              Sirviendo a Los Ángeles y el Condado de Orange
            </div>
          </div>

          <div className="max-w-xl">
            <div className="text-sm font-extrabold tracking-wide text-black/60">
              QUE HACEMOS
            </div>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Nuestros Servicios
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-black/70">
              Brindamos servicios de HVAC tanto para hogares como para empresas en Los Ángeles.
              Ángeles y el condado de Orange. Elige la categoría que más te convenga.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/es/residencial" variant="primary" size="md">
                Servicios residenciales
              </Button>
              <Button href="/es/comercial" variant="secondary" size="md">
                Servicios comerciales
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* RESIDENTIAL SECTION */}
      <Section className="bg-brand-gray">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="text-xs font-extrabold tracking-wide text-black/60">
              PARA PROPIETARIOS
            </div>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Climatización residencial
            </h2>
            <p className="mt-3 text-black/70">
              Reparaciones, mantenimiento, instalaciones y aislamiento del ático para su
              casa.
            </p>
          </div>
          <Button href="/es/residencial" variant="ghost" size="md">
            Ver centro residencial →
          </Button>
        </div>

        <div className="mt-8">
          <ServiceCardGrid
            services={RESIDENTIAL_SERVICES}
            basePath="residential"
          />
        </div>
      </Section>

      {/* COMMERCIAL SECTION */}
      <Section>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="text-xs font-extrabold tracking-wide text-black/60">
              PARA EMPRESAS
            </div>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Climatización comercial
            </h2>
            <p className="mt-3 text-black/70">
              Reparación, mantenimiento preventivo e instalación de oficinas.
              y propiedades comerciales ligeras.
            </p>
          </div>
          <Button href="/es/comercial" variant="ghost" size="md">
            Ver centro comercial →
          </Button>
        </div>

        <div className="mt-8">
          <ServiceCardGrid
            services={COMMERCIAL_SERVICES}
            basePath="commercial"
          />
        </div>
      </Section>
    </>
  );
}
