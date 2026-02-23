import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BUSINESS } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `${BUSINESS.name} | HVAC Installation, Repair & Maintenance`,
  description:
    "GC Heating & Cooling provides fast, friendly HVAC installation, repair, and maintenance across Los Angeles & Orange County. Call now for service.",
  path: "/",
});

function getSiteUrl(): string | undefined {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return undefined;
  return raw.replace(/\/+$/, "");
}

function localBusinessJsonLd() {
  const siteUrl = getSiteUrl();
  const url = siteUrl ? `${siteUrl}/` : undefined;

  // Keep it conservative + consistent (no undefined fields)
  const jsonLd: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    name: BUSINESS.name,
    telephone: BUSINESS.phone,
    url,
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: "Los Angeles County",
      },
      {
        "@type": "AdministrativeArea",
        name: "Orange County",
      },
    ],
    address: BUSINESS.address
      ? {
          "@type": "PostalAddress",
          streetAddress: BUSINESS.address.street,
          addressLocality: BUSINESS.address.city,
          addressRegion: BUSINESS.address.state,
          postalCode: BUSINESS.address.zip,
          addressCountry: "US",
        }
      : undefined,
    sameAs: BUSINESS.socials?.length ? BUSINESS.socials : undefined,
  };

  // Remove undefined keys
  Object.keys(jsonLd).forEach(
    (k) => jsonLd[k] === undefined && delete jsonLd[k],
  );

  if (jsonLd.address) {
    Object.keys(jsonLd.address).forEach(
      (k) => jsonLd.address[k] === undefined && delete jsonLd.address[k],
    );
  }

  return jsonLd;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = localBusinessJsonLd();

  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />

        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
