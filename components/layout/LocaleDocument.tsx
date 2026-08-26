"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
export function LocaleDocument() { const pathname = usePathname(); useEffect(() => { document.documentElement.lang = pathname.startsWith("/es") ? "es" : "en"; }, [pathname]); return null; }
