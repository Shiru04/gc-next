import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SERVICES } from "@/lib/services";

export default function ServicesPage() {
  return (
    <>
      <Section className="pt-10 sm:pt-14">
        <div className="max-w-3xl">
          <div className="text-sm font-extrabold tracking-wide text-black/60">
            WHAT WE DO
          </div>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Our Services
          </h1>
          <p className="mt-4 text-lg text-black/70">
            We provide a wide variety of residential and commercial HVAC
            services across Los Angeles and Orange County. Choose a service
            below to learn more.
          </p>
        </div>
      </Section>

      <Section className="bg-brand-gray">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <Card key={s.slug} className="p-6">
              <div className="text-xl font-extrabold">{s.name}</div>
              <p className="mt-2 text-black/70">{s.short}</p>
              <div className="mt-5">
                <Button
                  href={`/services/${s.slug}`}
                  variant="primary"
                  size="md"
                >
                  Read more
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
