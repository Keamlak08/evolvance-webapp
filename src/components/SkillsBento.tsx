import { motion } from "framer-motion";
import { Workflow, PhoneCall, Megaphone, GraduationCap, BarChart3, Plug, FileText } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const skills = [
  { icon: Workflow, title: "workflow automation", desc: "manual busywork, handled by systems that run themselves." },
  { icon: PhoneCall, title: "client follow-up", desc: "call analytics and follow-up that close the loop." },
  { icon: Megaphone, title: "lead generation", desc: "outbound and inbound engines that keep the pipeline full." },
  { icon: GraduationCap, title: "ai training", desc: "your team, fluent in the tools you're now running." },
  { icon: BarChart3, title: "data & reporting", desc: "one clear picture instead of scattered numbers." },
  { icon: Plug, title: "systems integration", desc: "the tools you already use, actually talking to each other." },
  { icon: FileText, title: "process documentation", desc: "repeatable process, not knowledge stuck in one person's head." },
];

const SkillsBento = () => {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center max-w-xl mx-auto mb-10 md:mb-12"
        >
          <p className="text-overline text-deep-azure mb-2 lowercase">what we can do</p>
          <h2 className="font-body text-h2 font-bold leading-tight lowercase">
            the skills behind the phases
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeUp}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
        >
          {skills.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="plain-card p-4 md:p-5 flex flex-col">
                <Icon className="h-4 w-4 text-deep-azure mb-2.5 shrink-0" />
                <h3 className="font-body font-semibold text-body leading-tight lowercase">{s.title}</h3>
                <p className="mt-1 text-caption font-body text-muted-foreground leading-relaxed lowercase">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsBento;
