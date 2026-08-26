import { InstallationLanding } from "@/components/installation/InstallationLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "AC Replacement & Installation in Los Angeles & Orange County",
  description: "Free in-home estimates for central AC, heat pump and mini-split installation. Financing available from GC Heating & Cooling.",
  path: "/residential/residential-ac-installation",
});

export default function InstallationPage() { return <InstallationLanding />; }
