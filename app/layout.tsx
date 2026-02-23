import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingCta } from "@/components/layout/FloatingCta";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${BUSINESS.name} | HVAC in Los Angeles & Orange County`,
  description:
    "Expert HVAC repairs, maintenance, and installations. Proudly serving Los Angeles and Orange County.",
  openGraph: {
    title: `${BUSINESS.name} | HVAC in Los Angeles & Orange County`,
    description:
      "Expert HVAC repairs, maintenance, and installations. Proudly serving Los Angeles and Orange County.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header variant="default" />
        <main>{children}</main>
        <Footer />
        <FloatingCta />
      </body>
    </html>
  );
}
