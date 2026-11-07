import type { Metadata } from "next";
import { AppPreview } from "@/components/app-preview/AppPreview";
import "./app-preview.css";
import "./preview-links.css";
import "./listing-detail/listing-detail.css";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Explore the BROKA mobile app",
  description: "Browse two distinct BROKA app screens side by side: the homescreen and a full listing with seller metrics, deal terms and Zeno Insight.",
  path: "/app-preview",
});

export default function AppPreviewPage() {
  return <AppPreview />;
}
