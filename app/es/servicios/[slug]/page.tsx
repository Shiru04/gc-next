import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LEGACY_SERVICE_REDIRECTS } from "@/lib/services.es";

const SITE_URL = "https://gc-heatingandcooling.com";

export function generateStaticParams() {
  return Object.keys(LEGACY_SERVICE_REDIRECTS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const target = LEGACY_SERVICE_REDIRECTS[slug];
  if (!target) return {};
  return {
    alternates: { canonical: `${SITE_URL}${target}/` },
    robots: { index: false, follow: true },
  };
}

export default async function LegacyServiceRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const target = LEGACY_SERVICE_REDIRECTS[slug];
  if (!target) return notFound();

  const targetWithSlash = target.endsWith("/") ? target : `${target}/`;

  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${targetWithSlash}`} />
      <link rel="canonical" href={`${SITE_URL}${targetWithSlash}`} />
      <script
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `window.location.replace(${JSON.stringify(targetWithSlash)});`,
        }}
      />
      <main className="mx-auto max-w-xl px-6 py-20 text-center">
        <h1 className="text-2xl font-extrabold">Esta página se ha movido</h1>
        <p className="mt-3 text-black/70">
          Estás siendo redirigido. Si no pasa nada,{" "}
          <Link
            href={targetWithSlash}
            className="font-semibold text-brand-red underline"
          >
            haga clic aquí
          </Link>
          .
        </p>
      </main>
    </>
  );
}
