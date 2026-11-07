import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SubcategoryDirectory } from "@/components/marketplace/SubcategoryDirectory";
import { getCategoryZone } from "@/lib/api/categories";
import { categoryFromSlug, categorySlug, categoryVisual } from "@/lib/categories";
import { orFallback } from "@/lib/api/client";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: raw } = await params;
  const category = categoryFromSlug(raw);
  return category
    ? pageMetadata({
        title: `${category} subcategories in Kenya`,
        description: `Explore ${category.toLowerCase()} subcategories and browse matching listings from Kenyan sellers on BROKA.`,
        path: `/browse/subcategories/${categorySlug(category)}`,
      })
    : pageMetadata({
        title: "BROKA subcategories not found",
        description: "This BROKA category directory could not be found.",
        path: `/browse/subcategories/${encodeURIComponent(raw)}`,
        noIndex: true,
      });
}

export default async function SubcategoriesPage({ params }: Props) {
  const { category: raw } = await params;
  const category = categoryFromSlug(raw);
  if (!category) notFound();
  const response = await orFallback(() => getCategoryZone(category), { category: null, subcategories: [], filters: [] });
  if (!response.data.category || response.data.subcategories.length === 0) notFound();
  const visual = categoryVisual(category);
  return (
    <>
      <section className="categories-hero" style={{ "--category-start": visual.gradient[0], "--category-end": visual.gradient[1] } as CSSProperties}>
        <div className="wrap">
          <Link href={`/browse/${categorySlug(category)}`} className="categories-back">← {category}</Link>
          <h1>{category} <span>subcategories</span></h1>
          <p className="categories-support">Browse every {category.toLowerCase()} subcategory in one place.</p>
        </div>
      </section>
      <section className="categories-directory-section">
        <div className="wrap">
          <div className="categories-directory-heading">
            <div>
              <span className="browse-route-kicker">Complete directory</span>
              <h2>All {category} subcategories</h2>
            </div>
            <p>Choose a subcategory to see its listings and filters.</p>
          </div>
          <SubcategoryDirectory category={category} subcategories={response.data.subcategories} />
        </div>
      </section>
    </>
  );
}
