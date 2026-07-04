import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="text-center">
        <h1 className="font-display text-display font-bold text-foreground">404</h1>
        <p className="mt-4 text-body-lg font-body text-muted-foreground">Oops! Page not found</p>
        <a
          href="/"
          className="mt-6 inline-block font-body text-body font-semibold text-deep-azure hover:text-primary transition-colors"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
