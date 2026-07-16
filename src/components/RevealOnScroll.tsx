import { useLayoutEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  /** Seconds between each direct child's reveal. Irrelevant with one child. */
  stagger?: number;
  /** How far (px) each child starts below its resting position. */
  y?: number;
  /** Starting scale each child "zooms" up from (1 = no zoom). */
  scaleFrom?: number;
  /** Extra delay (seconds) before this wrapper's reveal begins at all. */
  delay?: number;
}

/**
 * The site's one shared entrance-motion signature: every direct child of
 * this wrapper slides up into place, unmasks via a clip-path wipe, and
 * grows from a slightly smaller scale up to its real size, all at once —
 * "slides into place and zooms into its correct size," per the brief.
 * This one component is meant to replace every one-off Framer Motion
 * fadeUp across the site, so cards, text blocks, and (later) images all
 * move the same way instead of each section inventing its own entrance.
 *
 * WHY GSAP + A SHARED WRAPPER INSTEAD OF PER-SECTION FRAMER VARIANTS: the
 * old pattern (a `fadeUp` variants object copy-pasted into every section)
 * meant three different properties (position, scale, clip) would have had
 * to be hand-kept in sync across every call site to change the site's
 * "signature" motion. Centering it in one component means the whole site's
 * entrance motion is defined exactly once — tune it here, it updates
 * everywhere. GSAP is used here (rather than Framer, still used elsewhere
 * in the codebase) because it's already the tool this project reaches for
 * whenever scroll-position needs to drive an animation (see
 * InteractiveScroll.tsx, the hero's horizon line) — one scroll-animation
 * engine, not two competing ones.
 *
 * WHY THE CLIP-PATH DIRECTION IS inset(100% 0% 0% 0%) -> inset(0% 0% 0% 0%):
 * that animates the TOP inset from 100% down to 0%, which grows the
 * visible region upward from the bottom edge — the same direction the
 * `y` slide is already moving (content rising up from below into its
 * resting spot). Both effects reinforcing the same direction is what
 * makes this read as one cohesive "rising into place" motion instead of
 * two effects fighting each other.
 *
 * WHY DIRECT CHILDREN ARE THE ANIMATION TARGETS (not the wrapper itself):
 * wrapping, say, a 4-tile grid and animating each tile with a stagger
 * needs each tile to be its own GSAP target. Using
 * `Array.from(wrapper.children)` means any call site can drop this in as
 * a drop-in replacement for a plain grid/flex container — however many
 * children it has, each one gets its own staggered reveal for free.
 *
 * WHY THE MUTATIONOBSERVER GUARD: IntroSplash.tsx locks body scroll
 * (`overflow: hidden`) while it plays, then restores it once it finishes
 * or is skipped. If this component set up its ScrollTrigger while that
 * lock is still active, any wrapper already within the "start" threshold
 * (most commonly the hero, since it's above the fold) would fire its
 * reveal immediately, finish playing, and already be sitting at its
 * fully-revealed resting state by the time the splash actually lifts — so
 * the entrance motion would never actually be seen. A fixed delay would
 * "solve" this only for one exact splash duration and would break the
 * very next time someone clicks "skip." Watching for the lock to clear
 * (rather than guessing IntroSplash's duration) keeps this component
 * correct regardless of whether the splash plays fully or gets skipped,
 * and without needing to touch IntroSplash.tsx itself at all.
 */
const RevealOnScroll = ({
  children,
  className,
  stagger = 0.12,
  y = 46,
  scaleFrom = 0.94,
  delay = 0,
}: RevealOnScrollProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const targets = Array.from(wrapper.children) as HTMLElement[];
    if (targets.length === 0) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let ctx: gsap.Context | undefined;
    let observer: MutationObserver | undefined;

    const setup = () => {
      ctx = gsap.context(() => {
        if (prefersReduced) {
          gsap.set(targets, { opacity: 1, y: 0, scale: 1, clipPath: "inset(0% 0% 0% 0%)" });
          return;
        }

        gsap.fromTo(
          targets,
          { opacity: 0, y, scale: scaleFrom, clipPath: "inset(100% 0% 0% 0%)" },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.9,
            ease: "power3.out",
            stagger,
            delay,
            scrollTrigger: {
              trigger: wrapper,
              start: "top 85%",
              // once + toggleActions both say the same thing (play forward
              // one time, never reverse) — kept together for clarity since
              // `once` alone would be enough, but spelling out the intent
              // via toggleActions too makes it obvious at a glance this is
              // a one-shot reveal, not a scrub, unlike InteractiveScroll's
              // pinned timeline.
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      }, wrapper);
    };

    if (document.body.style.overflow === "hidden") {
      observer = new MutationObserver(() => {
        if (document.body.style.overflow !== "hidden") {
          observer?.disconnect();
          setup();
        }
      });
      observer.observe(document.body, { attributes: true, attributeFilter: ["style"] });
    } else {
      setup();
    }

    return () => {
      observer?.disconnect();
      ctx?.revert();
    };
  }, [stagger, y, scaleFrom, delay]);

  return (
    <div ref={wrapperRef} className={className}>
      {children}
    </div>
  );
};

export default RevealOnScroll;
