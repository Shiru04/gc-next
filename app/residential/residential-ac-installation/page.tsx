import { InstallationLanding } from "@/components/installation/InstallationLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Free HVAC Installation Estimate | Los Angeles & Orange County",
  description: "Free estimates for central AC, heat pump and mini-split installations or replacements. Financing available from GC Heating & Cooling.",
  path: "/residential/residential-ac-installation",
});

export default function InstallationPage() { return <InstallationLanding />; }
