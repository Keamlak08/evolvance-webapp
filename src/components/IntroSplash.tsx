import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// A single, gentler curve throughout — this is what "more cinematic" comes
// down to technically: fewer sharp power-curves, one consistent smooth
// ease used everywhere so nothing feels like it's snapping into place.
const ease: [number, number, number, number] = [0.4, 0, 0.2, 1];

const swipeUp = {
  initial: { y: "100%", opacity: 0 },
  animate: { y: "0%", opacity: 1 },
  exit: { y: "-100%", opacity: 0 },
};

/**
 * Full-screen intro. Plays on every load, no session gate.
 *
 * Three beats, paced to feel deliberate rather than quick:
 *  1. "don't just grow your business" swipes up, holds, swipes out.
 *  2. "evolve it" swipes into the same slot. "Evolv" + the trailing "e"
 *     sit in the gradient; " it" is plain white, not gradient.
 *  3. The trailing "e it" dissolves in place and "ance" settles into the
 *     same spot, turning "evolve it" into "evolvance" without the fixed
 *     "evolv" prefix ever moving. Then the whole screen wipes upward to
 *     reveal the site underneath.
 *
 * Everything is lowercase and set at the same size — no phase is trying
 * to be bigger or more important than the other.
 */
const IntroSplash = () => {
  const [phase, setPhase] = useState<0 | 1>(0);
  const [morphing, setMorphing] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [visible, setVisible] = useState(true);
  const reduce = useReducedMotion();

  const finish = useCallback(() => {
    setExiting(true);
    setTimeout(() => {
      document.body.style.overflow = "";
      setVisible(false);
    }, 950);
  }, []);

  const skip = useCallback(() => {
    if (!exiting) finish();
  }, [exiting, finish]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    if (reduce) {
      finish();
      return;
    }
    if (phase === 0) {
      const t = setTimeout(() => setPhase(1), 1900);
      return () => clearTimeout(t);
    }
    if (phase === 1) {
      const t1 = setTimeout(() => setMorphing(true), 1550);
      const t2 = setTimeout(() => finish(), 2650);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [phase, reduce, finish]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") skip();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [skip]);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-hidden flex items-center justify-center bg-shell cursor-pointer"
      onClick={skip}
      initial={{ y: 0 }}
      animate={exiting ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 0.95, ease }}
    >
      <div className="relative w-full px-6 text-center">
        <AnimatePresence mode="wait">
          {phase === 0 && (
            <div key="p0" className="overflow-hidden">
              <motion.p
                initial={swipeUp.initial}
                animate={swipeUp.animate}
                exit={swipeUp.exit}
                transition={{ duration: 0.75, ease }}
                className="font-body font-bold text-white text-lg sm:text-xl md:text-2xl tracking-tight lowercase"
              >
                don't just grow your business
              </motion.p>
            </div>
          )}

          {phase === 1 && (
            <div key="p1" className="overflow-hidden">
              <motion.div
                initial={swipeUp.initial}
                animate={swipeUp.animate}
                exit={swipeUp.exit}
                transition={{ duration: 0.75, ease }}
                className="font-display font-extrabold text-lg sm:text-xl md:text-2xl inline-flex items-center justify-center whitespace-nowrap lowercase"
              >
                <span className="gradient-text-bright">evolv</span>
                <span className="relative inline-block text-left">
                  {/* old suffix — the part that vanishes. "e" stays gradient
                      since it's part of "evolve"; " it" is plain white. */}
                  <motion.span
                    className="inline-block"
                    animate={{ opacity: morphing ? 0 : 1, y: morphing ? -8 : 0 }}
                    transition={{ duration: 0.5, ease }}
                  >
                    <span className="gradient-text-bright">e</span>
                    <span className="text-white">{" it"}</span>
                  </motion.span>
                  {/* new suffix — settles into the exact same spot */}
                  <motion.span
                    className="gradient-text-bright absolute left-0 top-0 inline-block"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: morphing ? 1 : 0, y: morphing ? 0 : 8 }}
                    transition={{ duration: 0.5, ease }}
                  >
                    ance
                  </motion.span>
                </span>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          skip();
        }}
        className="absolute bottom-6 right-6 z-20 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-caption font-body font-semibold text-white/60 backdrop-blur-sm transition hover:border-white/50 hover:text-white lowercase"
      >
        skip &rarr;
      </button>
    </motion.div>
  );
};

export default IntroSplash;
