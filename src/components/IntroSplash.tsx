import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const easeSmooth: [number, number, number, number] = [0.22, 1, 0.36, 1];
const easeWipe: [number, number, number, number] = [0.76, 0, 0.24, 1];

const swipeUp = {
  initial: { y: "100%", opacity: 0 },
  animate: { y: "0%", opacity: 1 },
  exit: { y: "-100%", opacity: 0 },
};

/**
 * Full-screen intro. Plays on every load — no session gate this time, by
 * request — so the skip button (click anywhere, or Esc/Enter/Space) isn't
 * a nice-to-have, it's the escape hatch for anyone who's seen it already.
 *
 * Three beats, tuned to be quick rather than cinematic:
 *  1. "don't just grow your business" swipes up, holds briefly, swipes out.
 *  2. "evolve it" swipes into the same slot. "Evolv" + the trailing "e"
 *     are in the gradient; " it" is plain white, not gradient.
 *  3. The trailing "e it" dissolves in place and "ance" settles into the
 *     same spot, turning "evolve it" into "evolvance" without the fixed
 *     "Evolv" prefix ever moving. Then the whole screen wipes upward to
 *     reveal the site underneath.
 */
const IntroSplash = () => {
  const [phase, setPhase] = useState<0 | 1>(0);
  const [morphing, setMorphing] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [visible, setVisible] = useState(true);
  const reduce = useReducedMotion();

  const finish = useCallback(() => {
    setExiting(true);
    setTimeout(() => setVisible(false), 650);
  }, []);

  const skip = useCallback(() => {
    if (!exiting) finish();
  }, [exiting, finish]);

  // Lock scroll while the splash is up, always restore on unmount.
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
      const t = setTimeout(() => setPhase(1), 950);
      return () => clearTimeout(t);
    }
    if (phase === 1) {
      const t1 = setTimeout(() => setMorphing(true), 850);
      const t2 = setTimeout(() => finish(), 1450);
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
      transition={{ duration: 0.65, ease: easeWipe }}
    >
      <div className="relative w-full px-6 text-center">
        <AnimatePresence mode="wait">
          {phase === 0 && (
            <div key="p0" className="overflow-hidden">
              <motion.p
                initial={swipeUp.initial}
                animate={swipeUp.animate}
                exit={swipeUp.exit}
                transition={{ duration: 0.4, ease: easeSmooth }}
                className="font-body font-bold text-white text-xl sm:text-2xl md:text-4xl tracking-tight"
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
                transition={{ duration: 0.4, ease: easeSmooth }}
                className="font-display font-extrabold text-3xl sm:text-4xl md:text-6xl italic inline-flex items-center justify-center whitespace-nowrap"
              >
                <span className="gradient-text-bright">Evolv</span>
                <span className="relative inline-block text-left">
                  {/* old suffix — the part that vanishes. "e" stays gradient
                      since it's part of "evolve"; " it" is plain white. */}
                  <motion.span
                    className="inline-block"
                    animate={{ opacity: morphing ? 0 : 1, y: morphing ? -10 : 0 }}
                    transition={{ duration: 0.3, ease: "easeIn" }}
                  >
                    <span className="gradient-text-bright">e</span>
                    <span className="text-white not-italic">{" it"}</span>
                  </motion.span>
                  {/* new suffix — settles into the exact same spot */}
                  <motion.span
                    className="gradient-text-bright absolute left-0 top-0 inline-block"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: morphing ? 1 : 0, y: morphing ? 0 : 10 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
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
        className="absolute bottom-6 right-6 z-20 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-caption font-body font-semibold text-white/60 backdrop-blur-sm transition hover:border-white/50 hover:text-white"
      >
        Skip &rarr;
      </button>
    </motion.div>
  );
};

export default IntroSplash;
