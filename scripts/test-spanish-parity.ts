import assert from "node:assert/strict";
import fs from "node:fs";
const pairs = [["app/page.tsx","app/es/page.tsx"],["app/about/page.tsx","app/es/acerca/page.tsx"],["app/services/page.tsx","app/es/servicios/page.tsx"],["app/residential/page.tsx","app/es/residencial/page.tsx"],["app/commercial/page.tsx","app/es/comercial/page.tsx"],["app/contact/page.tsx","app/es/contacto/page.tsx"],["app/financing/page.tsx","app/es/financiamiento/page.tsx"],["app/service-areas/page.tsx","app/es/areas-de-servicio/page.tsx"],["app/resources/page.tsx","app/es/recursos/page.tsx"],["app/reviews/page.tsx","app/es/resenas/page.tsx"],["app/promotions/page.tsx","app/es/promociones/page.tsx"],["app/privacy-policy/page.tsx","app/es/politica-de-privacidad/page.tsx"]] as const;
const tags = (source: string) => [...source.matchAll(/<([A-Z][A-Za-z0-9]*|section|article|h[1-6]|img)\b/g)].map((x) => x[1].replace(/Spanish$/, ""));
const assets = (source: string) => [...source.matchAll(/["'`](\/[^"'`]+\.(?:webp|avif|png|svg|jpg))["'`]/g)].map((x) => x[1]).sort();
for (const [enPath, esPath] of pairs) {
  const en = fs.readFileSync(enPath,"utf8"), es = fs.readFileSync(esPath,"utf8");
  assert.deepEqual(tags(es), tags(en), `${esPath} changed the component/heading structure`);
  assert.deepEqual(assets(es), assets(en), `${esPath} changed image assets`);
}
assert.equal(fs.readdirSync("app/es/areas-de-servicio/[slug]").includes("page.tsx"), true);
console.log(`Spanish parity tests passed for ${pairs.length} primary templates.`);
