"use client";

import {
  type CtaMeta,
} from "@/lib/cta";
import { pushConversionEvent } from "@/lib/conversions";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export type CtaEvent = CtaMeta & {
  /** Path donde ocurrió el click. */
  page: string;
  /** href destino, cuando aplica. */
  href?: string;
};

/**
 * Envía el evento a los cuatro destinos:
 *
 *   GA4            → evento `cta_click` con dimensiones (id/location/type/page)
 *   Google Ads     → conversión, solo para phone y booking
 *   Meta Pixel     → evento estándar mapeado (Contact / Schedule / Lead)
 *   /api/track     → contador first-party, sobrevive adblockers y consent denegado
 *
 * Los tres primeros dependen de que el usuario haya aceptado cookies (si no,
 * `gtag`/`fbq` ni siquiera existen). El cuarto es anónimo: no manda cookies, ni
 * ids, ni nada que identifique al visitante, así que se dispara siempre.
 */
export function trackCta(event: CtaEvent): void {
  if (typeof window === "undefined") return;
  const name = event.type === "phone" ? "phone_click" : event.type === "booking" ? "schedule_service_click" : event.type === "financing" ? "financing_click" : event.type === "form" ? "contact_form_submit" : null;
  if (name) pushConversionEvent(name, { ctaLocation: event.location, linkUrl: event.href });
}

/**
 * La barra final es obligatoria: el sitio corre con `trailingSlash: true`, así
 * que `/api/track` devuelve un 308. `sendBeacon` no sigue redirects, con lo cual
 * pegarle sin la barra perdería el evento.
 */
const TRACK_ENDPOINT = "/api/track/";

function sendToFirstParty(event: CtaEvent): void {
  const body = JSON.stringify({
    id: event.id,
    location: event.location,
    type: event.type,
    label: event.label,
    page: event.page,
  });

  // sendBeacon sobrevive a que la página se esté yendo (tel:, target=_blank,
  // navegación). Es exactamente el caso de un CTA.
  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      if (navigator.sendBeacon(TRACK_ENDPOINT, blob)) return;
    }
  } catch {
    // cae al fetch de abajo
  }

  void fetch(TRACK_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {
    // El tracking nunca debe romper la navegación del usuario.
  });
}
