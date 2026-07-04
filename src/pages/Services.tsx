import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, Zap, Gauge, RefreshCw, ArrowRight, CheckCircle2 } from "lucide-react";
import serviceHero from "@/assets/service-hero.jpg";
import phase1 from "@/assets/phase1-revenue.jpg";
import phase2 from "@/assets/phase2-time.jpg";
import phase3 from "@/assets/phase3-evolution.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import ethanHeadshot from "@/assets/ethan-headshot.png";
import bcgLogo from "@/assets/bcg-logo.png";
import innosightLogo from "@/assets/innosight-logo.jpeg";
import dmvLogo from "@/assets/dmvkicksupply-logo.jpeg";
import uncLogo from "@/assets/unc-logo.avif";
import linkedinIcon from "@/assets/linkedin-icon.png";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const aspirations = [
  { icon: TrendingUp, label: "Increasing new-client leads" },
  { icon: Users, label: "Enhancing client conversion rates" },
  { icon: Zap, label: "Freeing team capacity for high-value activities" },
  { icon: Gauge, label: "Improving task execution speed and impact" },
  { icon: RefreshCw, label: "Implementing continuous process improvement systems" },
];

const phases = [
  {
    n: "Phase 1",
    title: "Revenue Growth",
    guarantee: "We guarantee Revenue Growth from lead and conversion rate increases, or we work for free.",
    bullets: [
      {
        h: "Identifying Priority Clients",
        d: "Pinpoint the highest-value segments and decision-makers worth your team's time.",
      },
      {
        h: "Crafting Customized High-Converting Offers",
        d: "Sharpen your positioning and packaging so prospects say yes faster.",
      },
      {
        h: "Installing Client Acquisition Systems",
        d: "AI-driven outbound, inbound and nurture engines that fill your pipeline.",
      },
      {
        h: "Boost Conversion with Sales Intelligence",
        d: "Call analytics and follow-up automation that turn conversations into clients.",
      },
    ],
    image: phase1,
    alt: "Team analyzing revenue growth dashboards",
  },
  {
    n: "Phase 2",
    title: "Operations Driven Bottom Line Growth",
    guarantee: "We guarantee Bottom Line Growth through operational effectiveness and efficiency, or we work for free.",
    bullets: [
      {
        h: "Opportunity Identification & Prioritization",
        d: "Map every workflow and target the highest-leverage automations first.",
      },
      { h: "Constructing Automated Workflows", d: "Replace manual busywork with reliable, AI-powered systems." },
      {
        h: "Implementation & Upskilling",
        d: "Roll out the tools and train your team to operate them with confidence.",
      },
    ],
    image: phase2,
    alt: "Automated workflows freeing team capacity",
  },
  {
    n: "Phase 3",
    title: "Evolution Ownership",
    guarantee: (
      <>
        We guarantee your full <span className="gradient-text font-semibold not-italic">Evolvance</span>, or we work for
        free.
      </>
    ),
    bullets: [
      { h: "Holistic Training", d: "Give every team member the AI fluency to keep evolving without us." },
      {
        h: "Constructing AI Governance",
        d: "Guardrails, standards and review cycles that keep AI safe and effective.",
      },
      {
        h: "Installing a Continuous Evolution Program",
        d: "A repeatable cadence to identify, build and ship the next improvement.",
      },
    ],
    image: phase3,
    alt: "Founder owning their AI evolution",
  },
];

const credentials = [
  { logo: bcgLogo, label: "Consulting at Boston Consulting Group" },
  { logo: innosightLogo, label: "Consulting at Innosight Strategy and Innovation Consulting" },
  { logo: dmvLogo, label: "Former Founder of 7 Figure Sneaker and Apparel Company" },
  { logo: uncLogo, label: "Business and Economics Double Major at UNC Chapel Hill" },
];

