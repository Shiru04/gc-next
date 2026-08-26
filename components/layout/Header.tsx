"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BUSINESS, NAV } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { MobileMenu } from "./MobileMenu";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header(props: { variant?: "default" | "landing" }) {
  const variant = props.variant ?? "default";
  const isSpanish = usePathname().startsWith("/es");
  const nav = isSpanish ? [
    { href: "/es/", label: "Inicio" }, { href: "/es/acerca/", label: "Nosotros" },
    { href: "/es/servicios/", label: "Servicios" }, { href: "/es/recursos/", label: "Recursos" },
    { href: "/es/contacto/", label: "Contacto" },
  ] : NAV.slice(0, 5);

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-3">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label={`${BUSINESS.name} Home`}
        >
          <span className="relative h-9 w-[140px] sm:h-10 sm:w-[160px]">
            <Image
              src="/brand/logo-gc.svg"
              alt="GC heating and cooling logo"
              fill
              priority
              sizes="(max-width: 640px) 140px, 160px"
              className="object-contain"
            />
          </span>
        </Link>

        {/* Desktop nav */}
        {variant === "default" ? (
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-black/80 hover:text-black"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={isSpanish ? "/es/promociones/" : "/promotions"}
              className="text-brand-red hover:opacity-80"
            >
              {isSpanish ? "Promociones" : "Promotions"}
            </Link>
          </nav>
        ) : (
          <div className="hidden lg:block text-sm font-semibold text-black/70">
            Specials & Fast Booking
          </div>
        )}

        {/* Right side */}
        <div
          className={cn(
            "flex items-center gap-2",
            variant === "default" ? "" : "",
          )}
        >
          <LanguageSwitcher />
          <Button
            href={`tel:${BUSINESS.phoneE164}`}
            variant="secondary"
            size="sm"
            ariaLabel={`Call ${BUSINESS.phoneDisplay}`}
            cta={{ id: "header-call", location: "header", type: "phone" }}
          >
            {BUSINESS.phoneDisplay}
          </Button>
          <Button
            href={isSpanish ? "/es/programar-servicio/" : "/schedule-service/"}
            variant="primary"
            size="sm"
            ariaLabel={isSpanish ? "Programar servicio" : "Schedule service"}
            cta={{ id: "header-schedule", location: "header", type: "booking" }}
          >
            {isSpanish ? "Programar servicio" : "Schedule Service"}
          </Button>

          {/* Mobile menu trigger + drawer */}
          <MobileMenu variant={variant} />
        </div>
      </Container>
    </header>
  );
}
