export type NavLink = {
  label: string;
  href: string;
};

export type FooterLinks = {
  explore: NavLink[];
  order: NavLink[];
  legal: NavLink[];
};

export type DeliveryPartner = {
  name: string;
  href: string;
  logo: string;
};

export type Feature = {
  icon: string;
  title: string;
  description: string;
};

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";
export type BadgeVariant = "brand" | "gold" | "muted" | "outline";
