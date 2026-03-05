import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { POSTS } from "@/lib/posts";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Resources | GC Heating & Cooling",
  description:
    "HVAC tips, guides, and helpful resources for homeowners in Los Angeles & Orange County.",
  path: "/resources",
});

export default function ResourcesPage() {
  return (
    <>
      <Section className="pt-10 sm:pt-14">
        <div className="max-w-3xl">
          <div className="text-sm font-extrabold tracking-wide text-brand-red">
            RESOURCES
          </div>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Helpful HVAC guides
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-black/70">
            Simple, practical content focused on comfort, efficiency, and common
            HVAC questions in LA &amp; OC.
          </p>
        </div>
      </Section>

      {/* Articles grid */}
      <Section className="bg-brand-gray">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((p) => (
            <Card key={p.slug} className="flex flex-col overflow-hidden">
              {/* Placeholder for future article images */}
              <div className="h-2 bg-gradient-to-r from-brand-red to-brand-red/60" />
              <div className="flex flex-1 flex-col p-6">
                <div className="text-xs font-bold text-black/50">{p.date}</div>
                <h2 className="mt-2 text-xl font-extrabold leading-tight">
                  {p.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-black/70">
                  {p.description}
                </p>
                <div className="mt-5">
                  <Button
                    href={`/resources/${p.slug}`}
                    variant="secondary"
                    size="md"
                  >
                    Read article
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* PDF resources placeholder */}
      <Section>
        <div className="text-center">
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            Technical documents &amp; guides
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-black/70">
            Downloadable resources for homeowners — maintenance checklists,
            equipment guides, and seasonal tips.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border-2 border-dashed border-black/10 bg-brand-gray/50 p-10 text-center">
          <div className="text-sm font-semibold text-black/40">
            PDF Resources Coming Soon
          </div>
          <div className="mt-2 text-xs text-black/30">
            Downloadable HVAC guides and maintenance checklists will be available here
          </div>
        </div>
      </Section>
    </>
  );
}
