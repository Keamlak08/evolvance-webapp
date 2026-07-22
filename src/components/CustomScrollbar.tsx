import { useEffect, useRef } from "react";
import { waitForSplashClear } from "@/lib/waitForSplashClear";

/**
 * Replaces the browser's native scrollbar with a thin, translucent overlay
 * thumb that sits on top of the page instead of reserving layout width.
 *
 * WHY THIS EXISTS: the native scrollbar takes up real width whenever the
 * page is tall enough to scroll, and gives that width back when it isn't.
 * That's exactly what caused the bug reported after the splash screen —
 * the intro locks the page from scrolling (no scrollbar, full width),
 * then unlocks it, the browser adds a scrollbar, and every `100%`-wide
 * container instantly gets a little narrower — a visible sideways jump.
 * The only way to guarantee that never happens is to make sure the native
 * scrollbar never appears in the first place, on any page, at any time —
 * which is what the `scrollbar-width`/`::-webkit-scrollbar` rules in
 * index.css do globally. This component is what replaces it, so scroll
 * position is still visible and still usable by mouse.
 *
 * HOW IT WORKS: a fixed-position thumb whose height is proportional to
 * (viewport height / document height) and whose vertical offset is
 * proportional to scroll position — the same math a native scrollbar
 * thumb uses. It's built with plain refs and direct style writes (not
 * React state) so dragging/scrolling never triggers a re-render; this is
 * a 60fps-scrubbed UI element, not app state. It fades in on scroll/hover
 * and fades out after a short idle period, matching the "minimalist,
 * appears when needed" overlay-scrollbar behavior the redesign asked for.
 */
const CustomScrollbar = () => {
  const thumbRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const thumb = thumbRef.current;
    const track = trackRef.current;
    if (!thumb || !track) return;

    let fadeTimeout: ReturnType<typeof setTimeout>;
    let dragging = false;
    // Offset between the pointer and the thumb's own top edge at the
    // moment a drag starts, so the thumb doesn't jump to re-center under
    // the cursor the instant you grab it.
    let dragOffset = 0;

    const MIN_THUMB_HEIGHT = 32;

    const layout = () => {
      const doc = document.documentElement;
      const viewportH = window.innerHeight;
      const scrollableH = doc.scrollHeight;
      const scrollTop = window.scrollY;

      const trackH = viewportH - 16; // small inset from top/bottom edges
      const thumbH = Math.max(MIN_THUMB_HEIGHT, (viewportH / scrollableH) * trackH);
      const maxScrollTop = Math.max(1, scrollableH - viewportH);
      const thumbTravel = trackH - thumbH;
      const thumbTop = (Math.min(scrollTop, maxScrollTop) / maxScrollTop) * thumbTravel;

      thumb.style.height = `${thumbH}px`;
      thumb.style.transform = `translateY(${thumbTop}px)`;

      // If there's nothing to scroll, don't show a full-height thumb that
      // implies you can — just hide the whole control.
      track.style.display = scrollableH <= viewportH + 1 ? "none" : "block";
    };

    const showThenFade = () => {
      thumb.style.opacity = "1";
      clearTimeout(fadeTimeout);
      fadeTimeout = setTimeout(() => {
        if (!dragging) thumb.style.opacity = "0";
      }, 900);
    };

    const onScroll = () => {
      layout();
      showThenFade();
    };

    const onPointerDownThumb = (e: PointerEvent) => {
      dragging = true;
      dragOffset = e.clientY - thumb.getBoundingClientRect().top;
      thumb.setPointerCapture(e.pointerId);
      thumb.style.opacity = "1";
      e.preventDefault();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const doc = document.documentElement;
      const viewportH = window.innerHeight;
      const scrollableH = doc.scrollHeight;
      const trackH = viewportH - 16;
      const thumbH = thumb.getBoundingClientRect().height;
      const thumbTravel = Math.max(1, trackH - thumbH);
      const trackRect = track.getBoundingClientRect();

      const rawTop = e.clientY - trackRect.top - dragOffset;
      const clampedTop = Math.min(Math.max(rawTop, 0), thumbTravel);
      const maxScrollTop = Math.max(1, scrollableH - viewportH);

      window.scrollTo({ top: (clampedTop / thumbTravel) * maxScrollTop });
    };

    const onPointerUp = () => {
      dragging = false;
      showThenFade();
    };

    // Clicking the empty track (not the thumb itself) jumps one viewport,
    // the same "page up/down" behavior a native scrollbar track gives you.
    const onTrackClick = (e: MouseEvent) => {
      if (e.target !== track) return;
      const clickedBelowThumb = e.clientY > thumb.getBoundingClientRect().bottom;
      window.scrollBy({
        top: clickedBelowThumb ? window.innerHeight * 0.9 : -window.innerHeight * 0.9,
        behavior: "smooth",
      });
    };

    const onThumbEnter = () => {
      clearTimeout(fadeTimeout);
      thumb.style.opacity = "1";
    };
    const onThumbLeave = () => {
      if (!dragging) showThenFade();
    };

    // Deferred (not called immediately): computing thumb size/position off
    // document.documentElement.scrollHeight while IntroSplash still has the
    // real page hidden behind it risks an initial measurement taken before
    // everything (images especially) has settled, which the thumb would
    // then have to visibly correct the moment the splash reveals it — see
    // src/lib/waitForSplashClear.ts for the full reasoning. The scroll/
    // resize/ResizeObserver listeners below stay attached immediately either
    // way, since merely listening is inert until an actual event fires.
    const cancelWait = waitForSplashClear(() => {
      layout();
      showThenFade();
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", layout);
    // A ResizeObserver on <body> catches content-height changes that
    // don't come with a window resize event — e.g. the pinned scroll
    // section's height, images loading in, or fonts causing reflow.
    const ro = new ResizeObserver(() => layout());
    ro.observe(document.body);

    thumb.addEventListener("pointerdown", onPointerDownThumb);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    track.addEventListener("mousedown", onTrackClick);
    thumb.addEventListener("mouseenter", onThumbEnter);
    thumb.addEventListener("mouseleave", onThumbLeave);

    return () => {
      cancelWait();
      clearTimeout(fadeTimeout);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", layout);
      ro.disconnect();
      thumb.removeEventListener("pointerdown", onPointerDownThumb);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      track.removeEventListener("mousedown", onTrackClick);
      thumb.removeEventListener("mouseenter", onThumbEnter);
      thumb.removeEventListener("mouseleave", onThumbLeave);
    };
  }, []);

  return (
    <div
      ref={trackRef}
      aria-hidden="true"
      className="fixed right-1 top-2 bottom-2 z-[60] w-2.5 hidden md:block"
    >
      <div
        ref={thumbRef}
        className="w-1 mx-auto rounded-full bg-primary/80 hover:bg-primary transition-[opacity,background-color] duration-300 cursor-pointer shadow-[0_0_4px_rgba(0,0,0,0.35)]"
        style={{ opacity: 0 }}
      />
    </div>
  );
};

export default CustomScrollbar;
