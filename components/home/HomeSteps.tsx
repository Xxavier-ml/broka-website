import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MessageCircle, Scale, Search, ShieldCheck } from "lucide-react";

/**
 * The journey, said once: three steps on one signal path, three pictures and
 * one link to the long version. The closing line names the boundary the whole
 * site keeps: BROKA is a discovery layer, and the sale, payment and delivery
 * are arranged between the two people involved.
 */
const STEPS = [
  {
    number: "01",
    icon: Search,
    title: "Discover",
    body: "Search a product or open a category. Zeno can also read a request like “a 55-inch TV under KSh 50,000” and surface what matches.",
    image: "/assets/home/step-discover.webp",
  },
  {
    number: "02",
    icon: Scale,
    title: "Compare",
    body: "Price, condition, location and seller details stay in view, so two similar listings stop looking identical.",
    image: "/assets/home/step-compare.webp",
  },
  {
    number: "03",
    icon: MessageCircle,
    title: "Connect",
    body: "Message or call the seller in the app, ask your questions, and agree the purchase, payment and delivery directly.",
    image: "/assets/home/step-connect.webp",
  },
];

export function HomeSteps() {
  return (
    <section className="sec hp-steps" aria-labelledby="hp-steps-title">
      <div className="wrap">
        <div className="hp-head hp-head-center hp-reveal">
          <span className="hp-eyebrow"><b>02</b> How BROKA works</span>
          <h2 className="hp-title" id="hp-steps-title">
            Three steps from <span className="hp-nowrap">“I need this”</span> <em>to a seller.</em>
          </h2>
        </div>

        <div className="hp-steps-body">
          <span className="hp-signal" aria-hidden="true"><i /></span>
          <ol className="hp-steps-grid">
            {STEPS.map((step, index) => (
              <li className="hp-step hp-reveal" key={step.number} style={{ ["--i" as string]: index }} data-spotlight="">
                <span className="hp-step-node" aria-hidden="true"><span>{step.number}</span></span>
                <div className="hp-step-art">
                  <Image src={step.image} alt="" width={900} height={900} sizes="(max-width: 700px) 60vw, 260px" className="hp-step-image" />
                </div>
                <h3 className="hp-step-title">
                  <span className="hp-step-icon" aria-hidden="true"><step.icon size={16} /></span> {step.title}
                </h3>
                <p className="hp-step-body">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="hp-steps-outro hp-reveal">
          <p className="hp-boundary">
            <ShieldCheck size={17} aria-hidden="true" />
            <span>BROKA does not process or hold payments — buyers and sellers arrange the sale themselves.</span>
          </p>
          <Link href="/how-it-works" className="hp-textlink">
            See how marketplace discovery works <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
