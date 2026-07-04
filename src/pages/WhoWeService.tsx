import { motion } from "framer-motion";
import professionalCoaching from "@/assets/professional-coaching.jpg";
import academicCoaching from "@/assets/academic-coaching.jpg";
import fitnessTraining from "@/assets/fitness-training.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const segments = [
  {
    title: "Professional Coaching & Training",
    image: professionalCoaching,
    description:
      "We partner with professional coaches and corporate trainers who are ready to scale their practice. Whether you're delivering leadership development, executive coaching, or team-building workshops, we help you reach more clients and maximize your impact.",
    examples: ["Executive & Leadership Coaches", "Corporate Training Firms", "Business Strategy Consultants"],
  },
  {
    title: "Academic / Certification Coaching",
    image: academicCoaching,
    description:
      "From test prep to professional certifications, academic coaches play a critical role in career advancement. We help you build automated systems that attract more students and deliver exceptional learning experiences at scale.",
    examples: ["Test Prep & Tutoring Companies", "Professional Certification Programs", "Continuing Education Providers"],
  },
  {
    title: "Fitness / Wellness Training",
    image: fitnessTraining,
    description:
      "The wellness industry is booming — and competition is fierce. We help fitness and wellness trainers stand out with AI-driven client acquisition, streamlined scheduling, and retention systems that keep your community growing.",
    examples: ["Personal Training Studios", "Online Fitness Coaching Platforms", "Yoga & Wellness Retreat Companies"],
  },
];

const WhoWeService = () => {
  return (
    <div className="min-h-screen pt-16 md:pt-28">
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center">
            <h1 className="font-display text-4xl font-bold md:text-5xl">
              Who We <span className="gradient-text">Service</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              We specialize in serving small to medium businesses across the coaching and training industry. If you're dedicated to helping others grow, we're dedicated to helping you evolve.
            </p>
          </motion.div>

          <div className="mt-20 space-y-20">
            {segments.map((seg, i) => (
              <motion.div
                key={seg.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="flex flex-col items-center gap-10 md:flex-row"
              >
                <img
                  src={seg.image}
                  alt={seg.title}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="h-72 w-full rounded-xl object-cover md:w-96 flex-shrink-0"
                />
                <div>
                  <h2 className="font-display text-2xl font-bold md:text-3xl">{seg.title}</h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed">{seg.description}</p>
                  <div className="mt-6 space-y-2">
                    <p className="text-sm font-body font-semibold text-deep-azure uppercase tracking-wider">Common Examples</p>
                    <ul className="space-y-1">
                      {seg.examples.map((ex) => (
                        <li key={ex} className="flex items-center gap-2 text-secondary-foreground">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                          {ex}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhoWeService;
