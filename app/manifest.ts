import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BROKA — The Intelligence Layer for Commerce",
    short_name: "BROKA",
    description: "Explore marketplace listings in Kenya, use Zeno for context, and contact sellers directly in the BROKA app.",
    start_url: "/",
    display: "standalone",
    background_color: "#050507",
    theme_color: "#050507",
    icons: [{ src: "/assets/broka-logo.png", sizes: "1024x1024", type: "image/png", purpose: "any" }],
  };
}
