import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";

export async function GET() {
  return NextResponse.json({ ok: true, configured: Boolean(process.env.HIVE_REVALIDATE_SECRET) });
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function secretsMatch(provided: string, expected: string) {
  const left = Buffer.from(provided);
  const right = Buffer.from(expected);
  return left.length === right.length && timingSafeEqual(left, right);
}

function isSafePath(value: unknown): value is string {
  return typeof value === "string" && value.startsWith("/") && !value.startsWith("//") && !value.includes("..") && value.length < 512;
}

export async function POST(request: Request) {
  const expected = process.env.HIVE_REVALIDATE_SECRET;
  if (!expected) return NextResponse.json({ ok: false, error: "Not configured" }, { status: 503 });
  const payload = await request.json().catch(() => ({})) as { secret?: string; paths?: unknown; reason?: string };
  const provided = request.headers.get("x-hive-secret") || payload.secret || "";
  if (!secretsMatch(provided, expected)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const requested = Array.isArray(payload.paths) ? payload.paths : [];
  const paths = [...new Set(requested.filter(isSafePath))].slice(0, 200);
  revalidateTag("hive-blog", "max");
  revalidatePath("/resources", "layout");
  revalidatePath("/es/recursos", "layout");
  for (const path of paths) revalidatePath(path);
  return NextResponse.json({ ok: true, revalidated: paths, reason: payload.reason ?? null });
}
