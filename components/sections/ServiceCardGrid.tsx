import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import type { Service } from "@/lib/services";
import { ServiceIcon, iconFromService } from "./ServiceIcon";

export function ServiceCardGrid({
  services,
  basePath,
}: {
  services: Service[];
  basePath: "residential" | "commercial";
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {services.map((s) => {
        const icon = iconFromService(s);
        return (
          <Card
            key={s.slug}
            className="group overflow-hidden rounded-3xl p-0 shadow-soft ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="relative flex h-28 items-center justify-center bg-brand-red">
              <div className="text-white/95 transition group-hover:scale-[1.03]">
                <ServiceIcon name={icon} />
              </div>
              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/10" />
            </div>

            <div className="bg-white px-6 pb-6 pt-5">
              <div className="text-lg font-extrabold">{s.name}</div>
              <p className="mt-2 min-h-[44px] text-sm text-black/70">{s.short}</p>
              <div className="mt-5">
                <Button
                  href={`/${basePath}/${s.slug}`}
                  variant="primary"
                  size="md"
                >
                  Read more
                </Button>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
