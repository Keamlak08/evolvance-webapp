import { useEffect, useRef } from "react";

/**
 * A calmer sibling to HeroBackdrop: the same "topographic growth contour"
 * concept (see HeroBackdrop.tsx for the full reasoning behind that idea),
 * rendered as a plain ambient texture instead of a cursor-reactive one.
 * That's the deliberate line between "related to the hero" and "not a
 * copy of it" — same line-field visual language and the same underlying
 * sine-drift math, but with the pointer-tracking layer removed entirely
 * and tuned much quieter (fewer lines, lower opacity) so it can sit
 * behind real content and body text without ever fighting legibility.
 *
 * WHY A SEPARATE COMPONENT RATHER THAN A PROP ON HeroBackdrop:
 * HeroBackdrop's pointer-tracking setup (mousemove/touchmove listeners,
 * the quickTo-smoothed pointer object, the influence-radius push math) is
 * a meaningful chunk of logic a purely-ambient backdrop has no use for at
 * all. Toggling it off with a prop would mean shipping and maintaining a
 * dead code path in the one component used site-wide the most. Two small,
 * single-purpose components is simpler to reason about than one component
 * with a mode switch.
 *
 * USAGE: rendered as an absolutely-positioned first child inside whatever
 * section wraps it (each call site already establishes its own `relative`
 * positioning), so it fills that section's box and sits behind the
 * section's real content — normal DOM stacking order handles the
 * layering, no z-index wiring required beyond that.
 */

const LINE_COUNT = 10;
const POINTS_PER_LINE = 70;

interface SectionBackdropProps {
  /** "light" for the site's off-white sections; "dark" for bg-shell navy bands. */
  tone?: "light" | "dark";
  /** Multiplies every line's opacity — set well under 1 for a barely-there touch (e.g. behind InteractiveScroll's cards). */
  opacityScale?: number;
  className?: string;
}

const SectionBackdrop = ({ tone = "light", opacityScale = 1, className = "" }: SectionBackdropProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // A ResizeObserver on the canvas itself (rather than a window resize
    // listener, which is what HeroBackdrop uses) catches any reason this
    // specific section's box might change size — not just a window
    // resize — since these instances live inside ordinary content
    // sections rather than a fixed full-viewport hero.
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const start = performance.now();
    let raf = 0;

    // Line color tuned per tone: a muted, low-saturation slate-azure for
    // the light off-white sections (visible but quiet), or the brand's
    // own azure-to-green ramp — the same one HeroBackdrop uses — at a
    // fraction of its line count and opacity, for the dark bg-shell bands.
    //
    // The light-tone alpha here was originally 0.05, which combined with
    // the background token being 99%-lightness (essentially pure white at
    // the time) made this read as fully invisible rather than subtle.
    // With --background now a genuine off-white (96% lightness) and this
    // bumped to 0.16, the lines are meant to be quietly but definitely
    // visible -- a texture you notice, not one you have to go looking for.
    const baseAlpha = (tone === "dark" ? 0.09 : 0.16) * opacityScale;

    const draw = (now: number) => {
      const t = prefersReduced ? 0 : (now - start) / 1000;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < LINE_COUNT; i++) {
        const baseY = (height / (LINE_COUNT - 1)) * i;
        const hue = tone === "dark" ? 193 - (193 - 152) * (i / (LINE_COUNT - 1)) : 205;

        ctx.beginPath();
        for (let p = 0; p <= POINTS_PER_LINE; p++) {
          const x = (width / POINTS_PER_LINE) * p;
          // Same two-sine ambient drift as HeroBackdrop's idle state —
          // no cursor-displacement term added on top here at all.
          const ambient = Math.sin(x * 0.005 + t * 0.3 + i * 0.6) * 12 + Math.sin(x * 0.011 + t * 0.18 + i) * 7;
          const y = baseY + ambient;
          if (p === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.strokeStyle =
          tone === "dark" ? `hsla(${hue}, 80%, 65%, ${baseAlpha})` : `hsla(${hue}, 55%, 26%, ${baseAlpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [tone, opacityScale]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
};

export default SectionBackdrop;
