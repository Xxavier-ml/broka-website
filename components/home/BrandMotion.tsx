"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const VIDEO_SRC = "/assets/broka-logo-reveal.mp4";

type NavigatorWithConnection = Navigator & {
  connection?: { saveData?: boolean };
};

/** A one-shot, decorative logo reveal. The official still mark is the fallback. */
export function BrandMotion() {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const frame = frameRef.current;
    const video = videoRef.current;
    const connection = (navigator as NavigatorWithConnection).connection;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Keep the static official symbol on reduced-motion, data-saving, or older browsers.
    if (
      !frame ||
      !video ||
      reducedMotion ||
      connection?.saveData ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }

    let sourceAttached = false;
    const observer = new IntersectionObserver(
      (entries) => {
        const isNearViewport = entries.some((entry) => entry.isIntersecting);
        if (!isNearViewport) {
          if (sourceAttached && !video.ended) video.pause();
          return;
        }

        if (!sourceAttached) {
          video.src = VIDEO_SRC;
          video.load();
          sourceAttached = true;
        }
        if (video.ended) video.currentTime = 0;
        void video.play().catch(() => {
          // If autoplay is unavailable, the static logo remains visible.
        });
      },
      { rootMargin: "96px 0px" },
    );

    observer.observe(frame);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, []);

  return (
    <div
      ref={frameRef}
      className={`brand-motion${isReady ? " is-ready" : ""}`}
      aria-hidden="true"
    >
      <Image
        className="brand-motion-fallback"
        src="/assets/broka-mark.png"
        alt=""
        width={56}
        height={56}
        sizes="56px"
      />
      <video
        ref={videoRef}
        className="brand-motion-video"
        muted
        playsInline
        preload="none"
        tabIndex={-1}
        aria-hidden="true"
        onPlaying={() => setIsReady(true)}
      />
    </div>
  );
}
