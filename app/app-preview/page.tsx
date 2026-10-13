import type { Metadata } from "next";
import { AppPreview } from "@/components/app-preview/AppPreview";
import "./app-preview.css";
import "./preview-links.css";
import "./listing-detail/listing-detail.css";

export const metadata: Metadata = {
  title: "Explore the BROKA app",
  description: "Explore BROKA’s interactive app preview: browse the homescreen, open a sample listing, review seller standing and ask Zeno—all in one page.",
  alternates: { canonical: "https://www.broka.co.ke/app-preview" },
};

export default function AppPreviewPage() {
  return <AppPreview />;
}
