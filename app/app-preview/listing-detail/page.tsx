import type { Metadata } from "next";
import { ListingDetailPreview } from "@/components/app-preview/ListingDetailPreview";
import "../app-preview.css";
import "../preview-links.css";
import "./listing-detail.css";

export const metadata: Metadata = {
  title: "BROKA listing detail preview",
  description: "Explore an interactive preview of a BROKA mobile listing: real router photos, product details, availability and deal terms.",
  alternates: { canonical: "https://www.broka.co.ke/app-preview/listing-detail" },
};

export default function ListingDetailPreviewPage() {
  return <ListingDetailPreview />;
}
