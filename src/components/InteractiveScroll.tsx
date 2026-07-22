import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AlertTriangle, TrendingUp, Users, Zap, Gauge, RefreshCw, Repeat, LucideIcon } from "lucide-react";
import SectionBackdrop from "@/components/SectionBackdrop";

gsap.registerPlugin(ScrollTrigger);

/**
 * Pinned scroll sequence between the hero and the phases section.
 *
 * WHY GSAP SCROLLTRIGGER INSTEAD OF FRAMER'S useScroll/useTransform: a
 * GSAP timeline lets every element get an explicit `.fromTo()` tween
 * placed at an explicit *time*, and a value simply *holds* at whatever it
 * last tweened to until the next tween touches that property again —
 * there's no need to hand-author a "hold" plateau the way Framer's
 * useTransform keyframe arrays required, which is what caused the old
 * unpredictable fade in/out.
 *
 * LAYOUT — SCATTERED BUT CONTAINED: each pain-point card has its own
 * fixed (top/left) position around the centered heading — a moderate
 * scatter, not touching the viewport edges, so everything reads as
 * "around the centered text" rather than either (a) flung out to the
 * corners, which the first pass did, or (b) locked into two rigid slots,
 * which the second pass did. Positions are hand-placed to avoid the
 * heading's own footprint in the center of the screen.
 *
 * REVEAL — ONE AT A TIME, ACCUMULATING: cards swipe up into place one at
 * a time as the user scrolls (not two at once), and once shown they stay
 * on screen (they don't fade back out individually) — so by the time all
 * six have appeared, all six are visible together, then the whole group
 * clears at once before the solution beat begins.
 *
 * THE GLITCH EFFECT: each card's entrance also fires a short, fixed-
 * length CSS keyframe burst (see `.glitch-card` in index.css) via
 * `playGlitch()`, timed to the same moment the card swipes up. That burst
 * is not scrubbed — it's a quick one-off animation layered on top of the
 * scrubbed swipe, since a real glitch needs to just happen quickly rather
 * than stretch or reverse smoothly with the scrollbar.
 *
 * SOLUTION BEAT — BACK TO A PLAIN LIST: "Evolvance helps solve this"
 * followed by a single vertical list of fixes, each appearing one by one
 * as before. It also persists once fully revealed instead of fading out
 * (see the `persist` flag below) — scrolling further down releases the
 * pin and it scrolls away as ordinary page content; scrolling back up
 * still reverses everything normally either way.
 */

const painPoints = [
  { text: "Repetitive work slowing down teams", top: "-15%", left: "20%" },
  { text: "Slow decisions hurting customer experience", top: "-12%", left: "34%" },
  { text: "Falling behind competitors already using AI", top: "15%", left: "-3%" },
  { text: "Growth capped by your own bandwidth", top: "5%", left: "15%" },
  { text: "Scaling by adding extra headcount", top: "0%", left: "-40%" },
  { text: "Scattered AI tools", top: "20%", left: "-20%" },
] as const;

// Each solution answers the pain point at the same index — a deliberate
// 1:1 structural echo (problem #3 -> fix #3) rather than a generic list,
// and worded around outcomes/fixes rather than named capabilities, so it
// doesn't restate the "what we can do" capability list in SkillsBento.
const solutions: { icon: LucideIcon; label: string }[] = [
  { icon: Zap, label: "We hand the busywork to AI systems that don't get tired" },
  { icon: TrendingUp, label: "Faster answers mean a better customer experience" },
  { icon: RefreshCw, label: "You adopt AI on your terms, not playing catch-up" },
  { icon: Repeat, label: "Growth that isn't capped by your calendar" },
  { icon: Users, label: "More output from the team you already have" },
  { icon: Gauge, label: "Every dollar tied to a result you can point to" },
];

// Timeline pacing constants (arbitrary GSAP "time" units — the whole
// timeline is scrubbed to scroll position, so these are relative weights,
// not real seconds). Named instead of left as magic numbers so the pacing
// can be re-tuned by changing one number in one place.
const HEADING_IN = 0.6;
const SETTLE = 0.3; // pause after a heading lands before the cascade starts
const CARD_STAGGER = 0.4; // gap between each card/item's start time
const CARD_DURATION = 0.5;
const HOLD_AFTER_CASCADE = 1.3; // how long the full set stays visible before clearing
const GROUP_EXIT_DURATION = 0.45;
const SECTION_GAP = 0.35; // blank beat between the problem beat and the solution beat
const HOLD_BEFORE_RELEASE = 0.4; // reading time on the fully-revealed solution list
const TAIL_BUFFER = 0.3; // extra scroll distance before the pin releases

/** Plays a short, fixed-length "digital glitch" burst on a card by toggling
 * the `.is-glitching` class that drives the CSS keyframes in index.css.
 * The class is removed again after the burst finishes so the animation
 * can replay if the user scrolls back over this point later. */
function playGlitch(el: HTMLElement | null) {
  if (!el) return;
  el.classList.remove("is-glitching");
  // Force a reflow so re-adding the class restarts the CSS animation even
  // if it's already been played once — without this, toggling the class
  // off/on in the same tick can be batched by the browser and the
  // animation won't actually restart.
  void el.offsetWidth;
  el.classList.add("is-glitching");
  gsap.delayedCall(0.45, () => el.classList.remove("is-glitching"));
}

