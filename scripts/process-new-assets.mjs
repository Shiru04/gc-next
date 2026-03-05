import sharp from "sharp";
import { readFileSync, mkdirSync, copyFileSync } from "fs";
import { join, resolve } from "path";

const PUBLIC = resolve("public");

async function generateResponsive(inputPath, outputBase, widths, formats = ["webp", "avif"]) {
  const img = sharp(readFileSync(inputPath));
  const meta = await img.metadata();
  console.log(`  Source: ${meta.width}x${meta.height} (${meta.format})`);

  // Generate base webp (full size, used as fallback)
  await sharp(readFileSync(inputPath))
    .webp({ quality: 82 })
    .toFile(`${outputBase}.webp`);
  console.log(`  -> ${outputBase}.webp`);

  for (const w of widths) {
    if (w > meta.width) {
      console.log(`  skip w${w} (larger than source ${meta.width})`);
      continue;
    }
    for (const fmt of formats) {
      const out = `${outputBase}-w${w}.${fmt}`;
      const pipeline = sharp(readFileSync(inputPath)).resize(w);
      if (fmt === "avif") {
        await pipeline.avif({ quality: 65 }).toFile(out);
      } else {
        await pipeline.webp({ quality: 82 }).toFile(out);
      }
      console.log(`  -> ${out}`);
    }
  }
}

async function generateLogoResponsive(inputPath, outputBase, widths) {
  const buf = readFileSync(inputPath);
  const img = sharp(buf);
  const meta = await img.metadata();
  console.log(`  Source: ${meta.width}x${meta.height} (${meta.format})`);

  // Base webp
  await sharp(buf).webp({ quality: 90 }).toFile(`${outputBase}.webp`);
  console.log(`  -> ${outputBase}.webp`);

  for (const w of widths) {
    for (const fmt of ["avif", "webp"]) {
      const out = `${outputBase}-w${w}.${fmt}`;
      const pipeline = sharp(buf).resize(w, null, { fit: "inside" });
      if (fmt === "avif") {
        await pipeline.avif({ quality: 75 }).toFile(out);
      } else {
        await pipeline.webp({ quality: 90 }).toFile(out);
      }
      console.log(`  -> ${out}`);
    }
  }
}

async function main() {
  const DL = "C:/Users/User/Downloads";

  // 1. Hero image
  console.log("\n=== HERO IMAGE ===");
  const heroInput = join(DL, "La nueva imagen.jpg");
  const heroBase = join(PUBLIC, "hero/home-hero");
  await generateResponsive(heroInput, heroBase, [420, 640, 768, 960, 1200]);

  // 2. American Standard logo (SVG -> rasterize first)
  console.log("\n=== AMERICAN STANDARD LOGO ===");
  const asInput = join(DL, "65dab21f91f9fe742515da17_American Standard Dealer Logo.svg");
  const asBase = join(PUBLIC, "trust/american-standard");
  // Sharp can handle SVG
  await generateLogoResponsive(asInput, asBase, [96, 128, 192, 256]);

  // 3. Angi logo
  console.log("\n=== ANGI LOGO ===");
  const angiInput = join(DL, "65dba381bb7418d436ac6c86_Angi_SuperService Award Logo_v2.png");
  const angiBase = join(PUBLIC, "trust/angieslist");
  await generateLogoResponsive(angiInput, angiBase, [64, 96, 128, 192]);

  // 4. HomeAdvisor logo
  console.log("\n=== HOMEADVISOR LOGO ===");
  const haInput = join(DL, "65dba4ebab39073a88ebe75d_HomeAdvisor Approved Logo.jpg");
  const haBase = join(PUBLIC, "trust/homeadvisor");
  await generateLogoResponsive(haInput, haBase, [64, 96, 128, 192]);

  console.log("\n✓ All assets processed!");
}

main().catch(console.error);
