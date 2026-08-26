# Tracking de CTAs

Cada click en un CTA se manda a cuatro lugares:

| Destino | Qué recibe | Depende del consent |
| --- | --- | --- |
| GA4 | evento `cta_click` con `cta_id`, `cta_location`, `cta_type`, `page_path` | sí |
| Google Ads | conversión (solo `phone` y `booking`) | sí |
| Meta Pixel | `Contact` / `Schedule` / `Lead` | sí |
| `/api/track/` → Operations Hub | contador first-party, anónimo | no |

Los tres primeros solo disparan si el visitante aceptó cookies — si no, `gtag` y
`fbq` ni siquiera se cargan. El cuarto es un contador anónimo: no manda cookies,
ni IP, ni user agent, ni ningún identificador. Por eso sus números son más altos
que los de GA4, y esa diferencia es justamente la medida de cuánto te estás
perdiendo por adblockers y consent rechazado.

## Cómo se instrumenta un CTA

Hay un solo listener delegado (`components/layout/ConversionTracking.tsx`) que
escucha todos los clicks del documento. No hace falta un `onClick` por botón.

**Opción 1 — explícita.** Para los CTAs que querés medir con precisión:

```tsx
<Button
  href={BUSINESS.bookingUrl}
  cta={{ id: "home-hero-book", location: "home-hero", type: "booking" }}
>
  Book Onsite Consultation
</Button>
```

En un `<a>` suelto, lo mismo con `ctaAttrs()`:

```tsx
import { ctaAttrs } from "@/lib/cta";

<a href={`tel:${BUSINESS.phoneE164}`} {...ctaAttrs({ id: "floating-call", location: "floating", type: "phone" })}>
```

**Opción 2 — automática.** Si un link no declara nada, el listener infiere:

- el **tipo**, del href (`tel:` → phone, `dispatch.me` → booking, `/contact` →
  contact, `/financing` → financing, `/promotions` → promo)
- la **ubicación**, del DOM: primero busca un ancestro con `data-cta-location`,
  después `<header>` / `<footer>` / `<form>`, después la `<section id>`

Para darle nombre a una zona sin instrumentar botón por botón:

```tsx
import { ctaScope } from "@/lib/cta";

<section {...ctaScope("promo-tuneups-hero")}>…</section>
```

Los links de navegación común (que no matchean ningún tipo) **no** se cuentan.

## CTAs instrumentados explícitamente

`header-call`, `header-book`, `mobile-menu-call`, `mobile-menu-book`,
`floating-call`, `floating-book`, `home-hero-call`, `home-hero-book`,
`home-footer-cta-call`, `home-footer-cta-book`, `contact-form-submit`.

Todo el resto del sitio se cuenta por inferencia.

## Ver los datos

`https://gc-heatingandcooling.com/cta-dashboard/` — pide el `CTA_STATS_TOKEN`.
La página tiene `noindex` y no está en el sitemap.

Vía API:

```bash
curl -H "Authorization: Bearer $CTA_STATS_TOKEN" \
  "https://gc-heatingandcooling.com/api/cta-stats/?days=30"
```

> Las barras finales importan: el sitio corre con `trailingSlash: true`, así que
> `/api/track` sin barra devuelve un 308 y `sendBeacon` no sigue redirects.

## Dónde viven los datos

En el **Operations Hub** de Hive, no en este sitio ni en un servicio aparte.

```
browser  ──beacon──▶  /api/track/  ──server-to-server──▶  hub /api/public/cta
         (first-party)   (este sitio)                      (Render + Mongo)
```

El browser **nunca** habla con el hub directamente, y eso es deliberado: un
beacon cross-origin a `onrender.com` lo tira cualquier bloqueador, que es
exactamente lo que este contador existe para evitar. El salto al hub lo da el
backend de este sitio, donde la site key nunca queda expuesta.

Del lado del hub cada click se acumula en un bucket
`(site, día, ctaId, página)` — ver `backend/src/models/CtaEvent.js`. No se
guarda un documento por click, así que la colección crece con la cantidad de
CTAs distintos, no con el tráfico.

### Conectar el hub

1. En el hub, en el sitio de GC: activar **analytics** (`analytics.enabled`).
2. Copiar la key (`analytics.publicKey`, empieza con `cta_`), o dejar que
   **Sync to Vercel** la empuje sola al proyecto.
3. Setear en Vercel `HIVE_API_URL` y `HIVE_CTA_SITE_KEY`, y redeployar.

**Sin el hub configurado nada se rompe**: los eventos se escriben como
`[cta] {...}` en los logs de Vercel y el dashboard avisa que falta conectarlo.

## Variables de entorno

| Variable | Para qué | Requerida |
| --- | --- | --- |
| `NEXT_PUBLIC_GA4_ID` | GA4 | sí |
| `NEXT_PUBLIC_GADS_ID` | conversiones de Google Ads | sí |
| `NEXT_PUBLIC_SITE_URL` | canonicals y JSON-LD | sí |
| `NEXT_PUBLIC_CONTACT_FORM_ID` | id del form en el hub | sí |
| `CTA_STATS_TOKEN` | acceso al dashboard y a `/api/cta-stats` | sí |
| `HIVE_API_URL` | URL del Operations Hub | no |
| `HIVE_CTA_SITE_KEY` | site key del ingest de CTAs | no |

Sin `CTA_STATS_TOKEN` el endpoint de stats devuelve 401 siempre (falla cerrado).
`HIVE_CTA_SITE_KEY` **no** lleva prefijo `NEXT_PUBLIC_`: si terminara en el
bundle del cliente, cualquiera podría inflarte los contadores.
