import type { Metadata, Viewport } from "next";
import { Montserrat, Noto_Serif, Inter, Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";
import "./marketplace.css";
import "./site.css";
import "./home.css";
import "./redesign.css";
import "./category-cards.css";
import "./category-directory.css";
import "./electronics-subcategories.css";
import "./premium.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { VideoBackground } from "@/components/background/VideoBackground";
import { JsonLd } from "@/components/ui/JsonLd";
import { CONTACT, SITE_URL, SOCIAL } from "@/lib/site";

// Type pairing from the BROKA mockup: a bold geometric sans for headlines,
// prices and numbers; a readable serif for everything else. Inter stays for
// dense UI (inputs, badges, tabs) where a serif gets fussy at small sizes.
const display = Montserrat({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-montserrat", display: "swap" });
const serif = Noto_Serif({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-noto-serif", display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-inter", display: "swap" });
// The UI UX Pro Max "Tech Startup" pairing, applied by app/premium.css to the
// homepage and marketing surfaces only: the marketplace keeps the brand faces.
const futureDisplay = Space_Grotesk({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-space-grotesk", display: "swap" });
const futureBody = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-dm-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.broka.co.ke"),
  title: { default: "BROKA — The Future of Intelligent Commerce", template: "%s | BROKA" },
  description: "Discover marketplace products and stores in Kenya, compare seller context, and use Zeno for clearer decisions.",
  keywords: ["BROKA","intelligent commerce","AI","marketplace","Kenya","East Africa","Zeno","seller context"],
  authors: [{ name: "BROKA" }],
  openGraph: {
    title: "BROKA — The Future of Intelligent Commerce",
    description: "BROKA helps people discover marketplace listings, compare seller context and connect directly with sellers in Kenya.",
    url: "https://www.broka.co.ke/",
    siteName: "BROKA",
    type: "website",
    locale: "en_KE",
  },
  twitter: { card: "summary_large_image", title: "BROKA — The Future of Intelligent Commerce", description: "Discover listings, compare seller context and connect directly with sellers in Kenya." },
  // "./" resolves to each page's own address. A fixed home-page URL here was inherited by
  // every page, telling search engines that all of them are duplicates of the home page.
  alternates: { canonical: "./" },
  robots: { index: true, follow: true },
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
    <html lang="en" className={`${display.variable} ${serif.variable} ${inter.variable} ${futureDisplay.variable} ${futureBody.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SmoothScroll />
        <VideoBackground />
        <JsonLd data={organization} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
