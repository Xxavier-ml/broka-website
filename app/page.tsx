import Link from "next/link";
import { Magnetic } from "@/components/ui/Magnetic";
import { FlowMesh } from "@/components/visuals/FlowMesh";
import { HomeHero } from "@/components/home/HomeHero";
import { BrandMotion } from "@/components/home/BrandMotion";
import { CommerceNarrative } from "@/components/home/CommerceNarrative";
import { getHomeData } from "@/lib/api/home";

// The auctions, stores and featured listings come from the BROKA API; rebuild
// from fresh data every minute rather than once at deploy time.
export const revalidate = 60;

/**
 * The home page is read as one connected transaction:
 * invitation → live market → discovery → deal flow → trust → seller → proof → CTA.
 * The supporting pages retain the deeper versions of each idea.
 */
export default async function Home() {
  const market = await getHomeData();
  return (
    <>
      <HomeHero data={market} />
      <CommerceNarrative />

      <section className="sec atm-violet-center has-field" aria-labelledby="cta-h">
        <FlowMesh />
        <div className="wrap">
          <div className="final-cta">
            <BrandMotion />
            <span className="t-eyebrow" style={{ textAlign: "center", display: "block" }}>Get involved</span>
            <h2 className="t-h1" id="cta-h" style={{ marginBottom: 20, textAlign: "center" }}>
              Commerce is changing.
            </h2>
            <p style={{ textAlign: "center" }}>
              We&apos;re building what comes next. If you&apos;re a user,
              partner, investor or journalist — we&apos;d like to hear from you.
            </p>
            <div className="final-cta-actions">
              <Magnetic>
                <Link href="/contact" className="btn btn-primary">Get in touch</Link>
              </Magnetic>
              <Magnetic>
                <Link href="/faq" className="btn btn-ghost">Read the FAQ</Link>
              </Magnetic>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
