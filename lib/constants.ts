import type { NavLink, FooterLinks, DeliveryPartner, Feature } from "@/types";

export const SITE_NAME = "Appetite Pizza";
export const SITE_TAGLINE = "Pizza Worth Ordering Twice.";
export const SITE_DESCRIPTION =
  "Fresh dough, real ingredients, wood-fired in minutes. Skip the delivery fees — order pickup directly from Appetite.";
export const SITE_URL = "https://appetitepizza.ca";

export const NAV_LINKS: NavLink[] = [
  { label: "Menu", href: "/menu" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_LINKS: FooterLinks = {
  explore: [
    { label: "Menu", href: "/menu" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  order: [
    { label: "Order Pickup", href: "/order" },
    { label: "Uber Eats", href: "#" },
    { label: "DoorDash", href: "#" },
    { label: "SkipTheDishes", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export const DELIVERY_PARTNERS: DeliveryPartner[] = [
  { name: "Uber Eats", href: "#", logo: "UE" },
  { name: "DoorDash", href: "#", logo: "DD" },
  { name: "SkipTheDishes", href: "#", logo: "SD" },
];

export const FEATURES: Feature[] = [
  {
    icon: "🔥",
    title: "Wood-Fired Quality",
    description: "Stone oven. Every single order.",
  },
  {
    icon: "⚡",
    title: "Ready in 15 Minutes",
    description: "Pickup orders done fast, never rushed.",
  },
  {
    icon: "🌿",
    title: "Never Frozen",
    description: "Fresh dough and ingredients made daily.",
  },
];
