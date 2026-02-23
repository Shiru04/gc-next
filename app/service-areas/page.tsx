import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SERVICE_AREAS } from "@/lib/areas";

export default function ServiceAreasPage() {
  const la = SERVICE_AREAS.filter((a) => a.county === "Los Angeles County");
  const oc = SERVICE_AREAS.filter((a) => a.county === "Orange County");

  return (
    <>
      <Section className="pt-10 sm:pt-14">
        <div className="max-w-3xl">
          <div className="text-sm font-extrabold tracking-wide text-black/60">
            SERVICE AREA
          </div>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Los Angeles & Orange County
          </h1>
          <p className="mt-4 text-lg text-black/70">
            We provide heating and air conditioning services for residential and
            commercial properties across LA & OC. Choose your city below to
            learn more.
          </p>
        </div>
      </Section>

      <Section className="bg-brand-gray">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-extrabold">Orange County</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {oc.map((a) => (
                <Card key={a.slug} className="p-5">
                  <div className="font-extrabold">{a.name}</div>
                  <div className="mt-2">
                    <Button
                      href={`/service-areas/${a.slug}`}
                      variant="secondary"
                      size="sm"
                    >
                      View details
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-extrabold">Los Angeles County</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {la.map((a) => (
                <Card key={a.slug} className="p-5">
                  <div className="font-extrabold">{a.name}</div>
                  <div className="mt-2">
                    <Button
                      href={`/service-areas/${a.slug}`}
                      variant="secondary"
                      size="sm"
                    >
                      View details
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
