import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { AlertTriangle, TrendingUp, Users, Zap, Gauge, RefreshCw } from "lucide-react";

/**
 * Pinned scroll sequence between the hero and the phases section.
 *
 * Mechanics: a tall (350vh) wrapper drives scroll progress from 0 to 1.
 * Inside it, a `sticky top-0 h-screen` panel stays pinned to the viewport
 * for the wrapper's full scroll distance, and everything inside it is
 * positioned via scroll-linked opacity/y transforms rather than
 * scroll-triggered enter animations — so the reveal tracks the scrollbar
 * directly instead of firing once and being done.
 *
 * Once progress hits 1, the wrapper's bottom edge passes the viewport top
 * and the sticky panel releases on its own (that's what `position: sticky`
 * does) — no manual "unpin" logic needed. Content is fully faded out by
 * progress ~0.97 so the release itself is invisible, not a jump-cut.
 *
 * "See How It Works" in the hero anchors straight to #phases, which is a
 * hard anchor jump (no smooth-scroll is set globally), so it skips this
 * whole sequence rather than animating through it.
 */

const painPoints = [
  { text: "Repetitive work slowing down teams", top: "12%", left: "6%" },
  { text: "Slow decisions hurting customer experience", top: "16%", left: "60%" },
  { text: "Scaling by adding extra headcount", top: "68%", left: "10%" },
  { text: "Technology spend without measurable ROI", top: "72%", left: "56%" },
  { text: "Falling behind competitors already using AI", top: "42%", left: "76%" },
  { text: "Growth capped by your own bandwidth", top: "46%", left: "2%" },
] as const;

const solutions = [
  { icon: TrendingUp, label: "Increasing new-client leads" },
  { icon: Users, label: "Enhancing client conversion rates" },
  { icon: Zap, label: "Freeing team capacity" },
  { icon: Gauge, label: "Improving task execution speed" },
  { icon: RefreshCw, label: "Continuous process improvement" },
];

// Fade-in / hold / fade-out across four progress keyframes. Framer Motion
// interpolates linearly between each consecutive pair, so [in0,1] then
// [1,1] (a flat hold) then [1,0] falls out of the same call.
function useRevealMotion(
  progress: MotionValue<number>,
  inStart: number,
  inEnd: number,
  outStart: number,
  outEnd: number
) {
  const opacity = useTransform(progress, [inStart, inEnd, outStart, outEnd], [0, 1, 1, 0]);
  const y = useTransform(progress, [inStart, inEnd, outStart, outEnd], [18, 0, 0, -14]);
  return { opacity, y };
}

const InteractiveScroll = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  // Problem heading — up early, clears once the cards start dismissing.
  const heading1 = useRevealMotion(scrollYProgress, 0.05, 0.11, 0.55, 0.6);

  // Six pain-point cards, staggered on entry so they land one at a time,
  // grouped closer together on exit so the screen clears in one motion.
  const card1 = useRevealMotion(scrollYProgress, 0.08, 0.13, 0.55, 0.6);
  const card2 = useRevealMotion(scrollYProgress, 0.13, 0.18, 0.56, 0.61);
  const card3 = useRevealMotion(scrollYProgress, 0.18, 0.23, 0.57, 0.62);
  const card4 = useRevealMotion(scrollYProgress, 0.23, 0.28, 0.58, 0.63);
  const card5 = useRevealMotion(scrollYProgress, 0.28, 0.33, 0.59, 0.64);
  const card6 = useRevealMotion(scrollYProgress, 0.33, 0.38, 0.6, 0.65);
  const cardMotions = [card1, card2, card3, card4, card5, card6];

  // Solution beat — heading + list arrive together after the cards clear.
  const solution = useRevealMotion(scrollYProgress, 0.68, 0.76, 0.91, 0.97);

  return (
    <div ref={wrapperRef} className="relative h-[350vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-background flex items-center justify-center">
        {/* Problem heading */}
        <motion.p
          style={{ opacity: heading1.opacity, y: heading1.y }}
          className="absolute top-[26%] left-1/2 -translate-x-1/2 w-[90%] max-w-xl text-center font-display text-h2 md:text-h1 font-extrabold text-foreground px-4"
        >
          Sound familiar?
        </motion.p>

        {/* Scattered pain-point cards */}
        {painPoints.map((p, i) => (
          <motion.div
            key={p.text}
            style={{
              opacity: cardMotions[i].opacity,
              y: cardMotions[i].y,
              top: p.top,
              left: p.left,
            }}
            className="absolute max-w-[210px] sm:max-w-[260px] rounded-lg border border-amber-200/80 bg-amber-50 px-3.5 py-2.5 flex items-start gap-2 shadow-sm"
          >
            <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            <span className="text-caption font-body font-medium text-foreground/85 leading-snug">
              {p.text}
            </span>
          </motion.div>
        ))}

        {/* Solution beat */}
        <motion.div
          style={{ opacity: solution.opacity, y: solution.y }}
          className="absolute inset-x-0 px-6 text-center"
        >
          <p className="text-overline text-deep-azure mb-3">Here's how we fix it</p>
          <h2 className="font-display text-h1 font-extrabold text-foreground max-w-xl mx-auto leading-tight">
            We help you achieve
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-4 max-w-2xl mx-auto">
            {solutions.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5">
                <Icon className="h-4 w-4 text-deep-azure shrink-0" />
                <span className="text-caption font-body font-medium text-foreground/80">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InteractiveScroll;
