// components/promotions/PromoJsonLd.tsx
import { SITE } from "@/lib/site";

export function PromoJsonLd({
  pageUrl,
  pageName,
  pageDescription,
  faq,
}: {
  pageUrl: string;
  pageName: string;
  pageDescription: string;
  faq: { q: string; a: string }[];
}) {
  const hvac = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    name: SITE.name,
    telephone: SITE.phoneDisplay,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    areaServed: SITE.primaryCounties.map((c) => ({
      "@type": "AdministrativeArea",
      name: c,
    })),
    url: pageUrl,
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  const webpage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageName,
    description: pageDescription,
    url: pageUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hvac) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </>
  );
}
