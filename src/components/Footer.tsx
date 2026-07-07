import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/egp-logo-transparent.png";

const navItems = [
  { label: "our service", path: "/" },
  { label: "the evolution podcast", path: "/podcast" },
  { label: "contact us", path: "/contact" },
];

const Footer = () => {
  const location = useLocation();
  return (
    <footer className="bg-shell border-t border-shell-border py-10 md:py-12">
      <div className="container mx-auto px-6 flex flex-col items-center gap-6">
        <div className="flex items-center gap-2.5">
          <img src={logo} alt="EGP Logo" className="h-9 w-9 md:h-10 md:w-10 object-contain" />
          <p className="font-body text-h3 font-bold text-shell-foreground">
            <span className="gradient-text-bright">Evolvance</span> Growth Partners
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-6 md:gap-8">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`font-body text-sm font-medium transition-colors hover:text-primary ${
                  active ? "text-primary" : "text-shell-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <p className="text-caption font-body text-shell-muted text-center">
          Evolvance Growth Partners LLC. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
