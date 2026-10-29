import { EquipmentPhoto } from "./EquipmentPhoto";
import { SystemExplorer } from "./SystemExplorer";
import { ProjectStories } from "./ProjectStories";
import Link from "next/link";
import { LeadForm } from "./LeadForm";
import { acquisitionPath, type AcquisitionPage as PageData, type Locale } from "@/lib/acquisition-content";
import { JourneyTracking } from "./JourneyTracking";
import { InstallationProof } from "./InstallationProof";
import Image from "next/image";
import type { GooglePlaceData } from "@/lib/google-reviews";
import { AreaSearch } from "./AreaSearch";
import { RatingStars } from "./RatingStars";

export function TrustStrip({ locale, googleReviews = null }: { locale: Locale; googleReviews?: GooglePlaceData | null }) {
  const es = locale === "es";
  return <section className="gc-proofbar" aria-label={es ? "Calificaciones y acreditaciones" : "Ratings and accreditations"}>
    <div className="gc-proofbar-top">
      <div className="gc-google-proof">
        <span className="gc-google-label">Google {es ? "Reseñas" : "Reviews"}</span>
        {googleReviews ? <><div className="gc-google-rating"><strong>{googleReviews.rating.toFixed(1)}</strong><div><RatingStars rating={googleReviews.rating} label={`${googleReviews.rating} ${es ? "de 5 estrellas" : "out of 5 stars"}`}/><span>{googleReviews.totalReviews.toLocaleString()} {es ? "reseñas verificadas" : "verified reviews"}</span></div></div></> : <strong className="gc-google-fallback">{es ? "Experiencias Verificadas De Clientes" : "Verified Customer Experiences"}</strong>}
        <Link href={es ? "/es/resenas/" : "/reviews/"}>{es ? "Leer Reseñas De Google" : "Read Google Reviews"}<span aria-hidden="true">→</span></Link>
      </div>
      <div className="gc-proof-facts"><div><strong>25+</strong><span>{es ? "Años · Empresa Familiar Desde 1999" : "Years · Family Owned Since 1999"}</span></div><div><strong>#794228</strong><span>{es ? "Licencia De California · Fianza · Seguro" : "California Licensed · Bonded · Insured"}</span></div></div>
    </div>
    <div className="gc-trust-badges">
      <span><Image src="/trust/angieslist-w192.webp" alt="Angie’s List Super Service Award 2013–2020" width={148} height={112}/></span>
      <span><Image src="/trust/american-standard-w192.webp" alt="American Standard Customer Care Dealer" width={152} height={96}/></span>
      <span><Image src="/trust/homeadvisor-w192.webp" alt="HomeAdvisor Screened and Approved" width={126} height={112}/></span>
      <a href="https://www.yelp.com/search?find_desc=GC+Heating+%26+Cooling&find_loc=Cerritos%2C+CA" target="_blank" rel="noopener noreferrer" aria-label={es ? "Buscar GC Heating & Cooling en Yelp" : "Find GC Heating & Cooling on Yelp"}><Image src="/trust/yelp-logo.png" alt="Yelp" width={160} height={64}/></a>
    </div>
  </section>;
}

export function SystemCards({ locale }: { locale: Locale }) {
  const es = locale === "es";
  return <div className="gc-cards">{[
    ["central-ac", es ? "Aire central" : "Central AC", es ? "Confort para toda la casa con conductos adecuados." : "Whole-home cooling with suitable ductwork."],
    ["heat-pumps", es ? "Bombas de calor" : "Heat pumps", es ? "Calefacción y refrigeración en un sistema." : "Heating and cooling in one system."],
    ["mini-splits", "Mini-splits", es ? "Confort por zonas para ampliaciones y espacios sin conductos." : "Zoned comfort for additions and spaces without ducts."],
  ].map(([slug, title, body], i) => <Link className="gc-card gc-system" key={slug} href={acquisitionPath(`installation-replacement/${slug}`, locale)}><span className="gc-card-number">0{i + 1}</span><h3>{title}</h3><p>{body}</p><span className="gc-text-link">{es ? "Explorar opciones" : "Explore options"}</span></Link>)}</div>;
}

