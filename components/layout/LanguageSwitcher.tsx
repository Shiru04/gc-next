"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { alternateLocalePath } from "@/lib/routes";
export function LanguageSwitcher() {
  const pathname = usePathname(); const spanish = pathname.startsWith("/es"); const pair = alternateLocalePath(pathname);
  return <Link href={spanish ? pair.en : pair.es} hrefLang={spanish ? "en" : "es"} className="rounded-lg px-2 py-2 text-sm font-bold" aria-label={spanish ? "Ver en inglés" : "Ver en español"}>{spanish ? "EN" : "ES"}</Link>;
}
