import type { Metadata } from "next";
import { AppPreview } from "@/components/app-preview/AppPreview";
import "./app-preview.css";
import "./preview-links.css";
import "./listing-detail/listing-detail.css";

export const metadata: Metadata = {
  title: "Explore the BROKA app",
  description: "Browse two distinct BROKA app screens side by side: the homescreen and a full listing with seller metrics, deal terms and Zeno Insight.",
  alternates: { canonical: "https://www.broka.co.ke/app-preview" },
};

export default function AppPreviewPage() {
  return <AppPreview />;
}
