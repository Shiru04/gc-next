export const SERVICE_TYPES = [
  "ac_repair",
  "heating_repair",
  "installation",
  "maintenance",
  "commercial_repair",
  "commercial_maintenance",
  "commercial_installation",
  "other",
] as const;

export type ServiceType = (typeof SERVICE_TYPES)[number];

export const PUBLIC_SCHEDULE_SERVICES = [
  "ac_repair",
  "heating_repair",
  "installation",
  "maintenance",
  "commercial_repair",
  "other",
] as const satisfies readonly ServiceType[];

export function isServiceType(value: unknown): value is ServiceType {
  return typeof value === "string" && SERVICE_TYPES.includes(value as ServiceType);
}

export const SERVICE_LABELS: Record<"en" | "es", Record<ServiceType, string>> = {
  en: {
    ac_repair: "AC Repair",
    heating_repair: "Heating Repair",
    installation: "New System Installation",
    maintenance: "HVAC Maintenance",
    commercial_repair: "Commercial HVAC",
    commercial_maintenance: "Commercial Maintenance",
    commercial_installation: "Commercial Installation",
    other: "Something Else",
  },
  es: {
    ac_repair: "Reparación de aire acondicionado",
    heating_repair: "Reparación de calefacción",
    installation: "Instalación de sistema nuevo",
    maintenance: "Mantenimiento de HVAC",
    commercial_repair: "HVAC comercial",
    commercial_maintenance: "Mantenimiento comercial",
    commercial_installation: "Instalación comercial",
    other: "Otro servicio",
  },
};
