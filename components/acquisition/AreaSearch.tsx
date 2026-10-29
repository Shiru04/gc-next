"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { SERVICE_AREAS } from "@/lib/areas";

export function AreaSearch({ locale = "en" }: { locale?: "en" | "es" }) {
  const es = locale === "es";
  const router = useRouter();
  const [query, setQuery] = useState("");
  function submit(event: FormEvent) {
    event.preventDefault();
    const normalized = query.trim().toLowerCase().replace(/,?\s+ca$/i, "");
    const match = SERVICE_AREAS.find(area => area.name.toLowerCase().replace(/,?\s+ca$/i, "") === normalized);
    router.push(match ? `${es ? "/es/areas-de-servicio" : "/service-areas"}/${match.slug}/` : es ? "/es/areas-de-servicio/" : "/service-areas/");
  }
  return <form className="gc-area-search" onSubmit={submit} role="search"><label htmlFor={`area-search-${locale}`}>{es ? "Busque Su Ciudad" : "Search Your City"}</label><div><input id={`area-search-${locale}`} list={`service-areas-${locale}`} value={query} onChange={event => setQuery(event.target.value)} placeholder={es ? "Ej. Cerritos, CA" : "e.g. Cerritos, CA"}/><datalist id={`service-areas-${locale}`}>{SERVICE_AREAS.map(area => <option value={area.name} key={area.slug}/>)}</datalist><button className="gc-button" type="submit">{es ? "Ver Área" : "Find My Area"}</button></div></form>;
}
