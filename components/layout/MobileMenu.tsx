"use client";

import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { BUSINESS, NAV } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function MobileMenu({ variant }: { variant: "default" | "landing" }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelId = useId();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);

    // lock scroll
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const Trigger = (
    <button
      type="button"
      className="lg:hidden ml-1 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white hover:bg-black/5"
      aria-label={open ? "Close menu" : "Open menu"}
      aria-controls={panelId}
      aria-expanded={open}
      onClick={() => setOpen((v) => !v)}
    >
      <div className="flex flex-col gap-1">
        <span
          className={cn(
            "h-0.5 w-5 bg-black transition",
            open && "translate-y-1.5 rotate-45",
          )}
        />
        <span
          className={cn("h-0.5 w-5 bg-black transition", open && "opacity-0")}
        />
        <span
          className={cn(
            "h-0.5 w-5 bg-black transition",
            open && "-translate-y-1.5 -rotate-45",
          )}
        />
      </div>
    </button>
  );

  const Overlay = mounted
    ? createPortal(
        <div
          className={cn(
            "fixed inset-0 lg:hidden",
            // z-index máximo “práctico” para ganar cualquier guerra
            "z-[2147483647]",
            open ? "pointer-events-auto" : "pointer-events-none",
          )}
          aria-hidden={!open}
        >
          {/* Backdrop */}
          <button
            type="button"
            className={cn(
              "absolute inset-0 bg-black/45 transition-opacity",
              open ? "opacity-100" : "opacity-0",
            )}
            onClick={() => setOpen(false)}
            aria-label="Close menu overlay"
          />

          {/* Panel */}
          <aside
            id={panelId}
            className={cn(
              "absolute right-0 top-0 h-full w-[86%] max-w-sm bg-white shadow-2xl",
              "transition-transform will-change-transform",
              open ? "translate-x-0" : "translate-x-full",
            )}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between border-b border-black/10 p-4">
              <div className="text-sm font-semibold text-black/80">Menu</div>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 hover:bg-black/5"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <nav className="p-4 overflow-y-auto">
              <div className="flex flex-col gap-1 text-base font-semibold">
                {variant === "default" ? (
                  <>
                    {NAV.slice(0, 5).map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="rounded-xl px-3 py-3 text-black/90 hover:bg-black/5"
                      >
                        {item.label}
                      </Link>
                    ))}
                    <Link
                      href="/promotions"
                      onClick={() => setOpen(false)}
                      className="rounded-xl px-3 py-3 text-brand-red hover:bg-black/5"
                    >
                      Promotions
                    </Link>
                  </>
                ) : (
                  <div className="rounded-xl bg-black/5 px-3 py-3 text-sm font-semibold text-black/70">
                    Specials &amp; Fast Booking
                  </div>
                )}
              </div>

              <div className="mt-4 grid gap-2">
                <Button
                  href={`tel:${BUSINESS.phoneE164}`}
                  variant="secondary"
                  size="md"
                  ariaLabel={`Call ${BUSINESS.phoneDisplay}`}
                >
                  Call {BUSINESS.phoneDisplay}
                </Button>
                <Button
                  href={BUSINESS.bookingUrl}
                  variant="primary"
                  size="md"
                  ariaLabel="Book now"
                >
                  Book Now
                </Button>
              </div>
            </nav>
          </aside>
        </div>,
        document.body,
      )
    : null;

  return (
    <>
      {Trigger}
      {Overlay}
    </>
  );
}
