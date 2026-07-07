import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AlertTriangle, TrendingUp, Users, Zap, Gauge, RefreshCw, Repeat } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Pinned scroll sequence between the hero and the phases section.
 *
 * WHY THIS WAS REBUILT ON GSAP SCROLLTRIGGER INSTEAD OF FRAMER'S
 * useScroll/useTransform: the old version mapped scroll progress to
 * opacity/y through arrays of keyframe numbers (e.g. [0.05, 0.11, 0.55,
 * 0.6]), which is fiddly to reason about and easy to get wrong by a
 * fraction of a percent — small overlaps between "windows" are exactly
 * what caused the old unpredictable fade in/out. ScrollTrigger + a GSAP
 * timeline solves this more directly: every element gets an explicit
 * `.fromTo()` tween placed at an explicit *time* on one shared timeline,
 * and — this is the actual fix — a value simply *holds* at whatever it
 * last tweened to until the next tween touches that property again. There
 * is no need to hand-author a "hold" plateau the way the old keyframe
 * arrays did; it's the default behavior, which is exactly why this is more
 * reliable, not just a different way of writing the same thing.
 *
 * HOW THE PIN + SCRUB WORKS: `wrapperRef` is a tall (440vh) div.
 * ScrollTrigger pins `panelRef` (a full-viewport panel) for the wrapper's
 * entire scroll distance, and `scrub: 1` ties the master timeline's
 * playhead directly to how far the user has scrolled through that
 * distance — scroll down, the timeline plays forward; scroll up, it plays
 * backward; stop scrolling, it stops exactly where it is. That's the
 * "precise pinned-scroll-progress control" GSAP is built for.
 *
 * THE GLITCH EFFECT: each pain-point card's entrance also fires a short,
 * fixed-length CSS keyframe burst (see `.glitch-card` in index.css) via
 * `playGlitch()`. That burst is *not* scrubbed — it's a quick one-off
 * animation triggered at the right timeline position, layered on top of
 * the scrubbed fade/slide. Trying to scrub a glitch effect frame-by-frame
 * with scroll position would fight the "brief flicker/cut" nature of a
 * real glitch, which needs to just happen quickly, not stretch or reverse
 * smoothly with the scrollbar.
 */

const painPoints = [
  { text: "Repetitive work slowing down teams", top: "12%", left: "6%" },
  { text: "Slow decisions hurting customer experience", top: "16%", left: "60%" },
  { text: "Scaling by adding extra headcount", top: "68%", left: "10%" },
  { text: "Technology spend without measurable ROI", top: "72%", left: "56%" },
  { text: "Falling behind competitors already using AI", top: "42%", left: "76%" },
  { text: "Growth capped by your own bandwidth", top: "46%", left: "2%" },
] as const;

// Each solution answers the pain point at the same index — a deliberate
// 1:1 structural echo (problem #3 -> fix #3) rather than a generic list,
// and worded around outcomes/fixes rather than named capabilities, so it
// doesn't restate the "what we can do" capability list in SkillsBento.
const solutions = [
  { icon: Zap, label: "We hand the busywork to AI systems that don't get tired" },
  { icon: TrendingUp, label: "Faster answers mean a better customer experience" },
  { icon: Users, label: "More output from the team you already have" },
  { icon: Gauge, label: "Every dollar tied to a result you can point to" },
  { icon: RefreshCw, label: "You adopt AI on your terms, not playing catch-up" },
  { icon: Repeat, label: "Growth that isn't capped by your calendar" },
] as const;

