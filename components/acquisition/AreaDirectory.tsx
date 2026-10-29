import Link from "next/link";
import { SERVICE_AREAS } from "@/lib/areas";
import { PRIORITY_AREAS } from "@/lib/priority-areas";
import { acquisitionPath, type Locale } from "@/lib/acquisition-content";
import { LeadForm } from "./LeadForm";

export function AreaDirectory({ locale = "en" }: { locale?: Locale }) {
  const es = locale === "es";
  const base = es ? "/es/areas-de-servicio/" : "/service-areas/";
  return <div className="gc-acquisition">
    <nav className="gc-breadcrumb gc-wrap" aria-label={es ? "Ruta de navegación" : "Breadcrumb"}>
      <Link href={es ? "/es/" : "/"}>{es ? "Inicio" : "Home"}</Link><span aria-current="page"> / {es ? "Áreas de servicio" : "Service Areas"}</span>
    </nav>
    <section className="gc-hero"><div className="gc-wrap gc-hero-grid">
      <div><span className="gc-kicker">{es ? "DESDE CERRITOS · DESDE 1999" : "BASED IN CERRITOS · SINCE 1999"}</span>
        <h1>{es ? "Servicio HVAC en Los Ángeles y Orange County" : "HVAC Service Across Los Angeles & Orange County"}</h1>
        <p>{es ? "Encuentre orientación para su ciudad y elija instalación, reparación, mantenimiento o servicio comercial. Indique su código postal para que GC revise su solicitud." : "Find guidance for your city and choose installation, repair, maintenance or commercial service. Share your ZIP code so GC can review your request."}</p>
        <div className="gc-actions"><Link className="gc-button" href={acquisitionPath("installation-replacement", locale)}>{es ? "Estimado gratuito de instalación" : "Free Installation Estimate"}</Link><a className="gc-button gc-button-light" href="tel:+15628674123">562-867-4123</a></div>
      </div>
      <div id="free-hvac-quote" className="gc-form-panel"><LeadForm locale={locale} placement="service-area-directory" /></div>
    </div></section>
    <section className="gc-section gc-wrap"><span className="gc-kicker">{es ? "PLANIFIQUE SEGÚN SU PROPIEDAD" : "PLAN FOR YOUR PROPERTY"}</span><h2>{es ? "Conozca las consideraciones de su ciudad" : "Explore local considerations"}</h2>
      <div className="gc-cards">{Object.entries(PRIORITY_AREAS).map(([slug, entry]) => <article className="gc-card" key={slug}><h3>{SERVICE_AREAS.find(area => area.slug === slug)?.name}</h3><p>{entry.consideration[es ? 1 : 0]}</p><Link href={base + slug + "/"}>{es ? "Ver servicios y preguntas locales" : "View services and local FAQs"}</Link></article>)}</div>
    </section>
    <section className="gc-section gc-wrap"><h2>{es ? "Todas las comunidades atendidas" : "All communities served"}</h2>
      <div className="gc-area-links">{[...SERVICE_AREAS].sort((a,b) => a.name.localeCompare(b.name)).map(area => <Link href={base + area.slug + "/"} key={area.slug}>{area.name}</Link>)}</div>
    </section>
    <section className="gc-final"><div className="gc-wrap"><h2>{es ? "¿No encuentra su ciudad?" : "Don’t see your city?"}</h2><p>{es ? "Llame con su código postal y el servicio que necesita. GC puede confirmar si su propiedad está dentro del área atendida." : "Call with your ZIP code and the service you need. GC can confirm whether your property is within the service area."}</p><div className="gc-actions"><a className="gc-button" href="tel:+15628674123">{es ? "Llamar al" : "Call"} 562-867-4123</a><Link className="gc-button gc-button-light" href={acquisitionPath("commercial", locale)}>{es ? "Servicio comercial" : "Commercial Service"}</Link></div></div></section>
  </div>;
}
