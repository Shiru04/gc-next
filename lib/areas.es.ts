export type ServiceArea = {
  slug: string;
  name: string;
  county: "Los Angeles County" | "Orange County";
  seoTitle: string;
  seoDescription: string;
  intro: string;
};

export const SERVICE_AREAS: ServiceArea[] = [
  // -------------------------
  // ORANGE COUNTY
  // -------------------------
  {
    slug: "anaheim-ca",
    name: "Anaheim, CA",
    county: "Orange County",
    seoTitle: "HVAC en Anaheim, CA | Calefacción y refrigeración GC",
    seoDescription:
      "Servicios de HVAC en Anaheim, CA. Reparación de aire acondicionado, reparación, instalación y mantenimiento de calefacción. Llama o reserva ahora.",
    intro:
      "Sirviendo a Anaheim con opciones confiables de reparación, mantenimiento e instalación de HVAC.",
  },
  {
    slug: "buena-park-ca",
    name: "Buena Park, CA",
    county: "Orange County",
    seoTitle: "HVAC en Buena Park, CA | Calefacción y refrigeración GC",
    seoDescription:
      "Reparaciones, mantenimiento e instalaciones de HVAC en Buena Park, CA. Llame o reserve en línea con GC Heating & Cooling.",
    intro:
      "Soporte local de HVAC para propietarios de viviendas y empresas de Buena Park: reparaciones, mantenimiento e instalaciones nuevas.",
  },
  {
    slug: "fullerton-ca",
    name: "Fullerton, CA",
    county: "Orange County",
    seoTitle: "HVAC en Fullerton, CA | Calefacción y refrigeración GC",
    seoDescription:
      "Servicios de HVAC en Fullerton, CA. Llame o reserve en línea para reparaciones, mantenimiento o instalación.",
    intro: "Servicio de HVAC centrado en la comodidad para hogares y pequeñas empresas de Fullerton.",
  },
  {
    slug: "garden-grove-ca",
    name: "Garden Grove, CA",
    county: "Orange County",
    seoTitle: "HVAC en Garden Grove, CA | Calefacción y refrigeración GC",
    seoDescription:
      "Servicios de HVAC en Garden Grove, CA. Reparaciones rápidas e instalaciones confiables. Llama o reserva ahora.",
    intro: "Soporte de HVAC de Garden Grove con programación rápida y opciones claras.",
  },
  {
    slug: "irvine-ca",
    name: "Irvine, CA",
    county: "Orange County",
    seoTitle: "HVAC en Irvine, CA | Calefacción y refrigeración GC",
    seoDescription:
      "Servicios de HVAC en Irvine, CA. Reparaciones, mantenimiento e instalación. Llama o reserva online.",
    intro: "Sirviendo a Irvine con reparaciones, ajustes y actualizaciones de sistemas de HVAC.",
  },
  {
    slug: "orange-ca",
    name: "Orange, CA",
    county: "Orange County",
    seoTitle: "HVAC en Orange, CA | Calefacción y refrigeración GC",
    seoDescription:
      "Servicios de calefacción y aire acondicionado en Orange, CA. Reparaciones, mantenimiento y nuevas instalaciones.",
    intro: "Servicio confiable de HVAC en Orange: reparaciones, mantenimiento y reemplazos de sistemas.",
  },
  {
    slug: "santa-ana-ca",
    name: "Santa Ana, CA",
    county: "Orange County",
    seoTitle: "HVAC en Santa Ana, CA | Calefacción y refrigeración GC",
    seoDescription:
      "Servicios de HVAC en Santa Ana, CA. Reparación, mantenimiento e instalación de aire acondicionado y calefacción. Llama o reserva online.",
    intro: "Soporte de HVAC de Santa Ana con estimaciones claras e instalaciones profesionales.",
  },
  {
    slug: "tustin-ca",
    name: "Tustin, CA",
    county: "Orange County",
    seoTitle: "HVAC en Tustin, CA | Calefacción y refrigeración GC",
    seoDescription:
      "Servicios de HVAC en Tustin, CA. Reparaciones, puestas a punto e instalaciones de sistemas. Llama o reserva ahora.",
    intro: "Sirviendo a Tustin con reparaciones rápidas, planes de mantenimiento y opciones de instalación.",
  },
  {
    slug: "costa-mesa-ca",
    name: "Costa Mesa, CA",
    county: "Orange County",
    seoTitle: "HVAC en Costa Mesa, CA | Calefacción y refrigeración GC",
    seoDescription:
      "Servicios de HVAC en Costa Mesa, CA. Reparación de aire acondicionado, reparación, instalación y mantenimiento de calefacción.",
    intro: "Servicio HVAC de Costa Mesa para comodidad, eficiencia y programación confiable.",
  },
  {
    slug: "huntington-beach-ca",
    name: "Huntington Beach, CA",
    county: "Orange County",
    seoTitle: "HVAC en Huntington Beach, CA | Calefacción y refrigeración GC",
    seoDescription:
      "Servicios de HVAC en Huntington Beach, CA. Reparaciones, mantenimiento e instalaciones. Llama o reserva online.",
    intro: "Sirviendo a Huntington Beach con reparaciones de HVAC y trabajos de instalación confiables.",
  },
  {
    slug: "fountain-valley-ca",
    name: "Fountain Valley, CA",
    county: "Orange County",
    seoTitle: "HVAC en Fountain Valley, CA | Calefacción y refrigeración GC",
    seoDescription:
      "Servicios de HVAC en Fountain Valley, CA. Reparación, mantenimiento e instalación de aire acondicionado y calefacción.",
    intro: "Soporte de HVAC de Fountain Valley con diagnósticos profesionales e instalaciones limpias.",
  },
  {
    slug: "westminster-ca",
    name: "Westminster, CA",
    county: "Orange County",
    seoTitle: "HVAC en Westminster, CA | Calefacción y refrigeración GC",
    seoDescription:
      "Servicios de HVAC en Westminster, CA. Opciones rápidas de reparación, mantenimiento y reemplazo.",
    intro: "Servicio Westminster HVAC con recomendaciones claras y programación rápida.",
  },
  {
    slug: "cypress-ca",
    name: "Cypress, CA",
    county: "Orange County",
    seoTitle: "HVAC en Cypress, CA | Calefacción y refrigeración GC",
    seoDescription:
      "Servicios de HVAC en Cypress, CA. Reparaciones, mantenimiento e instalación. Llama o reserva ahora.",
    intro: "Reparaciones y mantenimiento de Cypress HVAC para mantener su hogar cómodo durante todo el año.",
  },
  {
    slug: "la-palma-ca",
    name: "La Palma, CA",
    county: "Orange County",
    seoTitle: "HVAC en La Palma, CA | Calefacción y refrigeración GC",
    seoDescription:
      "Servicios de climatización en La Palma, CA. Reparaciones, puestas a punto e instalaciones de sistemas de aire acondicionado/calefacción.",
    intro: "Sirviendo a La Palma con planes confiables de mantenimiento y reparación de HVAC.",
  },
  {
    slug: "yorba-linda-ca",
    name: "Yorba Linda, CA",
    county: "Orange County",
    seoTitle: "HVAC en Yorba Linda, CA | Calefacción y refrigeración GC",
    seoDescription:
      "Servicios de HVAC en Yorba Linda, CA. Reparaciones, mantenimiento y nuevas instalaciones.",
    intro: "Servicio de HVAC de Yorba Linda con instalaciones profesionales y opciones de sistemas eficientes.",
  },
  {
    slug: "placentia-ca",
    name: "Placentia, CA",
    county: "Orange County",
    seoTitle: "HVAC en Placentia, CA | Calefacción y refrigeración GC",
    seoDescription:
      "Servicios de calefacción y aire acondicionado en Placentia, CA. Reparaciones, puestas a punto e instalaciones.",
    intro: "Soporte de Placentia HVAC para hogares y empresas: reparaciones y actualizaciones del sistema.",
  },
  {
    slug: "newport-beach-ca",
    name: "Newport Beach, CA",
    county: "Orange County",
    seoTitle: "HVAC en Newport Beach, CA | Calefacción y refrigeración GC",
    seoDescription:
      "Servicios de HVAC en Newport Beach, CA. Reparación, mantenimiento e instalaciones de aire acondicionado, calefacción y aire acondicionado.",
    intro: "El servicio HVAC de Newport Beach se centró en la comodidad, la eficiencia y la instalación limpia.",
  },
  {
    slug: "lake-forest-ca",
    name: "Lake Forest, CA",
    county: "Orange County",
    seoTitle: "HVAC en Lake Forest, CA | Calefacción y refrigeración GC",
    seoDescription:
      "Servicios de HVAC en Lake Forest, CA. Reparaciones, mantenimiento e instalación. Llama o reserva online.",
    intro: "Servicio de HVAC de Lake Forest con diagnósticos precisos y reparaciones confiables.",
  },
  { slug: "aliso-viejo-ca", name: "Aliso Viejo, CA", county: "Orange County", seoTitle: "HVAC en Aliso Viejo, CA | GC Heating & Cooling", seoDescription: "Reparación, mantenimiento e instalación de HVAC en Aliso Viejo, CA. Llame o reserve en línea.", intro: "Servicio confiable de HVAC para hogares y negocios de Aliso Viejo." },
  { slug: "brea-ca", name: "Brea, CA", county: "Orange County", seoTitle: "HVAC en Brea, CA | GC Heating & Cooling", seoDescription: "Reparación, mantenimiento e instalación de HVAC en Brea, CA. Llame o reserve en línea.", intro: "Servicio profesional de calefacción y aire acondicionado en Brea." },
  { slug: "dana-point-ca", name: "Dana Point, CA", county: "Orange County", seoTitle: "HVAC en Dana Point, CA | GC Heating & Cooling", seoDescription: "Reparación, mantenimiento e instalación de HVAC en Dana Point, CA. Llame o reserve en línea.", intro: "Servicio de climatización para hogares y negocios de Dana Point." },
  { slug: "la-habra-ca", name: "La Habra, CA", county: "Orange County", seoTitle: "HVAC en La Habra, CA | GC Heating & Cooling", seoDescription: "Reparación, mantenimiento e instalación de HVAC en La Habra, CA. Llame o reserve en línea.", intro: "Reparaciones, mantenimiento e instalaciones confiables en La Habra." },
  { slug: "laguna-beach-ca", name: "Laguna Beach, CA", county: "Orange County", seoTitle: "HVAC en Laguna Beach, CA | GC Heating & Cooling", seoDescription: "Reparación, mantenimiento e instalación de HVAC en Laguna Beach, CA. Llame o reserve en línea.", intro: "Servicio profesional de HVAC para propiedades de Laguna Beach." },
  { slug: "laguna-hills-ca", name: "Laguna Hills, CA", county: "Orange County", seoTitle: "HVAC en Laguna Hills, CA | GC Heating & Cooling", seoDescription: "Reparación, mantenimiento e instalación de HVAC en Laguna Hills, CA. Llame o reserve en línea.", intro: "Servicio confiable de calefacción y aire acondicionado en Laguna Hills." },
  { slug: "laguna-niguel-ca", name: "Laguna Niguel, CA", county: "Orange County", seoTitle: "HVAC en Laguna Niguel, CA | GC Heating & Cooling", seoDescription: "Reparación, mantenimiento e instalación de HVAC en Laguna Niguel, CA. Llame o reserve en línea.", intro: "Servicio HVAC enfocado en la comodidad en Laguna Niguel." },
  { slug: "laguna-woods-ca", name: "Laguna Woods, CA", county: "Orange County", seoTitle: "HVAC en Laguna Woods, CA | GC Heating & Cooling", seoDescription: "Reparación, mantenimiento e instalación de HVAC en Laguna Woods, CA. Llame o reserve en línea.", intro: "Soporte confiable de HVAC y recomendaciones claras en Laguna Woods." },
  { slug: "los-alamitos-ca", name: "Los Alamitos, CA", county: "Orange County", seoTitle: "HVAC en Los Alamitos, CA | GC Heating & Cooling", seoDescription: "Reparación, mantenimiento e instalación de HVAC en Los Alamitos, CA. Llame o reserve en línea.", intro: "Servicio local de calefacción y aire acondicionado para Los Alamitos." },
  { slug: "mission-viejo-ca", name: "Mission Viejo, CA", county: "Orange County", seoTitle: "HVAC en Mission Viejo, CA | GC Heating & Cooling", seoDescription: "Reparación, mantenimiento e instalación de HVAC en Mission Viejo, CA. Llame o reserve en línea.", intro: "Reparaciones, mantenimiento e instalaciones profesionales en Mission Viejo." },
  { slug: "rancho-santa-margarita-ca", name: "Rancho Santa Margarita, CA", county: "Orange County", seoTitle: "HVAC en Rancho Santa Margarita, CA | GC Heating & Cooling", seoDescription: "Reparación, mantenimiento e instalación de HVAC en Rancho Santa Margarita, CA. Llame o reserve en línea.", intro: "Soluciones confiables de climatización para Rancho Santa Margarita." },
  { slug: "san-clemente-ca", name: "San Clemente, CA", county: "Orange County", seoTitle: "HVAC en San Clemente, CA | GC Heating & Cooling", seoDescription: "Reparación, mantenimiento e instalación de HVAC en San Clemente, CA. Llame o reserve en línea.", intro: "Servicio costero confiable de calefacción y aire acondicionado en San Clemente." },
  { slug: "san-juan-capistrano-ca", name: "San Juan Capistrano, CA", county: "Orange County", seoTitle: "HVAC en San Juan Capistrano, CA | GC Heating & Cooling", seoDescription: "Reparación, mantenimiento e instalación de HVAC en San Juan Capistrano, CA. Llame o reserve en línea.", intro: "Servicio profesional de HVAC en San Juan Capistrano." },
  { slug: "seal-beach-ca", name: "Seal Beach, CA", county: "Orange County", seoTitle: "HVAC en Seal Beach, CA | GC Heating & Cooling", seoDescription: "Reparación, mantenimiento e instalación de HVAC en Seal Beach, CA. Llame o reserve en línea.", intro: "Servicio de climatización para hogares y negocios de Seal Beach." },
  { slug: "stanton-ca", name: "Stanton, CA", county: "Orange County", seoTitle: "HVAC en Stanton, CA | GC Heating & Cooling", seoDescription: "Reparación, mantenimiento e instalación de HVAC en Stanton, CA. Llame o reserve en línea.", intro: "Soporte rápido y confiable de HVAC en Stanton." },
  { slug: "villa-park-ca", name: "Villa Park, CA", county: "Orange County", seoTitle: "HVAC en Villa Park, CA | GC Heating & Cooling", seoDescription: "Reparación, mantenimiento e instalación de HVAC en Villa Park, CA. Llame o reserve en línea.", intro: "Servicio profesional de HVAC para hogares de Villa Park." },

  // -------------------------
  // LOS ANGELES COUNTY
  // -------------------------
  {
    slug: "los-angeles-ca",
    name: "Los Angeles, CA",
    county: "Los Angeles County",
    seoTitle: "HVAC en Los Ángeles, CA | Calefacción y refrigeración GC",
    seoDescription:
      "Servicios de HVAC en Los Ángeles, CA. Reparación de aire acondicionado, reparación, instalación y mantenimiento de calefacción. Llama o reserva ahora.",
    intro:
      "Servicios HVAC de Los Ángeles diseñados para brindar comodidad, eficiencia y respuesta rápida.",
  },
  {
    slug: "long-beach-ca",
    name: "Long Beach, CA",
    county: "Los Angeles County",
    seoTitle: "HVAC en Long Beach, CA | Calefacción y refrigeración GC",
    seoDescription:
      "Servicios de HVAC en Long Beach, CA. Reparaciones, mantenimiento e instalaciones. Llama o reserva online.",
    intro: "Reparaciones y mantenimiento de HVAC en Long Beach con mano de obra profesional.",
  },
  {
    slug: "downey-ca",
    name: "Downey, CA",
    county: "Los Angeles County",
    seoTitle: "HVAC en Downey, CA | Calefacción y refrigeración GC",
    seoDescription:
      "Servicios de HVAC en Downey, CA. Llame o reserve en línea para reparaciones e instalación de aire acondicionado/calefacción.",
    intro:
      "Ayuda de Downey HVAC para hogares y espacios comerciales: reparaciones, puestas a punto y mejoras.",
  },
  {
    slug: "pasadena-ca",
    name: "Pasadena, CA",
    county: "Los Angeles County",
    seoTitle: "HVAC en Pasadena, CA | Calefacción y refrigeración GC",
    seoDescription:
      "Servicios de HVAC en Pasadena, CA. Reparaciones, mantenimiento e instalaciones. Llama o reserva ahora.",
    intro: "Servicio HVAC de Pasadena para una comodidad confiable: reparaciones, ajustes e instalaciones.",
  },
  {
    slug: "glendale-ca",
    name: "Glendale, CA",
    county: "Los Angeles County",
    seoTitle: "HVAC en Glendale, CA | Calefacción y refrigeración GC",
    seoDescription:
      "Servicios de HVAC en Glendale, CA. Reparación, mantenimiento e instalación de aire acondicionado y calefacción.",
    intro: "Sirviendo a Glendale con reparaciones de HVAC, planes de mantenimiento y opciones de reemplazo.",
  },
  {
    slug: "burbank-ca",
    name: "Burbank, CA",
    county: "Los Angeles County",
    seoTitle: "HVAC en Burbank, CA | Calefacción y refrigeración GC",
    seoDescription:
      "Servicios de HVAC en Burbank, CA. Reparaciones, puestas a punto e instalaciones de sistemas. Llama o reserva online.",
    intro: "Soporte de HVAC de Burbank con estimaciones claras y trabajos de reparación eficientes.",
  },
  {
    slug: "santa-monica-ca",
    name: "Santa Monica, CA",
    county: "Los Angeles County",
    seoTitle: "HVAC en Santa Mónica, CA | Calefacción y refrigeración GC",
    seoDescription:
      "Servicios de HVAC en Santa Mónica, CA. Reparación, mantenimiento e instalaciones de aire acondicionado, calefacción y aire acondicionado.",
    intro: "El servicio HVAC de Santa Mónica se centró en la comodidad y el rendimiento eficiente del sistema.",
  },
  {
    slug: "culver-city-ca",
    name: "Culver City, CA",
    county: "Los Angeles County",
    seoTitle: "HVAC en Culver City, CA | Calefacción y refrigeración GC",
    seoDescription:
      "Servicios de HVAC en Culver City, CA. Reparaciones, mantenimiento e instalación. Llama o reserva online.",
    intro: "Soporte de HVAC de Culver City con programación rápida y opciones sencillas.",
  },
  {
    slug: "inglewood-ca",
    name: "Inglewood, CA",
    county: "Los Angeles County",
    seoTitle: "HVAC en Inglewood, CA | Calefacción y refrigeración GC",
    seoDescription:
      "Servicios de HVAC en Inglewood, CA. Reparaciones, puestas a punto y nuevas instalaciones de aire acondicionado/calefacción.",
    intro: "Servicio de HVAC de Inglewood para hogares y empresas: reparaciones y reemplazos.",
  },
  {
    slug: "torrance-ca",
    name: "Torrance, CA",
    county: "Los Angeles County",
    seoTitle: "HVAC en Torrance, CA | Calefacción y refrigeración GC",
    seoDescription:
      "Servicios de HVAC en Torrance, CA. Reparaciones, mantenimiento e instalaciones. Llama o reserva ahora.",
    intro: "Soporte de Torrance HVAC con reparaciones confiables y trabajos de instalación limpios.",
  },
  {
    slug: "hawthorne-ca",
    name: "Hawthorne, CA",
    county: "Los Angeles County",
    seoTitle: "HVAC en Hawthorne, CA | Calefacción y refrigeración GC",
    seoDescription:
      "Servicios de HVAC en Hawthorne, CA. Reparación, mantenimiento e instalaciones de aire acondicionado, calefacción y aire acondicionado.",
    intro: "Servicio Hawthorne HVAC con diagnósticos profesionales y soluciones eficientes.",
  },
  {
    slug: "gardena-ca",
    name: "Gardena, CA",
    county: "Los Angeles County",
    seoTitle: "HVAC en Gardena, CA | Calefacción y refrigeración GC",
    seoDescription:
      "Servicios de HVAC en Gardena, CA. Reparaciones, puestas a punto e instalaciones de sistemas. Llama o reserva online.",
    intro: "Sirviendo a Gardena con opciones de reparación, mantenimiento y reemplazo de HVAC.",
  },
  {
    slug: "compton-ca",
    name: "Compton, CA",
    county: "Los Angeles County",
    seoTitle: "HVAC en Compton, CA | Calefacción y refrigeración GC",
    seoDescription:
      "Servicios de calefacción y aire acondicionado en Compton, CA. Reparaciones, mantenimiento e instalaciones.",
    intro: "Soporte de Compton HVAC con recomendaciones claras y programación rápida.",
  },
  {
    slug: "norwalk-ca",
    name: "Norwalk, CA",
    county: "Los Angeles County",
    seoTitle: "HVAC en Norwalk, CA | Calefacción y refrigeración GC",
    seoDescription:
      "Servicios de HVAC en Norwalk, CA. Reparación, mantenimiento e instalación de aire acondicionado/calefacción.",
    intro: "Servicio Norwalk HVAC para sistemas cómodos y eficientes y reparaciones confiables.",
  },
  {
    slug: "whittier-ca",
    name: "Whittier, CA",
    county: "Los Angeles County",
    seoTitle: "HVAC en Whittier, CA | Calefacción y refrigeración GC",
    seoDescription:
      "Servicios de HVAC en Whittier, CA. Reparaciones, mantenimiento e instalaciones. Llama o reserva online.",
    intro: "Servicio Whittier HVAC con instalaciones profesionales y diagnósticos precisos.",
  },
  {
    slug: "carson-ca",
    name: "Carson, CA",
    county: "Los Angeles County",
    seoTitle: "HVAC en Carson, CA | Calefacción y refrigeración GC",
    seoDescription:
      "Servicios de HVAC en Carson, CA. Reparaciones, puestas a punto e instalaciones de sistemas.",
    intro: "Sirviendo a Carson con reparaciones y mantenimiento de HVAC para mantener su sistema funcionando correctamente.",
  },
  {
    slug: "el-segundo-ca",
    name: "El Segundo, CA",
    county: "Los Angeles County",
    seoTitle: "HVAC en El Segundo, CA | Calefacción y refrigeración GC",
    seoDescription:
      "Servicios de HVAC en El Segundo, CA. Reparaciones, mantenimiento e instalaciones de aire acondicionado/calefacción.",
    intro: "Servicio HVAC de El Segundo con trabajos de instalación limpios y opciones de reparación confiables.",
  },
  {
    slug: "manhattan-beach-ca",
    name: "Manhattan Beach, CA",
    county: "Los Angeles County",
    seoTitle: "HVAC en Manhattan Beach, CA | Calefacción y refrigeración GC",
    seoDescription:
      "Servicios de HVAC en Manhattan Beach, CA. Reparaciones, mantenimiento e instalaciones.",
    intro: "El soporte de HVAC de Manhattan Beach se centró en la comodidad, la eficiencia y la programación confiable.",
  },
  {
    slug: "redondo-beach-ca",
    name: "Redondo Beach, CA",
    county: "Los Angeles County",
    seoTitle: "HVAC en Redondo Beach, CA | Calefacción y refrigeración GC",
    seoDescription:
      "Servicios de HVAC en Redondo Beach, CA. Reparación, mantenimiento e instalaciones de aire acondicionado, calefacción y aire acondicionado.",
    intro: "Servicio HVAC de Redondo Beach para reparaciones, puestas a punto y actualizaciones del sistema rápidas.",
  },
];

export function getAreaBySlug(slug: string) {
  return SERVICE_AREAS.find((a) => a.slug === slug);
}
