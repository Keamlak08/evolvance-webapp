import { motion } from "framer-motion";
import { useEffect } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const BookDiscovery = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen pt-24 md:pt-28">
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h1 className="font-display text-h1 font-bold">
              Book Your <span className="gradient-text">Discovery Session</span>
            </h1>
            <p className="mt-4 text-body-lg font-body text-muted-foreground max-w-2xl mx-auto">
              Discuss your biggest issues and goals so we can conquer them together
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mx-auto max-w-4xl plain-card overflow-hidden p-1"
          >
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/ethan-evolvancepartners/discovery-call-with-ethan"
              style={{ minWidth: "320px", height: "700px" }}
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BookDiscovery;
