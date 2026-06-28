import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import type { BadgeVariant } from "@/types";

type SectionHeaderProps = {
  eyebrow?: string;
  eyebrowVariant?: BadgeVariant;
  title: React.ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  subtitleClassName?: string;
};

export function SectionHeader({
  eyebrow,
  eyebrowVariant = "muted",
  title,
  subtitle,
  align = "left",
  className,
  subtitleClassName,
}: SectionHeaderProps) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      {eyebrow && (
        <div className={cn("mb-5", align === "center" ? "flex justify-center" : "flex items-center gap-3")}>
          {align === "left" && (
            <div className="w-6 h-px bg-brand/50 flex-shrink-0" aria-hidden />
          )}
          <Badge variant={eyebrowVariant}>{eyebrow}</Badge>
        </div>
      )}
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream leading-[1.05] tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-5 text-stone text-lg leading-relaxed",
            align === "center" && "mx-auto max-w-2xl",
            subtitleClassName
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
