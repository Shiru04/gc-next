import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  media: { src: string; alt: string; priority?: boolean };
  align?: "left" | "center";
  size?: "md" | "lg";
  overlay?: "dark" | "light";
  children?: React.ReactNode; // CTAs, badges, etc.
};

export function PageHero({
  eyebrow,
  title,
  subtitle,
  media,
  align = "left",
  size = "lg",
  overlay = "dark",
  children,
}: Props) {
  const minH = size === "lg" ? "min-h-[520px]" : "min-h-[420px]";
  const textAlign = align === "center" ? "text-center" : "text-left";

  return (
    <section className={cn("relative overflow-hidden", minH)}>
      <ResponsiveImage
        srcBase={media.src.replace(".webp", "")}
        alt={media.alt}
        fill
        priority={!!media.priority}
        widths={[640, 960, 1200, 1600]}
        sizes="100vw"
        className="object-cover"
      />

      {/* Overlay */}
      <div
        className={cn(
          "absolute inset-0",
          overlay === "dark"
            ? "bg-black/55"
            : "bg-white/55 backdrop-blur-[1px]",
        )}
        aria-hidden="true"
      />

      <Container className={cn("relative py-16 sm:py-20", textAlign)}>
        {eyebrow ? (
          <div
            className={cn(
              "text-sm font-extrabold tracking-wide",
              overlay === "dark" ? "text-white/80" : "text-black/70",
            )}
          >
            {eyebrow}
          </div>
        ) : null}

        <h1
          className={cn(
            "mt-3 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl",
            align === "center" ? "mx-auto" : "",
            overlay === "dark" ? "text-white" : "text-black",
          )}
        >
          {title}
        </h1>

        {subtitle ? (
          <p
            className={cn(
              "mt-4 max-w-3xl text-lg",
              align === "center" ? "mx-auto" : "",
              overlay === "dark" ? "text-white/85" : "text-black/70",
            )}
          >
            {subtitle}
          </p>
        ) : null}

        {children ? <div className="mt-7">{children}</div> : null}
      </Container>
    </section>
  );
}
