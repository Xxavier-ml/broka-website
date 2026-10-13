import type { Metadata } from "next";
import { AppPreview } from "@/components/app-preview/AppPreview";
import "./app-preview.css";

export const metadata: Metadata = {
  title: "Explore the BROKA app",
  description: "Explore an interactive preview of BROKA for Android: marketplace categories, sample listings and Zeno, the intelligent search assistant.",
  alternates: { canonical: "https://www.broka.co.ke/app-preview" },
};

export default function AppPreviewPage() {
  return <AppPreview />;
}
