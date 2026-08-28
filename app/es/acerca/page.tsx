import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SectionBlock } from "@/components/sections/SectionBlock";
import { BUSINESS } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import Image from "next/image";

export const metadata = buildMetadata({
  title: "Acerca de | Calefacción y refrigeración GC",
  description:
    "Empresa familiar de HVAC que presta servicios en Los Ángeles y el condado de Orange con una instalación, reparación y mantenimiento amigables y confiables.",
  path: "/about",
});

function CheckIcon() {
  return (
    <span
      aria-hidden="true"
      className="mt-[2px] inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-red/10 text-brand-red"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
        <path d="M9.0 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
      </svg>
    </span>
  );
}

function ValueIcon({ kind }: { kind: string }) {
  const common = "h-7 w-7 text-white";
  const icons: Record<string, React.ReactNode> = {
    shield: (
      <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
        <path fill="currentColor" d="M12 2 4 5v6c0 5.55 3.84 10.74 8 11 4.16-.26 8-5.45 8-11V5l-8-3zm0 18.02c-2.94-.5-6-4.55-6-9.02V6.3l6-2.25 6 2.25V11c0 4.47-3.06 8.52-6 9.02z" />
      </svg>
    ),
    list: (
      <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
        <path fill="currentColor" d="M7 5h14v2H7V5zm0 6h14v2H7v-2zm0 6h14v2H7v-2zM3 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
      </svg>
    ),
    id: (
      <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
        <path fill="currentColor" d="M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h5v2H8V8zm0 4h8v2H8v-2zm0 4h6v2H8v-2z" />
      </svg>
    ),
    star: (
      <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
        <path fill="currentColor" d="m12 17.3-6.18 3.73 1.64-7.03L2 9.24l7.19-.61L12 2l2.81 6.63 7.19.61-5.46 4.76 1.64 7.03z" />
      </svg>
    ),
    card: (
      <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
        <path fill="currentColor" d="M20 6H4c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 4H4V8h16v2zm-9 6H4v-2h7v2z" />
      </svg>
    ),
    calendar: (
      <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
        <path fill="currentColor" d="M7 2h2v2h6V2h2v2h3v18H4V4h3V2zm13 6H6v12h14V8z" />
      </svg>
    ),
    gear: (
      <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
        <path fill="currentColor" d="M19.14 12.94c.04-.31.06-.63.06-.94s-.02-.63-.06-.94l2.03-1.58-1.92-3.32-2.39.96a7.2 7.2 0 0 0-1.63-.94l-.36-2.54H9.13l-.36 2.54c-.58.23-1.12.54-1.63.94l-2.39-.96-1.92 3.32 2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94L2.83 14.5l1.92 3.32 2.39-.96c.5.4 1.05.71 1.63.94l.36 2.54h5.74l.36-2.54c.58-.23 1.12-.54 1.63-.94l2.39.96 1.92-3.32-2.03-1.56zM12 15.5A3.5 3.5 0 1 1 12 8a3.5 3.5 0 0 1 0 7.5z" />
      </svg>
    ),
    user: (
      <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
        <path fill="currentColor" d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5z" />
      </svg>
    ),
  };

  return icons[kind] ?? (
    <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="currentColor" />
    </svg>
  );
}

