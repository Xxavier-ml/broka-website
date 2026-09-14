import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { founders } from "@/data/founders";

export const metadata: Metadata = {
  title: "Founders",
  description: "BROKA was founded by Xavier and Arnold Ochieng — two founders who observed the friction and opacity in informal commerce first-hand.",
};

export default function Founders() {
  return (
    <>
      <PageHero
        eyebrow="The founders"
        headline="Two founders. One idea."
        sub="BROKA was built by two people who saw the problem up close and decided to do something about it."
        atmosphere="atm-violet"
      />

      {/* Founder cards */}
      <section className="sec bg-1" aria-labelledby="fnd-h">
        <div className="wrap">
          <h2 className="t-h2" id="fnd-h" style={{ textAlign: "center", marginBottom: 60 }}>Meet the founders.</h2>
          <div className="founders-grid" style={{ maxWidth: 920, margin: "0 auto" }}>
            {founders.map((f) => (
              <article className="founder-card" key={f.id}>
                <div className="founder-avatar" aria-hidden={!f.photo}>
                  {f.photo ? (
                    <Image src={f.photo} alt={`Photo of ${f.name}`} fill style={{ objectFit: "cover" }} />
                  ) : (
                    <span>{f.initials}</span>
                  )}
                </div>
                {!f.photo && <p className="founder-photo-note">Photo coming soon</p>}
                <h3 className="founder-name">{f.name}</h3>
                <p className="founder-role">{f.role}</p>
                <p className="founder-bio">{f.bio}</p>
                {Object.values(f.social).some(Boolean) && (
                  <div className="founder-socials">
                    {f.social.twitter && (
                      <a href={`https://twitter.com/${f.social.twitter}`} target="_blank" rel="noopener noreferrer" className="founder-social-link" aria-label={`${f.name} on X`}>𝕏</a>
                    )}
                    {f.social.linkedin && (
                      <a href={`https://linkedin.com/in/${f.social.linkedin}`} target="_blank" rel="noopener noreferrer" className="founder-social-link" aria-label={`${f.name} on LinkedIn`}>in</a>
                    )}
                    {f.social.github && (
                      <a href={`https://github.com/${f.social.github}`} target="_blank" rel="noopener noreferrer" className="founder-social-link" aria-label={`${f.name} on GitHub`}>gh</a>
                    )}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Founding story */}
      <section className="sec atm-violet-center" aria-labelledby="story-h">
        <div className="wrap">
          <div className="story-block">
            <span className="t-eyebrow" style={{ textAlign: "center", display: "block" }}>Why we started</span>
            <h2 className="t-h2" id="story-h" style={{ textAlign: "center", marginBottom: 40 }}>The observation behind BROKA.</h2>

            <div className="story-pull">
              &ldquo;The friction in informal commerce is easy to see if you know where to look.&rdquo;
            </div>

            <div className="story-body">
              <p>
                Buyers paying more than they should. Sellers earning less than
                they asked for. Intermediaries capturing value without always
                adding it. Information that exists — but does not flow where
                it is needed.
              </p>
              <p>
                Xavier and Arnold saw this pattern in Kenyan markets and asked
                a different question: <strong>what if technology could create
                a more direct connection between the people on each side of a
                deal?</strong>
              </p>
              <p>
                The answer was not to build another listing site. It was to
                build the intelligence layer that makes both sides of a
                transaction better informed — and therefore better off. AI
                sits in the middle, not as a gatekeeper, but as a practical
                assistant for the decisions that actually matter.
              </p>
              <p>
                Kenya is where this starts. The ambition is larger.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="sec bg-2" aria-labelledby="phil-h">
        <div className="wrap">
          <div className="sec-header-center">
            <span className="t-eyebrow">What we believe</span>
            <h2 className="t-h2" id="phil-h">The principles behind BROKA.</h2>
          </div>
          <div className="grid-3" style={{ gap: 20 }}>
            {[
              { title: "Technology should reduce asymmetry, not exploit it.", body: "The dominant model in many markets — capture information, gate it, profit from the gap — is not the model we are building." },
              { title: "AI should serve both sides of a deal.", body: "An intermediary who represents only one side creates a structural problem. Zeno is designed to provide value to buyer and seller alike." },
              { title: "Commerce should be accessible.", body: "Not everyone who needs a better commerce experience is a tech-literate urban professional. The platform should work for the people who actually buy and sell." },
            ].map((p) => (
              <div className="card" key={p.title}>
                <h3 className="t-h4" style={{ marginBottom: 12 }}>{p.title}</h3>
                <p className="t-body" style={{ fontSize: 14 }}>{p.body}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <Link href="/contact" className="btn btn-ghost">Work with us →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
