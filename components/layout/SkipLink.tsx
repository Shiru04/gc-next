"use client";
import { usePathname } from "next/navigation";

export function SkipLink() {
  const pathname = usePathname();
  const es = pathname.startsWith("/es/") || pathname === "/es";
  return <a href="#main-content" className="skip-link">{es ? "Saltar al contenido principal" : "Skip to main content"}</a>;
}
