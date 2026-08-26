// lib/promotions.ts
import { SITE } from "./site";
import { scheduleServiceHref } from "./scheduling";
export type PromotionKey = "new-installation" | "repairs" | "tune-ups";

export const PROMOTIONS: Record<
  PromotionKey,
  {
    key: PromotionKey;
    slug: string;
    pageTitle: string;
    metaTitle: string;
    metaDescription: string;
    heroKicker: string;
    heroHeadline: string;
    heroSubheadline: string;
    primaryOfferTitle: string;
    primaryOfferValue: string;
    primaryOfferDetails: string[];
    secondaryPoints: string[];
    faq: { q: string; a: string }[];
    ctaPrimary: { label: string; href: string };
    ctaSecondary: { label: string; href: string };
  }
> = {
  "new-installation": {
    key: "new-installation",
    slug: "/promociones/nueva-instalacion",
    pageTitle: "Nueva instalación de climatización",
    metaTitle:
      "Nueva instalación de HVAC en Los Ángeles y el condado de Orange | Hasta $2000 de reembolso",
    metaDescription:
      "Reemplace o instale un nuevo sistema HVAC con GC Heating & Cooling. Hasta $2,000 de reembolsos disponibles. Programación rápida para Los Ángeles y el condado de Orange.",
    heroKicker: "Programación prioritaria",
    heroHeadline: "Nueva instalación de HVAC: bien hecha, sin esperas",
    heroSubheadline:
      "Instale o reemplace su sistema con un equipo autorizado, garantizado y asegurado. Sirviendo a Los Ángeles y el Condado de Orange con programación rápida y mano de obra limpia.",
    primaryOfferTitle: "Arriba a",
    primaryOfferValue: "$2,000 reembolsos",
    primaryOfferDetails: [
      "Equipo desde $6,800 (la instalación se cotiza por separado).",
      "Los reembolsos varían según el equipo y la disponibilidad del programa.",
      "El monto final del reembolso se confirma durante su consulta.",
      "Le ayudaremos a elegir la mejor opción en términos de comodidad y eficiencia.",
    ],
    secondaryPoints: [
      "Licenciado, garantizado y asegurado",
      "Instalación y limpieza profesional del lugar de trabajo",
      "Opciones de equipos energéticamente eficientes",
      "Alcance claro, recomendaciones transparentes",
    ],
    faq: [
      {
        q: "¿Cómo funcionan los reembolsos?",
        a: "La elegibilidad para el reembolso depende del equipo seleccionado y de los programas de reembolso activos al momento de la compra. Confirmaremos el monto exacto durante su consulta.",
      },
      {
        q: "¿Cómo funciona la fijación de precios?",
        a: "Proporcionamos una consulta clara y una revisión del alcance para recomendar el sistema correcto. Si quieres un rango de precios antes de la visita, llama y te orientaremos con escenarios habituales.",
      },
      {
        q: "¿Qué tan rápido puedes instalar?",
        a: "La programación depende de la demanda y la disponibilidad del equipo. Nuestro objetivo es incluirlo en el calendario lo antes posible, especialmente durante las horas pico de calor.",
      },
    ],
    ctaPrimary: { label: "Solicitar presupuesto gratuito", href: scheduleServiceHref("installation", "es") },
    ctaSecondary: {
      label: "Llama al (714) 715-9569",
      href: `tel:${SITE.phoneE164}`,
    },
  },

  repairs: {
    key: "repairs",
    slug: "/promociones/reparaciones",
    pageTitle: "Reparaciones de climatización",
    metaTitle: "Reparación de HVAC en Los Ángeles y el condado de Orange | Diagnóstico rápido",
    metaDescription:
      "¿Necesita una reparación rápida de HVAC? GC Heating & Cooling ofrece diagnósticos expertos y programación rápida en Los Ángeles y el condado de Orange. Llama o reserva online.",
    heroKicker: "Ayuda rápida, diagnóstico real",
    heroHeadline: "Reparaciones de HVAC: haga que su sistema vuelva a funcionar rápidamente",
    heroSubheadline:
      "Cuando su aire acondicionado o calentador deja de funcionar, necesita un equipo experimentado que se presente y lo arregle. Sirviendo a Los Ángeles y el Condado de Orange.",
    primaryOfferTitle: "",
    primaryOfferValue: "Diagnóstico rápido",
    primaryOfferDetails: [
      "Diagnosticamos el problema y proporcionamos un presupuesto de reparación claro por adelantado.",
      "Si se necesitan piezas, le explicaremos claramente las opciones antes de comenzar el trabajo.",
      "Programación urgente disponible según demanda.",
    ],
    secondaryPoints: [
      "Diagnóstico claro y recomendaciones sencillas.",
      "Reparaciones residenciales y comerciales ligeras",
      "Servicio local de confianza (LA/OC)",
      "Reserve en línea o llame para programación urgente",
    ],
    faq: [
      {
        q: "¿Cómo funcionan los precios de reparación?",
        a: "Evaluamos el problema y proporcionamos un presupuesto para la reparación. Si se requieren diagnósticos adicionales, lo explicaremos antes de continuar.",
      },
      {
        q: "¿Reparan todas las marcas?",
        a: "Trabajamos con muchas de las principales marcas de HVAC. Si no está seguro, llámenos con la información de su modelo y lo confirmaremos.",
      },
      {
        q: "¿Puedo reservar un servicio urgente online?",
        a: "Sí. Reserve en línea e incluya notas sobre urgencia o llame para obtener la ruta y la disponibilidad más rápidas.",
      },
    ],
    ctaPrimary: { label: "Programar reparación HVAC", href: scheduleServiceHref("ac_repair", "es") },
    ctaSecondary: {
      label: "Llama al (714) 715-9569",
      href: `tel:${SITE.phoneE164}`,
    },
  },

  "tune-ups": {
    key: "tune-ups",
    slug: "/promociones/puestas a punto",
    pageTitle: "Puesta a punto de HVAC",
    metaTitle: "Puesta a punto de HVAC en Los Ángeles y el condado de Orange | Especial $99",
    metaDescription:
      "Mantenga su HVAC funcionando de manera eficiente con una puesta a punto de $99 de GC Heating & Cooling. Inspección multipunto y mantenimiento estacional para Los Ángeles y el condado de Orange.",
    heroKicker: "Mantenimiento estacional",
    heroHeadline: "Puesta a punto de HVAC: mantenga su sistema funcionando al máximo",
    heroSubheadline:
      "Una puesta a punto estacional ayuda a prevenir averías, reducir las facturas de energía y prolongar la vida útil de su sistema. Sirviendo a Los Ángeles y el Condado de Orange con programación rápida.",
    primaryOfferTitle: "Solo",
    primaryOfferValue: "Afinación de $99",
    primaryOfferDetails: [
      "Inspección multipunto de su sistema de calefacción y refrigeración.",
      "Verificación de rendimiento para detectar pequeños problemas antes de que se conviertan en reparaciones costosas.",
      "Recomendado una o dos veces al año para una mejor eficiencia.",
      "El precio se aplica a los sistemas residenciales estándar; las unidades adicionales se cotizan por separado.",
    ],
    secondaryPoints: [
      "Mejore la eficiencia y reduzca las facturas de energía",
      "Detecte los problemas a tiempo y evite averías",
      "Alarga la vida útil de tu equipo",
      "Licenciado, garantizado y asegurado",
    ],
    faq: [
      {
        q: "¿Qué incluye la puesta a punto de $99?",
        a: "Nuestro técnico realiza una inspección multipunto y una verificación de rendimiento de su sistema. Si encontramos algo que necesite atención, le explicaremos claramente sus opciones antes de realizar cualquier trabajo adicional.",
      },
      {
        q: "¿Con qué frecuencia debo hacerme una puesta a punto?",
        a: "Recomendamos realizar una puesta a punto una o dos veces al año (idealmente antes de la temporada de refrigeración y antes de la temporada de calefacción) para mantener su sistema eficiente y confiable.",
      },
      {
        q: "¿Los $99 cubren múltiples sistemas?",
        a: "El precio de $99 se aplica a un sistema residencial estándar. Si tiene unidades adicionales, le proporcionaremos una cotización durante la programación.",
      },
    ],
    ctaPrimary: { label: "Programar mantenimiento de $99", href: scheduleServiceHref("maintenance", "es") },
    ctaSecondary: {
      label: "Llama al (714) 715-9569",
      href: `tel:${SITE.phoneE164}`,
    },
  },
};
