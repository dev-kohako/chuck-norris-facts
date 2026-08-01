import { cn } from "@/lib/utils";

/**
 * A bordered span rather than a lucide icon: the e2e suite asserts that the
 * decorative element carries `animate-spin`, and jQuery's `hasClass` is
 * unreliable against an SVG's `className`.
 */
export const Spinner = ({ className }: { className?: string }) => (
  <span
    className={cn(
      "border-muted-foreground/30 border-t-primary inline-block size-4 shrink-0 animate-spin rounded-full border-2",
      className
    )}
    aria-hidden="true"
  />
);
