import { ReactNode } from "react";
import { motion } from "framer-motion";

interface PageHeaderProps {
  overline?: string;
  title: ReactNode;
  subtitle?: ReactNode;
}

/**
 * Slim dark-navy intro band used at the top of every interior page
 * (Contact, Podcast, Book a Call). Gives every page in the site the same
 * opening beat as the homepage hero, so navigating between pages feels
 * like one designed system rather than a stack of separately-built
 * screens with different starting points.
 */
const PageHeader = ({ overline, title, subtitle }: PageHeaderProps) => {
  return (
    <section className="bg-shell border-b border-shell-border py-14 md:py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          {overline && <p className="text-overline text-primary mb-3 lowercase">{overline}</p>}
          <h1 className="font-body text-h1 font-bold text-shell-foreground leading-tight lowercase">{title}</h1>
          {subtitle && (
            <p className="mt-4 text-body-lg font-body text-shell-muted leading-relaxed">{subtitle}</p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default PageHeader;
