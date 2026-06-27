import { MapPin, Phone, Clock, Mail } from "lucide-react";

const INFO = [
  {
    icon: MapPin,
    label: "Location",
    value: "123 Main Street",
    sub: "Your City, ON  A1B 2C3",
    href: "https://maps.google.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "(555) 000-0000",
    sub: "Call to place an order",
    href: "tel:5550000000",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon – Sun",
    sub: "11:00 AM – 10:00 PM",
    href: null,
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@appetitepizza.ca",
    sub: "We reply within 24 hours",
    href: "mailto:hello@appetitepizza.ca",
  },
];

export function ContactInfo() {
  return (
    <div className="space-y-4">
      {INFO.map(({ icon: Icon, label, value, sub, href }) => {
        const inner = (
          <div className="flex items-start gap-4 p-5 rounded-xl border border-white/5 bg-charcoal hover:border-white/10 transition-colors group">
            <div className="w-10 h-10 rounded-xl bg-black/40 border border-white/8 flex items-center justify-center flex-shrink-0 group-hover:border-brand/20 transition-colors">
              <Icon size={16} className="text-brand" />
            </div>
            <div className="min-w-0">
              <p className="text-muted text-[10px] uppercase tracking-widest mb-1">{label}</p>
              <p className="text-cream font-medium text-sm">{value}</p>
              <p className="text-stone text-xs mt-0.5">{sub}</p>
            </div>
          </div>
        );

        return href ? (
          <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
            {inner}
          </a>
        ) : (
          <div key={label}>{inner}</div>
        );
      })}
    </div>
  );
}
