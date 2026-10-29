import { googleContext } from "@/lib/google-context";
import type { Metadata } from "next";
import "./globals.css";
import "@/components/acquisition/acquisition.css";
import "@/components/acquisition/liquid.css";
import "@/components/acquisition/editorial.css";
import "@hive/blog-next/styles.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingCta } from "@/components/layout/FloatingCta";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { ConversionTracking } from "@/components/layout/ConversionTracking";
import { LocaleDocument } from "@/components/layout/LocaleDocument";
import { SkipLink } from "@/components/layout/SkipLink";
import { GooglePageTracking } from "@/components/layout/GooglePageTracking";
import { HotjarTracking } from "@/components/layout/HotjarTracking";
import { COMMERCIAL } from "@/lib/commercial-config";
import { buildMetadata } from "@/lib/seo";

const GOOGLE_TAG_BOOTSTRAP = `window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){window.dataLayer.push(arguments)};
(function(){var started=false;var stored=null;try{stored=localStorage.getItem('cookieConsent')}catch(e){}var gpc=navigator.globalPrivacyControl===true;var allowed=!gpc&&stored!=='denied';var storage=allowed?'granted':'denied';
window.gtag('consent','default',{ad_storage:storage,analytics_storage:storage,ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});
function start(){if(started)return;started=true;
window.gtag('js',new Date());var context=(${googleContext.toString()})(window.location.href,document.cookie,document.referrer);
window.gtag('set',{send_page_view:false,...context});window.gtag('config','G-ZK4MCMR8P9',{send_page_view:false,...context});window.gtag('config','AW-800582055',{send_page_view:false,restricted_data_processing:true,allow_ad_personalization_signals:false,...context});
if(!document.getElementById('google-tag')){var script=document.createElement('script');script.id='google-tag';script.async=true;script.src='https://www.googletagmanager.com/gtag/js?id=AW-800582055';document.head.appendChild(script);}}
window.addEventListener('gc:consent-updated',function(event){var next=event.detail==='accepted'&&navigator.globalPrivacyControl!==true?'granted':'denied';window.gtag('consent','update',{ad_storage:next,analytics_storage:next,ad_user_data:'denied',ad_personalization:'denied'});start();});start();})();`;


export const metadata: Metadata = buildMetadata({ title: `${COMMERCIAL.name.value} | HVAC Installation, Repair & Maintenance`, description: "HVAC installation, repair, and maintenance. Schedule service with GC Heating & Cooling.", path: "/" });
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = { "@context": "https://schema.org", "@type": "HVACBusiness", "@id": "https://gc-heatingandcooling.com/#business", url: "https://gc-heatingandcooling.com/", name: COMMERCIAL.name.value, telephone: "+15628674123", address: { "@type": "PostalAddress", streetAddress: "17777 Center Court Dr, Suite 600", addressLocality: "Cerritos", addressRegion: "CA", postalCode: "90703", addressCountry: "US" }, areaServed: ["Los Angeles County", "Orange County"], foundingDate: "1999" };
  return <html lang="en"><head>
    <script id="google-tag-bootstrap" dangerouslySetInnerHTML={{ __html: GOOGLE_TAG_BOOTSTRAP }} />
  </head><body>
    <SkipLink />
    <GooglePageTracking /><LocaleDocument /><Header /><main id="main-content">{children}</main><Footer /><FloatingCta /><CookieConsent /><ConversionTracking /><HotjarTracking />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  </body></html>;
}
