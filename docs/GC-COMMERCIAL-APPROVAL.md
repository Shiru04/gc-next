# GC commercial approval gate

Production is intentionally blocked while any field listed in `PRODUCTION_BLOCKING_FIELDS` is pending in `lib/commercial-config.ts`. All blocking fields were confirmed by the client on 2026-08-20.

Confirmed: Cerritos business address; 24/7 call-center availability; online booking from 7:00 AM to 7:00 PM; all current Los Angeles cities and all 34 incorporated Orange County cities; repair diagnostics starting at $89; no after-hours fee; the current $99 tune-up; free replacement and installation estimates; financing information provided after contacting the team; American Standard and Mitsubishi support; a minimum one-year warranty that varies by project and equipment; Facebook and Instagram profiles.

Dispatch currently exposes only the public booking destination. The site records `dispatch_booking_start`; `dispatch_booking_complete` is reserved and must not be configured as active until Dispatch supplies a verified callback or postback.

Operations Hub, Turnstile, GTM, GA4, and Google Ads secrets/IDs belong in Vercel environment variables. Never use public-prefixed variables for server secrets.
