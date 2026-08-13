# Campaña: New AC Installations — $80/día

Especificación lista para ejecutar en la cuenta `5953575841`.
Preparada 2026-08-13. Bloqueada hasta que se habilite write access en Supermetrics.

## De dónde salen los $80/día

Casi todo es presupuesto que **ya está asignado y no se está gastando**:

| Fuente | $/día | Estado real |
|---|---|---|
| `GC-mantenimiento-RP` | 35 | Target CPA de $1.30 la estrangula. Julio: $0.37. Agosto: $0.00 |
| `General Campaign` | 30 | Sin datos desde abril 2026 |
| Nuevo | 15 | — |
| **Total** | **80** | **$65/día ya presupuestados y ociosos** |

Es decir: **$80/día de inversión en instalaciones cuesta $15/día de dinero nuevo.**

## Estructura

- **Campaña:** `GC-Installations` · Search · solo red de búsqueda
- **Presupuesto:** $80/día
- **Puja:** Maximizar valor de conversión. Sin tROAS las primeras 3 semanas — no hay datos
  para un objetivo. Fijarlo después con las conversiones reales.
- **Geo:** `PRESENCE` (nunca `PRESENCE_OR_INTEREST`) sobre Buena Park, Cypress, Anaheim,
  Fullerton, La Palma, Cerritos y La Mirada
- **Landing:** `/residential/residential-ac-installation`
- **Un solo grupo de anuncios:** `Installation` — intención única, no mezclar

## Keywords (phrase salvo indicado)

```
ac installation
air conditioning installation
ac replacement
air conditioner replacement
new ac unit
new air conditioner cost
ac installation cost
central air installation
hvac installation
hvac replacement
hvac system replacement
ac installers
air conditioning installers
mini split installation
ductless mini split installation
heat pump installation
furnace replacement
ac install near me            [exact]
ac replacement cost           [exact]
```

`cost` se queda: en instalación, quien busca precio está comprando, no curioseando.

## Negativos

```
repair · fix · service call · cleaning · recharge · freon · not cooling
jobs · salary · careers · hiring · training · school · license · certification
diy · how to · tutorial · youtube · manual
window unit · portable · rv · used · refurbished · rental · parts · wholesale
```

Los primeros son críticos: sin ellos la campaña de instalación canibaliza las búsquedas
de reparación, que valen 7.5x menos.

## RSA

**Titulares** (15, máx. 30 caracteres)

```
New AC Installation
AC Replacement Experts
Free In-Home Estimate
New AC System Quote
25+ Years Installing AC
Licensed & Insured HVAC
American Standard Dealer
Financing Available
10,000+ Customers Served
Same-Week Installation
Upgrade Your AC System
Serving LA & Orange County
Book Free Consultation
Energy-Efficient AC Units
Get Your Install Quote
```

**Descripciones** (4, máx. 90 caracteres)

```
Replacing your AC? Get a free in-home estimate from licensed local installers.
25+ years installing HVAC across LA & Orange County. Financing available.
No-pressure quotes on new systems. American Standard Customer Care Dealer.
Book a free onsite consultation. Same-week installation available.
```

Sin fijar posiciones. Los diferenciadores reales —25 años, licencia 794228, dealer de
American Standard, financiamiento— son lo que un competidor de tres años no puede copiar.

## Qué esperar, con números

Los CPC de instalación en el sur de California van de $15 a $30.

```
$80/día ÷ ~$20 CPC       ≈ 4 clics/día
4 clics × ~8% conversión ≈ 0.3 leads/día  ≈ 9-10 leads/mes
10 leads × 12% cierre    ≈ 1-2 instalaciones/mes
1.5 × $6,000             ≈ $9,000/mes de ingreso
```

Con $2,400/mes de inversión. **La economía es buena — pero no es volumen diario.**

Y el ciclo importa: una instalación no se cierra el mismo día. El lead entra, se agenda
la visita, se cotiza, el cliente lo piensa. **De los $80 de mañana, el trabajo se cobra
en dos o tres semanas.** Si lo que se necesita es actividad inmediata, eso viene de
reparación, no de instalación.

## Medición

`installation` vale **$720** por lead en `lib/tracking.ts` — ~$6,000 de ticket a 12% de
cierre sobre leads. Es deliberadamente conservador: los leads de instalación cierran muy
por debajo del 25%, la mayoría no pasa del estimado. Mejor subirlo cuando haya datos
reales de cierre que arrancar inflado.

**Hecho 2026-08-13:** la acción de conversión ya existe — `Form Submit - Website (2026)`,
`AW-800582055/83NFCMfQ9OAcEKfT3_0C`, primaria, conteo One, valor por evento.

Pero la campaña todavía no debe encenderse:
Sin ella, Maximizar valor optimizaría hacia clics de teléfono otra vez — el error que
esta auditoría vino a corregir.

## Orden de ejecución

1. ~~Habilitar write access en Supermetrics~~ ✅
2. ~~Crear la acción de conversión `Form Submit`~~ ✅ `83NFCMfQ9OAcEKfT3_0C`
3. **Resolver "No tag found for this account"** — poner `NEXT_PUBLIC_GA4_ID` en producción y desplegar
4. Marcar `Phone Click`, `Booking Click` y `Clicks to call` como secundarias
4. Crear `GC-Installations` **en pausa**, revisar, y encender
5. Pausar `General Campaign` (lleva 4 meses sin gastar) y bajar `GC-mantenimiento-RP` a $0
   para liberar los $65/día
