"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const FORM_ANCHOR = "#free-hvac-quote";

export function FloatingCta() {
  const pathname = usePathname();
  const es = pathname.startsWith("/es");
  const [hasLocalForm, setHasLocalForm] = useState(false);

  useEffect(() => {
    setHasLocalForm(Boolean(document.getElementById("free-hvac-quote")));
  }, [pathname]);

  function useLocalFormIfPresent(event: React.MouseEvent<HTMLAnchorElement>) {
    if (hasLocalForm || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = document.getElementById("free-hvac-quote");
    if (!target) return;
    event.preventDefault();
    window.history.pushState(null, "", FORM_ANCHOR);
    target.scrollIntoView();
  }

  return <nav className="gc-mobile-actions" aria-label={es ? "Acciones r\u00e1pidas" : "Quick actions"}>
    <a className="gc-button" href={hasLocalForm ? FORM_ANCHOR : `${es ? "/es" : ""}/installation-replacement/${FORM_ANCHOR}`} onClick={useLocalFormIfPresent}>{es ? "Estimado gratis" : "Free Estimate"}</a>
    <a className="gc-button gc-button-light" href="tel:+15628674123">{es ? "Llamar ahora" : "Call Now"}</a>
  </nav>;
}
