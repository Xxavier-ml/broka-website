"use client";

import dynamic from "next/dynamic";
import { HeroViz } from "@/components/hero/HeroViz";
import { useCanRender3D } from "@/hooks/useDeviceCapability";

// The 3D canvas is WebGL-only and has no meaningful server render, so it's
// loaded on the client alone. While it loads, and on any device that isn't
// confidently capable, the existing lightweight SVG diagram is shown instead.
const TransactionNetwork = dynamic(
  () =>
    import("@/components/3d/TransactionNetwork").then(
      (m) => m.TransactionNetwork
    ),
  { ssr: false }
);

export function HeroScene() {
  const canRender3D = useCanRender3D();

  if (!canRender3D) {
    return <HeroViz />;
  }

  return (
    <div style={{ width: "100%", height: "100%", minHeight: 480 }}>
      <TransactionNetwork />
    </div>
  );
}
