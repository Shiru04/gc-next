/**
 * Taxonomía de CTAs.
 *
 * Sirve tanto en server como en client components: acá solo se definen tipos y
 * helpers puros. El disparo de eventos vive en `lib/analytics.ts` (client-only).
 *
 * Hay dos formas de instrumentar un CTA:
 *
 *  1. Explícita — se le pasan los `data-*` al elemento:
 *       <a href={...} {...ctaAttrs({ id: "hero-call", location: "home-hero", type: "phone" })}>
 *
 *  2. Automática — si no hay `data-*`, el listener delegado de
 *     `ConversionTracking` infiere tipo y ubicación a partir del href y del DOM.
 *     Cubre los CTAs que no tocamos uno por uno.
 *
 * La forma explícita siempre gana. Usala en los CTAs que te importa medir con
 * precisión (hero, floating, header) y dejá que el resto caiga en la inferencia.
 */

export type CtaType =
  | "phone" // click a un tel:
  | "booking" // click al booking de dispatch.me
  | "form" // submit del formulario de contacto
  | "contact" // navegación hacia /contact
  | "financing" // navegación hacia /financing
  | "promo" // navegación hacia una promo
  | "link"; // cualquier otro link con pinta de CTA

export type CtaMeta = {
  /** Identificador estable y único del CTA. kebab-case. Ej: "floating-call". */
  id: string;
  /** Dónde vive dentro de la página. Ej: "header", "home-hero", "footer". */
  location: string;
  type: CtaType;
  /** Texto visible, opcional. Si se omite se toma del DOM al hacer click. */
  label?: string;
};

/** Atributos `data-*` para instrumentar un elemento de forma explícita. */
export function ctaAttrs(meta: CtaMeta) {
  return {
    "data-cta": meta.id,
    "data-cta-location": meta.location,
    "data-cta-type": meta.type,
    ...(meta.label ? { "data-cta-label": meta.label } : {}),
  } as const;
}

/**
 * Marca un contenedor como ubicación. Todos los CTAs que estén adentro y no
 * declaren la suya heredan este valor.
 *
 *   <section {...ctaScope("home-hero")}> … </section>
 */
export function ctaScope(location: string) {
  return { "data-cta-location": location } as const;
}

/** Labels de conversión de Google Ads, por tipo de CTA. */
export const GADS_CONVERSION_LABELS: Partial<Record<CtaType, string>> = {
  phone: "0pMLCI_U4YocEKfT3_0C",
  booking: "ljhICK7O64ocEKfT3_0C",
};

/** Nombre del evento custom de Meta Pixel, por tipo de CTA. */
export const META_EVENTS: Partial<Record<CtaType, string>> = {
  phone: "Contact",
  booking: "Schedule",
  form: "Lead",
};

/** Deduce el tipo de CTA a partir del href. */
export function inferCtaType(href: string): CtaType | null {
  if (!href) return null;
  if (href.startsWith("tel:")) return "phone";
  if (href.includes("dispatch.me")) return "booking";
  if (href.startsWith("mailto:")) return "contact";

  // Solo miramos el path para no confundirnos con querystrings.
  const path = href.split("?")[0].split("#")[0];
  if (/\/contact\/?$/.test(path)) return "contact";
  if (/\/financing\/?$/.test(path)) return "financing";
  if (/\/promotions(\/|$)/.test(path)) return "promo";
  return null;
}

/** Normaliza texto libre a un id usable como clave. */
export function slugifyCta(text: string): string {
  return (
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "unknown"
  );
}
