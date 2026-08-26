"use client";

import { BUSINESS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ctaAttrs } from "@/lib/cta";
import { usePathname } from "next/navigation";

export function FloatingCta() {
  const es = usePathname().startsWith("/es");
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-black/10 bg-white p-2 pb-[max(.5rem,env(safe-area-inset-bottom))] md:inset-x-auto md:bottom-4 md:right-4 md:flex md:w-auto md:flex-col md:border-0 md:bg-transparent md:p-0">
      <a
        href={`tel:${BUSINESS.phoneE164}`}
        className={cn(
          "rounded-2xl bg-white shadow-soft border border-black/10 px-4 py-3",
          "text-sm font-extrabold text-brand-black hover:bg-brand-gray",
        )}
        aria-label={`Call ${BUSINESS.phoneDisplay}`}
        {...ctaAttrs({
          id: "floating-call",
          location: "floating",
          type: "phone",
        })}
      >
        Call {BUSINESS.phoneDisplay}
      </a>

      <a
        href={es ? "/es/programar-servicio/" : "/schedule-service/"}
        className={cn(
          "rounded-2xl bg-brand-black shadow-soft px-4 py-3",
          "text-sm font-extrabold text-white hover:opacity-90",
        )}
        aria-label={es ? "Programar servicio" : "Schedule service"}
        {...ctaAttrs({
          id: "floating-schedule",
          location: "floating",
          type: "booking",
        })}
      >
        {es ? "Programar servicio" : "Schedule Service"}
      </a>
    </div>
  );
}
