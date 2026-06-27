export type Testimonial = {
  id: number;
  quote: string;
  name: string;
  location: string;
  rating: number;
  item?: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote:
      "Honestly the best pizza I've had outside of Italy. The crust alone is worth the drive — crispy, chewy, and somehow perfect every single time.",
    name: "Sarah M.",
    location: "Toronto, ON",
    rating: 5,
    item: "Margherita",
  },
  {
    id: 2,
    quote:
      "Ordered pickup three times this week. Zero shame about it. The BBQ Chicken pizza is genuinely one of the best things I've eaten in this city.",
    name: "James K.",
    location: "Mississauga, ON",
    rating: 5,
    item: "BBQ Chicken",
  },
  {
    id: 3,
    quote:
      "Fast, fresh, and way better than anything from a delivery app. No fees, no soggy crust. Just great pizza handed to you in 15 minutes. Worth every penny.",
    name: "Priya T.",
    location: "Brampton, ON",
    rating: 5,
    item: "Prosciutto & Arugula",
  },
];

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  initials: string;
  gradient: string;
};

export const TEAM: TeamMember[] = [
  {
    name: "Marco B.",
    role: "Head Pizza Chef",
    bio: "Trained in Naples. 12 years of stone-oven craft. If it leaves his kitchen, it's perfect.",
    initials: "MB",
    gradient: "radial-gradient(ellipse at 40% 40%, #C13A1B44 0%, #1A0A00 100%)",
  },
  {
    name: "Sarah L.",
    role: "Kitchen Manager",
    bio: "Keeps everything running — from fresh dough to the last cannoli out the door, nothing slips.",
    initials: "SL",
    gradient: "radial-gradient(ellipse at 40% 40%, #D4A82044 0%, #1A1400 100%)",
  },
  {
    name: "Jake M.",
    role: "Customer Experience",
    bio: "The reason you leave smiling. He cares more about your order than you do — and that's saying something.",
    initials: "JM",
    gradient: "radial-gradient(ellipse at 40% 40%, #79706A44 0%, #111111 100%)",
  },
];
