import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";

const syne = Syne({ subsets: ["latin"], weight: ["400","600","700","800"], variable: "--font-syne", display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["300","400","500","600"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.broka.co.ke"),
  title: { default: "BROKA — The Intelligence Layer for Commerce", template: "%s | BROKA" },
  description: "BROKA is building an intelligent commerce platform that connects buyers and sellers — with AI-powered discovery, negotiation and trust built in. Built in Kenya.",
  keywords: ["BROKA","intelligent commerce","AI","marketplace","Kenya","East Africa","Zeno","negotiation"],
  authors: [{ name: "BROKA" }],
  openGraph: {
    title: "BROKA — The Intelligence Layer for Commerce",
    description: "Commerce, intelligently connected. BROKA is building AI-native commerce infrastructure for East Africa and beyond.",
    url: "https://www.broka.co.ke/",
    siteName: "BROKA",
    type: "website",
    locale: "en_KE",
  },
  twitter: { card: "summary_large_image", title: "BROKA — The Intelligence Layer for Commerce", description: "Commerce, intelligently connected. Built in Kenya." },
  alternates: { canonical: "https://www.broka.co.ke/" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable}`}>
      <body>
        <SmoothScroll />
        <div className="grain" aria-hidden="true" />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