export function FinancingSection({ locale }: { locale: Locale }) {
  const es = locale === "es";
  return <section className="gc-financing gc-wrap"><div><span className="gc-kicker">{es ? "PLANIFIQUE CON CLARIDAD" : "PLAN WITH CLARITY"}</span><h2>{es ? "Hasta $2,600 En Reembolsos Disponibles" : "Up To $2,600 In Available Rebates"}</h2><p>{es ? "Combine un estimado gratuito por escrito con opciones de financiamiento y orientación sobre incentivos para equipos elegibles." : "Pair a free written estimate with financing options and guidance on incentives for qualifying equipment."}</p></div><div><Link className="gc-button gc-button-light" href={acquisitionPath("financing-incentives", locale)} data-cta="financing" data-cta-type="financing" data-cta-location="financing-section">{es ? "Explorar Financiamiento E Incentivos" : "Explore Financing & Incentives"}</Link><p className="gc-disclosure">{es ? "Hasta $2,600 se refiere al valor potencial combinado de programas disponibles. La elegibilidad, los montos, los plazos y la disponibilidad varían según el equipo, la propiedad, el programa, la fecha de instalación y la aprobación de cada entidad. Los incentivos no están garantizados. Confirme todos los requisitos antes de comprar." : "Up to $2,600 refers to the potential combined value of available programs. Eligibility, amounts, deadlines and availability vary by equipment, property, program, installation date and each program administrator’s approval. Incentives are not guaranteed. Confirm all requirements before purchase."}</p></div></section>;
}

export function AreaLinks({ locale }: { locale: Locale }) {
  const es = locale === "es";
  return <section className="gc-section gc-wrap gc-area-finder"><span className="gc-kicker">{es ? "CERCA DE USTED" : "CLOSE TO HOME"}</span><h2>{es ? "De Cerritos A Los Ángeles Y Orange County" : "From Cerritos Across LA & Orange County"}</h2><AreaSearch locale={locale}/><div className="gc-area-links">{["Cerritos", "Long Beach", "Lakewood", "Downey", "Norwalk", "Bellflower", "Buena Park", "Cypress"].map(city => <Link key={city} href={`${es ? "/es/areas-de-servicio" : "/service-areas"}/${city.toLowerCase().replaceAll(" ", "-")}-ca/`}>{city}</Link>)}</div><p className="gc-area-note">{es ? "¿No Ve Su Área? Contáctenos Para Confirmar La Disponibilidad Del Servicio. Puede Aplicar Un Cargo Adicional" : "Don’t See Your Area? Contact Us To Check Service Availability. An Additional Fee May Apply"} <Link href={es ? "/es/contacto/" : "/contact/"}>{es ? "Contactar A GC" : "Contact GC"}</Link></p></section>;
}

export function FinalCta({ locale, mode = "installation" }: { locale: Locale; mode?: "installation" | "repair" | "maintenance" | "commercial" }) {
  const es = locale === "es";
  return <section className="gc-final"><div className="gc-wrap"><span className="gc-kicker">GC HEATING & COOLING</span><h2>{es ? "Hablemos De Lo Que Necesita" : "Let’s Talk About What You Need"}</h2><p>{es ? "Opciones claras. Un equipo local. El siguiente paso empieza aquí." : "Clear options. A local team. Your next step starts here."}</p><div className="gc-actions"><a className="gc-button" href="#free-hvac-quote">{mode === "installation" ? es ? "Obtener mi estimado gratuito" : "Get My Free Estimate" : es ? "Solicitar servicio" : "Request Service"}</a><a className="gc-button gc-button-outline" href="tel:+15628674123">{es ? "Llamar al" : "Call"} 562-867-4123</a></div></div></section>;
}

