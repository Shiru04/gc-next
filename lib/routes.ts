export type RouteId = "home" | "contact" | "schedule" | "services" | "financing";

export const LOCALIZED_ROUTES: Record<RouteId, { en: string; es: string }> = {
  home: { en: "/", es: "/es/" },
  contact: { en: "/contact/", es: "/es/contacto/" },
  schedule: { en: "/schedule-service/", es: "/es/programar-servicio/" },
  services: { en: "/services/", es: "/es/servicios/" },
  financing: { en: "/financing/", es: "/es/financiamiento/" },
};

export function localizedPath(route: RouteId, locale: "en" | "es"): string {
  return LOCALIZED_ROUTES[route][locale];
}

const SEGMENTS: Array<[string, string]> = [["/service-areas", "/es/areas-de-servicio"], ["/privacy-policy", "/es/politica-de-privacidad"], ["/residential", "/es/residencial"], ["/commercial", "/es/comercial"], ["/resources", "/es/recursos"], ["/promotions/new-installation", "/es/promociones/instalacion-nueva"], ["/promotions/tune-ups", "/es/promociones/mantenimiento"], ["/promotions/repairs", "/es/promociones/reparaciones"], ["/promotions", "/es/promociones"], ["/financing", "/es/financiamiento"], ["/contact", "/es/contacto"], ["/services", "/es/servicios"], ["/reviews", "/es/resenas"], ["/schedule-service", "/es/programar-servicio"], ["/about", "/es/acerca"], ["/", "/es/"]];
export function alternateLocalePath(path: string): { en: string; es: string } {
  const clean = path !== "/" ? path.replace(/\/$/, "") : path;
  if (clean === "/" || clean === "/es") return { en: "/", es: "/es/" };
  for (const [en, es] of SEGMENTS) {
    if (clean === es || clean.startsWith(`${es}/`)) return { en: clean.replace(es, en) || "/", es: clean };
    if (clean === en || (en !== "/" && clean.startsWith(`${en}/`))) return { en: clean, es: clean.replace(en, es) };
  }
  return { en: clean, es: `/es${clean}` };
}
