import { cn } from "@/lib/utils";

export function Container(
  props: React.PropsWithChildren<{ className?: string }>,
) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8",
        props.className,
      )}
    >
      {props.children}
    </div>
  );
}
