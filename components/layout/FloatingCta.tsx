"use client";

import { BUSINESS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ctaAttrs } from "@/lib/cta";
import { usePathname } from "next/navigation";

export function FloatingCta() {
  const es = usePathname().startsWith("/es");
  return (
    <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex items-center gap-3 md:hidden">
      <a href={`tel:${BUSINESS.phoneE164}`} className={cn("inline-flex size-14 items-center justify-center rounded-full bg-brand-red text-white shadow-xl transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2")} aria-label={`Call ${BUSINESS.phoneDisplay}`} {...ctaAttrs({ id: "floating-call", location: "floating", type: "phone" })}>
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.64a2 2 0 0 1-.45 2.11L8.01 9.74a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.86.29 1.74.5 2.64.62A2 2 0 0 1 22 16.92Z" /></svg>
      </a>
      <a href={es ? "/es/programar-servicio/" : "/schedule-service/"} className="rounded-2xl bg-brand-black px-4 py-3 text-sm font-extrabold text-white shadow-xl transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2" aria-label={es ? "Agendar una consulta HVAC gratuita" : "Book a Free HVAC Consultation"} {...ctaAttrs({ id: "floating-schedule", location: "floating", type: "booking" })}>{es ? "Agendar consulta HVAC gratuita" : "Book Free HVAC Consultation"}</a>
    </div>
  );
}
