"use client";

import Link from "next/link";

/**
 * Anything unexpected on a page lands here, including the API being down on a
 * detail page. Says so plainly and offers a retry, instead of a blank screen.
 */
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="nf" aria-labelledby="err-h">
      <div className="wrap">
        <p className="nf-code" aria-hidden="true">
          Oops
        </p>
        <h1 className="t-h2" id="err-h">
          Something went wrong.
        </h1>
        <p>
          We couldn&apos;t load this page. It is usually brief. Try again, or come back in a moment. Nothing you have done
          is lost.
        </p>
        <div className="nf-actions">
          <button type="button" className="btn btn-primary" onClick={() => reset()}>
            Try again
          </button>
          <Link href="/" className="btn btn-ghost">
            Go home
          </Link>
        </div>
      </div>
    </section>
  );
}
