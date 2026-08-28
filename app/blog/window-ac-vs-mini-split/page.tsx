import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo";
import { INSTALLATION_CONSULTATION_CTA, INSTALLATION_CONSULTATION_HREF } from "@/lib/consultation";
export const metadata = buildMetadata({
  title:
    "Window AC vs. Mini-Split: Which Is More Efficient in Southern California?",
  description:
    "Compare window AC and mini-split costs, efficiency, noise, comfort, heating and maintenance for Southern California homes.",
  path: "/blog/window-ac-vs-mini-split",
});
const sections = [
  [
    "Upfront cost",
    "A window unit usually costs less to buy and can be practical for occasional cooling in one small room. A mini-split requires professional design and installation, so its initial cost is higher, but it can serve one or several zones as a permanent comfort system.",
  ],
  [
    "Daily energy use and inverter technology",
    "A properly sized mini-split is generally the more efficient long-term choice for regular daily cooling, while a window unit may still make sense for occasional use in one small room. Many mini-splits use inverter-driven compressors that adjust output instead of repeatedly switching fully on and off.",
  ],
  [
    "Air leakage, noise and comfort",
    "A window installation can leave gaps around the cabinet, allowing hot air, outdoor noise and dust to enter when sealing is imperfect. Mini-splits keep the window closed, place the compressor outdoors and usually maintain steadier temperatures at lower indoor noise levels.",
  ],
  [
    "Zoned cooling and heating",
    "Multi-zone mini-splits can condition selected rooms independently, avoiding the need to cool unused spaces. Heat-pump mini-splits also provide efficient heating, which is useful during Southern California’s mild winters. Most basic window cooling units do not replace a heating system.",
  ],
  [
    "Life span and maintenance",
    "Window units are simpler and often treated as replaceable appliances. Mini-splits are long-term equipment: filters need cleaning, outdoor coils need clear airflow and periodic professional maintenance helps protect performance and service life.",
  ],
  [
    "When each option makes sense",
    "A window unit can be reasonable for a renter with permission, a tight initial budget or infrequent cooling of one small room. A mini-split is usually the stronger fit for homeowners seeking daily efficiency, quieter operation, zoned comfort, heating capability and a durable installation.",
  ],
] as const;
export default function ArticlePage() {
  return (
    <>
      <Section className="pt-10 sm:pt-14">
        <article className="mx-auto max-w-3xl">
          <p className="font-bold uppercase tracking-wide text-brand-red">
            HVAC comparison
          </p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Window AC vs. Mini-Split: Which Is More Efficient in Southern
            California?
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-black/70">
            Both can cool a room, but they solve different problems. GC Heating
            &amp; Cooling installs mini-split and whole-home HVAC systems; we do
            not sell or install window units.
          </p>
        </article>
      </Section>
      <Section>
        <article className="mx-auto max-w-3xl">
          {sections.map(([heading, body]) => (
            <section key={heading} className="mt-10 first:mt-0">
              <h2 className="text-2xl font-extrabold">{heading}</h2>
              <p className="mt-3 leading-relaxed text-black/75">{body}</p>
            </section>
          ))}
        </article>
      </Section>
      <Section className="bg-brand-gray">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-7">
          <h2 className="text-2xl font-extrabold">
            Find the right system for your home
          </h2>
          <p className="mt-3 text-black/70">
            Get professional sizing plus a free HVAC installation consultation and estimate for
            a mini-split, central AC or heat pump.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              className="rounded-xl bg-brand-red px-5 py-3 font-bold text-white"
              href={INSTALLATION_CONSULTATION_HREF}
            >
              {INSTALLATION_CONSULTATION_CTA}
            </Link>
            <Link
              className="rounded-xl border border-black/20 px-5 py-3 font-bold"
              href="/financing/"
            >
              Financing options
            </Link>
            <Link
              className="rounded-xl border border-black/20 px-5 py-3 font-bold"
              href="/contact/"
            >
              Contact GC
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
