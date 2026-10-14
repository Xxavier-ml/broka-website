import Link from "next/link";
import { Magnetic } from "@/components/ui/Magnetic";
import { FlowMesh } from "@/components/visuals/FlowMesh";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeDiscovery } from "@/components/home/HomeDiscovery";
import { BrandMotion } from "@/components/home/BrandMotion";
import { CommerceNarrative } from "@/components/home/CommerceNarrative";
import { ArrowUpRight, Search, Store } from "lucide-react";

/**
 * The home page introduces BROKA, points visitors toward marketplace discovery,
 * and then explains the platform's approach to trust and commerce.
 */
export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeDiscovery />
      <CommerceNarrative />

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
                <Link href="/sell" className="btn btn-ghost"><Store size={17} aria-hidden="true" /> Create a listing <ArrowUpRight size={16} aria-hidden="true" /></Link>
              </Magnetic>
              <Link href="/faq" className="home-conversion-faq">Questions about BROKA? Read the FAQ <ArrowUpRight size={14} aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