// Timeline pacing constants (in arbitrary GSAP "time" units — since the
// whole timeline is scrubbed to scroll position, these are relative
// weights, not real seconds). Named instead of left as magic numbers so
// the pacing can be re-tuned by changing one number in one place.
const CARD_DURATION = 0.45;
const STAGGER_STEP = 0.4; // gap between each card's start time
const HOLD_AFTER_CARDS = 1.25; // how long the full set stays fully visible
const GROUP_EXIT_DURATION = 0.4;
const SECTION_GAP = 0.3; // blank beat between the problem and solution beats
const HOLD_AFTER_SOLUTIONS = 1.25;
const TAIL_BUFFER = 0.3; // empty time before the pin releases, so the exit fully finishes first

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
  const headingRef = useRef<HTMLParagraphElement>(null);
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
      if (prefersReduced) {
        // Respect reduced motion by skipping the pin/scrub machinery
        // entirely and simply showing every element already in place.
        gsap.set(
          [headingRef.current, ...cardRefs.current, solutionHeadingRef.current, ...solutionItemRefs.current],
          { opacity: 1, y: 0 }
        );
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

      // ---- Problem heading -------------------------------------------------
      tl.fromTo(headingRef.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.5 }, 0);

      // ---- Six pain-point cards, staggered in, held, then group-exit -------
      let cursor = 0.5;
      const cardStarts: number[] = [];
      painPoints.forEach((_, i) => {
        const startAt = cursor;
        cardStarts.push(startAt);
        tl.fromTo(
          cardRefs.current[i],
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: CARD_DURATION, ease: "power2.out" },
          startAt
        ).call(() => playGlitch(cardRefs.current[i]), [], startAt);
        cursor += STAGGER_STEP;
      });
      const lastCardEnd = cardStarts[cardStarts.length - 1] + CARD_DURATION;
      const groupExitStart = lastCardEnd + HOLD_AFTER_CARDS;

      // Fading everything out in ONE tween (not staggered) is what makes
      // this read as a single clean group exit rather than cards trickling
      // away one by one — the opposite motion quality from the entrance.
      tl.to(
        [headingRef.current, ...cardRefs.current],
        { opacity: 0, y: -14, duration: GROUP_EXIT_DURATION, ease: "power2.in" },
        groupExitStart
      );

      // ---- "Evolvance helps solve this" + solutions, same mechanic --------
      const solutionHeadingStart = groupExitStart + GROUP_EXIT_DURATION + SECTION_GAP;
      tl.fromTo(
        solutionHeadingRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5 },
        solutionHeadingStart
      );

      let solutionCursor = solutionHeadingStart + 0.7;
      const solutionStarts: number[] = [];
      solutions.forEach((_, i) => {
        const startAt = solutionCursor;
        solutionStarts.push(startAt);
        tl.fromTo(
          solutionItemRefs.current[i],
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: CARD_DURATION, ease: "power2.out" },
          startAt
        );
        solutionCursor += STAGGER_STEP;
      });
      const lastSolutionEnd = solutionStarts[solutionStarts.length - 1] + CARD_DURATION;
      const solutionExitStart = lastSolutionEnd + HOLD_AFTER_SOLUTIONS;

      tl.to(
        [solutionHeadingRef.current, ...solutionItemRefs.current],
        { opacity: 0, y: -14, duration: GROUP_EXIT_DURATION, ease: "power2.in" },
        solutionExitStart
      );

      // Trailing silence so the exit fully completes before the pin
      // releases — otherwise the un-pin can land mid-fade and read as a
      // jump-cut instead of a resolved ending.
      tl.to({}, { duration: TAIL_BUFFER }, solutionExitStart + GROUP_EXIT_DURATION);
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="relative h-[440vh]">
      <div ref={panelRef} className="h-screen w-full overflow-hidden bg-background flex items-center justify-center">
        {/* Problem heading */}
        <p
          ref={headingRef}
          className="absolute top-[26%] left-1/2 -translate-x-1/2 w-[90%] max-w-xl text-center font-display text-h2 md:text-h1 font-extrabold text-foreground px-4 opacity-0"
        >
          Sound familiar?
        </p>

        {/* Scattered pain-point cards */}
        {painPoints.map((p, i) => (
          <div
            key={p.text}
            ref={(el) => (cardRefs.current[i] = el)}
            style={{ top: p.top, left: p.left }}
            className="glitch-card absolute max-w-[210px] sm:max-w-[260px] rounded-lg border border-amber-200/80 bg-amber-50 px-3.5 py-2.5 flex items-start gap-2 shadow-sm opacity-0"
          >
            <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            <span className="text-caption font-body font-medium text-foreground/85 leading-snug">{p.text}</span>
          </div>
        ))}

        {/* Solution beat — "evolvance helps solve this," then each fix
            reveals one at a time, in the same order as the pain points
            above (problem #1 pairs with fix #1, and so on). */}
        <div ref={solutionHeadingRef} className="absolute inset-x-0 top-[20%] px-6 text-center opacity-0">
          <p className="text-overline text-deep-azure mb-3">Here's how we fix it</p>
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
