"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface GalleryImage {
  medium: string;
  large: string;
  thumb: string;
  srcSet: string;
}

/** The listing's photos: one large, the rest as thumbnails. Arrow keys move between them. */
export function Gallery({ images, alt, fallback }: { images: GalleryImage[]; alt: string; fallback: React.ReactNode }) {
  const [i, setI] = useState(0);
  if (!images.length) return <div className="gallery-main gallery-empty">{fallback}</div>;

  const n = images.length;
  const go = (d: number) => setI((cur) => (cur + d + n) % n);
  const current = images[i]!;

  return (
    <div
      className="gallery"
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "ArrowRight") go(1);
      }}
    >
      <div className="gallery-main">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={current.large}
          srcSet={current.srcSet}
          sizes="(max-width: 900px) 100vw, 620px"
          alt={`${alt} — photo ${i + 1} of ${n}`}
          decoding="async"
        />
        {n > 1 && (
          <>
            <button type="button" className="gallery-nav gallery-prev" onClick={() => go(-1)} aria-label="Previous photo">
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <button type="button" className="gallery-nav gallery-next" onClick={() => go(1)} aria-label="Next photo">
              <ChevronRight size={20} aria-hidden="true" />
            </button>
            <span className="gallery-count" aria-hidden="true">
              {i + 1} / {n}
            </span>
          </>
        )}
      </div>
      {n > 1 && (
        <ul className="gallery-thumbs" aria-label="Photos">
          {images.map((img, idx) => (
            <li key={idx}>
              <button
                type="button"
                className={`gallery-thumb${idx === i ? " active" : ""}`}
                onClick={() => setI(idx)}
                aria-label={`Show photo ${idx + 1}`}
                aria-current={idx === i}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.thumb} alt="" loading="lazy" decoding="async" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