const Services = () => {
  return (
    <div className="min-h-screen pt-28 md:pt-36">
      {/* SECTION 1 — HERO */}
      <section
        className="relative py-12 md:py-20 bg-no-repeat bg-center bg-cover"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, hsl(var(--background) / 0.92) 0%, hsl(var(--background) / 0.78) 45%, hsl(var(--background) / 0.35) 75%, hsl(var(--background) / 0) 100%)",
          }}
        />
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-[75%]"
          >
            <h1 className="font-display text-3xl md:text-4xl font-bold leading-[1.05] tracking-tight text-foreground">
              We Partner with Small & Medium Businesses <br />
              to<span className="gradient-text"> Empower Growth Evolution</span> through AI
            </h1>
            <p className="mt-6 md:mt-8 text-lg md:text-2xl text-muted-foreground underline underline-offset-4 decoration-primary">
              We help clients achieve growth aspirations by:
            </p>
            <ul className="mt-5 space-y-4 md:space-y-5">
              {aspirations.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-start gap-3 md:gap-4">
                  <span className="mt-1 rounded-md bg-pale-azure p-2">
                    <Icon className="h-5 w-5 md:h-7 md:w-7 text-deep-azure" />
                  </span>
                  <span className="text-lg md:text-2xl text-foreground/90">{label}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 md:mt-10 inline-block rounded-xl border-l-4 border-primary bg-background/60 backdrop-blur-sm px-5 py-4 md:px-7 md:py-5">
              <p className="text-base md:text-2xl text-foreground/90 leading-relaxed">
                <span className="font-display font-bold gradient-text">Evolvance</span>{" "}
                <span className="italic text-muted-foreground">(n.):</span> An evolved state where advancement is
                continuous.
              </p>
              <p className="mt-2 text-base md:text-xl text-muted-foreground italic leading-relaxed">
                E.g. — "SMBs are uniquely positioned to achieve{" "}
                <span className="not-italic font-bold text-foreground">evolvance</span> in the AI era."
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* DIVIDER 1 — Ready to Grow CTA */}
      <section className="py-10 md:py-14">
        <div className="container mx-auto px-6">
          <div className="glass-card rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <Link to="/book" className="shrink-0">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-body font-semibold text-lg md:text-2xl px-8 py-6 md:px-10 md:py-7 animate-pulse-glow"
              >
                Ready to Grow?
                <ArrowRight className="ml-1 h-5 w-5" />
              </Button>
            </Link>
            <p className="text-base md:text-2xl text-foreground/85 leading-snug text-center md:text-left">
              Book a call with us, and we will build your customized{" "}
              <span className="font-display font-semibold">
                <span className="gradient-text">Evolvance</span> Growth Plan
              </span>{" "}
              100% FREE.
            </p>
          </div>
        </div>
      </section>

      {/* TRANSITION DIVIDER 2 */}
      <section className="py-12 md:py-20 bg-[hsl(var(--shell))] text-shell-foreground">
        <div className="container mx-auto px-6 text-center">
          <p className="font-body uppercase tracking-[0.3em] text-primary text-lg md:text-2xl font-semibold">
            The Evolvance Partnership Model
          </p>
          <h2 className="mt-4 font-display text-3xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-5xl mx-auto">
            A Three Phase Pathway To Owning Your <span className="gradient-text-bright">Growth Evolution</span> by
            leveraging AI
          </h2>
        </div>
      </section>

      {/* SECTION 2 — 3 PHASES */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 space-y-20 md:space-y-28">
          {phases.map((phase, idx) => {
            // Page 1 (idx 0) text on RHS, then alternate
            const textOnRight = idx % 2 === 0;
            return (
              <motion.div
                key={phase.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                className="grid items-center gap-10 md:gap-14 md:grid-cols-5"
              >
                <div className={`md:col-span-2 ${textOnRight ? "md:order-1" : "md:order-2"}`}>
                  <div className="overflow-hidden rounded-2xl border border-border shadow-lg">
                    <img
                      src={phase.image}
                      alt={phase.alt}
                      width={1024}
                      height={1024}
                      loading="lazy"
                      className="h-full w-full object-cover aspect-square"
                    />
                  </div>
                </div>

                <div className={`md:col-span-3 ${textOnRight ? "md:order-2" : "md:order-1"}`}>
                  <p className="font-body uppercase tracking-[0.25em] text-deep-azure text-base md:text-lg font-semibold">
                    {phase.n}
                  </p>
                  <h3 className="mt-2 font-display text-4xl md:text-6xl font-bold leading-tight">{phase.title}</h3>
                  <div className="mt-5 rounded-lg border-l-4 border-primary bg-pale-azure px-4 py-3">
                    <p className="text-lg md:text-2xl italic text-foreground/85">{phase.guarantee}</p>
                  </div>
                  <ul className="mt-6 space-y-4 md:space-y-5">
                    {phase.bullets.map((b) => (
                      <li key={b.h} className="flex gap-3">
                        <CheckCircle2 className="h-6 w-6 md:h-7 md:w-7 text-deep-azure mt-1 shrink-0" />
                        <div>
                          <p className="font-display font-semibold text-xl md:text-3xl">{b.h}</p>
                          <p className="mt-1 text-lg md:text-xl text-muted-foreground leading-relaxed">{b.d}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* MEET ETHAN — preserved from prior, recolored via tokens */}
      <section className="py-16 md:py-24 bg-secondary/40 border-t border-border">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex flex-col items-center gap-8 md:gap-14 md:flex-row md:items-start"
          >
            <div className="flex-shrink-0">
              <img
                src={ethanHeadshot}
                alt="Ethan Schroeher"
                className="h-56 w-56 md:h-80 md:w-80 rounded-xl border-2 border-primary object-cover shadow-lg"
              />
            </div>
            <div className="flex-1">
              <h2 className="font-display text-3xl md:text-6xl font-bold leading-tight">
                Meet <span className="gradient-text">Ethan Schroeher</span>
              </h2>
              <p className="mt-2 font-body text-lg md:text-2xl font-semibold text-deep-azure">CEO & Founder</p>
              <p className="mt-5 md:mt-7 text-foreground/85 leading-relaxed text-base md:text-2xl">
                He's dedicated to helping coaching and training companies unlock their full potential through AI-powered
                strategies — partnering with leaders to build evolved, efficient operations that drive measurable
                results.
              </p>
              <p className="mt-4 text-foreground/85 leading-relaxed text-base md:text-2xl">
                His mission is simple: help you evolve your business so you can evolve more clients.
              </p>
              <p className="mt-5 text-foreground/85 leading-relaxed text-base md:text-2xl">
                Ethan is driven and equipped to evolve businesses like yours given his entrepreneurial and consulting
                background:
              </p>

              <div className="mt-6 grid gap-4 md:gap-5 sm:grid-cols-2">
                {credentials.map((cred) => (
                  <div key={cred.label} className="flex items-center gap-4">
                    <div className="h-12 w-12 md:h-16 md:w-16 flex-shrink-0 overflow-hidden rounded-lg border border-border bg-white flex items-center justify-center">
                      <img src={cred.logo} alt={cred.label} className="h-full w-full object-cover" />
                    </div>
                    <p className="text-foreground/80 leading-snug text-sm md:text-lg">{cred.label}</p>
                  </div>
                ))}
              </div>

              <a
                href="https://www.linkedin.com/in/ethan-schroeher/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 text-deep-azure hover:text-primary transition-colors text-base md:text-xl font-body font-semibold"
              >
                <img src={linkedinIcon} alt="LinkedIn" className="h-6 w-6 rounded" />
                Connect on LinkedIn →
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
