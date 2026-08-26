import { NextResponse } from "next/server";
import { recordCtaEvent } from "@/lib/hub-analytics";

export const dynamic = "force-dynamic";

/** Tipos aceptados. Cualquier otra cosa se descarta. */
const ALLOWED_TYPES = new Set([
  "phone",
  "booking",
  "form",
  "contact",
  "financing",
  "promo",
  "link",
]);

const MAX_FIELD_LENGTH = 120;

function sanitize(value: unknown, fallback = ""): string {
  if (typeof value !== "string") return fallback;
  return value.trim().slice(0, MAX_FIELD_LENGTH);
}

/**
 * Registra un click de CTA.
 *
 * Anónimo a propósito: no leemos ni seteamos cookies, no guardamos IP, user
 * agent ni ningún identificador. Solo se incrementa un contador por CTA.
 */
export async function POST(request: Request) {
  let payload: any;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid json" }, { status: 400 });
  }

  const id = sanitize(payload?.id);
  const type = sanitize(payload?.type);

  if (!id || !ALLOWED_TYPES.has(type)) {
    return NextResponse.json({ ok: false, error: "invalid event" }, { status: 400 });
  }

  try {
    await recordCtaEvent({
      id,
      type,
      location: sanitize(payload?.location, "unknown"),
      label: sanitize(payload?.label),
      page: sanitize(payload?.page, "/"),
    });
  } catch (error) {
    // Nunca devolvemos error al browser por esto: es telemetría, no puede
    // ensuciar la consola del usuario ni reintentarse.
    console.error("[cta] record failed", error);
  }

  return new NextResponse(null, { status: 204 });
}
