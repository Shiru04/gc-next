import type { Metadata } from "next";
import { CtaDashboardClient } from "./CtaDashboardClient";

export const metadata: Metadata = {
  title: "CTA Dashboard",
  // Página interna: fuera del índice y fuera del sitemap.
  robots: { index: false, follow: false },
};

export default function CtaDashboardPage() {
  return <CtaDashboardClient />;
}
