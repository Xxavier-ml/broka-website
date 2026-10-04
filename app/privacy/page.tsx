import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CONTACT, mailto } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How the BROKA website handles your information: what it collects, what it doesn't, and how to reach us.",
  alternates: { canonical: "https://www.broka.co.ke/privacy" },
};

export default function Privacy() {
  return (
    <>
      <PageHero eyebrow="Legal" headline="Privacy Policy" sub="Plain language about the BROKA website and your information." />
      <section className="sec-sm bg-1">
        <div className="wrap">
          <div className="legal">
            <p className="legal-updated">Last updated 29 September 2026</p>

            <p>
              This policy covers the BROKA website at www.broka.co.ke. The BROKA mobile app handles more information
              (your account, chats, deals and payments) and is described where you sign up in the app.
            </p>

            <h2>What we collect on this website</h2>
            <ul>
              <li>
                <strong>Nothing you type, unless you email us.</strong> The contact form does not send data to our
                servers. It opens a pre-filled email in your own mail app, and the message goes to us only if you send it.
              </li>
              <li>
                <strong>No accounts, no advertising trackers and no analytics cookies.</strong> The site does not ask
                you to sign in and does not set cookies for tracking.
              </li>
              <li>
                <strong>Ordinary technical logs.</strong> Like any website, the hosting provider that serves these pages
                records technical details of each request (such as IP address, browser type and the page requested) to
                keep the site running and secure.
              </li>
            </ul>

            <h2>Listings, auctions and stores</h2>
            <p>
              The auctions and online stores shown here are read from BROKA&apos;s public marketplace. They contain what
              sellers chose to publish: item details, photos, prices, a general location and a seller&apos;s public track
              record such as a rating. We do not show sellers&apos; phone numbers, and bidder names in an auction&apos;s history
              are shortened. If a seller&apos;s business email is shown, it is because they verified it for their store.
            </p>

            <h2>When you email or call us</h2>
            <p>
              If you write to {CONTACT.adminEmail}, one of the founders&apos; addresses, or message our WhatsApp number, we
              receive your address or number and whatever you tell us. We use it only to reply and to follow up on your
              request, and we do not sell it.
            </p>

            <h2>Links to other sites</h2>
            <p>
              Some links lead elsewhere, for example our social pages and the app download on GitHub. Those services have
              their own privacy practices.
            </p>

            <h2>Your choices</h2>
            <p>
              You can ask us what we hold about you, or ask us to correct or delete it, by emailing{" "}
              <a href={mailto(CONTACT.adminEmail, "Privacy request")}>{CONTACT.adminEmail}</a>. We aim to handle personal
              data in line with Kenya&apos;s Data Protection Act, 2019.
            </p>

            <h2>Changes</h2>
            <p>
              If we change this policy we will update the date above. Material changes will be announced on this site.
            </p>

            <h2>Contact</h2>
            <p>
              BROKA, {CONTACT.city}, {CONTACT.country}. Email <a href={mailto(CONTACT.adminEmail)}>{CONTACT.adminEmail}</a>{" "}
              or call <a href={`tel:${CONTACT.phone}`}>{CONTACT.phoneDisplay}</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
