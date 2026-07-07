import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import IntroSplash from "@/components/IntroSplash";
import InteractiveScroll from "@/components/InteractiveScroll";
import SkillsBento from "@/components/SkillsBento";
import { ArrowRight, CheckCircle2, LineChart, Workflow, Sparkles } from "lucide-react";
import ethanHeadshot from "@/assets/ethan-headshot.png";
import bcgLogo from "@/assets/bcg-logo.png";
import innosightLogo from "@/assets/innosight-logo.jpeg";
import dmvLogo from "@/assets/dmvkicksupply-logo.jpeg";
import uncLogo from "@/assets/unc-logo.avif";
import linkedinIcon from "@/assets/linkedin-icon.png";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const credentials = [
  { logo: bcgLogo, label: "Boston Consulting Group" },
  { logo: innosightLogo, label: "Innosight Strategy & Innovation" },
  { logo: dmvLogo, label: "Founder, 7-Figure Apparel Co." },
  { logo: uncLogo, label: "UNC Chapel Hill, Business & Econ" },
];

const phases = [
  {
    n: "phase 01",
    icon: LineChart,
    title: "revenue growth",
    guarantee: "guaranteed revenue growth from lead and conversion increases, or we work for free.",
    bullets: [
      { h: "identifying priority clients", d: "Pinpoint the highest-value segments worth your team's time." },
      { h: "high-converting offers", d: "Sharpen your positioning so prospects say yes faster." },
      { h: "client acquisition systems", d: "AI-driven outbound, inbound, and nurture engines." },
      { h: "sales intelligence", d: "Call analytics and follow-up automation that close deals." },
    ],
  },
  {
    n: "phase 02",
    icon: Workflow,
    title: "operations growth",
    guarantee: "guaranteed bottom-line growth through operational effectiveness, or we work for free.",
    bullets: [
      { h: "opportunity prioritization", d: "Map every workflow and target the highest-leverage automations." },
      { h: "automated workflows", d: "Replace manual busywork with reliable, AI-powered systems." },
      { h: "implementation & upskilling", d: "Roll out the tools and train your team to run them." },
    ],
  },
  {
    n: "phase 03",
    icon: Sparkles,
    title: "evolution ownership",
    guarantee: (
      <>
        guaranteed full <span className="font-semibold not-italic lowercase">evolvance</span>, or we work for free.
      </>
    ),
    bullets: [
      { h: "holistic training", d: "Give every team member the AI fluency to keep evolving without us." },
      { h: "ai governance", d: "Guardrails and review cycles that keep AI safe and effective." },
      { h: "continuous evolution program", d: "A repeatable cadence to identify and ship the next improvement." },
    ],
  },
];

