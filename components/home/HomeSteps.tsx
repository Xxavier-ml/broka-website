import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MessageCircle, Search, Scale } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The journey, said once.
 *
 * The page used to explain discover/compare/connect three times in three
 * different visual languages. This is the single explanation: three steps,
 * three pictures, one link to the long version. The last card names the
 * boundary the whole site keeps — BROKA is a discovery layer, and the sale,
 * payment and delivery are arranged between the two people involved.
 */
const STEPS = [
  {
    number: "01",
    icon: Search,
    title: "Discover",
    body: "Search a product or open a category. Zeno can also read a request like “a 55-inch TV under KSh 50,000” and surface what matches.",
    image: "/assets/home/step-discover.webp",
    alt: "Magnifying glass over floating product cards",
  },
  {
    number: "02",
    icon: Scale,
    title: "Compare",
    body: "Price, condition, location and seller details stay in view, so two similar listings stop looking identical.",
    image: "/assets/home/step-compare.webp",
    alt: "Two listing cards side by side with price tags",
  },
  {
    number: "03",
    icon: MessageCircle,
    title: "Connect",
    body: "Message or call the seller in the app, ask your questions, and agree the purchase, payment and delivery directly.",
    image: "/assets/home/step-connect.webp",
    alt: "Two chat bubbles linked by a glowing signal",
  },
];

export function HomeSteps() {
  return (
    <section className="sec hp-steps" aria-labelledby="hp-steps-title">
      <div className="wrap">
        <Reveal className="hp-steps-head">
          <span className="t-eyebrow">How BROKA works</span>
          <h2 className="t-h2" id="hp-steps-title">Three steps from “I need this” to a seller.</h2>
        </Reveal>
        <div className="hp-steps-grid">
          {STEPS.map((step, index) => (
            <Reveal className="hp-step-reveal" key={step.number} delay={index * 0.08}>
              <article className="hp-step">
                <div className="hp-step-art">
                  <Image
                    src={step.image}
                    alt=""
                    width={900}
                    height={900}
                    sizes="(max-width: 700px) 40vw, 160px"
                    className="hp-step-image"
                  />
                  <span className="hp-step-number" aria-hidden="true">{step.number}</span>
                </div>
                <h3 className="hp-step-title">
                  <step.icon size={17} aria-hidden="true" /> {step.title}
                </h3>
                <p className="hp-step-body">{step.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="hp-steps-outro">
          <Link href="/how-it-works" className="preview-link">
            See how marketplace discovery works <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
          <span className="hp-steps-note">
            BROKA does not process or hold payments — buyers and sellers arrange the sale themselves.
          </span>
        </Reveal>
      </div>
    </section>
  );
}
