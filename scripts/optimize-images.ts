import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

/**
 * Genera variantes responsivas (webp + avif) con sufijo `-w{width}`.
 * Ej:
 *  /public/hero/home-hero.webp
 *    -> /public/hero/home-hero-w480.webp
 *    -> /public/hero/home-hero-w480.avif
 *
 * IMPORTANTE:
 * - No borra los originales.
 * - Podés expandir la lista cuando quieras.
 */

type Job = {
  inputFromPublic: string; // path relativo a /public, con extensión
  widths: number[];
  webpQuality?: number; // 1-100
  avifQuality?: number; // 1-100
};

const PUBLIC_DIR = path.join(process.cwd(), "public");

const jobs: Job[] = [
  // LCP (Home)
  {
    inputFromPublic: "hero/home-hero.webp",
    widths: [420, 640, 768, 960, 1200],
    webpQuality: 72,
    avifQuality: 48,
  },

  // Sección técnico
  {
    inputFromPublic: "sections/tech-working.webp",
    widths: [420, 640, 768, 960],
    webpQuality: 72,
    avifQuality: 48,
  },

  // Reviews bg / heroes reutilizados
  {
    inputFromPublic: "sections/reviews-bg.webp",
    widths: [640, 960, 1200, 1600],
    webpQuality: 70,
    avifQuality: 46,
  },
  {
    inputFromPublic: "hero/reviews-hero.webp",
    widths: [640, 960, 1200, 1600],
    webpQuality: 70,
    avifQuality: 46,
  },
  {
    inputFromPublic: "hero/services-hero.webp",
    widths: [640, 960, 1200, 1600],
    webpQuality: 70,
    avifQuality: 46,
  },
  {
    inputFromPublic: "hero/contact-hero.webp",
    widths: [640, 960, 1200, 1600],
    webpQuality: 70,
    avifQuality: 46,
  },
  {
    inputFromPublic: "hero/promotions-hero.webp",
    widths: [640, 960, 1200, 1600],
    webpQuality: 70,
    avifQuality: 46,
  },
  {
    inputFromPublic: "hero/service-areas-map.webp",
    widths: [640, 960, 1200, 1600],
    webpQuality: 70,
    avifQuality: 46,
  },
  {
    inputFromPublic: "sections/service-area-map.webp",
    widths: [640, 960, 1200, 1600],
    webpQuality: 70,
    avifQuality: 46,
  },

  // Service cards / hero pequeños
  {
    inputFromPublic: "services/installation/installation-hero.webp",
    widths: [420, 640, 820],
    webpQuality: 72,
    avifQuality: 48,
  },
  {
    inputFromPublic: "services/repairs/repairs-hero.webp",
    widths: [420, 640, 820],
    webpQuality: 72,
    avifQuality: 48,
  },
  {
    inputFromPublic: "services/maintenance/maintenance-hero.webp",
    widths: [420, 640, 820],
    webpQuality: 72,
    avifQuality: 48,
  },

  // Trust logos (tu audit muestra que están gigantes vs render)
  {
    inputFromPublic: "trust/american-standard.webp",
    widths: [96, 128, 192, 256],
    webpQuality: 76,
    avifQuality: 52,
  },
  {
    inputFromPublic: "trust/homeadvisor.webp",
    widths: [64, 96, 128, 192],
    webpQuality: 76,
    avifQuality: 52,
  },
  {
    inputFromPublic: "trust/angieslist.webp",
    widths: [64, 96, 128, 192],
    webpQuality: 76,
    avifQuality: 52,
  },
];

function outPath(inputFromPublic: string, width: number, ext: "webp" | "avif") {
  const dir = path.dirname(inputFromPublic);
  const base = path.basename(inputFromPublic, path.extname(inputFromPublic));
  return path.join(PUBLIC_DIR, dir, `${base}-w${width}.${ext}`);
}

async function runJob(job: Job) {
  const inputAbs = path.join(PUBLIC_DIR, job.inputFromPublic);

  if (!fs.existsSync(inputAbs)) {
    console.warn(`[optimize-images] SKIP missing: ${job.inputFromPublic}`);
    return;
  }

  const baseImg = sharp(inputAbs, { failOn: "none" });

  for (const w of job.widths) {
    // WEBP
    {
      const outAbs = outPath(job.inputFromPublic, w, "webp");
      await fs.promises.mkdir(path.dirname(outAbs), { recursive: true });

      // Evitar trabajo innecesario si ya existe
      if (!fs.existsSync(outAbs)) {
        await baseImg
          .clone()
          .resize({ width: w, withoutEnlargement: true })
          .webp({
            quality: job.webpQuality ?? 72,
            effort: 5,
            smartSubsample: true,
          })
          .toFile(outAbs);
      }
    }

    // AVIF
    {
      const outAbs = outPath(job.inputFromPublic, w, "avif");
      await fs.promises.mkdir(path.dirname(outAbs), { recursive: true });

      if (!fs.existsSync(outAbs)) {
        await baseImg
          .clone()
          .resize({ width: w, withoutEnlargement: true })
          .avif({
            quality: job.avifQuality ?? 48,
            effort: 5,
          })
          .toFile(outAbs);
      }
    }
  }

  console.log(
    `[optimize-images] OK ${job.inputFromPublic} -> ${job.widths.length} widths`,
  );
}

async function main() {
  console.log(`[optimize-images] public dir: ${PUBLIC_DIR}`);
  for (const job of jobs) {
    await runJob(job);
  }
  console.log("[optimize-images] done");
}

main().catch((err) => {
  console.error("[optimize-images] failed", err);
  process.exit(1);
});
