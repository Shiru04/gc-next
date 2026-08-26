"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BUSINESS, NAV, RESIDENTIAL_SERVICE_LINKS, COMMERCIAL_SERVICE_LINKS } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
const labels: Record<string,string> = { Home: "Inicio", "About Us": "Nosotros", Services: "Servicios", Resources: "Recursos", Contact: "Contacto", Financing: "Financiamiento", Promotions: "Promociones", "AC Repair": "Reparación de AC", "Heating Repair": "Reparación de calefacción", Maintenance: "Mantenimiento", "AC Installation": "Instalación de AC", "Attic Insulation": "Aislamiento de ático", Repair: "Reparación", Installation: "Instalación" };
const localPath = (href: string) => href.replace("/residential", "/es/residencial").replace("/commercial", "/es/comercial").replace("/resources", "/es/recursos").replace("/services", "/es/servicios").replace("/contact", "/es/contacto").replace("/financing", "/es/financiamiento").replace("/promotions", "/es/promociones").replace("/about", "/es/acerca").replace(/^\/$/, "/es/");
export function Footer() {
  const es = usePathname().startsWith("/es");
  const group = (items: readonly { href: string; label: string }[]) => items.map((x) => ({ href: es ? localPath(x.href) : x.href, label: es ? labels[x.label] ?? x.label : x.label }));
  return <footer className="border-t border-black/10 bg-white"><Container className="py-12"><div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
    <div><div className="text-lg font-extrabold">{BUSINESS.name}</div><div className="mt-3 text-sm text-black/70"><div>{BUSINESS.addressLine1}</div><div>{BUSINESS.cityStateZip}</div><div className="mt-2 font-semibold">{BUSINESS.phoneDisplay}</div><div className="mt-2">{BUSINESS.hoursShort}</div><div className="mt-3 text-black/60">{BUSINESS.trustLine} | {BUSINESS.licenseLabel}</div></div></div>
    <FooterLinks title={es ? "Menú del sitio" : "Site Menu"} items={group(NAV)} />
    <FooterLinks title={es ? "Residencial" : "Residential"} items={[...group(RESIDENTIAL_SERVICE_LINKS), { href: es ? "/es/residencial/" : "/residential", label: es ? "Ver todos los servicios residenciales →" : "View all residential →" }]} />
    <FooterLinks title={es ? "Comercial" : "Commercial"} items={[...group(COMMERCIAL_SERVICE_LINKS), { href: es ? "/es/comercial/" : "/commercial", label: es ? "Ver todos los servicios comerciales →" : "View all commercial →" }]} />
  </div><div className="mt-10 flex flex-col gap-2 text-xs text-black/65 sm:flex-row sm:items-center sm:justify-between"><div>© {new Date().getFullYear()} {BUSINESS.name}. {es ? "Todos los derechos reservados." : "All rights reserved."}</div><Link href={es ? "/es/politica-de-privacidad/" : "/privacy-policy"} className="font-semibold text-black/70 hover:text-black">{es ? "Política de privacidad" : "Privacy Policy"}</Link></div></Container></footer>;
}
function FooterLinks({ title, items }: { title: string; items: { href: string; label: string }[] }) { return <div><div className="text-sm font-bold uppercase tracking-wide text-black/60">{title}</div><ul className="mt-4 space-y-2 text-sm font-semibold">{items.map((item) => <li key={item.href}><Link href={item.href} className="text-black/80 hover:text-black">{item.label}</Link></li>)}</ul></div>; }
