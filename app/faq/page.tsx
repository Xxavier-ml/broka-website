import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Accordion } from "@/components/ui/Accordion";
import { faqs } from "@/data/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Common questions about BROKA — what it is, how it works, what Zeno does, and what the long-term vision is.",
};

export default function FAQ() {
  return (
    <>
      <PageHero
        eyebrow="Common questions"
        headline="Answers."
        sub="If something is not covered here, get in touch through the contact page."
        atmosphere="atm-violet"
      />

      <section className="sec bg-1" aria-labelledby="faq-h">
        <div className="wrap">
          <h2 className="t-h3" id="faq-h" style={{ textAlign: "center", marginBottom: 8 }}>
            Frequently asked questions
          </h2>
          <Accordion items={faqs} />
          <div style={{ textAlign: "center", marginTop: 56 }}>
            <p className="t-body" style={{ marginBottom: 20 }}>
              Still have questions? We are happy to talk.
            </p>
            <Link href="/contact" className="btn btn-primary">Get in touch</Link>
          </div>
        </div>
      </section>
    </>
  );
}
