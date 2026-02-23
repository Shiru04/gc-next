import * as React from "react";
import { cn } from "@/lib/utils";

type Props = {
  /**
   * Ruta base SIN extensión y SIN sufijo de width.
   * Ej: "/hero/home-hero" (no "/hero/home-hero.webp")
   */
  srcBase: string;
  alt: string;

  /**
   * Anchos disponibles que existen en /public:
   *  -w{width}.webp y -w{width}.avif
   */
  widths: number[];

  /**
   * sizes real para que el browser elija correctamente del srcset.
   * Ej: "(min-width: 1024px) 50vw, 100vw"
   */
  sizes: string;

  /**
   * Estilo tipo next/image fill
   */
  fill?: boolean;

  /**
   * Para LCP: loading eager + fetchpriority high
   */
  priority?: boolean;

  className?: string;

  /**
   * Si necesitás pasar props adicionales al <img>
   */
  decoding?: "async" | "sync" | "auto";
};

function buildSrcSet(srcBase: string, widths: number[], ext: "webp" | "avif") {
  return widths.map((w) => `${srcBase}-w${w}.${ext} ${w}w`).join(", ");
}

function pickFallback(srcBase: string, widths: number[]) {
  // fallback = ancho medio (más estable que el más grande)
  const sorted = [...widths].sort((a, b) => a - b);
  const mid = sorted[Math.floor(sorted.length / 2)] ?? sorted[0] ?? 640;
  return `${srcBase}-w${mid}.webp`;
}

export function ResponsiveImage({
  srcBase,
  alt,
  widths,
  sizes,
  fill,
  priority,
  className,
  decoding = "async",
}: Props) {
  const webpSrcSet = React.useMemo(
    () => buildSrcSet(srcBase, widths, "webp"),
    [srcBase, widths],
  );
  const avifSrcSet = React.useMemo(
    () => buildSrcSet(srcBase, widths, "avif"),
    [srcBase, widths],
  );
  const fallback = React.useMemo(
    () => pickFallback(srcBase, widths),
    [srcBase, widths],
  );

  const imgProps = {
    alt,
    decoding,
    sizes,
    src: fallback,
    loading: priority ? ("eager" as const) : ("lazy" as const),
    fetchPriority: priority ? ("high" as const) : ("low" as const),
    className: cn(
      fill ? "absolute inset-0 h-full w-full" : "",
      "object-cover",
      className,
    ),
  };

  return (
    <picture>
      <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
      <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img {...imgProps} />
    </picture>
  );
}
