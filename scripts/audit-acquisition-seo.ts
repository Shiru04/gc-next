import fs from "node:fs";
import { URL_MIGRATION } from "../lib/url-migration";
import { LEGACY_SERVICE_REDIRECTS as EN_ALIASES } from "../lib/services";
import { LEGACY_SERVICE_REDIRECTS as ES_ALIASES } from "../lib/services.es";

async function main() {
const base = process.env.QA_BASE_URL || "http://localhost:3200";
const official = "https://gc-heatingandcooling.com";
const folder = "docs/qa-redesign";
const xml = await (await fetch(`${base}/sitemap.xml`)).text();
const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
if (!urls.length) throw new Error("Empty or invalid sitemap");
const results: Record<string, unknown>[] = [];
const links = new Set<string>();
const queue = [...urls];
const tagAttribute = (tag: string, key: string) => tag.match(new RegExp(`${key}="([^"]*)"`))?.[1];
await Promise.all(Array.from({ length: 4 }, async () => {
  while (queue.length) {
    const url = queue.shift()!;
    const path = new URL(url).pathname;
    const response = await fetch(base + path, { redirect: "manual" });
    const html = await response.text();
    const tags = [...html.matchAll(/<link\b[^>]*>/g)].map(match => match[0]);
    const canonical = tags.find(tag => tagAttribute(tag, "rel") === "canonical");
    const alternates = Object.fromEntries(tags.filter(tag => tagAttribute(tag, "hrefLang")).map(tag => [tagAttribute(tag, "hrefLang"), tagAttribute(tag, "href")]));
    for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
      try { const link = new URL(match[1].replaceAll("&amp;", "&"), official + path); if (link.origin === official && !link.pathname.startsWith("/api/")) links.add(link.pathname); } catch {}
    }
    const errors: string[] = [];
    if (response.status !== 200) errors.push(`HTTP ${response.status}`);
    if (!canonical || tagAttribute(canonical, "href") !== url) errors.push("canonical mismatch");
    if ((html.match(/<h1[ >]/g) || []).length !== 1) errors.push("H1 count");
    if (!html.match(/<title>[^<]+<\/title>/)) errors.push("missing title");
    if (/name="robots"[^>]*content="[^"]*noindex/.test(html)) errors.push("noindex in sitemap");
    if (/714\D{0,5}715\D{0,5}9569/.test(html)) errors.push("obsolete phone");
    if (/\$99\b|\$6,800|\$2,000/.test(html)) errors.push("unapproved legacy offer");
    if (/dispatch\.me/i.test(html)) errors.push("Dispatch reference");
    for (const value of Object.values(alternates)) if (String(value).includes("/es/es/")) errors.push("double Spanish prefix");
    results.push({ url, status: response.status, title: html.match(/<title>(.*?)<\/title>/)?.[1], canonical: canonical && tagAttribute(canonical, "href"), alternates, errors });
  }
}));
const internal: { path: string; status: number }[] = [];
const linkQueue = [...links];
await Promise.all(Array.from({ length: 4 }, async () => { while (linkQueue.length) { const path = linkQueue.shift()!; const response = await fetch(base + path); if (response.status >= 400) internal.push({ path, status: response.status }); } }));
const gsc = fs.readFileSync(`${folder}/gsc-pages-2026-09-12.tsv`, "utf8").trim().split(/\r?\n/).slice(1).map(row => row.split("\t")[0]);
const ga4 = fs.readFileSync(`${folder}/ga4-pages-2026-09-14.tsv`, "utf8").trim().split(/\r?\n/).slice(1).map(row => official + row.split("\t")[0]);
const aliases = Object.fromEntries([["/services", EN_ALIASES], ["/es/servicios", ES_ALIASES]].flatMap(([prefix, entries]) => Object.entries(entries).map(([slug, target]) => [`${prefix}/${slug}/`, `${target}/`])));
const all = new Set([...urls, ...gsc, ...ga4, ...Object.keys(aliases).map(path => official + path)]);
const escape = (value: unknown) => `"${String(value ?? "").replaceAll('"', '""')}"`;
const rows = [...all].sort().map(old => {
  const parsed = new URL(old); const path = parsed.pathname.endsWith("/") ? parsed.pathname : parsed.pathname + "/";
  const alias = aliases[path];
  const target = URL_MIGRATION[path] || (alias && (URL_MIGRATION[alias] || alias)) || path;
  const sources = [gsc.includes(old) && "GSC performance", ga4.includes(old) && "GA4 page paths", urls.includes(old) && "application sitemap", alias && "legacy alias"].filter(Boolean).join("; ");
  return [old, official + target, URL_MIGRATION[path] || alias ? "301 target planned; verify migration flag" : old === official + target ? "retain" : "normalize host/slash; verify", official + target, /installation|instalacion/.test(target) ? "installation" : /maintenance|mantenimiento/.test(target) ? "maintenance" : /repair|reparacion/.test(target) ? "repair" : /commercial|comercial/.test(target) ? "commercial" : /service-areas|areas-de-servicio/.test(target) ? "local service" : "general", sources + "; complete indexed export and Ads inventory pending"].map(escape).join(",");
});
fs.writeFileSync(`${folder}/url-migration-inventory.csv`, ["old URL,new URL,status,canonical,page intent,notes", ...rows].join("\n") + "\n");
fs.writeFileSync(`${folder}/seo-local.json`, JSON.stringify({ base, measuredAt: new Date().toISOString(), sitemapCount: urls.length, internalLinksChecked: links.size, brokenInternalLinks: internal, pages: results.sort((a,b) => String(a.url).localeCompare(String(b.url))) }, null, 2));
console.log(JSON.stringify({ sitemapPages: urls.length, failedPages: results.filter(page => (page.errors as string[]).length), brokenInternalLinks: internal, inventoryRows: rows.length }, null, 2));
}
main().catch(error => { console.error(error); process.exitCode = 1; });
