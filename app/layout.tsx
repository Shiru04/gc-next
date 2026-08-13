import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { ConsentMode } from "@/components/layout/ConsentMode";
import { ConversionTracking } from "@/components/layout/ConversionTracking";
import { FloatingCta } from "@/components/layout/FloatingCta";
import { BUSINESS } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

const META_PIXEL_ID = "959937913694811";

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

  const jsonLd: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    name: BUSINESS.name,
    telephone: BUSINESS.phone,
    email: "info@gc-heatingandcooling.com",
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
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:30",
        closes: "16:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "09:00",
        closes: "14:00",
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
        {/* Consent Mode v2 defaults must run before any Google tag. */}
        <ConsentMode />

        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingCta />
        <CookieConsent />
        <ConversionTracking />

        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            try {
              if (localStorage.getItem('gc-cookie-consent') !== 'granted') {
                fbq('consent', 'revoke');
              }
            } catch (e) { fbq('consent', 'revoke'); }
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>

        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
