import { cn } from "@/lib/utils";
import type { BadgeVariant } from "@/types";

const variantStyles: Record<BadgeVariant, string> = {
  brand: "bg-brand/10 text-brand border-brand/20",
  gold: "bg-gold/10 text-gold border-gold/20",
  muted: "bg-white/5 text-stone border-white/10",
  outline: "border-cream/20 text-cream/70",
};

export function Badge({
  children,
  variant = "muted",
  className,
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border tracking-wide",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
