import { APPROVED_PROJECTS, type ProjectProof } from "@/lib/project-proof";

export function ProjectStories({ locale = "en", category, city }: { locale?: "en" | "es"; category?: ProjectProof["category"]; city?: string }) {
  const es = locale === "es";
  const projects = APPROVED_PROJECTS.filter(project => project.approval.approvedAt && project.approval.source && (!category || project.category === category) && (!city || project.city === city) && (!es || project.spanish));
  if (!projects.length) return null;
  return <section className="gc-section gc-wrap"><span className="gc-kicker">{es ? "PROYECTOS DE GC" : "GC PROJECTS"}</span><h2>{es ? "El trabajo en propiedades reales" : "The work in real properties"}</h2>
    {projects.map(project => {
      const copy = es ? project.spanish! : project;
      const review = project.customerReview;
      return <article className="gc-project" key={project.id}><h3>{project.city} · {copy.systemCategory}</h3><p>{copy.propertySituation}</p>
        <dl className="gc-project-facts">{[[es ? "El problema anterior" : "Previous problem", copy.previousProblem], [es ? "La solución" : "Recommended solution", copy.solution], [es ? "Consideraciones de instalación" : "Installation considerations", copy.installationConsiderations], [es ? "El resultado" : "Outcome", copy.outcome]].map(([label, text]) => <div key={label}><dt>{label}</dt><dd>{text}</dd></div>)}</dl>
        <div className="gc-project-photos">{project.photographs.map((photo, i) => <img key={photo.src} src={photo.src} alt={es ? project.spanish!.photographAlts[i] || copy.systemCategory : photo.alt} width={photo.width} height={photo.height} loading="lazy" decoding="async" />)}</div>
        {review && (!es || project.spanish?.reviewExcerpt) ? <figure><blockquote>{es ? project.spanish!.reviewExcerpt : review.excerpt}</blockquote><figcaption>{review.author} · <a href={review.sourceUrl}>{es ? "Reseña original" : "Original review"}</a>{es ? " · Traducción" : ""}</figcaption></figure> : null}
      </article>;
    })}
  </section>;
}
