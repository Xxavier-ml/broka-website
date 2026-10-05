import type { Metadata, Viewport } from "next";
import { Montserrat, Noto_Serif, Inter } from "next/font/google";
import "./globals.css";
import "./marketplace.css";
import "./site.css";
import "./home.css";
import "./redesign.css";
import "./category-cards.css";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://www.broka.co.ke"),
  title: { default: "BROKA — The Future of Intelligent Commerce", template: "%s | BROKA" },
  description: "Welcome to BROKA — the future of intelligent commerce. Discover, understand and negotiate better deals with AI-powered tools built in Kenya.",
  keywords: ["BROKA","intelligent commerce","AI","marketplace","Kenya","East Africa","Zeno","negotiation"],
  authors: [{ name: "BROKA" }],
  openGraph: {
    title: "BROKA — The Future of Intelligent Commerce",
    description: "Welcome to BROKA — intelligent discovery, fairer negotiation and trusted commerce, built in Kenya.",
    url: "https://www.broka.co.ke/",
    siteName: "BROKA",
    type: "website",
    locale: "en_KE",
  },
  twitter: { card: "summary_large_image", title: "BROKA — The Future of Intelligent Commerce", description: "Welcome to BROKA — intelligent commerce, built in Kenya." },
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
    "BROKA is an intelligent commerce platform connecting buyers and sellers in Kenya, with AI-assisted negotiation and escrow-protected payments.",
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
  sameAs: [SOCIAL.x, SOCIAL.linkedin],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${serif.variable} ${inter.variable}`}>
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
