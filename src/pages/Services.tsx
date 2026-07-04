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
    <div className="min-h-screen pt-24 md:pt-28">
      {/* SECTION 1 — HERO */}
      <section
        className="relative py-14 md:py-24 bg-no-repeat bg-center bg-cover"
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
            className="max-w-2xl"
          >
            <h1 className="font-display text-3xl md:text-h1 font-bold leading-[1.1] tracking-tight text-foreground">
              We Partner with Small &amp; Medium Businesses to{" "}
              <span className="gradient-text">Empower Growth Evolution</span> through AI
            </h1>
            <p className="mt-6 text-body-lg text-muted-foreground underline underline-offset-4 decoration-primary font-body">
              We help clients achieve growth aspirations by:
            </p>
            <ul className="mt-5 space-y-4">
              {aspirations.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-start gap-3">
                  <span className="mt-0.5 rounded-lg bg-pale-azure p-2 shrink-0">
                    <Icon className="h-5 w-5 text-deep-azure" />
                  </span>
                  <span className="text-body-lg font-body text-foreground/90">{label}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-xl border-l-4 border-primary bg-background/60 backdrop-blur-sm px-5 py-4">
              <p className="text-body font-body text-foreground/90 leading-relaxed">
                <span className="font-display font-bold gradient-text">Evolvance</span>{" "}
                <span className="italic text-muted-foreground">(n.):</span> An evolved state where advancement is
                continuous.
              </p>
              <p className="mt-2 text-caption font-body text-muted-foreground italic leading-relaxed">
                E.g., "SMBs are uniquely positioned to achieve{" "}
                <span className="not-italic font-bold text-foreground">evolvance</span> in the AI era."
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* DIVIDER 1 — Ready to Grow CTA */}
      <section className="py-10 md:py-14">
        <div className="container mx-auto px-6">
          <div className="plain-card p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <Link to="/book" className="shrink-0">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 animate-pulse-glow"
              >
                Ready to Grow?
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
            <p className="text-body font-body text-foreground/85 leading-snug text-center md:text-left">
              Book a call with us, and we will build your customized{" "}
              <span className="font-display font-semibold">
                <span className="gradient-text">Evolvance</span> Growth Plan
              </span>{" "}
              100% free.
            </p>
          </div>
        </div>
      </section>

      {/* TRANSITION DIVIDER 2 */}
      <section className="py-14 md:py-20 bg-[hsl(var(--shell))] text-shell-foreground">
        <div className="container mx-auto px-6 text-center">
          <p className="text-overline text-primary">The Evolvance Partnership Model</p>
          <h2 className="mt-4 font-display text-h2 md:text-h1 font-bold leading-tight max-w-3xl mx-auto">
            A Three Phase Pathway To Owning Your Growth Evolution by Leveraging AI
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
                  <div className="overflow-hidden rounded-xl border border-border">
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
                  <p className="text-overline text-deep-azure">{phase.n}</p>
                  <h3 className="mt-2 font-display text-h2 font-bold leading-tight">{phase.title}</h3>
                  <div className="mt-5 rounded-lg border-l-4 border-primary bg-pale-azure px-4 py-3">
                    <p className="text-body-lg font-body italic text-foreground/85">{phase.guarantee}</p>
                  </div>
                  <ul className="mt-6 space-y-4">
                    {phase.bullets.map((b) => (
                      <li key={b.h} className="flex gap-3">
                        <CheckCircle2 className="h-5 w-5 text-deep-azure mt-1 shrink-0" />
                        <div>
                          <p className="font-display font-semibold text-h3">{b.h}</p>
                          <p className="mt-1 text-body font-body text-muted-foreground leading-relaxed">{b.d}</p>
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

      {/* MEET ETHAN */}
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
                className="h-48 w-48 md:h-64 md:w-64 rounded-xl border-2 border-primary object-cover"
              />
            </div>
            <div className="flex-1 max-w-2xl">
              <h2 className="font-display text-h2 font-bold leading-tight">
                Meet <span className="text-deep-azure">Ethan Schroeher</span>
              </h2>
              <p className="mt-2 font-body text-body-lg font-semibold text-deep-azure">CEO &amp; Founder</p>
              <p className="mt-5 text-foreground/85 font-body leading-relaxed text-body">
                He's dedicated to helping coaching and training companies unlock their full potential through
                AI-powered strategies, partnering with leaders to build evolved, efficient operations that drive
                measurable results.
              </p>
              <p className="mt-4 text-foreground/85 font-body leading-relaxed text-body">
                His mission is simple: help you evolve your business so you can evolve more clients.
              </p>
              <p className="mt-4 text-foreground/85 font-body leading-relaxed text-body">
                Ethan is driven and equipped to evolve businesses like yours given his entrepreneurial and consulting
                background:
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {credentials.map((cred) => (
                  <div key={cred.label} className="flex items-center gap-3">
                    <div className="h-11 w-11 flex-shrink-0 overflow-hidden rounded-lg border border-border bg-white flex items-center justify-center">
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
    </div>
  );
};

export default Services;
