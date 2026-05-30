import Link from "next/link";
import {
  BUSINESS,
  NAV,
  RESIDENTIAL_SERVICE_LINKS,
  COMMERCIAL_SERVICE_LINKS,
} from "@/lib/constants";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="text-lg font-extrabold">{BUSINESS.name}</div>
            <div className="mt-3 text-sm text-black/70">
              <div>{BUSINESS.addressLine1}</div>
              <div>{BUSINESS.cityStateZip}</div>
              <div className="mt-2 font-semibold">{BUSINESS.phoneDisplay}</div>
              <div className="mt-2">{BUSINESS.hoursShort}</div>
              <div className="mt-3 text-black/60">
                {BUSINESS.trustLine} | {BUSINESS.licenseLabel}
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm font-bold uppercase tracking-wide text-black/60">
              Site Menu
            </div>
            <ul className="mt-4 space-y-2 text-sm font-semibold">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-black/80 hover:text-black"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-sm font-bold uppercase tracking-wide text-black/60">
              Residential
            </div>
            <ul className="mt-4 space-y-2 text-sm font-semibold">
              {RESIDENTIAL_SERVICE_LINKS.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-black/80 hover:text-black"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/residential"
                  className="text-brand-red hover:opacity-80"
                >
                  View all residential →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-bold uppercase tracking-wide text-black/60">
              Commercial
            </div>
            <ul className="mt-4 space-y-2 text-sm font-semibold">
              {COMMERCIAL_SERVICE_LINKS.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-black/80 hover:text-black"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/commercial"
                  className="text-brand-red hover:opacity-80"
                >
                  View all commercial →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 text-xs text-black/65 sm:flex-row sm:items-center sm:justify-between">
          <div>
            © {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
          </div>
          <Link
            href="/privacy-policy"
            className="font-semibold text-black/70 hover:text-black"
          >
            Privacy Policy
          </Link>
        </div>
      </Container>
    </footer>
  );
}
