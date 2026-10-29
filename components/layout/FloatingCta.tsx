"use client";
import { usePathname } from "next/navigation";
export function FloatingCta(){const es=usePathname().startsWith("/es");return <nav className="gc-mobile-actions" aria-label={es?"Acciones rápidas":"Quick actions"}><a className="gc-button" href={(es?"/es":"")+"/installation-replacement/#free-hvac-quote"}>{es?"Estimado gratis":"Free Estimate"}</a><a className="gc-button gc-button-light" href="tel:+15628674123">{es?"Llamar ahora":"Call Now"}</a></nav>;}
