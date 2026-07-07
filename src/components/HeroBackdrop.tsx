import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Cursor-reactive backdrop for the hero — a field of flowing contour lines
 * that ripple away from the pointer.
 *
 * WHY THIS CONCEPT (not a node-graph / particle network / glowing blob):
 * Evolvance's whole pitch is "growth evolution" — organic change measured
 * over time. Topographic contour lines (the kind that map elevation, or
 * the growth rings inside a cut tree trunk) are a literal, physical image
 * of "growth read in layers." It's specific to what this brand actually
 * means, instead of the generic AI-consulting visual language the brief
 * explicitly rules out (neural nodes, particle swarms, glass blobs).
 *
 * WHY CANVAS INSTEAD OF SVG/DOM ELEMENTS:
 * The field redraws ~16 lines x ~90 points every frame. Doing that as
 * individual animated SVG <path> or DOM nodes means React (or even just
 * the browser) re-diffing/re-painting that many elements 60x a second.
 * A single <canvas> with one imperative draw loop sidesteps all of that —
 * it's just pixels, so the frame cost stays flat no matter how dense the
 * line field is.
 *
 * WHY GSAP HERE SPECIFICALLY (this is the case the brief asked to weigh
 * GSAP vs. Framer Motion on): Framer's animation primitives are built to
 * animate values that React owns (component state, motion values tied to
 * JSX). Here there's no JSX to animate — the "animation" is just numbers
 * read inside a requestAnimationFrame loop and drawn straight to canvas.
 * `gsap.quickTo()` is purpose-built for exactly that: it hands back a fast
 * function you call with a raw target number (the live mouse position) and
 * it eases a plain JS object's property toward that target every tick,
 * completely outside of React's render cycle. That's a better fit than
 * standing up Framer motion values for numbers React never renders.
 *
 * HOW THE EFFECT IS LAYERED:
 *   1. Ambient drift — every line's shape is two slow sine waves whose
 *      phase advances with elapsed time, so the field breathes on its own
 *      even if no one has touched the mouse yet (an idle hero shouldn't
 *      look dead).
 *   2. Cursor displacement — every point on every line gets an extra
 *      push away from the (smoothed) pointer position, falling off with
 *      distance so it reads as a local disturbance in the terrain, not a
 *      global tilt of the whole canvas.
 *   3. Pointer smoothing — see the GSAP note above. Without it the ripple
 *      would snap to the exact pixel the mouse is on every frame, which
 *      reads as jittery rather than fluid.
 */

const LINE_COUNT = 16;
const POINTS_PER_LINE = 90;
// How far (in px) the cursor's influence reaches before falling off to
// nothing. Keeps the ripple feeling local/contained rather than warping
// the entire canvas whenever the mouse moves anywhere near it.
const INFLUENCE_RADIUS = 260;

const HeroBackdrop = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Smoothed pointer position in CSS pixels (not device pixels — the
    // ctx transform below already accounts for DPR, so drawing code can
    // stay in plain CSS-pixel coordinates throughout).
    const pointer = { x: 0, y: 0 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      // Scale the drawing context once so every subsequent ctx call can
      // use plain CSS pixel values instead of manually multiplying by dpr.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Re-center the pointer on resize so a fresh layout doesn't start
      // with a stale ripple origin sitting in the wrong place.
      pointer.x = width / 2;
      pointer.y = height / 2;
    };
    resize();
    window.addEventListener("resize", resize);

    // quickTo gives us an eased setter for a plain object property — see
    // the file-level comment for why this (not a Framer motion value) is
    // the right tool for smoothing a raw pointer position read in a rAF
    // loop rather than something React renders.
    const quickX = gsap.quickTo(pointer, "x", { duration: 0.9, ease: "power3" });
    const quickY = gsap.quickTo(pointer, "y", { duration: 0.9, ease: "power3" });

    const updatePointer = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      quickX(clientX - rect.left);
      quickY(clientY - rect.top);
    };
    const onMouseMove = (e: MouseEvent) => updatePointer(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) updatePointer(t.clientX, t.clientY);
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    const start = performance.now();
    let raf = 0;

    const draw = (now: number) => {
      // Reduced-motion users still see the contour field (it's the whole
      // backdrop, not a decorative extra) but it holds still rather than
      // animating — freezing elapsed time at 0 flattens the ambient sine
      // drift to a single static frame.
      const t = prefersReduced ? 0 : (now - start) / 1000;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < LINE_COUNT; i++) {
        const baseY = (height / (LINE_COUNT - 1)) * i;

        // Fake parallax: lines nearer vertical-center read as "closer," so
        // they get a touch more opacity/weight. Cheap, but it's enough to
        // keep a flat field of lines from reading as flat.
        const depth = 1 - Math.abs(baseY - height / 2) / (height / 2);

        // Interpolate each line's hue across the brand's own three-color
        // gradient (azure -> aqua -> green, the same ramp used in
        // gradient-text-bright elsewhere) rather than inventing a new
        // palette. This is graduated-by-position coloring, the same
        // device a real topographic map uses for elevation bands — not a
        // gradient wash sitting on top of the content.
        const hue = 193 - (193 - 152) * (i / (LINE_COUNT - 1));

        ctx.beginPath();
        for (let p = 0; p <= POINTS_PER_LINE; p++) {
          const x = (width / POINTS_PER_LINE) * p;

          // Layer 1: ambient drift (always running, even at rest).
          const ambient =
            Math.sin(x * 0.006 + t * 0.4 + i * 0.5) * 10 +
            Math.sin(x * 0.013 + t * 0.25 + i) * 6;

          // Layer 2: cursor displacement, inverse-falloff so it's a local
          // push rather than a global tilt.
          const dx = x - pointer.x;
          const dy = baseY - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const falloff = Math.max(0, 1 - dist / INFLUENCE_RADIUS);
          const push = falloff * falloff * 34;
          const angle = Math.atan2(dy, dx);

          const y = baseY + ambient + Math.sin(angle) * push;
          if (p === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.strokeStyle = `hsla(${hue}, 85%, 65%, ${0.05 + depth * 0.09})`;
        ctx.lineWidth = 1 + depth * 0.6;
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
};

export default HeroBackdrop;
