import type { Metadata } from "next";
import { BUSINESS } from "@/lib/constants";

function getSiteUrl(): string | undefined {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return undefined;

  // normalize: remove trailing slash
  return raw.replace(/\/+$/, "");
}

function withTrailingSlash(path: string): string {
  if (!path.startsWith("/")) path = `/${path}`;
  return path.endsWith("/") ? path : `${path}/`;
}

function absoluteUrl(path: string): URL | undefined {
  const base = getSiteUrl();
  if (!base) return undefined;
  return new URL(withTrailingSlash(path), `${base}/`);
}

type BuildMetadataArgs = {
  title: string;
  description: string;
  path?: string;
  image?: string;
};

export function buildMetadata(args: BuildMetadataArgs): Metadata {
  const { title, description } = args;

  const siteUrl = getSiteUrl();
  const canonical = args.path ? absoluteUrl(args.path)?.toString() : undefined;

  const ogImage = args.image ?? "/og.png";
  const ogImageAbs = siteUrl
    ? new URL(ogImage, `${siteUrl}/`).toString()
    : undefined;

  return {
    title,
    description,

    metadataBase: siteUrl ? new URL(`${siteUrl}/`) : undefined,

    alternates: canonical
      ? {
          canonical,
        }
      : undefined,

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },

    openGraph: {
      type: "website",
      title,
      description,
      url: canonical,
      siteName: BUSINESS.name,
      images: ogImageAbs
        ? [
            {
              url: ogImageAbs,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : undefined,
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImageAbs ? [ogImageAbs] : undefined,
    },
  };
}
