import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";

type Props = {
  eyebrow?: string;
  title: string;
  description: string;
  media: { src: string; alt: string };
  reversed?: boolean;
  children?: React.ReactNode;
};

export function SectionBlock({
  eyebrow,
  title,
  description,
  media,
  reversed = false,
  children,
}: Props) {
  return (
    <section className="py-14 sm:py-16">
      <Container>
        <div
          className={cn(
            "grid gap-10 lg:grid-cols-2 lg:items-center",
            reversed && "lg:[&>*:first-child]:order-2",
          )}
        >
          {/* Text */}
          <div>
            {eyebrow ? (
              <div className="text-sm font-extrabold tracking-wide text-black/60">
                {eyebrow}
              </div>
            ) : null}
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 max-w-xl text-black/70 leading-relaxed">
              {description}
            </p>
            {children ? <div className="mt-6">{children}</div> : null}
          </div>

          {/* Image */}
          <div className="relative overflow-hidden rounded-3xl border border-black/10 shadow-sm min-h-[320px] sm:min-h-[380px]">
            <ResponsiveImage
              srcBase={media.src.replace(".webp", "")}
              alt={media.alt}
              fill
              widths={[420, 640, 768, 960]}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
