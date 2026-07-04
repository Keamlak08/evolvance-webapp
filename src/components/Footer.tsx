import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/egp-logo-transparent.png";

const navItems = [
  { label: "Our Service", path: "/" },
  { label: "The Evolution Podcast", path: "/podcast" },
  { label: "Contact Us", path: "/contact" },
];

const Footer = () => {
  const location = useLocation();
  return (
    <footer className="bg-shell border-t border-shell-border py-10 md:py-14">
      <div className="container mx-auto px-6 flex flex-col items-center gap-6">
        <div className="flex items-center gap-3">
          <img src={logo} alt="EGP Logo" className="h-14 w-14 md:h-20 md:w-20 object-contain" />
          <p className="font-display text-lg md:text-2xl font-bold text-shell-foreground">
            <span className="gradient-text-bright">Evolvance</span> Growth Partners
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-6 md:gap-10">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`text-base md:text-xl font-body font-semibold transition-colors hover:text-primary ${
                  active ? "text-primary" : "text-shell-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <p className="text-xs md:text-sm text-shell-muted text-center">
          Evolvance Growth Partners LLC. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
