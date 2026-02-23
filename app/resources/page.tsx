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
          <div className="text-sm font-extrabold tracking-wide text-black/60">
            RESOURCES
          </div>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Helpful HVAC guides
          </h1>
          <p className="mt-4 text-lg text-black/70">
            Simple, practical content focused on comfort, efficiency, and common
            HVAC questions in LA & OC.
          </p>
        </div>
      </Section>

      <Section className="bg-brand-gray">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((p) => (
            <Card key={p.slug} className="p-6">
              <div className="text-xs font-bold text-black/50">{p.date}</div>
              <div className="mt-2 text-xl font-extrabold">{p.title}</div>
              <p className="mt-2 text-black/70">{p.description}</p>
              <div className="mt-5">
                <Button
                  href={`/resources/${p.slug}`}
                  variant="secondary"
                  size="md"
                >
                  Read
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
