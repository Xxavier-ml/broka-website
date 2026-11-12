import Link from "next/link";
import { ArrowUpRight, Download, Search, Store } from "lucide-react";
import { Magnetic } from "@/components/ui/Magnetic";
import { BrandMotion } from "./BrandMotion";

/**
 * The closing call to action, after the doubts have been answered: the BROKA
 * mark rising over a horizon of light, and the three ways forward.
 */
export function HomeFinale() {
  return (
    <section className="sec hp-final" aria-labelledby="cta-h">
      <div className="hp-final-sky" aria-hidden="true">
        <span className="hp-final-horizon" />
        <span className="hp-final-rays" />
      </div>
      <div className="wrap hp-final-inner hp-reveal">
        <div className="hp-final-mark">
          <span className="hp-final-rings" aria-hidden="true"><i /><i /><i /></span>
          <BrandMotion />
        </div>
        <span className="hp-eyebrow hp-eyebrow-center">Your next move starts here</span>
        <h2 className="hp-final-title" id="cta-h">
          Make your next deal <em>a clearer one.</em>
        </h2>
        <p className="hp-final-sub">
          Explore what&apos;s on the marketplace, or bring your own listing to BROKA. You choose what happens next.
        </p>
        <div className="hp-final-actions" role="group" aria-label="Choose how to get started">
          <Magnetic>
            <Link href="/browse" className="btn btn-primary btn-lg hp-beam">
              <Search size={18} aria-hidden="true" /> Explore the marketplace <ArrowUpRight size={17} aria-hidden="true" className="btn-arrow" />
            </Link>
          </Magnetic>
          <Magnetic>
            <Link href="/download" className="btn btn-ghost btn-lg">
              <Download size={17} aria-hidden="true" /> Get the app
            </Link>
          </Magnetic>
          <Magnetic>
            <Link href="/sell" className="btn btn-ghost btn-lg">
              <Store size={17} aria-hidden="true" /> Create a listing
            </Link>
          </Magnetic>
        </div>
        <Link href="/faq" className="hp-textlink hp-final-faq">
          Questions about BROKA? Read the FAQ <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
