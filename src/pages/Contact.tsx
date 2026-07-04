import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message sent!", description: "We'll get back to you shortly." });
    setForm({ name: "", email: "", company: "", message: "" });
  };

  return (
    <div className="min-h-screen pt-24 md:pt-28">
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-6">
          <div className="grid gap-12 lg:gap-16 lg:grid-cols-2">
            {/* LHS — Get in touch */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h1 className="font-display text-h1 font-bold">Get in Touch</h1>
              <p className="mt-4 text-body-lg font-body text-muted-foreground max-w-lg">
                Have questions about our services? Send us a message and we'll get back to you shortly.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 plain-card p-6 md:p-8 space-y-5">
                <div>
                  <label className="text-caption font-body font-semibold">Name</label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    required
                    className="mt-1 bg-secondary"
                  />
                </div>
                <div>
                  <label className="text-caption font-body font-semibold">Email</label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@company.com"
                    required
                    className="mt-1 bg-secondary"
                  />
                </div>
                <div>
                  <label className="text-caption font-body font-semibold">Company</label>
                  <Input
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="Your company name"
                    className="mt-1 bg-secondary"
                  />
                </div>
                <div>
                  <label className="text-caption font-body font-semibold">Message</label>
                  <Textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="How can we help?"
                    rows={5}
                    required
                    className="mt-1 bg-secondary"
                  />
                </div>
                <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Send Message
                </Button>
              </form>

              <div className="mt-8 plain-card p-6 md:p-8">
                <h3 className="font-display text-h3 font-bold mb-4">Or contact directly</h3>
                <div className="space-y-3">
                  <a
                    href="tel:7039469619"
                    className="flex items-center gap-4 text-foreground hover:text-deep-azure transition-colors"
                  >
                    <div className="rounded-lg bg-pale-azure p-2.5">
                      <Phone className="h-5 w-5 text-deep-azure" />
                    </div>
                    <span className="font-body font-medium text-body">703-946-9619</span>
                  </a>
                  <a
                    href="mailto:ethan@evolvancepartners.com"
                    className="flex items-center gap-4 text-foreground hover:text-deep-azure transition-colors"
                  >
                    <div className="rounded-lg bg-pale-azure p-2.5">
                      <Mail className="h-5 w-5 text-deep-azure" />
                    </div>
                    <span className="font-body font-medium text-body">ethan@evolvancepartners.com</span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* RHS — Calendly */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="font-display text-h2 font-bold leading-tight">Book a Discovery Call</h2>
              <p className="mt-4 text-body-lg font-body text-muted-foreground max-w-lg">
                Learn more about our services and receive a free customized{" "}
                <span className="font-display font-semibold text-deep-azure">Evolvance Growth Plan</span>.
              </p>

              <div className="mt-6 plain-card overflow-hidden p-1">
                <iframe
                  src="https://calendly.com/ethan-evolvancepartners/discovery-call-with-ethan?embed_domain=evolvancepartners.com&embed_type=Inline&background_color=FCF9F3&text_color=141414&primary_color=01AEDD"
                  title="Schedule a discovery call with Ethan"
                  className="w-full"
                  style={{ height: "900px", border: 0 }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
