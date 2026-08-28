import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import "@hive/blog-next/styles.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingCta } from "@/components/layout/FloatingCta";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { ConversionTracking } from "@/components/layout/ConversionTracking";
import { LocaleDocument } from "@/components/layout/LocaleDocument";
import { COMMERCIAL } from "@/lib/commercial-config";
import { buildMetadata } from "@/lib/seo";
export const metadata: Metadata = buildMetadata({ title: `${COMMERCIAL.name.value} | HVAC Installation, Repair & Maintenance`, description: "HVAC installation, repair, and maintenance. Schedule service with GC Heating & Cooling.", path: "/" });
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = { "@context": "https://schema.org", "@type": "HVACBusiness", name: COMMERCIAL.name.value, telephone: COMMERCIAL.phone.value };
  return <html lang="en"><body>
    <a href="#main-content" className="skip-link">Skip to main content</a>
    <Script id="consent-default" strategy="beforeInteractive">{`window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){window.dataLayer.push(arguments)};window.gtag('consent','default',{ad_storage:'denied',analytics_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});`}</Script>
    {GTM_ID ? <Script id="gtm" strategy="afterInteractive">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}</Script> : null}
    <LocaleDocument /><Header /><main id="main-content">{children}</main><Footer /><FloatingCta /><CookieConsent /><ConversionTracking />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  </body></html>;
}
