import Link from "next/link";
import { cn } from "@/lib/utils";
import { ctaAttrs, type CtaMeta } from "@/lib/cta";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-red text-white shadow-soft hover:brightness-110 transition-all",
  secondary:
    "bg-white text-brand-black border border-black/10 hover:bg-brand-gray",
  ghost: "bg-transparent text-brand-black hover:bg-black/5",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

export function Button(props: {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  target?: "_blank";
  rel?: string;
  ariaLabel?: string;
  /**
   * Instrumentación explícita del CTA. Si se omite, el listener delegado de
   * ConversionTracking igual infiere tipo y ubicación desde el href y el DOM.
   */
  cta?: CtaMeta;
}) {
  const className = cn(
    base,
    variants[props.variant ?? "primary"],
    sizes[props.size ?? "md"],
    props.className,
  );

  const tracking = props.cta ? ctaAttrs(props.cta) : undefined;

  if (props.href) {
    const isExternal =
      props.href.startsWith("http") ||
      props.href.startsWith("tel:") ||
      props.href.startsWith("mailto:");
    return (
      <Link
        href={props.href}
        className={className}
        target={props.target ?? (isExternal ? "_blank" : undefined)}
        rel={props.rel ?? (isExternal ? "noreferrer" : undefined)}
        aria-label={props.ariaLabel}
        {...tracking}
      >
        {props.children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={props.onClick}
      className={className}
      aria-label={props.ariaLabel}
      {...tracking}
    >
      {props.children}
    </button>
  );
}
