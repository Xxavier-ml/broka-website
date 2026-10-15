import Link from "next/link";
import { Magnetic } from "@/components/ui/Magnetic";
import { FlowMesh } from "@/components/visuals/FlowMesh";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeCategories } from "@/components/home/HomeCategories";
import { HomeSteps } from "@/components/home/HomeSteps";
import { HomeZeno } from "@/components/home/HomeZeno";
import { HomeSellers } from "@/components/home/HomeSellers";
import { HomeApp } from "@/components/home/HomeApp";
import { HomeTrust } from "@/components/home/HomeTrust";
import { BrandMotion } from "@/components/home/BrandMotion";
import { ArrowUpRight, Download, Search, Store } from "lucide-react";

/**
 * The homepage in one order: the visitor searches (hero), finds their category
 * (grid), understands the journey (three steps), meets the assistant (Zeno),
 * sees both sides of the market (sellers, app), has their doubts answered
 * (trust), and only then meets the closing call to action.
 */
export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeCategories />
      <HomeSteps />
      <HomeZeno />
      <HomeSellers />
      <HomeApp />
      <HomeTrust />
      <section className="sec home-conversion has-field" aria-labelledby="cta-h">
        <FlowMesh />
        <div className="wrap">
          <div className="home-conversion-card">
            <div className="home-conversion-copy">
              <BrandMotion />
              <span className="t-eyebrow">Your next move starts here</span>
              <h2 className="t-h1" id="cta-h">Make your next deal a clearer one.</h2>
              <p>Explore what&apos;s on the marketplace, or bring your own listing to BROKA. You choose what happens next.</p>
            </div>
            <div className="home-conversion-actions" aria-label="Choose how to get started">
              <Magnetic>
                <Link href="/browse" className="btn btn-primary"><Search size={17} aria-hidden="true" /> Explore the marketplace <ArrowUpRight size={16} aria-hidden="true" /></Link>
              </Magnetic>
              <Magnetic>
                <Link href="/download" className="btn btn-ghost"><Download size={17} aria-hidden="true" /> Get the app <ArrowUpRight size={16} aria-hidden="true" /></Link>
              </Magnetic>
              <Magnetic>
                <Link href="/sell" className="btn btn-ghost"><Store size={17} aria-hidden="true" /> Create a listing <ArrowUpRight size={16} aria-hidden="true" /></Link>
              </Magnetic>
              <Link href="/faq" className="home-conversion-faq">Questions about BROKA? Read the FAQ <ArrowUpRight size={14} aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </section>
      <nav className="home-mobile-dock" aria-label="Quick actions">
        <Link href="/browse" className="home-mobile-dock-browse"><Search size={17} aria-hidden="true" /> Browse marketplace</Link>
        <Link href="/sell" className="home-mobile-dock-sell"><Store size={16} aria-hidden="true" /> Sell</Link>
      </nav>
    </>
  );
}
