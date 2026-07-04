import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/egp-logo-transparent.png";

const navItems = [
  { label: "Our Service", path: "/" },
  { label: "Podcast", path: "/podcast" },
  { label: "Contact Us", path: "/contact" },
];

const Header = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 md:h-24 bg-shell border-b border-shell-border">
      <div className="container mx-auto flex h-full items-center justify-between px-4 md:px-8 gap-4">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img
            src={logo}
            alt="EGP Logo"
            className="h-11 w-11 md:h-14 md:w-14 object-contain"
          />
          <span className="font-display text-lg md:text-h3 font-bold tracking-tight text-shell-foreground hidden sm:inline">
            <span className="gradient-text-bright">Evolvance</span> Growth Partners
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`font-body text-base font-medium transition-colors hover:text-primary ${
                  active ? "text-primary" : "text-shell-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-shell-foreground hover:bg-shell/60">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="pt-12 bg-background">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className={`font-display text-base font-medium transition-colors hover:text-primary ${
                      location.pathname === item.path ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link to="/book" onClick={() => setOpen(false)}>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    Book a Discovery Call
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <Link to="/book" className="hidden md:block">
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-5 py-5"
            >
              Book a Discovery Call
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