const Services = () => {
  return (
    <div className="min-h-screen">
      <IntroSplash />

      {/* ============ HERO — dark navy impact surface, full viewport ============ */}
      <section className="relative overflow-hidden bg-shell min-h-screen flex items-center pt-20 md:pt-24 pb-16">
        <div className="container relative mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <p className="text-overline text-primary mb-5 lowercase">
              ai-powered growth for small &amp; medium businesses
            </p>
            <h1 className="font-display text-display font-extrabold leading-[1.02] tracking-tight text-shell-foreground lowercase">
              empower your growth <span className="gradient-text-bright">evolution</span>
            </h1>
            <p className="mt-6 text-body-lg font-body text-shell-muted leading-relaxed max-w-lg lowercase">
              ai-powered growth systems for small and medium businesses.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <Link to="/book">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 px-7 py-6 lowercase"
                >
                  book a discovery call
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <a href="#phases">
                <Button
                  size="lg"
                  variant="ghost"
                  className="w-full sm:w-auto border border-shell-border bg-transparent text-shell-foreground hover:bg-white/10 hover:text-shell-foreground px-7 py-6 lowercase"
                >
                  see how it works
                </Button>
              </a>
            </div>

            <div className="mt-10 border border-shell-border bg-shell-foreground/[0.04] rounded-xl px-5 py-4 max-w-md">
              <p className="text-body font-body text-shell-muted leading-relaxed">
                <span className="font-display font-extrabold gradient-text-bright lowercase">evolvance</span>{" "}
                <span className="italic text-shell-muted/70">(n.):</span> an evolved state where
                advancement is continuous.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Soft glowing horizon line — a quiet scroll indicator. More
            present than a hairline, still faded at both ends so it reads
            as ambient glow rather than a hard rule across the screen. */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-[2px]"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.75) 50%, transparent 100%)",
            boxShadow: "0 0 24px 3px rgba(255,255,255,0.45)",
          }}
        />
      </section>

      <InteractiveScroll />

      {/* ============ CREDENTIAL BAR ============ */}
      <section className="bg-secondary/30 py-8 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-5 md:gap-10">
            <p className="text-caption font-body text-muted-foreground text-center md:text-left shrink-0">
              led by a former BCG &amp; Innosight consultant
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
          </div>
        </div>
      </section>

      {/* ============ THREE PHASES — card grid ============ */}
      <section id="phases" className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center max-w-2xl mx-auto mb-14 md:mb-16"
          >
            <p className="text-overline text-deep-azure mb-3 lowercase">the evolvance partnership model</p>
            <h2 className="font-body text-h1 font-bold leading-tight lowercase">
              a three-phase pathway to owning your growth evolution
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3 relative">
            {phases.map((phase, idx) => {
              const Icon = phase.icon;
              return (
                <motion.div
                  key={phase.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeUp}
                  transition={{ delay: idx * 0.1 }}
                  className="relative"
                >
                  {/* connector arrow between cards on desktop */}
                  {idx < phases.length - 1 && (
                    <div className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 h-6 w-6 items-center justify-center rounded-full bg-background border border-border">
                      <ArrowRight className="h-3 w-3 text-deep-azure" />
                    </div>
                  )}

                  <div className="plain-card h-full p-6 md:p-7 flex flex-col overflow-hidden relative">
                    <div
                      className="absolute top-0 left-0 right-0 h-1"
                      style={{ background: "linear-gradient(90deg, #016B88, #129094, #26BB70)" }}
                    />
                    <div className="flex items-center gap-3 mb-5">
                      <div className="h-10 w-10 rounded-lg bg-pale-azure flex items-center justify-center shrink-0">
                        <Icon className="h-5 w-5 text-deep-azure" />
                      </div>
                      <p className="text-overline text-deep-azure lowercase">{phase.n}</p>
                    </div>

                    <h3 className="font-body text-h2 font-bold leading-tight lowercase">{phase.title}</h3>

                    <div className="mt-4 rounded-lg border-l-4 border-primary bg-pale-azure px-3.5 py-2.5">
                      <p className="text-caption font-body italic text-foreground/85 lowercase">{phase.guarantee}</p>
                    </div>

                    <ul className="mt-5 space-y-3.5 flex-1">
                      {phase.bullets.map((b) => (
                        <li key={b.h} className="flex gap-2.5">
                          <CheckCircle2 className="h-4 w-4 text-deep-azure mt-0.5 shrink-0" />
                          <div>
                            <p className="font-body font-semibold text-body leading-snug lowercase">{b.h}</p>
                            <p className="mt-0.5 text-caption font-body text-muted-foreground leading-relaxed">
                              {b.d}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <SkillsBento />

      {/* ============ MEET ETHAN ============ */}
      <section className="py-20 md:py-28 bg-secondary/30 border-y border-border">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex flex-col items-center gap-10 md:gap-14 md:flex-row md:items-start"
          >
            <div className="flex-shrink-0">
              <img
                src={ethanHeadshot}
                alt="Ethan Schroeher"
                className="h-40 w-40 md:h-52 md:w-52 rounded-xl border border-border object-cover"
              />
            </div>
            <div className="flex-1 max-w-2xl">
              <p className="text-overline text-deep-azure mb-2 lowercase">meet the founder</p>
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
                className="mt-6 inline-flex items-center gap-2 text-deep-azure hover:text-primary transition-colors text-body font-body font-semibold"
              >
                <img src={linkedinIcon} alt="LinkedIn" className="h-5 w-5 rounded" />
                Connect on LinkedIn &rarr;
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ FINAL CTA BAND ============ */}
      <section className="bg-shell py-16 md:py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="font-body text-h1 font-bold text-shell-foreground leading-tight max-w-2xl mx-auto lowercase">
              ready to grow? we'll build your{" "}
              <span className="gradient-text-bright">evolvance growth plan</span>, free.
            </h2>
            <Link to="/book" className="mt-8 inline-block">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 lowercase">
                book a discovery call
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
