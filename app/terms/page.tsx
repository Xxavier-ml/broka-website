import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { CONTACT, mailto } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms for using the BROKA website: what it shows, what happens in the app, and the limits of what we promise.",
  alternates: { canonical: "https://www.broka.co.ke/terms" },
};

export default function Terms() {
  return (
    <>
      <PageHero eyebrow="Legal" headline="Terms of Use" sub="The ground rules for using the BROKA website." />
      <section className="sec-sm bg-1">
        <div className="wrap">
          <div className="legal">
            <p className="legal-updated">Last updated 29 September 2026</p>

            <p>
              By using www.broka.co.ke (&quot;the website&quot;) you agree to these terms. If you do not agree, please do not use
              the website. Using the BROKA mobile app is covered by the terms you accept when you sign up there.
            </p>

            <h2>What the website is</h2>
            <p>
              The website introduces BROKA and lets you look at auctions and online stores. It is for viewing only. You
              cannot bid, make an offer, message a seller or pay on the website; those actions are in the{" "}
              <Link href="/download">BROKA app</Link>.
            </p>

            <h2>Listings come from sellers</h2>
            <ul>
              <li>Item descriptions, photos, prices and locations are written by sellers, not by BROKA.</li>
              <li>
                A listing shown on the website is not an offer to sell by BROKA, and a bid or price shown here may already
                have changed. Prices and auction times update about once a minute.
              </li>
              <li>Take care before you deal with anyone. Inspect items, and use the app&apos;s escrow for payment.</li>
            </ul>

            <h2>Using the site properly</h2>
            <ul>
              <li>Do not try to disrupt the website, overload it with automated requests or gain access you were not given.</li>
              <li>Do not copy the website&apos;s listings in bulk, or present sellers&apos; content as your own.</li>
              <li>Do not use the site for anything unlawful.</li>
            </ul>

            <h2>Ownership</h2>
            <p>
              The BROKA name, logo, Zeno and the design of this website belong to BROKA. Photos and descriptions in
              listings belong to the sellers who posted them.
            </p>

            <h2>No guarantees</h2>
            <p>
              We work to keep the website accurate and available, but it is provided &quot;as is&quot;. We do not promise it will
              always be up, error-free, or that every listing is accurate. To the extent the law allows, BROKA is not liable
              for loss that results from relying on information shown on the website.
            </p>

            <h2>Links to other sites</h2>
            <p>We are not responsible for the content or practices of websites we link to.</p>

            <h2>Changes</h2>
            <p>We may change these terms. The date above shows when they last changed, and using the website afterwards means you accept the update.</p>

            <h2>Governing law</h2>
            <p>These terms are governed by the laws of Kenya.</p>

            <h2>Contact</h2>
            <p>
              Questions about these terms: <a href={mailto(CONTACT.adminEmail, "Terms of use")}>{CONTACT.adminEmail}</a> or{" "}
              <a href={`tel:${CONTACT.phone}`}>{CONTACT.phoneDisplay}</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
