import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/egp-logo-transparent.png";

const navItems = [
  { label: "Our Service", path: "/" },
  { label: "Podcast", path: "/podcast" },
  { label: "Contact Us", path: "/contact" },
];

const Header = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Every page opens with a navy band (the hero on "/", a PageHeader band
  // everywhere else), so the header can start transparent and float over
  // it seamlessly, then pick up a solid background once the page has
  // scrolled past that band. Same header, no visual seam either way.
  //
  // NOTE on the bug this used to have: `scrolled` still exists to make the
  // header progressively more solid as you scroll (nice depth cue), but it
  // is no longer what keeps the text legible. Previously the header was
  // *fully* transparent until scrolled > 32px, which assumed the top 32px
  // of every page would always be dark navy. That assumption breaks
  // anywhere it isn't true — e.g. a shorter band on some viewport size, or
  // any future page that doesn't open with PageHeader — and the white nav
  // text/wordmark would disappear into a light background. The real fix
  // (an always-on scrim + header-text-shadow class below) doesn't depend
  // on that assumption at all; `scrolled` is now purely a cosmetic upgrade
  // on top of an already-legible baseline.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-16 md:h-20 backdrop-blur-md transition-[background-color,border-color] duration-300 ${
        scrolled
          ? "bg-shell/95 border-b border-shell-border"
          : "bg-shell/50 border-b border-white/5"
      }`}
    >
      <div className="container mx-auto flex h-full items-center justify-between px-4 md:px-8 gap-4">
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <img src={logo} alt="EGP Logo" className="h-9 w-9 md:h-11 md:w-11 object-contain drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]" />
          <span className="header-text-shadow font-body text-base md:text-h3 font-bold tracking-tight text-shell-foreground hidden sm:inline">
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
                className={`header-text-shadow font-body text-sm font-medium transition-colors hover:text-primary ${
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
              <Button variant="ghost" size="icon" className="header-text-shadow text-shell-foreground hover:bg-shell/60">
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
                    className={`font-body text-base font-medium transition-colors hover:text-primary ${
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
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 px-5">
              Book a Discovery Call
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
