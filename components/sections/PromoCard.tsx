import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

type Props = {
  image?: string;
  imageAlt?: string;
  kicker?: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  highlight?: string;
};

export function PromoCard({
  image,
  imageAlt = "",
  kicker,
  title,
  description,
  ctaLabel,
  ctaHref,
  highlight,
}: Props) {
  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-shadow">
      {/* Image area */}
      {image ? (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          {highlight ? (
            <div className="absolute top-4 left-4 rounded-full bg-brand-red px-3 py-1 text-xs font-bold text-white shadow-sm">
              {highlight}
            </div>
          ) : null}
        </div>
      ) : (
        <div className="relative h-48 bg-gradient-to-br from-brand-red/10 to-brand-red/5 flex items-center justify-center">
          <div className="text-4xl font-extrabold text-brand-red/20">PROMO</div>
          {highlight ? (
            <div className="absolute top-4 left-4 rounded-full bg-brand-red px-3 py-1 text-xs font-bold text-white shadow-sm">
              {highlight}
            </div>
          ) : null}
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {kicker ? (
          <div className="text-xs font-bold uppercase tracking-wide text-brand-red">
            {kicker}
          </div>
        ) : null}
        <h3 className="mt-1 text-xl font-extrabold">{title}</h3>
        <p className="mt-2 text-sm text-black/70 leading-relaxed">
          {description}
        </p>
        <div className="mt-5">
          <Button href={ctaHref} variant="primary" size="md">
            {ctaLabel}
          </Button>
        </div>
      </div>
    </Card>
  );
}
