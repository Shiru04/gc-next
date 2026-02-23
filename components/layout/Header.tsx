import Link from "next/link";
import { BUSINESS, NAV } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Header(props: { variant?: "default" | "landing" }) {
  const variant = props.variant ?? "default";

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-3">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label={`${BUSINESS.name} Home`}
        >
          <div
            className="h-10 w-10 rounded-xl bg-brand-red"
            aria-hidden="true"
          />
          <div className="leading-tight">
            <div className="text-sm font-extrabold text-brand-black">
              {BUSINESS.name}
            </div>
            <div className="text-xs text-black/60">
              {BUSINESS.serviceRegionShort}
            </div>
          </div>
        </Link>

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
        </div>
      </Container>
    </header>
  );
}
