import fs from "node:fs/promises";
import path from "node:path";
import ts from "typescript";

const ROOT = process.cwd();
const CACHE_PATH = path.join(ROOT, ".translation-cache.json");
const TEXT_PROPS = new Set(["title", "description", "seoTitle", "seoDescription", "name", "short", "intro", "eyebrow", "label", "heading", "text", "desc", "event", "q", "a", "question", "answer", "body", "note", "cta", "county"]);
const TEXT_ATTRS = new Set(["alt", "aria-label", "placeholder", "title"]);
const ROUTES = [
  ["app/page.tsx", "app/es/page.tsx"], ["app/about/page.tsx", "app/es/acerca/page.tsx"],
  ["app/services/page.tsx", "app/es/servicios/page.tsx"], ["app/residential/page.tsx", "app/es/residencial/page.tsx"],
  ["app/services/[slug]/page.tsx", "app/es/servicios/[slug]/page.tsx"],
  ["app/residential/[slug]/page.tsx", "app/es/residencial/[slug]/page.tsx"], ["app/commercial/page.tsx", "app/es/comercial/page.tsx"],
  ["app/commercial/[slug]/page.tsx", "app/es/comercial/[slug]/page.tsx"], ["app/contact/page.tsx", "app/es/contacto/page.tsx"],
  ["app/financing/page.tsx", "app/es/financiamiento/page.tsx"], ["app/service-areas/page.tsx", "app/es/areas-de-servicio/page.tsx"],
  ["app/service-areas/[slug]/page.tsx", "app/es/areas-de-servicio/[slug]/page.tsx"], ["app/resources/page.tsx", "app/es/recursos/page.tsx"],
  ["app/resources/[slug]/page.tsx", "app/es/recursos/[slug]/page.tsx"], ["app/reviews/page.tsx", "app/es/resenas/page.tsx"],
  ["app/promotions/page.tsx", "app/es/promociones/page.tsx"], ["app/promotions/repairs/page.tsx", "app/es/promociones/reparaciones/page.tsx"],
  ["app/promotions/tune-ups/page.tsx", "app/es/promociones/mantenimiento/page.tsx"], ["app/promotions/new-installation/page.tsx", "app/es/promociones/instalacion-nueva/page.tsx"],
  ["app/privacy-policy/page.tsx", "app/es/politica-de-privacidad/page.tsx"],
  ["app/service-areas/ServiceAreasClient.tsx", "app/es/areas-de-servicio/ServiceAreasClient.tsx"],
  ["components/sections/ServiceDetail.tsx", "components/sections/ServiceDetailSpanish.tsx"],
  ["components/ui/ContactForm.tsx", "components/ui/ContactFormSpanish.tsx"],
];
const DATA = [["lib/services.ts", "lib/services.es.ts"], ["lib/areas.ts", "lib/areas.es.ts"], ["lib/area-content-la.ts", "lib/area-content-la.es.ts"], ["lib/area-content-oc.ts", "lib/area-content-oc.es.ts"], ["lib/posts.ts", "lib/posts.es.ts"], ["lib/promotions.ts", "lib/promotions.es.ts"]];
const PATH_MAP = [["/service-areas", "/es/areas-de-servicio"], ["/privacy-policy", "/es/politica-de-privacidad"], ["/residential", "/es/residencial"], ["/commercial", "/es/comercial"], ["/resources", "/es/recursos"], ["/promotions", "/es/promociones"], ["/financing", "/es/financiamiento"], ["/contact", "/es/contacto"], ["/services", "/es/servicios"], ["/reviews", "/es/resenas"], ["/schedule-service", "/es/programar-servicio"]];