export function AcquisitionPage({ page, locale = "en" }: { page: PageData; locale?: Locale }) {
  const es = locale === "es"; const index = es ? 1 : 0;
  const installation = page.mode === "installation";
  const guide = page.slug.startsWith("installation-replacement/") && !page.mode;
  const mode = page.mode || "installation";
  const path = acquisitionPath(page.slug, locale);
  const crumbs = [{ name: es ? "Inicio" : "Home", path: es ? "/es/" : "/" }, ...(page.slug.includes("/") ? [{ name: es ? "Instalación y reemplazo" : "Installation & Replacement", path: acquisitionPath("installation-replacement", locale) }] : []), { name: page.title[index], path }];
  const schema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: crumbs.map((crumb, i) => ({ "@type": "ListItem", position: i + 1, name: crumb.name, item: `https://gc-heatingandcooling.com${crumb.path}` })) };
  return <div className="gc-acquisition"><JourneyTracking installation={installation} guide={guide} />
    <nav className="gc-breadcrumb gc-wrap" aria-label={es ? "Ruta de navegación" : "Breadcrumb"}>{crumbs.map((crumb, i) => <span key={crumb.path}>{i ? <span aria-hidden="true"> / </span> : null}{i === crumbs.length - 1 ? <span aria-current="page">{crumb.name}</span> : <Link href={crumb.path}>{crumb.name}</Link>}</span>)}</nav>
    <section className={"gc-hero " + (installation ? "gc-photo-hero" : "")}><div className="gc-wrap gc-hero-grid"><div className="gc-hero-copy"><span className="gc-kicker">{es ? "SU CONFORT, BIEN PENSADO" : "COMFORT, THOUGHT THROUGH"}</span><h1>{page.title[index]}</h1><p>{page.intro[index]}</p><div className="gc-actions"><a href="#free-hvac-quote" className="gc-button">{installation || guide ? es ? "Obtener mi estimado gratuito" : "Get My Free Estimate" : mode === "maintenance" ? es ? "Solicitar mantenimiento por $149" : "Book the $149 Tune-Up" : es ? "Solicitar servicio HVAC" : "Request HVAC Service"}</a><a href="tel:+15628674123" className="gc-hero-phone">{installation ? es ? "Hablar con un especialista" : "Call an Installation Specialist" : es ? "Llamar ahora" : "Call Now"}<span>562-867-4123</span></a></div>{installation ? <ul className="gc-assurances">{(es ? ["Estimado gratuito por escrito", "Sin compromiso", "Tamaño adecuado del sistema", "Opciones de financiamiento", "Orientación sobre garantía y permisos"] : ["Free written estimate", "No obligation", "Correct system sizing", "Financing options", "Warranty and permit guidance"]).map(item => <li key={item}>{item}</li>)}</ul> : null}</div><div id="free-hvac-quote" className="gc-form-panel"><LeadForm mode={mode} locale={locale} placement={page.slug.replaceAll("/", "-")} /></div>{installation ? <EquipmentPhoto locale={locale} /> : null}</div></section>
    <div className="gc-wrap"><TrustStrip locale={locale} /></div>
    {installation ? <InstallationProof locale={locale}/> : null}
    <div className="gc-wrap gc-editorial">{page.sections.map((section, i) => <section className="gc-editorial-row" key={section.title[0]}><span className="gc-section-index">{String(i + 1).padStart(2, "0")}</span><h2>{section.title[index]}</h2><p>{section.body[index]}</p></section>)}</div>
    {installation || guide ? <><section className="gc-section gc-wrap"><span className="gc-kicker">{es ? "COMPARE SUS OPCIONES" : "COMPARE YOUR OPTIONS"}</span><h2>{es ? "El sistema adecuado empieza con su espacio." : "The right system starts with your space."}</h2><SystemExplorer locale={locale} /></section><FinancingSection locale={locale} /><section className="gc-section gc-wrap"><h2>{es ? "Decida con más información" : "Make an informed decision"}</h2><div className="gc-area-links">{[["cost-guide", es ? "Costos de instalación" : "Installation costs"], ["repair-vs-replacement", es ? "Reparar o reemplazar" : "Repair vs. replacement"], ["system-comparison", es ? "Comparar sistemas" : "Compare systems"], ["timeline-permits", es ? "Plazos y permisos" : "Timeline & permits"]].map(([slug, title]) => <Link key={slug} href={acquisitionPath(`installation-replacement/${slug}`, locale)}>{title}</Link>)}</div></section></> : null}
    <ProjectStories locale={locale} category={installation ? "installation" : page.mode} />
    <AreaLinks locale={locale} />
    {page.faq.length ? <section className="gc-section gc-wrap gc-faq"><span className="gc-kicker">{es ? "RESPUESTAS CLARAS" : "CLEAR ANSWERS"}</span><h2>{es ? "Preguntas frecuentes" : "Frequently asked questions"}</h2>{page.faq.map(item => <details key={item.question[0]}><summary>{item.question[index]}</summary><p>{item.answer[index]}</p></details>)}</section> : null}
    <FinalCta locale={locale} mode={mode} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
  </div>;
}
