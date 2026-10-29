"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { acquisitionPath } from "@/lib/acquisition-content";
export function Header(_props: {variant?:"default"|"landing"}) {
 const pathname=usePathname(), es=pathname.startsWith("/es"), locale=es?"es":"en";
 const mobile=useRef<HTMLDetailsElement>(null), desktop=useRef<HTMLDetailsElement>(null);
 useEffect(()=>{if(mobile.current)mobile.current.open=false;if(desktop.current)desktop.current.open=false;},[pathname]);
 const services=[["repair",es?"Reparación de AC y calefacción":"AC & Heating Repair"],["maintenance",es?"Mantenimiento HVAC":"HVAC Maintenance"],["installation-replacement",es?"Instalación y reemplazo":"Installation & Replacement"],["commercial",es?"HVAC comercial":"Commercial HVAC"],["attic-insulation",es?"Aislamiento del ático":"Attic Insulation"]];
 const links=[[acquisitionPath("installation-replacement",locale),es?"Instalación y reemplazo":"Installation & Replacement"],[acquisitionPath("financing-incentives",locale),es?"Financiamiento e incentivos":"Financing & Incentives"],[es?"/es/resenas/":"/reviews/",es?"Reseñas":"Reviews"],[es?"/es/areas-de-servicio/":"/service-areas/",es?"Áreas de servicio":"Service Areas"],[es?"/es/acerca/":"/about/",es?"Acerca de GC":"About GC"]];
 return <header className={`gc-header ${pathname === "/" || pathname === "/es" || pathname === "/es/" ? "gc-header-over-scene" : ""}`} onKeyDown={e=>{if(e.key==="Escape")for(const item of [mobile.current,desktop.current])if(item?.open){item.open=false;item.querySelector("summary")?.focus();}}}>
 <div className="gc-wrap gc-header-top"><Link href={es?"/es/":"/"} className="gc-header-brand"><Image src="/brand/logo-gc.svg" alt="GC Heating & Cooling" width={162} height={46} priority/></Link><div className="gc-header-utility"><LanguageSwitcher/><a className="gc-header-call" href="tel:+15628674123" aria-label={es?"Llamar a GC Heating & Cooling al 562-867-4123":"Call GC Heating & Cooling at 562-867-4123"}><span>{es?"Llámenos":"Call us"}</span><strong>562-867-4123</strong></a><Link className="gc-button" href={acquisitionPath("installation-replacement",locale)+"#free-hvac-quote"}>{es?"Obtener un estimado gratuito":"Get a Free Estimate"}</Link></div></div>
 <nav className="gc-wrap gc-desktop-nav" aria-label={es?"Navegación principal":"Primary navigation"}><details ref={desktop}><summary>{es?"Servicios":"Services"}</summary><div className="gc-subnav"><Link href={es?"/es/servicios/":"/services/"}>{es?"Todos los servicios":"All services"}</Link>{services.map(([slug,label])=><Link key={slug} href={acquisitionPath(slug,locale)}>{label}</Link>)}</div></details>{links.map(([href,label])=><Link key={href} href={href}>{label}</Link>)}</nav>
 <details className="gc-wrap gc-mobile-nav" ref={mobile}><summary>{es?"Menú y servicios":"Menu & services"}</summary><nav aria-label={es?"Navegación móvil":"Mobile navigation"}><Link href={es?"/es/servicios/":"/services/"}>{es?"Todos los servicios":"All services"}</Link>{services.map(([slug,label])=><Link key={slug} href={acquisitionPath(slug,locale)}>{label}</Link>)}{links.slice(1).map(([href,label])=><Link key={href} href={href}>{label}</Link>)}</nav></details></header>;
}
