import { motion } from "framer-motion";
import { Boxes, Plug, UserRound, Unlock, FileStack, UserRoundCheck, PackageCheck } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

/**
 * Content axis for this section, deliberately different from everywhere
 * else on the page: the hero's three outcomes are RESULTS, the scroll
 * section's fixes are PROBLEM -> ANSWER pairs, and the phases are the
 * ENGAGEMENT ROADMAP. This section is about HOW WE OPERATE day-to-day —
 * so none of it restates a capability, phase bullet, or outcome already
 * said elsewhere on the page.
 */
const modules = [
  {
    icon: Boxes,
    title: "Built around your business, not a template",
    desc: "Every system starts with how your team already works today. We shape the AI around your process, never the other way around.",
    span: "col-span-2 row-span-2",
    anchor: true,
    tone: 18,
  },
  {
    icon: Plug,
    title: "Lives inside tools you already use",
    desc: "No new dashboard to check every morning — Evolvance plugs into the software already running your business.",
    span: "col-span-2",
    anchor: false,
    tone: 13,
  },
  {
    icon: UserRoundCheck,
    title: "Direct access to the founder",
    desc: "You work with Ethan directly, not a rotating account team.",
    span: "col-span-1",
    anchor: false,
    tone: 21,
  },
  {
    icon: Unlock,
    title: "No long-term lock-in",
    desc: "Month-to-month, by design. We keep earning the partnership, not coasting on a contract.",
    span: "col-span-1",
    anchor: false,
    tone: 12,
  },
  {
    icon: FileStack,
    title: "Docs, not tribal knowledge",
    desc: "Every workflow ships with a written SOP, so it still runs even if the person who built it is out.",
    span: "col-span-1",
    anchor: false,
    tone: 24,
  },
  {
    icon: UserRound,
    title: "One person, start to finish",
    desc: "Whoever scopes the work is who builds it — no hand-offs, no lost context.",
    span: "col-span-1",
    anchor: false,
    tone: 14,
  },
  {
    icon: PackageCheck,
    title: "Real deliverables, not slide decks",
    desc: "You get shipped systems and live automations, not a strategy deck telling you what to do next.",
    span: "col-span-2",
    anchor: false,
    tone: 11,
  },
] as const;

/**
 * True bento layout: one unified outer frame (bg-shell, matching the
 * brand's other dark "impact" surfaces — hero, footer, final CTA) with
 * internal modules subdivided by a shared gap, rather than separate cards
 * floating with page-level gutters between them like the previous grid.
 *
 * Each module is shaded with the SAME hue/saturation as --shell, only the
 * lightness (`tone`, in %) changes — tonal variation, not hue variation,
 * per the brief. This is computed inline rather than as static Tailwind
 * classes because the whole point is each tile getting its own specific
 * step on one shared scale, which isn't something the default palette
 * expresses as utility classes.
 */
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
          <p className="text-overline text-deep-azure mb-3">How We Operate</p>
          <h2 className="font-body text-h1 font-bold leading-tight">
            The way we work is part of the product
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeUp}
          className="rounded-[1.75rem] bg-shell p-2 md:p-3"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
            {modules.map((m) => {
              const Icon = m.icon;
              return (
                <div
                  key={m.title}
                  style={{ backgroundColor: `hsl(205 55% ${m.tone}%)` }}
                  className={`rounded-2xl p-5 md:p-6 flex flex-col overflow-hidden ${m.span}`}
                >
                  <div
                    className={`rounded-lg bg-white/10 flex items-center justify-center shrink-0 ${
                      m.anchor ? "h-12 w-12 mb-4" : "h-10 w-10 mb-3"
                    }`}
                  >
                    <Icon className={m.anchor ? "h-6 w-6 text-shell-foreground" : "h-5 w-5 text-shell-foreground"} />
                  </div>
                  <h3
                    className={`font-body font-bold leading-tight text-shell-foreground ${
                      m.anchor ? "text-h2" : "text-h3"
                    }`}
                  >
                    {m.title}
                  </h3>
                  <p
                    className={`mt-2 font-body text-shell-muted leading-relaxed ${
                      m.anchor ? "text-body" : "text-caption"
                    }`}
                  >
                    {m.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsBento;
