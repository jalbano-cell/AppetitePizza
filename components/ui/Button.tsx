import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ButtonVariant, ButtonSize } from "@/types";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-brand hover:bg-flame text-cream font-semibold shadow-lg shadow-brand/20 hover:shadow-flame/25",
  secondary:
    "border border-cream/20 hover:border-cream/50 text-cream hover:bg-cream/5",
  ghost: "text-stone hover:text-cream",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-3 text-sm rounded-xl",
  lg: "px-8 py-4 text-base rounded-xl",
};

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  external?: boolean;
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  className,
  children,
  onClick,
  disabled,
  type = "button",
  external,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer select-none font-medium tracking-wide",
    variantStyles[variant],
    sizeStyles[size],
    disabled && "opacity-40 cursor-not-allowed pointer-events-none",
    className
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
