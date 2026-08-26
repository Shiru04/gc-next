/**
 * Cliente del Operations Hub para los contadores de CTA. Solo server.
 *
 * El browser nunca habla con el hub directamente: manda el beacon a
 * `/api/track/` en este mismo dominio y esta capa lo reenvía. Eso es lo que
 * mantiene el tracking first-party — un beacon cross-origin a onrender.com lo
 * tiraría cualquier bloqueador, que es justamente lo que este contador existe
 * para evitar.
 *
 * Sin `HIVE_API_URL` + `HIVE_CTA_SITE_KEY` configurados, los eventos se
 * escriben en los logs de Vercel y nada se rompe.
 */

const HUB_URL = process.env.HIVE_API_URL?.replace(/\/+$/, "");
const SITE_KEY = process.env.HIVE_CTA_SITE_KEY;

/**
 * Un CTA no puede hacer esperar al visitante. Si el hub está frío (Render
 * duerme los servicios inactivos) cortamos y perdemos el evento antes que
 * colgar la función.
 */
const INGEST_TIMEOUT_MS = 5_000;
const STATS_TIMEOUT_MS = 15_000;

export function isHubConfigured(): boolean {
  return Boolean(HUB_URL && SITE_KEY);
}

export type CtaEventPayload = {
  id: string;
  location: string;
  type: string;
  label?: string;
  page: string;
};

async function hubFetch(
  path: string,
  init: RequestInit,
  timeoutMs: number,
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(`${HUB_URL}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        "X-Site-Key": SITE_KEY as string,
        ...init.headers,
      },
      signal: controller.signal,
      cache: "no-store",
    });
  } finally {
    clearTimeout(timer);
  }
}

/** Reenvía un click al hub. Nunca tira: el tracking no puede romper el sitio. */
export async function recordCtaEvent(event: CtaEventPayload): Promise<void> {
  if (!isHubConfigured()) {
    console.log("[cta]", JSON.stringify(event));
    return;
  }

  try {
    const res = await hubFetch(
      "/api/public/cta",
      { method: "POST", body: JSON.stringify({ events: [event] }) },
      INGEST_TIMEOUT_MS,
    );

    if (!res.ok) {
      console.error(`[cta] hub rechazó el evento: ${res.status}`);
    }
  } catch (error) {
    console.error("[cta] no se pudo alcanzar el hub", error);
  }
}

export type HubCtaStats = {
  site: { name: string; url: string };
  days: number;
  since: string;
  totals: Array<{
    ctaId: string;
    count: number;
    location: string;
    type: string;
    label: string;
    lastSeenAt: string;
    pages: Array<{ page: string; count: number }>;
  }>;
  daily: Array<{ date: string; count: number }>;
};

/** Lee los contadores del hub. Devuelve null si no hay hub configurado. */
export async function readCtaStats(days = 30): Promise<HubCtaStats | null> {
  if (!isHubConfigured()) return null;

  const res = await hubFetch(
    `/api/public/cta/stats?days=${days}`,
    { method: "GET" },
    STATS_TIMEOUT_MS,
  );

  if (!res.ok) {
    throw new Error(`Hub respondió ${res.status}`);
  }

  return (await res.json()) as HubCtaStats;
}
