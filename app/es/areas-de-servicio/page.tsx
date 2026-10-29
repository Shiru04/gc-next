import { buildMetadata } from "@/lib/seo";
import { AreaDirectory } from "@/components/acquisition/AreaDirectory";

export const metadata = buildMetadata({
  title: "Áreas de Servicio | Calefacción y refrigeración GC",
  description:
    "Sirviendo a Los Ángeles y el condado de Orange con instalación, reparación y mantenimiento de HVAC. Vea nuestra cobertura completa del área de servicio.",
  path: "/es/areas-de-servicio",
});

export default function ServiceAreasPage() {
  return <AreaDirectory locale="es" />;
}