export default function AboutPage() {
  const highlights = [
    { stat: "25+", label: "Años sirviendo a Los Ángeles y OC" },
    { stat: "10,000+", label: "Clientes felices" },
    { stat: "12+", label: "Técnicos cualificados" },
    { stat: "#794228", label: "Licencia CA" },
  ];

  const values = [
    { title: "Tranquilidad de espíritu", desc: "Licenciado, garantizado y asegurado por responsabilidad civil y compensación laboral.", icon: "shield" },
    { title: "Transparencia", desc: "Opciones claras, explicaciones sencillas y recomendaciones directas.", icon: "list" },
    { title: "Confiable", desc: "Un equipo local operado por una familia enfocado en relaciones a largo plazo.", icon: "id" },
    { title: "Registro probado", desc: "Gran satisfacción del cliente y clientes habituales en Los Ángeles y OC.", icon: "star" },
    { title: "Financiación", desc: "Opciones disponibles para que las mejoras de comodidad sean más fáciles de costear.", icon: "card" },
    { title: "Servicio programado", desc: "Planes de mantenimiento para proteger la vida y eficiencia de los equipos.", icon: "calendar" },
    { title: "Confiable", desc: "Instalaciones y reparaciones de calidad con mano de obra respaldada por garantía.", icon: "gear" },
    { title: "Personalizado", desc: "Cada hogar es diferente: dimensionamos y diseñamos adecuadamente, no adivinamos.", icon: "user" },
  ];

  const timeline = [
    { year: "1999", event: "Fundada como una empresa familiar de HVAC en el sur de California." },
    { year: "2005", event: "Ampliado para servir a todo Los Ángeles y el condado de Orange" },
    { year: "2015", event: "Se convirtió en distribuidor de atención al cliente de American Standard" },
    { year: "Today", event: "Más de 25 años, más de 10 000 clientes y todavía operado por una familia" },
  ];

  return (
    <>
      {/* HERO — 2-col with highlights */}
      <Section className="pt-10 sm:pt-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="text-sm font-extrabold tracking-wide text-black/60">
              CALEFACCIÓN Y ENFRIAMIENTO GC
            </div>

            <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Servicio de calidad{" "}
              <span className="text-brand-red">desde 1999</span>
            </h1>

            <p className="mt-4 max-w-xl text-lg leading-relaxed text-black/70">
              Empresa familiar de HVAC centrada en la comodidad, el valor y
              mano de obra profesional: sirviendo con orgullo a Los Ángeles y Orange
              Condado.
            </p>

            {/* Highlights grid (replaces long bullet list) */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              {highlights.map((h) => (
                <Card key={h.label} className="p-4">
                  <div className="text-2xl font-extrabold">{h.stat}</div>
                  <div className="text-sm text-black/60">{h.label}</div>
                </Card>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/es/programar-servicio/" variant="primary" size="lg">
                Solicitar servicio
              </Button>
              <Button
                href={`tel:${BUSINESS.phoneE164}`}
                variant="secondary"
                size="lg"
              >
                Llamar {BUSINESS.phoneDisplay}
              </Button>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-black/60">
              <span className="font-semibold text-black/70">
                {BUSINESS.trustLine}
              </span>
              <span aria-hidden>•</span>
              <span>{BUSINESS.licenseLabel}</span>
            </div>
          </div>

          <Card className="overflow-hidden">
            <div className="p-0">
              <div className="relative">
                <Image
                  src="/hero/about-hero.webp"
                  alt="GC Heating & Cooling: al servicio de Los Ángeles y el condado de Orange"
                  width={1200}
                  height={900}
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="h-auto w-full object-cover"
                />
                <div className="absolute left-4 top-4 rounded-2xl bg-white/90 px-4 py-3 shadow-soft backdrop-blur">
                  <div className="text-xs font-extrabold tracking-wide text-black/60">
                    SERVICIO
                  </div>
                  <div className="text-sm font-extrabold">
                    Los Ángeles y el condado de Orange
                  </div>
                  <div className="mt-1 text-xs text-black/60">
                    Reparaciones • Mantenimiento • Instalaciones
                  </div>
                </div>
              </div>
              <div className="border-t border-black/10 bg-white px-5 py-4">
                <div className="text-sm text-black/70">
                  Licenciado • Garantizado • Asegurado • {BUSINESS.licenseLabel}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* TIMELINE — our story as a visual timeline */}
      <Section className="bg-brand-gray">
        <div className="text-center">
          <div className="text-sm font-extrabold tracking-wide text-black/60">
            NUESTRA HISTORIA
          </div>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Construido sobre la base de la artesanía y la atención al cliente
          </h2>
        </div>

        <div className="mt-10 relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-brand-red/20 sm:left-1/2 sm:-translate-x-px" />

          <div className="space-y-8">
            {timeline.map((t, i) => (
              <div
                key={t.year}
                className={`relative flex items-start gap-6 sm:gap-0 ${
                  i % 2 === 0
                    ? "sm:flex-row"
                    : "sm:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 mt-1 h-3 w-3 rounded-full bg-brand-red ring-4 ring-white z-10" />

                {/* Content */}
                <div className={`ml-10 sm:ml-0 sm:w-1/2 ${i % 2 === 0 ? "sm:pr-12 sm:text-right" : "sm:pl-12"}`}>
                  <Card className="inline-block p-5">
                    <div className="text-lg font-extrabold text-brand-red">
                      {t.year}
                    </div>
                    <p className="mt-1 text-sm text-black/70">{t.event}</p>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* VALUE GRID */}
      <Section>
        <div className="text-center">
          <div className="text-sm font-extrabold tracking-wide text-black/60">
            NUESTROS VALORES
          </div>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            ¿Por qué elegirnos?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-black/70">
            Mano de obra profesional en HVAC con un enfoque familiar:
            comunicación clara, resultados confiables y respeto por su hogar.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <Card key={v.title} className="overflow-hidden">
              <div className="flex items-center gap-3 bg-brand-red p-5">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15">
                  <ValueIcon kind={v.icon} />
                </div>
                <div className="text-lg font-extrabold text-white">
                  {v.title}
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm leading-relaxed text-black/70">
                  {v.desc}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* MID CTA — what to expect */}
      <Section className="bg-brand-gray">
        <Card className="overflow-hidden">
          <div className="grid gap-6 p-7 sm:p-10 lg:grid-cols-[1.4fr,1fr] lg:items-center">
            <div>
              <div className="text-sm font-extrabold tracking-wide text-black/60">
                ¿LISTO PARA RECUPERAR LA COMODIDAD?
              </div>
              <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                Hable con un técnico: obtenga una recomendación clara
              </h2>
              <p className="mt-3 max-w-lg text-black/70 leading-relaxed">
                Ya sea que necesite una reparación rápida, un mantenimiento estacional o un nuevo
                cotización del sistema, lo ayudaremos a elegir la opción correcta para
                tu hogar y tu presupuesto.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  href={`tel:${BUSINESS.phoneE164}`}
                  variant="primary"
                  size="lg"
                >
                  Llamar {BUSINESS.phoneDisplay}
                </Button>
                <Button
                  href="/es/residencial/residential-ac-installation/#free-hvac-quote"
                  variant="secondary"
                  size="lg"
                >
                  Obtener un estimado gratuito
                </Button>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6">
              <div className="text-sm font-extrabold">lo que puedes esperar</div>
              <ul className="mt-4 space-y-3 text-sm text-black/70">
                {[
                  "Fast scheduling and clear next steps.",
                  "Options explained in plain English.",
                  "Respect for your home and clean work.",
                  "Quality parts + warranty-backed workmanship.",
                ].map((b) => (
                  <li key={b} className="flex gap-3">
                    <CheckIcon />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </Section>

      {/* STORY CARDS */}
      <Section>
        <div className="grid gap-8 lg:grid-cols-3">
          <Card className="p-7">
            <div className="text-sm font-extrabold tracking-wide text-black/60">
              CARTAS CREDENCIALES
            </div>
            <h3 className="mt-2 text-xl font-extrabold">
              Con licencia. Garantizado. Asegurado.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-black/70">
              Mantenemos las protecciones y el profesionalismo que usted debe esperar.
              de un contratista que trabaja en su hogar.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button href="/es/programar-servicio/" variant="primary" size="sm">
                Solicitar servicio
              </Button>
              <Button
                href={`tel:${BUSINESS.phoneE164}`}
                variant="secondary"
                size="sm"
              >
                Llamar
              </Button>
            </div>
          </Card>

          <Card className="p-7">
            <div className="text-sm font-extrabold tracking-wide text-black/60">
              VÍA DE SERVÍCIO
            </div>
            <h3 className="mt-2 text-xl font-extrabold">
              Los Ángeles y el condado de Orange
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-black/70">
              Desde reparaciones hasta instalaciones completas, preparado para el clima local.
              demandas y diseños típicos de casas en Los Ángeles y OC.
            </p>
            <div className="mt-5 rounded-2xl bg-brand-gray p-4">
              <div className="text-sm font-extrabold">Solicitudes populares</div>
              <div className="mt-2 text-sm text-black/70">
                El aire acondicionado no enfría • Problemas con el horno • Ajustes de mantenimiento • Nuevo
                estimaciones del sistema
              </div>
            </div>
          </Card>

          <Card className="p-7">
            <div className="text-sm font-extrabold tracking-wide text-black/60">
              COMPROMISO
            </div>
            <h3 className="mt-2 text-xl font-extrabold">
              Tu comodidad es nuestra prioridad
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-black/70">
              Respondemos llamadas con prontitud, llegamos a tiempo y explicamos las cosas.
              claramente. Sin sorpresas ni presiones, solo un servicio honesto.
            </p>
          </Card>
        </div>
      </Section>

      {/* FINAL CTA */}
      <Section className="bg-brand-gray">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            Llame ahora o reserve en línea: nosotros nos encargaremos desde allí
          </h2>
          <p className="mt-3 text-black/70">
            Programación rápida • Opciones claras • Mano de obra profesional
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
