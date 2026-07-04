import { motion } from "framer-motion";
import egpLogo from "@/assets/egp-logo-transparent.png";

const Home = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-3 sm:px-6 pt-16 md:pt-28 overflow-hidden">
      {/* Backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* Base ambient glows */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsla(172,66%,50%,0.18),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,_hsla(200,80%,55%,0.14),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_75%,_hsla(172,70%,45%,0.12),_transparent_55%)]" />

        {/* Animated floating orbs */}
        <motion.div
          className="absolute top-[15%] left-[10%] h-72 w-72 rounded-full bg-[radial-gradient(circle,_hsla(172,80%,55%,0.35),_transparent_70%)] blur-3xl"
          animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[10%] right-[12%] h-96 w-96 rounded-full bg-[radial-gradient(circle,_hsla(200,85%,60%,0.28),_transparent_70%)] blur-3xl"
          animate={{ x: [0, -50, 30, 0], y: [0, 40, -20, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Subtle tech grid */}
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(hsla(172,66%,55%,0.35) 1px, transparent 1px), linear-gradient(90deg, hsla(172,66%,55%,0.35) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse at center, black 20%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 20%, transparent 75%)",
          }}
        />

        {/* Sweeping scan beam */}
        <motion.div
          className="absolute -inset-x-20 top-0 h-[140%] opacity-40"
          style={{
            background:
              "linear-gradient(110deg, transparent 35%, hsla(172,80%,60%,0.18) 48%, hsla(200,85%,65%,0.22) 50%, hsla(172,80%,60%,0.18) 52%, transparent 65%)",
          }}
          animate={{ x: ["-30%", "30%", "-30%"] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Horizontal scan line */}
        <motion.div
          className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent shadow-[0_0_18px_hsl(var(--primary)/0.7)]"
          animate={{ top: ["10%", "90%", "10%"] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_50%,_hsl(var(--background))_100%)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="flex flex-row items-center justify-center gap-[clamp(0.75rem,2vw,2.5rem)] w-full max-w-6xl"
      >
        <img
          src={egpLogo}
          alt="Evolvance Growth Partners Logo"
          className="h-[clamp(4rem,18vw,16rem)] w-[clamp(4rem,18vw,16rem)] object-contain shrink-0"
        />
        <div className="h-[clamp(3.5rem,13vw,12rem)] w-[6px] shrink-0 rounded-full bg-gradient-to-b from-primary via-primary/70 to-primary/40 shadow-[0_0_14px_hsl(var(--primary)/0.65)]" />
        <h1 className="font-display text-[clamp(1.35rem,4.6vw,4.5rem)] font-bold tracking-tight leading-none text-left whitespace-nowrap">
          <span className="gradient-text">Evolvance</span> Growth Partners
        </h1>
      </motion.div>
    </div>
  );
};

export default Home;
