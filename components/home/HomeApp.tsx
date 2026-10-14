import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BellRing, Download, MessageCircle, Search } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The handoff to the app, which is where the account, the conversations and
 * the notifications live. The website stays a browsing surface, so this panel
 * says plainly what the app adds rather than implying the site can do it too.
 */
const APP_POINTS = [
  { icon: Search, text: "Search and browse the full marketplace" },
  { icon: MessageCircle, text: "Chat or call sellers about a listing" },
  { icon: BellRing, text: "Manage your own store and listings" },
];

export function HomeApp() {
  return (
    <section className="sec hp-app" aria-labelledby="hp-app-title">
      <div className="wrap">
        <Reveal className="hp-app-panel">
          <div className="hp-app-visual">
            <Image
              src="/assets/home/app-phone.webp"
              alt="The BROKA app on a phone, showing a marketplace search and product grid"
              width={900}
              height={1125}
              sizes="(max-width: 900px) 60vw, 300px"
              className="hp-app-image"
            />
          </div>
          <div className="hp-app-copy">
            <span className="t-eyebrow">Get the app</span>
            <h2 className="t-h2" id="hp-app-title">BROKA in your pocket.</h2>
            <p className="t-body-lg">
              The app is where a browse turns into a conversation. Download it for
              Android, sign in, and keep the sellers you found here in one place.
            </p>
            <ul className="hp-app-points">
              {APP_POINTS.map((point) => (
                <li key={point.text}><point.icon size={15} aria-hidden="true" /> {point.text}</li>
              ))}
            </ul>
            <div className="hp-app-actions">
              <Link href="/download" className="btn btn-primary">
                <Download size={16} aria-hidden="true" /> Download for Android
              </Link>
              <Link href="/app-preview" className="btn btn-ghost">
                Preview the app <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </div>
            <p className="hp-app-note">
              The website stays a place to browse and compare — buying, selling and
              paying are arranged between you and the seller.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
