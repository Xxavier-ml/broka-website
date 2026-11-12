import Link from "next/link";
import { Download, Search, Store } from "lucide-react";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeMarquee } from "@/components/home/HomeMarquee";
import { HomeCategories } from "@/components/home/HomeCategories";
import { HomeSteps } from "@/components/home/HomeSteps";
import { HomeZeno } from "@/components/home/HomeZeno";
import { HomeSellers } from "@/components/home/HomeSellers";
import { HomeApp } from "@/components/home/HomeApp";
import { HomeTrust } from "@/components/home/HomeTrust";
import { HomeFaq } from "@/components/home/HomeFaq";
import { HomeFinale } from "@/components/home/HomeFinale";

/**
 * The homepage in one order: the visitor searches (hero) and sees what the app
 * does with a request (the product stage), finds their category (rails and
 * grid), understands the journey (three steps), meets the assistant (Zeno),
 * sees both sides of the market (sellers, app), has their doubts answered
 * (trust, questions), and only then meets the closing call to action. The
 * dock keeps browse, sell and the app one thumb away on phones.
 */
export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeMarquee />
      <HomeCategories />
      <HomeSteps />
      <HomeZeno />
      <HomeSellers />
      <HomeApp />
      <HomeTrust />
      <HomeFaq />
      <HomeFinale />
      <nav className="hp-dock" aria-label="Quick actions">
        <Link href="/browse" className="hp-dock-browse"><Search size={17} aria-hidden="true" /> Browse marketplace</Link>
        <Link href="/sell" className="hp-dock-sell"><Store size={16} aria-hidden="true" /> Sell</Link>
        <Link href="/download" className="hp-dock-app" aria-label="Get the BROKA app"><Download size={18} aria-hidden="true" /></Link>
      </nav>
    </>
  );
}
