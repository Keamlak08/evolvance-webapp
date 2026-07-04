import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Bot,
  Mail,
  UserCheck,
  Megaphone,
  Phone,
  Settings,
  PenTool,
  MessageSquare,
  BarChart3,
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import aiRevenue from "@/assets/ai-revenue.jpg";
import aiEfficiency from "@/assets/ai-efficiency.jpg";
import egpHeroLogo from "@/assets/egp-hero-logo.png";
import logo from "@/assets/logo.png";
import ethanHeadshot from "@/assets/ethan-headshot.png";
import bcgLogo from "@/assets/bcg-logo.png";
import innosightLogo from "@/assets/innosight-logo.jpeg";
import dmvLogo from "@/assets/dmvkicksupply-logo.jpeg";
import uncLogo from "@/assets/unc-logo.avif";
import linkedinIcon from "@/assets/linkedin-icon.png";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6 } }),
};

const credentials = [
  { logo: bcgLogo, label: "Consulting at Boston Consulting Group" },
  { logo: innosightLogo, label: "Consulting at Innosight Strategy and Innovation Consulting" },
  { logo: dmvLogo, label: "Former Founder of 7 Figure Sneaker and Apparel Company" },
  { logo: uncLogo, label: "Business and Economics Double Major at UNC Chapel Hill" },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
        <img
          src={heroBg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-[0.65]"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background/95" />
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <img
              src={egpHeroLogo}
              alt="Evolvance Growth Partners"
              className="mx-auto h-[16rem] w-[16rem] md:h-[48rem] md:w-[48rem] drop-shadow-lg object-contain"
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mx-auto mt-4 font-display font-bold leading-[1.05] tracking-tight text-foreground text-4xl md:text-5xl"
          >
            We Partner with Small & Medium Businesses<br />to Empower Growth Evolution by Leveraging AI
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mx-auto mt-4 md:mt-6 max-w-6xl leading-relaxed text-muted-foreground text-base md:text-5xl"
          >
            We help you evolve your business and client impact through AI-powered growth solutions
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-10 md:mt-20 flex flex-col items-center gap-3"
          >
            <Link to="/book">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-body font-semibold animate-pulse-glow py-4 px-6 md:py-[24px] md:px-[10px] text-base md:text-3xl"
              >
                Book Your Discovery Call
              </Button>
            </Link>
            <p className="text-muted-foreground text-center text-sm md:text-3xl">
              Tells us about your growth goals so
              <br />
              we can conquer them together!
            </p>
          </motion.div>
        </div>
      </section>

      {/* How We Help */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-center font-display text-2xl font-bold md:text-7xl"
          >
            Two Engines for <span className="gradient-text">Growth Evolution</span>
          </motion.h2>
          <p className="mx-auto mt-4 max-w-4xl text-center text-muted-foreground text-sm md:text-3xl">
            We fuel your business from both sides — driving revenue up and operating costs down through intelligent AI
            solutions.
          </p>

          <div className="mt-10 md:mt-16 grid gap-8 md:gap-12 md:grid-cols-2">
            {/* Revenue Side */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={1}
              className="glass-card rounded-xl overflow-hidden"
            >
              <img
                src={aiRevenue}
                alt="AI-powered revenue growth dashboard"
                loading="lazy"
                width={1024}
                height={1024}
                className="h-40 md:h-56 w-full object-cover"
              />
              <div className="p-5 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="rounded-lg bg-pale-azure p-2 md:p-3">
                    <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-deep-azure" />
                  </div>
                  <h3 className="font-display text-lg md:text-3xl font-bold">AI-Powered Revenue Generation</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-2xl">
                  Deploy intelligent growth engines from AI-driven lead generation and automated sales funnels to
                  personalized outreach. Turn your marketing and sales process into an evolved, data-driven machine.
                </p>
                <div className="mt-4 md:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {[
                    { icon: Mail, label: "AI Cold Email Campaigns" },
                    { icon: UserCheck, label: "AI Lead Qualification" },
                    { icon: Megaphone, label: "Optimized Paid Advertising" },
                    { icon: Phone, label: "Sales Call Intelligence" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2 text-secondary-foreground text-xs md:text-2xl">
                      <item.icon className="h-4 w-4 text-deep-azure" />
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Efficiency Side */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={2}
              className="glass-card rounded-xl overflow-hidden"
            >
              <img
                src={aiEfficiency}
                alt="Team working with AI efficiency tools"
                loading="lazy"
                width={1024}
                height={1024}
                className="h-40 md:h-56 w-full object-cover"
              />
              <div className="p-5 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="rounded-lg bg-pale-azure p-2 md:p-3">
                    <Bot className="h-5 w-5 md:h-6 md:w-6 text-deep-azure" />
                  </div>
                  <h3 className="font-display text-lg md:text-3xl font-bold">AI-Improved Operations & Workflows</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-2xl">
                  Reclaim time and cut costs by automating operations. Your employees become exponentially more
                  productive with AI-enabled workflows, freeing resources to focus on evolving your impact.
                </p>
                <div className="mt-4 md:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {[
                    { icon: Settings, label: "Workflow Automation" },
                    { icon: PenTool, label: "AI Content Creation" },
                    { icon: MessageSquare, label: "Client Communication" },
                    { icon: BarChart3, label: "Performance Insights" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2 text-secondary-foreground text-xs md:text-2xl">
                      <item.icon className="h-4 w-4 text-deep-azure" />
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meet Ethan */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="flex flex-col items-center gap-8 md:gap-12 md:flex-row"
          >
            <div className="flex-shrink-0">
              <img
                src={ethanHeadshot}
                alt="Ethan Schroeher"
                className="h-48 w-48 md:h-72 md:w-72 rounded-xl border-2 border-primary object-cover"
              />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold md:text-6xl">
                Meet <span className="gradient-text">Ethan Schroeher</span>
              </h2>
              <p className="mt-2 text-sm md:text-xl text-muted-foreground">📍 Arlington, Virginia</p>
              <p className="mt-4 md:mt-6 text-muted-foreground leading-relaxed max-w-[77rem] text-sm md:text-2xl">
                He's dedicated to helping coaching and training companies unlock their full potential through AI-powered
                strategies — partnering with leaders to build evolved, efficient operations that drive measurable
                results.
              </p>
              <p className="mt-3 md:mt-4 text-muted-foreground leading-relaxed max-w-[77rem] text-sm md:text-2xl">
                His mission is simple: help you evolve your business so you can evolve more clients.
              </p>
              <p className="mt-4 md:mt-6 text-muted-foreground leading-relaxed max-w-[77rem] text-sm md:text-2xl">
                Ethan is driven and equipped to evolve businesses like yours given his entrepreneurial and consulting
                background:
              </p>

              <div className="mt-4 md:mt-6 grid gap-3 md:gap-4 sm:grid-cols-2 max-w-[77rem]">
                {credentials.map((cred) => (
                  <div key={cred.label} className="flex items-center gap-3 md:gap-4">
                    <div className="h-10 w-10 md:h-14 md:w-14 flex-shrink-0 overflow-hidden rounded-lg border border-border/50 bg-white flex items-center justify-center">
                      <img src={cred.logo} alt={cred.label} className="h-full w-full object-cover" />
                    </div>
                    <p className="text-muted-foreground leading-snug text-xs md:text-xl">{cred.label}</p>
                  </div>
                ))}
              </div>

              <a
                href="https://www.linkedin.com/in/ethan-schroeher/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 md:mt-6 inline-flex items-center gap-2 text-deep-azure hover:text-primary transition-colors text-sm md:text-lg font-body font-semibold"
              >
                <img src={linkedinIcon} alt="LinkedIn" className="h-5 w-5 rounded" />
                Connect on LinkedIn →
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