const InteractiveScroll = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const problemHeadingRef = useRef<HTMLParagraphElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const solutionHeadingRef = useRef<HTMLDivElement>(null);
  const solutionItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // gsap.context() scopes every tween/ScrollTrigger created inside it so
    // ctx.revert() (in the cleanup below) tears all of it down cleanly.
    // This matters specifically in React: without it, React 18 StrictMode's
    // dev-mode double-invoke of effects can leave duplicate ScrollTriggers
    // and a duplicate pin behind, which is a classic cause of a pinned
    // section silently breaking (visually stacking or jumping).
    const ctx = gsap.context(() => {
      const allEls = [
        problemHeadingRef.current,
        ...cardRefs.current,
        solutionHeadingRef.current,
        ...solutionItemRefs.current,
      ];

      if (prefersReduced) {
        // Respect reduced motion by skipping the pin/scrub machinery
        // entirely and simply showing every element already in place.
        gsap.set(allEls, { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: panelRef.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // ---- Problem heading --------------------------------------------
      tl.fromTo(problemHeadingRef.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: HEADING_IN }, 0);

      // ---- Six pain-point cards: one at a time, swipe up, accumulate ---
      let cursor = HEADING_IN + SETTLE;
      const cardStarts: number[] = [];
      painPoints.forEach((_, i) => {
        const startAt = cursor;
        cardStarts.push(startAt);
        tl.fromTo(
          cardRefs.current[i],
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: CARD_DURATION, ease: "back.out(1.4)" },
          startAt
        ).call(() => playGlitch(cardRefs.current[i]), [], startAt);
        cursor += CARD_STAGGER;
      });
      const lastCardEnd = cardStarts[cardStarts.length - 1] + CARD_DURATION;
      const groupExitStart = lastCardEnd + HOLD_AFTER_CASCADE;

      // One tween for everything at once (not staggered) is what makes
      // this read as a single clean group exit rather than cards
      // trickling away one by one — the opposite motion quality from the
      // accumulating entrance.
      tl.to(
        [problemHeadingRef.current, ...cardRefs.current],
        { opacity: 0, y: -14, duration: GROUP_EXIT_DURATION, ease: "power2.in" },
        groupExitStart
      );

      // ---- Solution beat: heading, then a plain vertical list ----------
      const solutionHeadingStart = groupExitStart + GROUP_EXIT_DURATION + SECTION_GAP;
      tl.fromTo(
        solutionHeadingRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: HEADING_IN },
        solutionHeadingStart
      );

      let solutionCursor = solutionHeadingStart + HEADING_IN + SETTLE;
      const solutionStarts: number[] = [];
      solutions.forEach((_, i) => {
        const startAt = solutionCursor;
        solutionStarts.push(startAt);
        tl.fromTo(
          solutionItemRefs.current[i],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: CARD_DURATION, ease: "power2.out" },
          startAt
        );
        solutionCursor += CARD_STAGGER;
      });
      const lastSolutionEnd = solutionStarts[solutionStarts.length - 1] + CARD_DURATION;

      // No exit tween here on purpose — the solution list persists once
      // revealed. Scrolling further releases the pin and it scrolls away
      // as ordinary page content instead of animating out; scrolling back
      // up still reverses the reveal normally either way.
      const solutionEnd = lastSolutionEnd + HOLD_BEFORE_RELEASE;
      tl.to({}, { duration: TAIL_BUFFER }, solutionEnd);
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="relative h-[480vh]">
      <div
        ref={panelRef}
        className="relative h-screen w-full overflow-hidden bg-background flex items-center justify-center"
      >
        {/* "A little bit of a backdrop" — the same ambient contour texture
            as the sections below, at half its already-quiet opacity, so
            it reads as a faint connective touch behind the pinned cards
            rather than competing with them or the glitch effect. */}
        <SectionBackdrop tone="light" opacityScale={0.5} />

        {/* Problem heading, dead center */}
        <p
          ref={problemHeadingRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-xl text-center font-display text-h2 md:text-h1 font-extrabold text-foreground px-4 opacity-0"
        >
          Sound familiar?
        </p>

        {/* Scattered pain-point cards, positioned around the heading —
            moderate spread, never touching the viewport edges. */}
        {painPoints.map((p, i) => (
          <div
            key={p.text}
            ref={(el) => (cardRefs.current[i] = el)}
            style={{ top: p.top, left: p.left }}
            className="glitch-card absolute max-w-[200px] sm:max-w-[250px] rounded-lg border border-amber-200/80 bg-amber-50 px-3.5 py-2.5 flex items-start gap-2 shadow-sm opacity-0"
          >
            <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            <span className="text-caption font-body font-medium text-foreground/85 leading-snug">{p.text}</span>
          </div>
        ))}

        {/* Solution beat — plain vertical list, one item at a time */}
        <div ref={solutionHeadingRef} className="absolute inset-x-0 top-[20%] px-6 text-center opacity-0">
          <h2 className="font-display text-h1 font-extrabold text-foreground max-w-xl mx-auto leading-tight">
            <span className="gradient-text">Evolvance</span> helps solve this
          </h2>
        </div>

        <div className="absolute inset-x-0 top-[38%] px-6">
          <div className="mx-auto flex max-w-xl flex-col gap-4">
            {solutions.map(({ icon: Icon, label }, i) => (
              <div
                key={label}
                ref={(el) => (solutionItemRefs.current[i] = el)}
                className="flex items-center gap-3 rounded-lg border border-border bg-card/60 px-4 py-3 opacity-0"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-pale-azure">
                  <Icon className="h-4 w-4 text-deep-azure" />
                </div>
                <span className="text-caption font-body font-medium text-foreground/85">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveScroll;
