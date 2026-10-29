import type { NextConfig } from "next";
import { assertProductionReady } from "./lib/commercial-config";
import { URL_MIGRATION } from "./lib/url-migration";
import { LEGACY_SERVICE_REDIRECTS as EN_ALIASES } from "./lib/services";
import { LEGACY_SERVICE_REDIRECTS as ES_ALIASES } from "./lib/services.es";

if (process.env.VERCEL_ENV === "production") {
  assertProductionReady();
  const required = ["HOUSECALL_PRO_API_KEY", "TURNSTILE_SECRET_KEY", "NEXT_PUBLIC_TURNSTILE_SITE_KEY"];
  const missing = required.filter(name => !process.env[name]);
  if (process.env.HOUSECALL_PRO_MODE !== "api") missing.push("HOUSECALL_PRO_MODE=api");
  const storageConfigured = (process.env.LEAD_REDIS_REST_URL && process.env.LEAD_REDIS_REST_TOKEN)
    || (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)
    || (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
  if (!storageConfigured) missing.push("persistent lead delivery store");
  if (missing.length) throw new Error(`Lead delivery configuration missing: ${missing.join(", ")}`);
}

const nextConfig: NextConfig = {
  // Nota: se removió `output: "export"` al migrar a Vercel.
  // `trailingSlash` se mantiene para no romper las URLs ya indexadas.
  trailingSlash: true,
  async redirects() {
    // The launch runbook enables this only after the GSC/GA4/Ads URL inventory is complete.
    const migrated = process.env.GC_ENABLE_URL_MIGRATION === "true";
    const aliases = [["/services", EN_ALIASES], ["/es/servicios", ES_ALIASES]] as const;
    return [...aliases.flatMap(([prefix, entries]) => Object.entries(entries).map(([slug, target]) => ({
      source: `${prefix}/${slug}/`, destination: migrated ? URL_MIGRATION[`${target}/`] || `${target}/` : `${target}/`, statusCode: 301,
    }))), ...(migrated
      ? Object.entries(URL_MIGRATION).map(([source,destination]) => ({source,destination,statusCode:301}))
      : [])];
  },
  async headers() {
    return process.env.VERCEL_ENV === "preview"
      ? [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }] }]
      : [];
  },
};

export default nextConfig;
