import type { Metadata } from "next";
import Link from "next/link";
import { CategoryDirectory } from "@/components/marketplace/CategoryDirectory";

export const metadata: Metadata = {
  title: "All categories",
  description: "Explore every BROKA marketplace category.",
};

export default function CategoriesPage() {
  return (
    <>
      <section className="categories-hero" aria-labelledby="categories-page-title">
        <div className="wrap">
          <Link href="/browse" className="categories-back">← Back to marketplace</Link>
          <span className="browse-route-kicker">BROKA / CATEGORY DIRECTORY</span>
          <h1 className="t-h1" id="categories-page-title">Find your next category.</h1>
          <p className="t-body-lg categories-support">
            Explore the full BROKA marketplace by category, from electronics and gaming to property, services, and more.
          </p>
        </div>
      </section>
      <section className="categories-directory-section" aria-labelledby="categories-directory-title">
        <div className="wrap">
          <div className="categories-directory-heading">
            <div>
              <span className="browse-route-kicker">COMPLETE DIRECTORY</span>
              <h2 className="t-h2" id="categories-directory-title">All marketplace categories</h2>
            </div>
            <p>Choose a category to see its latest listings.</p>
          </div>
          <CategoryDirectory />
        </div>
      </section>
    </>
  );
}
