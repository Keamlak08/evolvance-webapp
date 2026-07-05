import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // One typeface, used at different weights to create hierarchy — this
      // is deliberate, not a placeholder. Two Montserrat "roles" are kept
      // (display/body) purely so existing component classNames don't need
      // touching; both resolve to the same family. Poppins rides along as
      // the fallback instead of a generic keyword: if the webfont request
      // for Montserrat ever fails, a bare font stack falls through to the
      // browser's true default, which on most browsers is Times New Roman
      // — one of the exact fonts being avoided here. Poppins is a real,
      // intentional, same-character geometric sans, loaded from the same
      // Google Fonts request, so even that edge case still looks like the
      // brand instead of breaking.
      fontFamily: {
        display: ['"Montserrat"', '"Poppins"'],
        body: ['"Montserrat"', '"Poppins"'],
        // Closes a gap: some shadcn/ui internals reference the default
        // `sans` key via the bare `font-sans` utility. Overriding it here
        // means even that path resolves to Montserrat/Poppins, not
        // Tailwind's default ui-sans-serif/system-ui stack.
        sans: ['"Montserrat"', '"Poppins"'],
      },
      // Type scale — modern, minimalist, single-typeface.
      // One family (Montserrat) runs the entire site. Hierarchy comes from
      // weight and size, not from switching typefaces: the hero display
      // size pairs with font-extrabold/font-black, most headings sit at
      // font-bold, card titles and buttons at font-semibold. That's what
      // keeps the system feeling considered rather than like a stack of
      // default heading tags.
      fontSize: {
        // Hero headline + splash screen only. font-extrabold, italic on the key word.
        display: ['3.75rem', { lineHeight: '1.02', letterSpacing: '-0.02em' }], // 60px
        // Page-level headings. font-bold.
        h1: ['2.25rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }], // 36px
        // Section headings. font-bold.
        h2: ['1.75rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }], // 28px
        // Card titles / sub-section headings. font-semibold.
        h3: ['1.25rem', { lineHeight: '1.3' }], // 20px
        // Hero subhead, intro paragraphs.
        'body-lg': ['1.125rem', { lineHeight: '1.6' }], // 18px
        // Standard body copy.
        body: ['1rem', { lineHeight: '1.6' }], // 16px
        // Uppercase section kickers. Pair with uppercase + tracking-[0.14em].
        overline: ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.14em' }], // 11px
        // Oversized stat/number callouts. font-extrabold + gradient-text.
        data: ['4rem', { lineHeight: '1' }], // 64px
        // All CTA and form buttons.
        btn: ['0.875rem', { lineHeight: '1.2' }], // 14px
        // Dates, footnotes, fine print.
        caption: ['0.8125rem', { lineHeight: '1.4' }], // 13px
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        glow: "hsl(var(--glow))",
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        marquee: "marquee 32s linear infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
