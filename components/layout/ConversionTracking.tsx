"use client";

import { useEffect } from "react";
import { trackCta } from "@/lib/analytics";
import { inferCtaType, slugifyCta, type CtaMeta, type CtaType } from "@/lib/cta";

/**
 * Listener delegado único para todos los CTAs del sitio.
 *
 * Un solo handler en `document` cubre toda la página, así que no hace falta
 * cablear un onClick por botón ni convertir server components a client
 * components para medirlos.
 *
 * Resolución de cada click:
 *   1. Si el elemento (o un ancestro) declara `data-cta`, se usa eso tal cual.
 *   2. Si no, se infiere el tipo del href y la ubicación del DOM.
 * Los elementos sin `data-cta` y sin un href reconocible se ignoran, para no
 * contar navegación común como si fuera un CTA.
 */

/** Ventana anti-doble-disparo, por CTA. */
const DEDUPE_MS = 500;

function cleanLabel(el: HTMLElement): string {
  const aria = el.getAttribute("aria-label");
  const raw = aria || el.textContent || "";
  return raw.replace(/\s+/g, " ").trim().slice(0, 80);
}

function resolveLocation(el: HTMLElement): string {
  const scoped = el.closest<HTMLElement>("[data-cta-location]");
  if (scoped?.dataset.ctaLocation) return scoped.dataset.ctaLocation;

  if (el.closest("header")) return "header";
  if (el.closest("footer")) return "footer";
  if (el.closest("form")) return "form";

  const section = el.closest<HTMLElement>("[data-section], section[id]");
  if (section) return section.dataset.section || section.id || "section";

  // Último recurso: la página. Header y footer son globales y agregan bien
  // entre páginas, pero un CTA suelto en el cuerpo no: sin esto, el teléfono
  // de /contact/ y el de /about/ terminarían sumando en el mismo contador.
  return pageSlug();
}

/** "/residential/ac-repair/" → "residential-ac-repair"; "/" → "home". */
function pageSlug(): string {
  const path = window.location.pathname.replace(/^\/+|\/+$/g, "");
  return path ? slugifyCta(path) : "home";
}

/** Devuelve la metadata del CTA, o null si el click no corresponde a uno. */
function resolveCta(
  el: HTMLElement,
  href: string,
): (CtaMeta & { href?: string }) | null {
  const explicit = el.closest<HTMLElement>("[data-cta]");

  if (explicit?.dataset.cta) {
    const { cta, ctaLocation, ctaType, ctaLabel } = explicit.dataset;
    return {
      id: cta,
      location: ctaLocation || resolveLocation(explicit),
      type: (ctaType as CtaType) || inferCtaType(href) || "link",
      label: ctaLabel || cleanLabel(explicit),
      href: href || undefined,
    };
  }

  const type = inferCtaType(href);
  if (!type) return null; // no es un CTA: link de navegación común

  const label = cleanLabel(el);
  const location = resolveLocation(el);

  return {
    id: inferCtaId(type, location, label),
    location,
    type,
    label,
    href,
  };
}

/**
 * Para teléfono y booking el texto no aporta (es siempre el número o "Book
 * Now"): lo que distingue un CTA de otro es dónde está. Para el resto sí
 * conviene el texto, salvo que no agregue nada sobre el tipo.
 */
function inferCtaId(type: CtaType, location: string, label: string): string {
  if (type === "phone" || type === "booking") return `${location}-${type}`;

  const slug = slugifyCta(label);
  if (!slug || slug === "unknown" || slug === type) return `${location}-${type}`;

  return `${type}-${slug}`;
}

export function ConversionTracking() {
  useEffect(() => {
    const lastFired = new Map<string, number>();

    function handleClick(e: MouseEvent) {
      // Ignoramos clicks que no abren nada: botón del medio/derecho ya no
      // dispara este evento, pero sí llegan clicks sintéticos raros.
      if (e.button !== 0 && e.type === "click") return;

      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "a, button, [data-cta]",
      );
      if (!el) return;

      const href = el.getAttribute("href") || "";
      const cta = resolveCta(el, href);
      if (!cta) return;

      const now = e.timeStamp || performance.now();
      const previous = lastFired.get(cta.id);
      if (previous !== undefined && now - previous < DEDUPE_MS) return;
      lastFired.set(cta.id, now);

      trackCta({ ...cta, page: window.location.pathname });
    }

    // capture: true para registrar el click aunque un handler intermedio
    // llame a stopPropagation (ej. menús que se cierran solos).
    document.addEventListener("click", handleClick, { capture: true });
    return () =>
      document.removeEventListener("click", handleClick, { capture: true });
  }, []);

  return null;
}
