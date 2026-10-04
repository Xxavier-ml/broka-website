"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, Minus, Plus, RotateCcw, X, ZoomIn } from "lucide-react";

export interface GalleryImage {
  medium: string;
  large: string;
  thumb: string;
  srcSet: string;
}

const MIN_ZOOM = 1;
const MAX_ZOOM = 3.5;
const clamp = (value: number) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value));

/** Responsive product gallery with wheel, pinch, drag, fullscreen, and thumbnails. */
export function Gallery({ images, alt, fallback }: { images: GalleryImage[]; alt: string; fallback: React.ReactNode }) {
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [fullscreen, setFullscreen] = useState(false);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinchStart = useRef<{ distance: number; zoom: number } | null>(null);
  const dragStart = useRef<{ x: number; y: number; offsetX: number; offsetY: number } | null>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFullscreen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  }, [index]);

  if (!images.length) return <div className="gallery-main gallery-empty">{fallback}</div>;

  const count = images.length;
  const current = images[index]!;
  const go = (delta: number) => setIndex((value) => (value + delta + count) % count);
  const reset = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };
  const adjustZoom = (delta: number) => {
    setZoom((value) => {
      const next = clamp(value + delta);
      if (next === 1) setOffset({ x: 0, y: 0 });
      return next;
    });
  };
  const toggleZoom = () => {
    setZoom((value) => {
      const next = value === 1 ? 2 : 1;
      if (next === 1) setOffset({ x: 0, y: 0 });
      return next;
    });
  };
  const distance = (a: { x: number; y: number }, b: { x: number; y: number }) => Math.hypot(a.x - b.x, a.y - b.y);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinchStart.current = { distance: distance(a!, b!), zoom };
      dragStart.current = null;
    } else if (zoom > 1) {
      dragStart.current = { x: event.clientX, y: event.clientY, offsetX: offset.x, offsetY: offset.y };
    }
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(event.pointerId)) return;
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointers.current.size >= 2 && pinchStart.current) {
      const [a, b] = [...pointers.current.values()];
      const next = clamp(pinchStart.current.zoom * (distance(a!, b!) / pinchStart.current.distance));
      setZoom(next);
      if (next === 1) setOffset({ x: 0, y: 0 });
    } else if (dragStart.current) {
      setOffset({ x: dragStart.current.offsetX + event.clientX - dragStart.current.x, y: dragStart.current.offsetY + event.clientY - dragStart.current.y });
    }
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    pointers.current.delete(event.pointerId);
    if (pointers.current.size < 2) pinchStart.current = null;
    if (pointers.current.size === 0) dragStart.current = null;
  };

  return (
    <div className={`gallery${fullscreen ? " gallery-fullscreen" : ""}`}>
      <div
        className="gallery-main"
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") go(-1);
          if (event.key === "ArrowRight") go(1);
          if (event.key === "Enter" || event.key === " ") toggleZoom();
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onWheel={(event) => {
          event.preventDefault();
          adjustZoom(event.deltaY < 0 ? 0.25 : -0.25);
        }}
        onDoubleClick={toggleZoom}
        tabIndex={0}
        role="img"
        aria-label={`${alt} — photo ${index + 1} of ${count}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={current.large}
          srcSet={current.srcSet}
          sizes={fullscreen ? "100vw" : "(max-width: 900px) 100vw, 620px"}
          alt={`${alt} — photo ${index + 1} of ${count}`}
          decoding="async"
          draggable={false}
          style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${zoom})` }}
        />
        {count > 1 && (
          <>
            <button type="button" className="gallery-nav gallery-prev" onClick={() => go(-1)} aria-label="Previous photo"><ChevronLeft size={20} aria-hidden="true" /></button>
            <button type="button" className="gallery-nav gallery-next" onClick={() => go(1)} aria-label="Next photo"><ChevronRight size={20} aria-hidden="true" /></button>
            <span className="gallery-count" aria-hidden="true">{index + 1} / {count}</span>
          </>
        )}
        <div className="gallery-controls" aria-label="Image controls">
          <button type="button" onClick={() => adjustZoom(-0.25)} disabled={zoom <= MIN_ZOOM} aria-label="Zoom out"><Minus size={16} /></button>
          <span aria-live="polite">{Math.round(zoom * 100)}%</span>
          <button type="button" onClick={() => adjustZoom(0.25)} disabled={zoom >= MAX_ZOOM} aria-label="Zoom in"><Plus size={16} /></button>
          <button type="button" onClick={reset} disabled={zoom === 1 && offset.x === 0 && offset.y === 0} aria-label="Reset zoom"><RotateCcw size={15} /></button>
          <button type="button" onClick={() => setFullscreen((value) => !value)} aria-label={fullscreen ? "Close fullscreen viewer" : "Open fullscreen viewer"}>{fullscreen ? <X size={16} /> : <Maximize2 size={15} />}</button>
        </div>
        {zoom === 1 && <span className="gallery-hint"><ZoomIn size={14} /> Pinch or scroll to zoom</span>}
      </div>
      {count > 1 && (
        <ul className="gallery-thumbs" aria-label="Photos">
          {images.map((image, imageIndex) => (
            <li key={imageIndex}>
              <button type="button" className={`gallery-thumb${imageIndex === index ? " active" : ""}`} onClick={() => setIndex(imageIndex)} aria-label={`Show photo ${imageIndex + 1}`} aria-current={imageIndex === index}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image.thumb} alt="" loading="lazy" decoding="async" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
