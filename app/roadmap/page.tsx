import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { roadmap } from "@/data/roadmap";

export const metadata: Metadata = {
  title: "Roadmap",
  description: "BROKA's product roadmap — what is live today, what we are actively building, and what we are exploring for the longer term.",
};

export default function Roadmap() {
  return (
    <>
      <PageHero
        eyebrow="Product roadmap"
        headline="Where we are. Where we're going."
        sub="BROKA is built incrementally. Here is what is live today, what we are actively building toward, and what we are exploring beyond that. We do not fabricate milestones or manufacture traction."
        atmosphere="atm-violet"
      />

      <section className="sec bg-1 grid-bg" aria-labelledby="rm-h">
        <div className="wrap">
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 56 }}>
            {[
              { label: "Current", cls: "live", desc: "Live and shipping" },
              { label: "Building", cls: "building", desc: "In active development" },
              { label: "Exploring", cls: "later", desc: "Longer-term roadmap" },
            ].map((l) => (
              <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className={`badge badge-dot badge-${l.cls}`}>{l.label}</span>
                <span className="t-sm">{l.desc}</span>
              </div>
            ))}
          </div>

          <div className="rm-phases" role="list">
            {roadmap.map((phase) => (
              <div className="rm-phase" key={phase.id} role="listitem">
                <div className="rm-phase-left">
                  <p className="rm-phase-name">{phase.label}</p>
                  <span className={`badge badge-dot badge-${phase.status === "current" ? "live" : phase.status === "building" ? "building" : "later"}`} style={{ marginBottom: 12 }}>
                    {phase.status === "current" ? "Current" : phase.status === "building" ? "Building" : "Exploring"}
                  </span>
                  <p className="rm-phase-desc">{phase.description}</p>
                </div>
                <ul className="rm-items" aria-label={`${phase.label} items`}>
                  {phase.items.map((item) => (
                    <li className={`rm-item ${phase.status}`} key={item}>
                      <span className={`rm-item-dot ${phase.status}`} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Honesty note */}
      <section className="sec bg-2" aria-labelledby="rm-note-h">
        <div className="wrap" style={{ maxWidth: 760, margin: "0 auto" }}>
          <span className="t-eyebrow">A note on honesty</span>
          <h2 className="t-h3" id="rm-note-h" style={{ marginBottom: 20 }}>
            We do not inflate our roadmap.
          </h2>
          <p className="t-body" style={{ marginBottom: 16 }}>
            Many startups publish roadmaps that are really just wish lists with
            estimated dates attached. We prefer to be clear about what exists,
            what we are building, and what we are thinking about — without
            manufacturing traction or overpromising timelines.
          </p>
          <p className="t-body" style={{ marginBottom: 32 }}>
            If you want to understand where BROKA is in its development and
            have a genuine interest in partnering, investing or using the
            platform early — get in touch. We prefer honest conversations to
            polished pitch narratives.
          </p>
          <Link href="/contact" className="btn btn-ghost">Start a conversation →</Link>
        </div>
      </section>
    </>
  );
}
