import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { ItemModal } from "@/components/menu/ItemModal";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Taste the Passion`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: ["pizza", "pickup", "wood-fired pizza", "artisan pizza", "order pizza online", "pizza Toronto"],
  authors: [{ name: SITE_NAME }],
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Taste the Passion`,
    description: SITE_DESCRIPTION,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: `${SITE_NAME} — Wood-fired pizza` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Taste the Passion`,
    description: SITE_DESCRIPTION,
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Restaurant", "LocalBusiness"],
  name: "Appetite Pizza",
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  servesCuisine: ["Pizza", "Italian"],
  priceRange: "$$",
  currenciesAccepted: "CAD",
  paymentAccepted: "Cash, Credit Card, Debit Card",
  hasMenu: `${SITE_URL}/menu`,
  acceptsReservations: false,
  telephone: "+1-416-555-0100",
  address: {
    "@type": "PostalAddress",
    streetAddress: "123 Queen Street West",
    addressLocality: "Toronto",
    addressRegion: "ON",
    postalCode: "M5H 2M9",
    addressCountry: "CA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 43.6502,
    longitude: -79.3833,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "11:00",
      closes: "22:00",
    },
  ],
  image: `${SITE_URL}/og-image.jpg`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {/* Skip to main content — first focusable element */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-brand focus:text-cream focus:font-semibold focus:px-4 focus:py-2 focus:rounded-lg focus:outline-none focus:shadow-lg"
        >
          Skip to main content
        </a>

        <CartProvider>
          <Navbar />
          <main id="main-content" tabIndex={-1} className="flex flex-col min-h-screen outline-none">
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <ItemModal />
          {/* Global ARIA live region for screen-reader announcements */}
          <div
            id="live-announcer"
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="sr-only"
          />
        </CartProvider>
      </body>
    </html>
  );
}
