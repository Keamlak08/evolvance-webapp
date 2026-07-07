import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { AlertTriangle, TrendingUp, Users, Zap, Gauge, RefreshCw } from "lucide-react";

/**
 * Pinned scroll sequence between the hero and the phases section.
 *
 * A tall (350vh) wrapper drives scroll progress from 0 to 1. Inside it, a
 * `sticky top-0 h-screen` panel stays pinned for that whole distance,
 * while everything in it is positioned via scroll-linked opacity/y
 * transforms rather than scroll-triggered enter animations — the reveal
 * tracks the scrollbar directly, and reverses cleanly if you scroll back
 * up. Once progress hits 1, the wrapper's bottom edge clears the
 * viewport top and the sticky panel releases on its own — that's just
 * what `position: sticky` does, no manual unpin logic needed. Everything
 * is fully faded out by progress ~0.97 so the release isn't a jump-cut.
 *
 * The heading and the solution block are each wrapped in their own
 * `absolute inset-0 flex items-center justify-center` layer, so both are
 * genuinely centered — horizontally and vertically — rather than
 * positioned by a top percentage that only approximates center.
 *
 * "See how it works" in the hero still anchors straight to #phases,
 * which is a hard jump (no smooth-scroll set anywhere), so it skips this
 * whole sequence rather than scrolling through it.
 */

const painPoints = [
  { text: "repetitive work slowing down teams", top: "12%", left: "6%" },
  { text: "slow decisions hurting customer experience", top: "16%", left: "60%" },
  { text: "scaling by adding extra headcount", top: "68%", left: "10%" },
  { text: "technology spend without measurable roi", top: "72%", left: "56%" },
  { text: "falling behind competitors already using ai", top: "42%", left: "76%" },
  { text: "growth capped by your own bandwidth", top: "46%", left: "2%" },
] as const;

const solutions = [
  { icon: TrendingUp, label: "more qualified leads" },
  { icon: Users, label: "higher conversion rates" },
  { icon: Zap, label: "time back for your team" },
  { icon: Gauge, label: "faster execution" },
  { icon: RefreshCw, label: "a system that keeps improving" },
];

// Fade-in / hold / fade-out across four scroll-progress keyframes. Plain
// linear interpolation between each pair — this is the exact mapping
// that was proven correct in the round before last. A custom `ease`
// option was tried here afterward to soften the motion, but it scrambled
// the interpolation instead of smoothing it (cards ended up visible far
// outside their intended scroll windows). Reverted to plain linear
// rather than risk that kind of breakage again.
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

  const heading1 = useRevealMotion(scrollYProgress, 0.05, 0.12, 0.55, 0.61);

  const card1 = useRevealMotion(scrollYProgress, 0.08, 0.14, 0.55, 0.61);
  const card2 = useRevealMotion(scrollYProgress, 0.13, 0.19, 0.56, 0.62);
  const card3 = useRevealMotion(scrollYProgress, 0.18, 0.24, 0.57, 0.63);
  const card4 = useRevealMotion(scrollYProgress, 0.23, 0.29, 0.58, 0.64);
  const card5 = useRevealMotion(scrollYProgress, 0.28, 0.34, 0.59, 0.65);
  const card6 = useRevealMotion(scrollYProgress, 0.33, 0.39, 0.6, 0.66);
  const cardMotions = [card1, card2, card3, card4, card5, card6];

  const solution = useRevealMotion(scrollYProgress, 0.68, 0.77, 0.91, 0.97);

  return (
    <div ref={wrapperRef} className="relative h-[350vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-background">
        {/* Problem heading — its own full-cover centered layer */}
        <motion.div
          style={{ opacity: heading1.opacity, y: heading1.y }}
          className="absolute inset-0 flex items-center justify-center px-6"
        >
          <p className="text-center font-display text-h2 md:text-h1 font-extrabold text-foreground lowercase max-w-xl">
            sound familiar?
          </p>
        </motion.div>

        {/* Scattered pain-point cards, each with a periodic glitch stutter */}
        {painPoints.map((p, i) => (
          <motion.div
            key={p.text}
            style={{
              opacity: cardMotions[i].opacity,
              y: cardMotions[i].y,
              top: p.top,
              left: p.left,
            }}
            className="absolute max-w-[210px] sm:max-w-[260px] rounded-lg border border-amber-200/80 bg-amber-50 px-3.5 py-2.5 flex items-start gap-2 shadow-sm animate-glitch"
          >
            <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            <span className="text-caption font-body font-medium text-foreground/85 leading-snug lowercase">
              {p.text}
            </span>
          </motion.div>
        ))}

        {/* Solution beat — its own full-cover centered layer */}
        <motion.div
          style={{ opacity: solution.opacity, y: solution.y }}
          className="absolute inset-0 flex items-center justify-center px-6"
        >
          <div className="text-center max-w-2xl">
            <p className="text-overline text-deep-azure mb-3 lowercase">what we fix</p>
            <h2 className="font-display text-h1 font-extrabold text-foreground leading-tight lowercase">
              here's what changes
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-4">
              {solutions.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <Icon className="h-4 w-4 text-deep-azure shrink-0" />
                  <span className="text-caption font-body font-medium text-foreground/80 lowercase">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InteractiveScroll;
