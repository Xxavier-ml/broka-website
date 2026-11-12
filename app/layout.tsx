import type { Metadata, Viewport } from "next";
import { Montserrat, Inter, Space_Grotesk, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "./marketplace.css";
import "./site.css";
import "./home.css";
import "./redesign.css";
import "./category-cards.css";
import "./category-directory.css";
import "./electronics-subcategories.css";
import "./experience.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { VideoBackground } from "@/components/background/VideoBackground";
import { JsonLd } from "@/components/ui/JsonLd";
import { Spotlight } from "@/components/ui/Spotlight";
import { CONTACT, SITE_URL, SOCIAL } from "@/lib/site";

// One type system for the whole site (app/experience.css sets the tokens):
// Space Grotesk for headlines, prices and numbers, DM Sans for reading text,
// Inter for dense UI (inputs, badges, tabs). Montserrat is kept only for the
// BROKA wordmark, which is drawn in it.
const display = Montserrat({ subsets: ["latin"], weight: ["700", "800"], variable: "--font-montserrat", display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-inter", display: "swap" });
const futureDisplay = Space_Grotesk({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-space-grotesk", display: "swap" });
const futureBody = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-dm-sans", display: "swap" });
// Instrument labels (indexes, coordinates, status tags) in app/experience.css
// and app/home.css. Small and never the largest text on screen, so it is not
// preloaded: it must not compete with the headline fonts for the first paint.
const futureMono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jetbrains-mono", display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "BROKA — The Future of Intelligent Commerce", template: "%s | BROKA" },
  description: "Discover marketplace products and stores in Kenya, compare seller context, and use Zeno for clearer decisions.",
  keywords: ["BROKA","intelligent commerce","AI","marketplace","Kenya","East Africa","Zeno","seller context"],
  authors: [{ name: "BROKA" }],
  openGraph: {
    title: "BROKA — The Future of Intelligent Commerce",
    description: "BROKA helps people discover marketplace listings, compare seller context and connect directly with sellers in Kenya.",
    url: SITE_URL,
    siteName: "BROKA",
    type: "website",
    locale: "en_KE",
    images: [{ url: `${SITE_URL}/opengraph-image`, alt: "BROKA — The Future of Intelligent Commerce" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BROKA — The Future of Intelligent Commerce",
    description: "Discover listings, compare seller context and connect directly with sellers in Kenya.",
    images: [`${SITE_URL}/opengraph-image`],
  },
  // "./" resolves to each page's own address. A fixed home-page URL here was inherited by
  // every page, telling search engines that all of them are duplicates of the home page.
  alternates: { canonical: "./" },
};

export const viewport: Viewport = {
  themeColor: "#050507",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

// Who BROKA is and how to reach it, for search engines (and the knowledge
// panel they may build from it). Same details as the Contact page and footer.
const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "BROKA",
  url: SITE_URL,
  logo: `${SITE_URL}/assets/broka-logo.png`,
  description:
    "BROKA helps people in Kenya discover marketplace listings and compare seller context. Buyers and sellers arrange purchases and payments directly; BROKA does not process or hold payments.",
  email: CONTACT.adminEmail,
  telephone: CONTACT.phone,
  address: { "@type": "PostalAddress", addressLocality: CONTACT.city, addressCountry: "KE" },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: CONTACT.adminEmail,
      telephone: CONTACT.phone,
      areaServed: "KE",
      availableLanguage: ["English", "Swahili"],
    },
  ],
  sameAs: [SOCIAL.x, SOCIAL.instagram, SOCIAL.tiktok],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // data-scroll-behavior: globals.css makes html scroll smoothly; this keeps Next.js jumping
    // (not gliding) to the top on navigation once it stops doing so by default (Next 16).
    <html lang="en" data-scroll-behavior="smooth" className={`${display.variable} ${inter.variable} ${futureDisplay.variable} ${futureBody.variable} ${futureMono.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SmoothScroll />
        <Spotlight />
        <VideoBackground />
        <JsonLd data={organization} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
