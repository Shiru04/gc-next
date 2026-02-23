import { cn } from "@/lib/utils";

export function Card(props: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-black/10 bg-white shadow-soft",
        props.className,
      )}
    >
      {props.children}
    </div>
  );
}
