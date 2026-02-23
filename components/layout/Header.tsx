import Link from "next/link";
import { BUSINESS, NAV } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { MobileMenu } from "./MobileMenu";

export function Header(props: { variant?: "default" | "landing" }) {
  const variant = props.variant ?? "default";

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
            {NAV.slice(0, 5).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-black/80 hover:text-black"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/promotions"
              className="text-brand-red hover:opacity-80"
            >
              Promotions
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
          <Button
            href={`tel:${BUSINESS.phoneE164}`}
            variant="secondary"
            size="sm"
            ariaLabel={`Call ${BUSINESS.phoneDisplay}`}
          >
            {BUSINESS.phoneDisplay}
          </Button>
          <Button
            href={BUSINESS.bookingUrl}
            variant="primary"
            size="sm"
            ariaLabel="Book now"
          >
            Book Now
          </Button>

          {/* Mobile menu trigger + drawer */}
          <MobileMenu variant={variant} />
        </div>
      </Container>
    </header>
  );
}
