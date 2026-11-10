"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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

/**
 * True for the photo's own controls (previous/next, zoom, fullscreen). Their
 * pointers are left alone: a captured pointer's click is delivered to the
 * element that captured it (Pointer Events; current Chrome and Firefox do
 * this), so capturing a press on a button meant the button never got its click.
 */
const isControl = (target: EventTarget | null) => target instanceof Element && target.closest("button") !== null;

/** Responsive product gallery with wheel, pinch, drag, fullscreen, and thumbnails. */
export function Gallery({ images, alt, fallback }: { images: GalleryImage[]; alt: string; fallback: React.ReactNode }) {
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [fullscreen, setFullscreen] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinchStart = useRef<{ distance: number; zoom: number } | null>(null);
  const dragStart = useRef<{ x: number; y: number; offsetX: number; offsetY: number } | null>(null);

  const adjustZoom = useCallback((delta: number) => {
    setZoom((value) => {
      const next = clamp(value + delta);
      if (next === 1) setOffset({ x: 0, y: 0 });
      return next;
    });
  }, []);

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

  // Wheel zoom needs a listener of its own: React registers wheel handlers as
  // passive, where preventDefault() is ignored, so the page used to scroll
  // while the photo zoomed. Plain scrolling over the photo now scrolls the
  // page. The wheel zooms for a trackpad pinch (sent as ctrl + wheel), in the
  // fullscreen viewer, and while the photo is already zoomed in.
  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;
    const onWheel = (event: WheelEvent) => {
      if (!event.ctrlKey && !fullscreen && zoom === MIN_ZOOM) return;
      event.preventDefault();
      // Keep the smooth-scroll layer (components/layout/SmoothScroll.tsx) from scrolling the page too.
      event.stopPropagation();
      // A pinch arrives as many small deltas; a mouse wheel as a few large ones.
      adjustZoom(event.ctrlKey ? -event.deltaY * 0.01 : event.deltaY < 0 ? 0.25 : -0.25);
    };
    main.addEventListener("wheel", onWheel, { passive: false });
    return () => main.removeEventListener("wheel", onWheel);
  }, [adjustZoom, fullscreen, zoom, images.length]);

  // The fullscreen viewer covers the page, so the page behind it stays put.
  useEffect(() => {
    if (!fullscreen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [fullscreen]);

  if (!images.length) return <div className="gallery-main gallery-empty">{fallback}</div>;

  const count = images.length;
  const current = images[index]!;
  const go = (delta: number) => setIndex((value) => (value + delta + count) % count);
  const reset = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
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
    if (isControl(event.target)) return;
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
    // While fullscreen, wheel and touch scrolling inside the viewer are left to
    // the browser instead of the smooth-scroll layer, which would scroll the page behind it.
    <div className={`gallery${fullscreen ? " gallery-fullscreen" : ""}`} data-lenis-prevent={fullscreen ? "" : undefined}>
      <div
        ref={mainRef}
        className={`gallery-main${zoom > MIN_ZOOM ? " is-zoomed" : ""}`}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") go(-1);
          if (event.key === "ArrowRight") go(1);
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onDoubleClick={(event) => {
          if (!isControl(event.target)) toggleZoom();
        }}
        tabIndex={0}
        role="group"
        aria-label={`${alt} photo gallery`}
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
        <div className="gallery-controls" role="group" aria-label="Image controls">
          <button type="button" onClick={() => adjustZoom(-0.25)} disabled={zoom <= MIN_ZOOM} aria-label="Zoom out"><Minus size={16} /></button>
          <span aria-live="polite">{Math.round(zoom * 100)}%</span>
          <button type="button" onClick={() => adjustZoom(0.25)} disabled={zoom >= MAX_ZOOM} aria-label="Zoom in"><Plus size={16} /></button>
          <button type="button" onClick={reset} disabled={zoom === 1 && offset.x === 0 && offset.y === 0} aria-label="Reset zoom"><RotateCcw size={15} /></button>
          <button type="button" onClick={() => setFullscreen((value) => !value)} aria-label={fullscreen ? "Close fullscreen viewer" : "Open fullscreen viewer"}>{fullscreen ? <X size={16} /> : <Maximize2 size={15} />}</button>
        </div>
        {zoom === 1 && <span className="gallery-hint"><ZoomIn size={14} /> {fullscreen ? "Pinch or scroll to zoom" : "Pinch or double-click to zoom"}</span>}
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
