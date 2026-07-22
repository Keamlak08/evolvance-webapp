import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import IntroSplash from "@/components/IntroSplash";
import HeroBackdrop from "@/components/HeroBackdrop";
import InteractiveScroll from "@/components/InteractiveScroll";
import SkillsBento from "@/components/SkillsBento";
import RevealOnScroll from "@/components/RevealOnScroll";
import SectionBackdrop from "@/components/SectionBackdrop";
import { ArrowRight, CheckCircle2, LineChart, Workflow, Sparkles } from "lucide-react";
import { waitForSplashClear } from "@/lib/waitForSplashClear";
import ethanHeadshot from "@/assets/ethan-headshot.png";
import bcgLogo from "@/assets/bcg-logo.png";
import innosightLogo from "@/assets/innosight-logo.jpeg";
import dmvLogo from "@/assets/dmvkicksupply-logo.jpeg";
import uncLogo from "@/assets/unc-logo.avif";
import linkedinIcon from "@/assets/linkedin-icon.png";

// Registered here too (not just in InteractiveScroll.tsx) so this file
// doesn't silently depend on another module happening to import first —
// gsap.registerPlugin() is idempotent, so calling it again is a no-op if
// InteractiveScroll's module already ran.
gsap.registerPlugin(ScrollTrigger);

const credentials = [
  { logo: bcgLogo, label: "Boston Consulting Group" },
  { logo: innosightLogo, label: "Innosight Strategy & Innovation" },
  { logo: dmvLogo, label: "Founder, 7-Figure Apparel Co." },
  { logo: uncLogo, label: "UNC Chapel Hill, Business & Econ" },
];

// The three hero outcomes deliberately preview the three phases below in
// the same order (revenue -> operations -> ownership) — a structural echo
// rather than three unrelated taglines, so the hero quietly sets up the
// page's own roadmap before the reader gets there.
const outcomes = ["More revenue, faster", "Leaner, faster operations", "AI your team owns"];

const phases = [
  {
    n: "Phase 01",
    icon: LineChart,
    title: "Revenue Growth",
    guarantee: "Guaranteed revenue growth from lead and conversion increases, or we work for free.",
    bullets: [
      { h: "Identifying Priority Clients", d: "Pinpoint the highest-value segments worth your team's time." },
      { h: "High-Converting Offers", d: "Sharpen your positioning so prospects say yes faster." },
      { h: "Client Acquisition Systems", d: "AI-driven outbound, inbound, and nurture engines." },
      { h: "Sales Intelligence", d: "Call analytics and follow-up automation that close deals." },
    ],
  },
  {
    n: "Phase 02",
    icon: Workflow,
    title: "Operation Efficiency",
    guarantee: "Guaranteed bottom-line growth through operational effectiveness, or we work for free.",
    bullets: [
      { h: "Opportunity Prioritization", d: "Map every workflow and target the highest-leverage automations." },
      { h: "Automated Workflows", d: "Replace manual busywork with reliable, AI-powered systems." },
      { h: "Implementation & Upskilling", d: "Roll out the tools and train your team to run them." },
    ],
  },
  {
    n: "Phase 03",
    icon: Sparkles,
    title: "Evolution Ownership",
    guarantee: (
      <>
        Guaranteed full <span className="font-semibold not-italic">Evolvance</span>, or we work for free.
      </>
    ),
    bullets: [
      { h: "Holistic Training", d: "Give every team member the AI fluency to keep evolving without us." },
      { h: "AI Governance", d: "Guardrails and review cycles that keep AI safe and effective." },
      { h: "Continuous Evolution Program", d: "A repeatable cadence to identify and ship the next improvement." },
    ],
  },
];

