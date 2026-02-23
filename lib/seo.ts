import type { Metadata } from "next";
import { BUSINESS } from "@/lib/constants";

export function buildMetadata(opts: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const siteName = BUSINESS.name;
  const fullTitle = opts.title.includes(siteName)
    ? opts.title
    : `${opts.title} | ${siteName}`;

  // In static export you may not know final domain; keep canonical optional for now.
  // We’ll set canonical once you confirm final domain (Phase 3).
  return {
    title: fullTitle,
    description: opts.description,
    metadataBase: undefined,
    openGraph: {
      title: fullTitle,
      description: opts.description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: opts.description,
    },
  };
}
