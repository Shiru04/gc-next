import { NextResponse } from "next/server";
import { isHubConfigured, readCtaStats } from "@/lib/hub-analytics";

export const dynamic = "force-dynamic";

const STATS_TOKEN = process.env.CTA_STATS_TOKEN;

/** Comparación de largo constante, para no filtrar el token carácter por carácter. */
function tokenMatches(provided: string, expected: string): boolean {
  if (provided.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < provided.length; i++) {
    diff |= provided.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return diff === 0;
}

function isAuthorized(request: Request): boolean {
  // Sin token configurado no se sirve nada: fail closed.
  if (!STATS_TOKEN) return false;

  const header = request.headers.get("authorization") || "";
  const bearer = header.startsWith("Bearer ") ? header.slice(7) : "";
  const query = new URL(request.url).searchParams.get("token") || "";
  const provided = bearer || query;

  return Boolean(provided) && tokenMatches(provided, STATS_TOKEN);
}

/**
 * Devuelve los contadores de CTA que vive en el Operations Hub.
 *
 * El token de acá protege el dashboard de este sitio; la site key que autentica
 * contra el hub nunca sale del server.
 */
export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  if (!isHubConfigured()) {
    return NextResponse.json(
      { configured: false, totals: [], daily: [] },
      { headers: { "Cache-Control": "no-store" } },
    );
  }

  const daysParam = Number(new URL(request.url).searchParams.get("days"));
  const days = Number.isFinite(daysParam)
    ? Math.min(Math.max(Math.trunc(daysParam), 1), 365)
    : 30;

  try {
    const stats = await readCtaStats(days);
    return NextResponse.json(
      { configured: true, ...stats },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("[cta] stats failed", error);
    return NextResponse.json(
      { error: "El hub no respondió. Puede estar dormido — reintentá." },
      { status: 502 },
    );
  }
}
