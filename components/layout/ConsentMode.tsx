import Script from "next/script";

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;
const GADS_ID = process.env.NEXT_PUBLIC_GADS_ID;
const CONSENT_KEY = "gc-cookie-consent";

/**
 * Google Consent Mode v2.
 *
 * This MUST render before any Google tag loads, which is why it uses
 * `beforeInteractive` and sits above the tag loader in the layout.
 *
 * Why this replaces the old "don't load anything until they click Accept"
 * approach: with tags fully blocked, a visitor who ignores the banner is
 * completely invisible — no conversion, no remarketing, no modelling. With
 * Consent Mode the tags load in a cookieless state, send pings Google can use
 * for conversion modelling, and upgrade to full measurement the moment consent
 * is granted. Nothing personally identifying is stored before that.
 */
export function ConsentMode() {
  return (
    <>
      <Script id="consent-mode-default" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = window.gtag || gtag;

          gtag('consent', 'default', {
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'analytics_storage': 'denied',
            'functionality_storage': 'granted',
            'security_storage': 'granted',
            'wait_for_update': 500
          });

          gtag('set', 'url_passthrough', true);
          gtag('set', 'ads_data_redaction', true);

          try {
            if (localStorage.getItem('${CONSENT_KEY}') === 'granted') {
              gtag('consent', 'update', {
                'ad_storage': 'granted',
                'ad_user_data': 'granted',
                'ad_personalization': 'granted',
                'analytics_storage': 'granted'
              });
            }
          } catch (e) {}
        `}
      </Script>

      {GA4_ID && (
        <>
          <Script
            id="gtag-src"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-config" strategy="afterInteractive">
            {`
              gtag('js', new Date());
              gtag('config', '${GA4_ID}');
              ${GADS_ID ? `gtag('config', '${GADS_ID}');` : ""}
            `}
          </Script>
        </>
      )}
    </>
  );
}
