import Image from "next/image";
export function EquipmentPhoto({ locale = "en", compact = false }: { locale?: "en" | "es"; compact?: boolean }) {
  const es = locale === "es";
  return <figure className={compact ? "gc-equipment-photo gc-equipment-compact" : "gc-equipment-photo"}><Image src="/services/installation/installation-detail.webp" alt={es ? "Unidad interior tipo cassette integrada en un techo" : "Ceiling cassette indoor unit integrated into a room"} width={1200} height={720} sizes="(max-width: 767px) 100vw, 50vw" /><figcaption>{es ? "Opciones de equipo para su espacio · Imagen de referencia" : "Equipment options for your space · Reference image"}</figcaption></figure>;
}
