import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Site-wide custom cursor: a small dot that tracks the mouse with zero
 * added lag, and a larger ring trailing slightly behind it. Hovering any
 * link, button, or element marked `.cursor-target` expands the ring and
 * reveals a short label pulled from that element's `data-cursor-label`
 * attribute, if it has one.
 *
 * WHY TWO ELEMENTS WITH TWO DIFFERENT UPDATE STRATEGIES: the dot is
 * written straight from the raw mousemove event with a direct style
 * mutation — no easing, no GSAP tween — because "no lag" means exactly
 * that: it should never be anywhere other than the cursor's actual
 * current position. The ring uses `gsap.quickTo()` (the same smoothing
 * primitive HeroBackdrop.tsx already uses for the mouse-reactive contour
 * lines) with a short eased duration, which is what produces the "slightly
 * delayed" trailing motion — it's always animating toward wherever the
 * mouse currently is, so it never quite catches up until the mouse stops.
 *
 * WHY DIRECT DOM WRITES INSTEAD OF REACT STATE: mousemove can fire well
 * over 60 times a second. Routing that through React state would mean a
 * re-render on every pixel of mouse movement. Refs point straight at the
 * DOM nodes and every update is a direct style/class mutation instead —
 * the same pattern CustomScrollbar.tsx already uses for the same reason.
 *
 * SCOPE: gated behind `(pointer: fine)` — devices without a real mouse
 * never get this component's effect logic running at all, and the
 * `cursor: none` override in index.css is scoped the same way, so touch
 * devices are entirely unaffected.
 */
const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // A plain object for quickTo to write into every tick — the ring's
    // on-screen position is read from this each frame rather than tweening
    // the DOM element's transform directly, since quickTo needs a
    // JS-property target, not a CSS transform string.
    const ringPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    // Reduced motion: shrink the lag to near-zero rather than removing the
    // ring outright. A cursor that follows the mouse isn't the kind of
    // large-scale motion reduced-motion preferences guard against — the
    // deliberate spring/lag quality is, so that's specifically what gets
    // toned down here.
    const ringDuration = prefersReduced ? 0.05 : 0.35;
    const quickX = gsap.quickTo(ringPos, "x", { duration: ringDuration, ease: "power3" });
    const quickY = gsap.quickTo(ringPos, "y", { duration: ringDuration, ease: "power3" });

    let raf = 0;
    const renderRing = () => {
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(renderRing);
    };
    raf = requestAnimationFrame(renderRing);

    const onMove = (e: MouseEvent) => {
      // The dot: written straight from the event, no smoothing at all —
      // this is the "no lag" half of the pair.
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      // Ensure the cursor visuals are visible as soon as the mouse moves
      // (some browsers won't fire a separate `mouseenter` if the page
      // loaded with the pointer already inside the window).
      dot.style.opacity = "1";
      ring.style.opacity = "1";
      quickX(e.clientX);
      quickY(e.clientY);
    };

    const onLeaveWindow = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };
    const onEnterWindow = () => {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    // Delegated hover detection — one pair of listeners on the document
    // instead of wiring up every individual link/button. `closest()` walks
    // up from whatever was actually hovered (e.g. an icon inside a button)
    // to find the nearest interactive ancestor.
    const HOVER_SELECTOR = 'a, button, [role="button"], .cursor-target';
    const onOverElement = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest?.(HOVER_SELECTOR);
      if (!target) return;
      ring.classList.add("cursor-ring-active");
      const text = target.getAttribute("data-cursor-label");
      if (text) {
        label.textContent = text;
        label.style.opacity = "1";
      }
    };
    const onOutElement = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest?.(HOVER_SELECTOR);
      if (!target) return;
      // relatedTarget is where the mouse is going next — if that's still
      // inside the same interactive element (e.g. moving from a button's
      // label to its icon), this isn't a real "leave" yet.
      const related = e.relatedTarget as HTMLElement | null;
      if (related && target.contains(related)) return;
      ring.classList.remove("cursor-ring-active");
      label.style.opacity = "0";
      label.textContent = "";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeaveWindow);
    window.addEventListener("mouseenter", onEnterWindow);
    document.addEventListener("mouseover", onOverElement);
    document.addEventListener("mouseout", onOutElement);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeaveWindow);
      window.removeEventListener("mouseenter", onEnterWindow);
      document.removeEventListener("mouseover", onOverElement);
      document.removeEventListener("mouseout", onOutElement);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed left-0 top-0 z-[80] h-1.5 w-1.5 rounded-full bg-primary pointer-events-none"
        style={{ opacity: 0, transition: "opacity 0.2s" }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="cursor-ring fixed left-0 top-0 z-[80] flex items-center justify-center rounded-full border border-primary/70 pointer-events-none"
        style={{ opacity: 0, transition: "opacity 0.2s" }}
      >
        <span
          ref={labelRef}
          className="text-[10px] font-body font-semibold uppercase tracking-wide whitespace-nowrap"
          style={{
            opacity: 0,
            transition: "opacity 0.15s",
            // High-contrast label: light text on a semi-opaque dark pill so
            // it remains readable over both light and dark interactive
            // elements.
            color: "hsl(var(--shell-foreground))",
            backgroundColor: "hsl(var(--shell) / 0.88)",
            padding: "4px 6px",
            borderRadius: "6px",
            boxShadow: "0 6px 18px rgba(0,0,0,0.35)",
            pointerEvents: "none",
          }}
        />
      </div>
    </>
  );
};

export default CustomCursor;
