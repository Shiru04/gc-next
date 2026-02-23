import { cn } from "@/lib/utils";
import { Container } from "./Container";

export function Section(
  props: React.PropsWithChildren<{
    className?: string;
    containerClassName?: string;
  }>,
) {
  return (
    <section className={cn("py-14 sm:py-16", props.className)}>
      <Container className={props.containerClassName}>
        {props.children}
      </Container>
    </section>
  );
}
