import { motion } from "framer-motion";
import { Workflow, PhoneCall, Megaphone, GraduationCap, BarChart3, Plug, FileText } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const skills = [
  {
    icon: Workflow,
    title: "Workflow Automation",
    desc: "Replace manual busywork with reliable, AI-powered systems that run themselves.",
    span: "col-span-2 row-span-2",
    anchor: true,
  },
  {
    icon: PhoneCall,
    title: "Client Callback & Follow-Up",
    desc: "Automated follow-up and call analytics that turn conversations into clients.",
    span: "col-span-2",
  },
  {
    icon: Megaphone,
    title: "Lead Generation",
    desc: "AI-driven outbound and inbound engines that keep your pipeline full.",
    span: "col-span-1",
  },
  {
    icon: GraduationCap,
    title: "AI Training & Upskilling",
    desc: "Give your team the fluency to run new systems with confidence.",
    span: "col-span-1",
  },
  {
    icon: BarChart3,
    title: "Data & Reporting",
    desc: "Dashboards that turn scattered numbers into one clear picture.",
    span: "col-span-1",
  },
  {
    icon: Plug,
    title: "Systems Integration",
    desc: "Connect the tools you already use so nothing falls through the cracks.",
    span: "col-span-1",
  },
  {
    icon: FileText,
    title: "Process Documentation",
    desc: "Clear SOPs that make every process repeatable, not tribal knowledge.",
    span: "col-span-2",
  },
];

const SkillsBento = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center max-w-2xl mx-auto mb-14 md:mb-16"
        >
          <p className="text-overline text-deep-azure mb-3">What We Can Do</p>
          <h2 className="font-body text-h1 font-bold leading-tight">
            Every skill it takes to run a modern, AI-evolved business
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeUp}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5"
        >
          {skills.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className={`plain-card p-5 md:p-6 flex flex-col overflow-hidden relative ${s.span}`}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ background: "linear-gradient(90deg, #016B88, #129094, #26BB70)" }}
                />
                <div
                  className={`rounded-lg bg-pale-azure flex items-center justify-center shrink-0 ${
                    s.anchor ? "h-12 w-12 mb-4" : "h-10 w-10 mb-3"
                  }`}
                >
                  <Icon className={s.anchor ? "h-6 w-6 text-deep-azure" : "h-5 w-5 text-deep-azure"} />
                </div>
                <h3
                  className={`font-body font-bold leading-tight ${
                    s.anchor ? "text-h2" : "text-h3"
                  }`}
                >
                  {s.title}
                </h3>
                <p
                  className={`mt-2 font-body text-muted-foreground leading-relaxed ${
                    s.anchor ? "text-body" : "text-caption"
                  }`}
                >
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
