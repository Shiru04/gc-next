import { InstallationLanding } from "@/components/installation/InstallationLanding";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({ title: "Cotización gratuita para instalación HVAC", description: "Guía gratuita para reemplazo, mejora e instalación de aire central, bomba de calor o mini-split.", path: "/es/residencial/residential-ac-installation" });
export default function InstallationPage() { return <InstallationLanding locale="es" />; }
