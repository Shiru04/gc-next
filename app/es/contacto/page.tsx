import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ContactFormSpanish } from "@/components/ui/ContactFormSpanish";
import { BUSINESS } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";

export const metadata = buildMetadata({
  title: "Contacto | Calefacción y refrigeración GC",
  description:
    "Comuníquese con GC Heating & Cooling para la instalación, reparación y mantenimiento de HVAC en Los Ángeles y el condado de Orange. Consultas HVAC gratuitas; estimados gratuitos para instalación y reemplazo.",
  path: "/es/contacto",
});

export default function ContactPage() {
  return (
    <>
      {/* HERO (Wix-like) */}
      <Section className="relative overflow-hidden pt-10 sm:pt-14">
        {/* Background image */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#b31217] via-[#e52d27] to-[#ff6a00]" />
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-white" />
        </div>

        <div className="relative grid gap-8 lg:grid-cols-12 lg:items-stretch">
          {/* Left copy */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-extrabold tracking-wide text-white ring-1 ring-white/20 backdrop-blur">
              DAMOS SERVICIO, INSTALAMOS Y REPARAMOS SISTEMAS HVAC
            </div>

            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              estamos listos
              <br />
              para ayudar!
            </h1>

            <div className="mt-4 max-w-xl text-base text-white/85 sm:text-lg">
              Llámenos para una programación rápida o reserve una consulta en el sitio. Nosotros
              servir <span className="font-semibold">Los Ángeles</span> and{" "}
              <span className="font-semibold">Condado de Orange</span>.
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
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

            {/* Contact details (Wix-style block) */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Card className="bg-white/95 p-6 shadow-soft">
                <div className="text-sm font-extrabold text-black/60">
                  Atención al cliente
                </div>
                <div className="mt-2 text-xl font-extrabold">
                  {BUSINESS.phoneDisplay}
                </div>
                <div className="mt-2 text-sm text-black/70">
                  {BUSINESS.hoursShort}
                </div>
                <div className="mt-4">
                  <Button
                    href={`tel:${BUSINESS.phoneE164}`}
                    variant="primary"
                    size="md"
                  >
                    Toca para llamar
                  </Button>
                </div>
              </Card>

              <Card className="bg-white/95 p-6 shadow-soft">
                <div className="text-sm font-extrabold text-black/60">
                  Nuestra Dirección
                </div>
                <div className="mt-2 font-extrabold">
                  {BUSINESS.addressLine1}
                </div>
                <div className="text-black/70">{BUSINESS.cityStateZip}</div>

                <div className="mt-4 text-sm text-black/70">
                  ¿Necesita confirmar su área de servicio?{" "}
                  <a
                    href="/es/areas-de-servicio"
                    className="font-bold text-brand-red underline underline-offset-2"
                  >
                    Ver áreas de servicio
                  </a>
                </div>
              </Card>
            </div>
          </div>

          {/* Right - Contact form */}
          <div className="lg:col-span-5">
            <Card className="bg-white p-6 shadow-soft sm:p-8">
              <div className="mb-5">
                <div className="text-lg font-extrabold text-black">
                  Envíanos un mensaje
                </div>
                <div className="mt-1 text-sm text-black/60">
                  Nos comunicaremos con usted dentro de las 24 horas.
                </div>
              </div>
              <ContactFormSpanish />
            </Card>
          </div>
        </div>
      </Section>

      {/* SERVICE AREA (map + CTA to /service-areas) */}
      <Section className="pt-10 sm:pt-14">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <div className="text-sm font-extrabold tracking-wide text-black/60">
              CALEFACCIÓN Y ENFRIAMIENTO GC
            </div>
            <h2 className="mt-2 text-4xl font-extrabold tracking-tight">
              Vía de Servício
            </h2>
            <p className="mt-4 text-lg text-black/70">
              Brindamos servicios de calefacción y aire acondicionado para residencial.
              y propiedades comerciales en{" "}
              <span className="font-semibold">Condado de Los Ángeles</span> and{" "}
              <span className="font-semibold">Condado de Orange</span>.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/es/areas-de-servicio" variant="primary" size="lg">
                Ver áreas de servicio
              </Button>
              <Button href="/es/programar-servicio/" variant="secondary" size="lg">
                Solicitar servicio
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <Card className="overflow-hidden p-0">
              <div className="relative aspect-[16/10] w-full">
                <ResponsiveImage
                  srcBase="/hero/service-areas-map"
                  alt="Mapa del área de servicio para Los Ángeles y el condado de Orange"
                  fill
                  widths={[640, 960, 1200, 1600]}
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}
