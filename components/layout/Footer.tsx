import Link from "next/link";
import { BUSINESS, NAV, SERVICE_LINKS } from "@/lib/constants";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-3">
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
              Services
            </div>
            <ul className="mt-4 space-y-2 text-sm font-semibold">
              {SERVICE_LINKS.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-black/80 hover:text-black"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 text-xs text-black/50">
          © {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
