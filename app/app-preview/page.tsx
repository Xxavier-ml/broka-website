import type { Metadata } from "next";
import { AppPreview } from "@/components/app-preview/AppPreview";
import "./preview-page.css";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Explore the BROKA mobile app",
  description: "Try two BROKA app screens in your browser: the home screen and a full listing with seller metrics, deal terms and Zeno Insight.",
  path: "/app-preview",
});

export default function AppPreviewPage() {
  return <AppPreview />;
}
