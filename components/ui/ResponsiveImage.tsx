import * as React from "react";
import { cn } from "@/lib/utils";

type Props = {
  srcBase: string; // sin extensión
  alt: string;
  widths: number[];
  sizes: string;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  decoding?: "async" | "sync" | "auto";
  originalExt?: "webp" | "png" | "jpg" | "jpeg";

  // ✅ nuevo: control de formatos
  formats?: Array<"avif" | "webp">;
  disableSrcSet?: boolean; // ✅ nuevo
};

function buildSrcSet(srcBase: string, widths: number[], ext: "webp" | "avif") {
  return widths.map((w) => `${srcBase}-w${w}.${ext} ${w}w`).join(", ");
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
  originalExt = "webp",
  formats = ["avif", "webp"], // ✅ default
  disableSrcSet,
}: Props) {
  const fallbackSrc = `${srcBase}.${originalExt}`;

  if (disableSrcSet) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={fallbackSrc}
        alt={alt}
        decoding={decoding}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "low"}
        className={cn(
          fill ? "absolute inset-0 h-full w-full" : "",
          "object-cover",
          className,
        )}
      />
    );
  }

  const avifSrcSet = React.useMemo(
    () => buildSrcSet(srcBase, widths, "avif"),
    [srcBase, widths],
  );
  const webpSrcSet = React.useMemo(
    () => buildSrcSet(srcBase, widths, "webp"),
    [srcBase, widths],
  );

  return (
    <picture>
      {/* ✅ Solo incluimos AVIF si lo queremos */}
      {formats.includes("avif") ? (
        <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
      ) : null}

      <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={fallbackSrc}
        alt={alt}
        decoding={decoding}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "low"}
        className={cn(
          fill ? "absolute inset-0 h-full w-full" : "",
          "object-cover",
          className,
        )}
      />
    </picture>
  );
}