const Services = () => {
  const heroRef = useRef<HTMLElement>(null);
  const horizonWrapperRef = useRef<HTMLDivElement>(null);
  const horizonRef = useRef<HTMLDivElement>(null);

  /**
   * Horizon-line reactivity: the line starts noticeably brighter at rest
   * than the old barely-there version, then intensifies further as the
   * user scrolls through the hero.
   *
   * WHY animate `opacity` + `filter: brightness()` instead of re-computing
   * the box-shadow blur radius every frame: box-shadow strings are
   * expensive for the browser to repaint at 60fps (it has to recompute
   * the blur), while opacity/filter are cheap, GPU-composited properties.
   * The line's box-shadow is set once, statically, in the JSX below, and
   * scrubbing brightness/opacity on top of that fakes an intensifying glow
   * for a fraction of the cost.
   *
   * WHY A SEPARATE WRAPPER FOR A ONE-TIME ENTRANCE FADE: this used to
   * `gsap.set()` horizonRef straight to its resting opacity (0.75) the
   * instant this effect ran — which is well before IntroSplash finishes,
   * since IntroSplash is just a z-[100] overlay stacked on top, not
   * something that delays the hero underneath from mounting. That meant
   * the glowing line was already sitting there, fully visible mid-glow,
   * for the entire time it was hidden behind the splash — so the instant
   * the splash's swipe-up reveal reached it, it appeared to snap in
   * fully-formed with zero transition, which read as a glitch next to
   * every other hero element fading in smoothly via RevealOnScroll.
   *
   * Rather than touching the scroll-scrubbed brightness/opacity logic
   * below at all (it already works correctly), this wraps the line in an
   * outer element whose OWN opacity fades in once, after the splash
   * clears — a parent's opacity multiplies with a child's own opacity
   * visually, so the wrapper's one-time fade composes cleanly with the
   * inner scroll-driven opacity/brightness without the two ever fighting
   * over the same GSAP-tweened property.
   */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(horizonRef.current, { opacity: 0.75, filter: "brightness(1)" });
      gsap.to(horizonRef.current, {
        opacity: 1,
        filter: "brightness(1.9)",
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.4,
        },
      });
    }, heroRef);

    gsap.set(horizonWrapperRef.current, { opacity: 0 });
    const cancelWait = waitForSplashClear(() => {
      gsap.to(horizonWrapperRef.current, { opacity: 1, duration: 0.6, ease: "power2.out" });
    });

    return () => {
      ctx.revert();
      cancelWait();
    };
  }, []);

  return (
    <div className="min-h-screen">
      <IntroSplash />

      {/* ============ HERO — dark navy impact surface, full viewport ============ */}
      <section
        ref={heroRef}
        className="relative overflow-hidden bg-shell min-h-screen flex items-center pt-20 md:pt-24 pb-16"
      >
        {/* Cursor-reactive contour backdrop — see HeroBackdrop.tsx for why
            this replaces the old static radial-glow/grid/scan-beam stack:
            those were closer to the generic "AI visual" look the brief
            asked to avoid, and weren't actually interactive. */}
        <HeroBackdrop />

        <div className="container relative z-10 mx-auto px-6 md:pl-16 lg:pl-24">
          {/* Four direct children here (headline, outcomes row, positioning
              line, buttons) means RevealOnScroll staggers all four in as a
              small cascade rather than one flat block fading in together.

              Left-aligned (not centered), but no longer flush against the
              container's bare left edge either — md:pl-16/lg:pl-24 above
              nudges the whole block right a bit further, since fully flush
              read as too far left. Still not using mx-auto to re-center
              it, which is what keeps it clearly off-center rather than
              splitting the difference back to the middle. */}
          <RevealOnScroll className="max-w-3xl md:max-w-4xl lg:max-w-5xl text-left" stagger={0.15}>
            {/* Sized up from the previous pass: that version undersold how
                much room a full-viewport hero actually has, and read as
                small/plain once centered copy stopped being the thing
                filling the space. Scaled to roughly double TechClear's
                own proportions relative to word count (their headline is
                about half as many words as ours, at a much larger size).

                Widened from max-w-3xl to this max-w-5xl ladder so the
                sentence settles into roughly three lines instead of the
                five it was wrapping into at the narrower width — the brief
                explicitly OK'd letting lines run longer to get there
                rather than shrinking the type back down. leading-tight
                (1.25) replaces the previous leading-[1.12]: that tighter
                value was crowding descenders (the tail on "g" in "growth")
                against the line below closely enough to look clipped. */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight tracking-tight text-shell-foreground">
              We partner with small and medium businesses to power{" "}
              <span className="gradient-text-bright">growth evolution</span> through AI.
            </h1>

            {/* Three biggest client outcomes — horizontal, minimal vertical
                space, smaller/medium weight than the headline. divide-x
                draws the separators for free (skips the first child
                automatically) instead of hand-rolling divider dots.
                justify-start (not -center) so this row starts flush at
                the same left edge as the headline above it, rather than
                centering independently within its own row width. */}
            <div className="mt-7 flex flex-wrap items-center justify-start divide-x divide-shell-border">
              {outcomes.map((o) => (
                <span
                  key={o}
                  className="px-4 md:px-6 first:pl-0 last:pr-0 font-body text-sm md:text-base font-medium text-shell-muted"
                >
                  {o}
                </span>
              ))}
            </div>

            {/* Positioning line, pulled directly from the short business
                plan's own one-line summary of the pivot (§01) — kept
                verbatim rather than paraphrased, since the plan's own
                phrasing is already tight and quotable. */}
            <p className="mt-5 font-body text-sm md:text-base text-shell-muted max-w-xl">
              The partner who understands your business well enough to see the opportunity, and
              understands AI well enough to capture it.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-start">
              <Link to="/book">
                <Button
                  size="lg"
                  data-cursor-label="Book"
                  className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 px-7 py-6"
                >
                  Book a Discovery Call
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <a href="#phases">
                <Button
                  size="lg"
                  variant="ghost"
                  data-cursor-label="View"
                  className="w-full sm:w-auto border border-shell-border bg-transparent text-shell-foreground hover:bg-white/10 hover:text-shell-foreground px-7 py-6"
                >
                  See How It Works
                </Button>
              </a>
            </div>
          </RevealOnScroll>
        </div>

        {/* Glowing horizon line — a reactive scroll indicator, not a
            static decorative wash. Noticeably brighter at rest than
            before, and intensifies further via the scroll-linked effect
            set up in the useLayoutEffect above. Uses the brand's own azure
            glow color (the same one CTA buttons pulse with) instead of
            plain white, so it reads as an intentional brand detail.

            Split into a wrapper (owns position + the one-time entrance
            fade) and an inner element (owns the existing scroll-scrubbed
            brightness/opacity) — see the entrance-fade comment above for
            why these are deliberately two separate elements. */}
        <div ref={horizonWrapperRef} className="pointer-events-none absolute bottom-0 left-0 right-0 h-px">
          <div
            ref={horizonRef}
            className="h-full w-full"
            style={{
              background: "linear-gradient(90deg, transparent 0%, hsla(193,99%,62%,0.85) 50%, transparent 100%)",
              boxShadow: "0 0 22px 2px hsla(193,99%,55%,0.5)",
            }}
          />
        </div>
      </section>

      <InteractiveScroll />

      {/* ============ CREDENTIAL BAR ============ */}
      <section className="relative bg-secondary/30 py-8 border-b border-border">
        <SectionBackdrop tone="light" />
        <div className="container relative z-10 mx-auto px-6">
          <RevealOnScroll className="flex flex-col md:flex-row items-center justify-center gap-5 md:gap-10">
            <p className="text-caption font-body text-muted-foreground text-center md:text-left shrink-0">
              Led by a former BCG &amp; Innosight consultant
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {credentials.map((c) => (
                <div key={c.label} className="flex items-center gap-2">
                  <div className="h-6 w-6 overflow-hidden rounded border border-border bg-white flex items-center justify-center shrink-0">
                    <img src={c.logo} alt={c.label} className="h-full w-full object-cover" />
                  </div>
                  <span className="text-caption font-body text-muted-foreground whitespace-nowrap">{c.label}</span>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ============ THREE PHASES — vertical spine timeline ============
          Changed from a 3-up horizontal grid to a stacked vertical path:
          each phase's icon sits in a circle on a connecting spine, with
          content to its right. No per-card gradient bars (removed per the
          brief); the spine itself is a single flat brand-tinted color, not
          a gradient, so the "remove gradient accents" instruction holds
          for the whole section, not just the old top-bar detail. */}
      <section id="phases" className="relative py-20 md:py-28">
        <SectionBackdrop tone="light" />
        <div className="container relative z-10 mx-auto px-6">
          <RevealOnScroll className="text-center max-w-2xl mx-auto mb-14 md:mb-20">
            <h2 className="font-body text-h1 font-bold leading-tight">
              A three-phase pathway to owning your growth evolution
            </h2>
          </RevealOnScroll>

          {/* Each phase block below is a direct child of this wrapper, so
              RevealOnScroll staggers the three phases in one after another
              as the section scrolls into view, instead of the old
              per-phase Framer Motion instance each section used to carry
              individually. */}
          <RevealOnScroll className="mx-auto max-w-3xl" stagger={0.2} y={36}>
            {phases.map((phase, idx) => {
              const Icon = phase.icon;
              const isLast = idx === phases.length - 1;
              return (
                <div key={phase.title} className="relative flex gap-6 md:gap-10">
                  {/* Numeral/spine column */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className="flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-pale-azure shrink-0">
                      <Icon className="h-6 w-6 md:h-7 md:w-7 text-deep-azure" />
                    </div>
                    {!isLast && <div className="mt-2 w-px flex-1 bg-primary/20" />}
                  </div>

                  {/* Content column */}
                  <div className={`flex-1 min-w-0 ${isLast ? "pb-0" : "pb-14 md:pb-20"}`}>
                    <p className="text-xs font-body font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                      {phase.n}
                    </p>
                    <h3 className="font-body text-h2 font-bold leading-tight">{phase.title}</h3>

                    <div className="mt-4 rounded-lg border-l-4 border-primary bg-pale-azure px-3.5 py-2.5 max-w-xl">
                      <p className="text-caption font-body italic text-foreground/85">{phase.guarantee}</p>
                    </div>

                    <ul className="mt-5 space-y-3.5 max-w-xl">
                      {phase.bullets.map((b) => (
                        <li key={b.h} className="flex gap-2.5">
                          <CheckCircle2 className="h-4 w-4 text-deep-azure mt-0.5 shrink-0" />
                          <div>
                            <p className="font-body font-semibold text-body leading-snug">{b.h}</p>
                            <p className="mt-0.5 text-caption font-body text-muted-foreground leading-relaxed">
                              {b.d}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </RevealOnScroll>
        </div>
      </section>

      <SkillsBento />

      {/* ============ MEET ETHAN ============ */}
      <section className="relative py-20 md:py-28 bg-secondary/30 border-y border-border">
        <SectionBackdrop tone="light" />
        <div className="container relative z-10 mx-auto px-6">
          {/* Two direct children (headshot, text column) means the photo
              and the copy arrive as their own small staggered beat rather
              than both fading in as one indistinguishable block. */}
          <RevealOnScroll
            className="flex flex-col items-center gap-10 md:gap-14 md:flex-row md:items-start"
            stagger={0.15}
          >
            <div className="flex-shrink-0">
              <img
                src={ethanHeadshot}
                alt="Ethan Schroeher"
                className="h-40 w-40 md:h-52 md:w-52 rounded-xl border border-border object-cover"
              />
            </div>
            <div className="flex-1 max-w-2xl">
              <h2 className="font-body text-h1 font-bold leading-tight">Ethan Schroeher</h2>
              <p className="mt-1 font-body text-body-lg font-semibold text-deep-azure">CEO &amp; Founder</p>
              <p className="mt-5 text-foreground/85 font-body leading-relaxed text-body">
                He's dedicated to helping coaching and training companies unlock their full potential
                through AI-powered strategies, partnering with leaders to build evolved, efficient
                operations that drive measurable results.
              </p>
              <p className="mt-4 text-foreground/85 font-body leading-relaxed text-body">
                His mission is simple: help you evolve your business so you can evolve more clients.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {credentials.map((cred) => (
                  <div key={cred.label} className="flex items-center gap-3">
                    <div className="h-9 w-9 flex-shrink-0 overflow-hidden rounded-lg border border-border bg-white flex items-center justify-center">
                      <img src={cred.logo} alt={cred.label} className="h-full w-full object-cover" />
                    </div>
                    <p className="text-caption font-body text-foreground/80 leading-snug">{cred.label}</p>
                  </div>
                ))}
              </div>

              <a
                href="https://www.linkedin.com/in/ethan-schroeher/"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-label="View"
                className="mt-6 inline-flex items-center gap-2 text-deep-azure hover:text-primary transition-colors text-body font-body font-semibold"
              >
                <img src={linkedinIcon} alt="LinkedIn" className="h-5 w-5 rounded" />
                Connect on LinkedIn &rarr;
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ============ FINAL CTA BAND ============ */}
      <section className="relative bg-shell py-16 md:py-20">
        <SectionBackdrop tone="dark" />
        <div className="container relative z-10 mx-auto px-6 text-center">
          <RevealOnScroll stagger={0.15}>
            <h2 className="font-body text-h1 font-bold text-shell-foreground leading-tight max-w-2xl mx-auto">
              Ready to grow? We'll build your{" "}
              <span className="gradient-text-bright">Evolvance Growth Plan</span>, free.
            </h2>
            <Link to="/book" className="mt-8 inline-block">
              <Button
                size="lg"
                data-cursor-label="Book"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6"
              >
                Book a Discovery Call
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
};

export default Services;
