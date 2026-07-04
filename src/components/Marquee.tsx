import { ReactNode } from "react";

interface MarqueeProps {
  items: ReactNode[];
  className?: string;
}

/**
 * Infinite horizontal scroll. Renders the item list twice back-to-back and
 * animates the whole strip left by exactly 50% of its width, so the moment
 * the first copy scrolls out of view, the second copy is in the identical
 * position — the loop point is invisible. Pure CSS animation, no JS ticking,
 * so it costs nothing at runtime and doesn't jank on slower devices.
 */
const Marquee = ({ items, className = "" }: MarqueeProps) => {
  return (
    <div className={`overflow-hidden marquee-mask ${className}`}>
      <div className="flex w-max animate-marquee">
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center shrink-0">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
