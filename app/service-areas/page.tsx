import { buildMetadata } from "@/lib/seo";
import ServiceAreasClient from "./ServiceAreasClient";

export const metadata = buildMetadata({
  title: "Service Areas | GC Heating & Cooling",
  description:
    "Serving Los Angeles & Orange County with HVAC installation, repair, and maintenance. See our full service area coverage.",
  path: "/service-areas",
});

export default function ServiceAreasPage() {
  return <ServiceAreasClient />;
}
