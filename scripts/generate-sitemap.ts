import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://gc-heatingadcooling.com"
)
  .trim()
  .replace(/\/+$/, "");

const TRAILING_SLASH = true;

function withSlash(p: string) {
  if (!p.startsWith("/")) p = `/${p}`;
  if (TRAILING_SLASH && !p.endsWith("/")) p = `${p}/`;
  return p;
}

function abs(p: string) {
  return `${SITE_URL}${withSlash(p)}`;
}

function xmlEscape(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

/**
 * Import a module by absolute filesystem path in a Windows-safe way.
 */
async function importByPath(absPath: string) {
  const url = pathToFileURL(absPath).href;
  return import(url);
}

async function main() {
  // ✅ Adjust if your libs are in /lib instead of /src/lib
  const servicesPath = path.resolve(process.cwd(), "lib", "services.ts");
  const areasPath = path.resolve(process.cwd(), "lib", "areas.ts");
  const resourcesPath = path.resolve(process.cwd(), "lib", "posts.ts");

  const servicesMod = await importByPath(servicesPath);
  const areasMod = await importByPath(areasPath);
  const resourcesMod = await importByPath(resourcesPath);

  const SERVICES = (servicesMod.SERVICES ?? []) as Array<{ slug: string }>;
  const SERVICE_AREAS = (areasMod.SERVICE_AREAS ?? []) as Array<{
    slug: string;
  }>;
  const RESOURCES = (resourcesMod.RESOURCES ?? []) as Array<{ slug: string }>;

  const staticRoutes = [
    "/",
    "/about",
    "/services",
    "/service-areas",
    "/resources",
    "/reviews",
    "/financing",
    "/contact",
    "/promotions",
  ];

  const urls = new Set<string>();

  staticRoutes.forEach((r) => urls.add(abs(r)));

  SERVICES.forEach((s) => s?.slug && urls.add(abs(`/services/${s.slug}`)));
  SERVICE_AREAS.forEach(
    (a) => a?.slug && urls.add(abs(`/service-areas/${a.slug}`)),
  );
  RESOURCES.forEach((r) => r?.slug && urls.add(abs(`/resources/${r.slug}`)));

  const body = Array.from(urls)
    .sort()
    .map((u) => `  <url><loc>${xmlEscape(u)}</loc></url>`)
    .join("\n");

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `${body}\n` +
    `</urlset>\n`;

  const outPath = path.resolve(process.cwd(), "public", "sitemap.xml");
  fs.writeFileSync(outPath, xml, "utf8");

  console.log(`✅ sitemap.xml generated: ${outPath}`);
  console.log(`✅ URLs: ${urls.size}`);
}

main().catch((err) => {
  console.error("❌ Failed to generate sitemap.xml");
  console.error(err);
  process.exit(1);
});