let cache = {};
try { cache = JSON.parse(await fs.readFile(CACHE_PATH, "utf8")); } catch {}
const pending = new Map();
function human(text) { const s = text.trim(); return s.length > 1 && /[A-Za-z]/.test(s) && !/^(https?:|\/|@\/|[\w-]+\.(webp|svg|png|jpg)|[a-z-]+)$/.test(s) && !s.includes("className"); }
function propName(node) { return node && ts.isIdentifier(node) ? node.text : node && ts.isStringLiteral(node) ? node.text : ""; }
function collect(source, file, isData) {
  const sf = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, file.endsWith("x") ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  const edits = [];
  function add(node, raw, kind = "quoted") { if (!human(raw)) return; pending.set(raw, true); edits.push({ start: node.getStart(sf), end: node.getEnd(), raw, kind, original: node.getText(sf) }); }
  function visit(node) {
    if (ts.isJsxText(node)) { const raw = node.getText(sf); if (human(raw)) add(node, raw.trim(), "jsx"); }
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      const parent = node.parent;
      if (ts.isJsxAttribute(parent) && (TEXT_ATTRS.has(parent.name.getText(sf)) || TEXT_PROPS.has(parent.name.getText(sf)) || parent.name.getText(sf) === "ctaLabel")) add(node, node.text);
      else if (ts.isPropertyAssignment(parent) && (isData || TEXT_PROPS.has(propName(parent.name)))) {
        const key = propName(parent.name);
        if (!(file === "lib/areas.ts" && (key === "name" || key === "county"))) add(node, node.text);
      }
      else if (ts.isArrayLiteralExpression(parent) && isData) add(node, node.text);
    }
    ts.forEachChild(node, visit);
  }
  visit(sf); return edits;
}
async function translate(text) {
  if (cache[text]) return cache[text];
  const url = new URL("https://translate.googleapis.com/translate_a/single"); url.search = new URLSearchParams({ client: "gtx", sl: "en", tl: "es", dt: "t", q: text });
  const response = await fetch(url); if (!response.ok) throw new Error(`Translation failed: ${response.status}`);
  const json = await response.json(); const value = json[0].map((part) => part[0]).join(""); cache[text] = value; return value;
}
function quote(value, original) { const q = original[0] === "'" ? "'" : original[0] === "`" ? "`" : '"'; return q + value.replaceAll("\\", "\\\\").replaceAll(q, `\\${q}`).replaceAll("\n", "\\n") + q; }
async function transform(input, output, isData) {
  let source = await fs.readFile(path.join(ROOT, input), "utf8"); const edits = collect(source, input, isData);
  for (const edit of edits.sort((a,b) => b.start-a.start)) { const translated = cache[edit.raw] ?? edit.raw; const replacement = edit.kind === "jsx" ? edit.original.replace(edit.raw, translated) : quote(translated, edit.original); source = source.slice(0, edit.start) + replacement + source.slice(edit.end); }
  if (!isData) {
    for (const [en, es] of PATH_MAP) source = source.replaceAll(`"${en}`, `"${es}`).replaceAll(`\`${en}`, `\`${es}`).replaceAll(`'${en}`, `'${es}`);
    source = source.replace(/\/es\/servicios\/([^"'`]+\.(?:webp|avif|png|svg|jpg))/g, "/services/$1");
    source = source.replaceAll("@/lib/services\"", "@/lib/services.es\"").replaceAll("@/lib/areas\"", "@/lib/areas.es\"").replaceAll("@/lib/area-content\"", "@/lib/area-content.es\"").replaceAll("@/lib/posts\"", "@/lib/posts.es\"").replaceAll("@/lib/promotions\"", "@/lib/promotions.es\"");
    if (output.startsWith("app/es/")) source = source.replaceAll("@/components/sections/ServiceDetail\"", "@/components/sections/ServiceDetailSpanish\"");
    if (output.startsWith("app/es/")) source = source.replaceAll("@/components/ui/ContactForm\"", "@/components/ui/ContactFormSpanish\"");
    if (output.endsWith("ContactFormSpanish.tsx")) source = source.replace("export function ContactForm()", "export function ContactFormSpanish()");
    if (output.startsWith("app/es/")) source = source.replaceAll("{ ContactForm }", "{ ContactFormSpanish }").replaceAll("<ContactForm />", "<ContactFormSpanish />");
    if (output.endsWith("ServiceDetailSpanish.tsx")) source = source.replace("href={`/${basePath}`}", "href={basePath === \"residential\" ? \"/es/residencial\" : \"/es/comercial\"}").replace('basePath === "residential" ? "Residential" : "Commercial"', 'basePath === "residential" ? "Residencial" : "Comercial"');
  }
  await fs.mkdir(path.dirname(path.join(ROOT, output)), { recursive: true }); await fs.writeFile(path.join(ROOT, output), source);
}

for (const [input] of [...ROUTES, ...DATA]) { const source = await fs.readFile(path.join(ROOT, input), "utf8"); collect(source, input, DATA.some(([x]) => x === input)); }
const texts = [...pending.keys()].filter((text) => !cache[text]);
for (let i=0; i<texts.length; i+=10) { await Promise.all(texts.slice(i,i+10).map(translate)); process.stdout.write(`\rTranslated ${Math.min(i+10,texts.length)}/${texts.length}`); }
await fs.writeFile(CACHE_PATH, JSON.stringify(cache, null, 2));
for (const pair of DATA) await transform(...pair, true);
for (const pair of ROUTES) await transform(...pair, false);
console.log(`\nGenerated ${ROUTES.length} Spanish route templates and ${DATA.length} translated data modules.`);
