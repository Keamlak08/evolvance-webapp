# Full Revamp — What Changed

This replaces the earlier "styling pass" delivery entirely. That one only
adjusted sizing on top of the existing structure — this one rebuilds the
actual page structure and visual language on the same skeleton, keeping
your brand colors and fonts. Drop these files into your repo at the same
paths. 12 files total: 10 modified, 2 new.

Verified clean with `tsc --noEmit`, `npm run build`, and `eslint` before
packaging.

## Files
**Modified:** `tailwind.config.ts`, `src/index.css`, `src/components/ui/button.tsx`,
`src/components/Header.tsx`, `src/components/Footer.tsx`, `src/pages/Services.tsx`
(your homepage), `src/pages/Contact.tsx`, `src/pages/Podcast.tsx`,
`src/pages/BookDiscovery.tsx`, `src/pages/NotFound.tsx`

**New:** `src/components/Marquee.tsx`, `src/components/PageHeader.tsx`

## Not touched
- **Colors.** Still your Azure/Aqua/Green/Navy palette. Untouched.
- **Logo.** You said that's coming later.
- **`Index.tsx`, `Home.tsx`, `WhoWeService.tsx`.** Still orphaned, still not
  wired to any route. Left alone.
- **Podcast data fetching, Calendly integration, contact form logic.** All
  functional code is untouched — this was a visual and structural pass.

## Typography — rebuilt per your correction

You said the table needed to become more modern and minimalist, not just
get implemented as-is. Here's the actual change: Libre Baskerville (the
serif) is now reserved for exactly two moments — the hero headline and,
later, oversized stat numbers if you add them. Every other heading, card
title, label, and button on the site now runs on IBM Plex Sans.

The old version had Libre Baskerville Bold on H1, H2, *and* H3 — meaning
every card title across the site was set in heavy serif. That reads as
editorial or classic, not modern. Pulling the serif back to a single
appearance makes the one moment it does show up (the hero) actually land,
instead of the effect getting worn down by repetition.

New scale, in `tailwind.config.ts`:

| Token | Size | Font | Where |
|---|---|---|---|
| `display` | 60px | Baskerville 700 | Hero headline only |
| `h1` | 36px | Plex Sans 700 | Page titles |
| `h2` | 28px | Plex Sans 700 | Section headings |
| `h3` | 20px | Plex Sans 600 | Card titles |
| `body-lg` | 18px | Plex Sans 400 | Intro paragraphs |
| `body` | 16px | Plex Sans 400 | Standard copy |
| `overline` | 11px | Plex Sans 600 | Kickers, uppercase |
| `data` | 64px | Baskerville 700 | Stat callouts (not used yet) |
| `btn` | 14px | Plex Sans 600 | All buttons |
| `caption` | 13px | Plex Sans 400 | Dates, fine print |

## The homepage — rebuilt from the skeleton up

**Hero.** No longer a cream section with a stock photo. It's now full dark
navy (your shell color) with two soft abstract glow shapes in azure and
green behind the text, done in pure CSS gradients, not an image. The
headline is shortened to "Empower Your Growth Evolution," with "Evolution"
set in italic Libre Baskerville and the bright gradient. Below it: a tight
subhead, two CTAs (primary "Book a Discovery Call," secondary "See How It
Works" that scroll-links to the phases section), and the Evolvance
definition box restyled as a translucent card sitting on the dark surface.

I did shorten the headline — the original was 16 words, and a headline
that long can't carry the gradient/italic treatment cleanly at any real
size. This was already flagged as a recommendation in the design doc; I
went ahead and applied it since you asked for the full rework this time.
Happy to adjust the wording, that part's easy to tune.

**Pain-point ticker.** New section, directly below the hero. A continuous
horizontal scroll of short lines describing problems your prospects
actually have — "Team buried in low-value tasks," "Revenue flat despite
more hours worked," and so on. This is the Subduxion-style element from
the design doc, built generically for now. When you send the specific
intro details next chat, this is the piece we'll refine or replace.

**Aspirations strip.** The five "we help you achieve" bullets that used to
be a tall vertical list inside the hero are now a compact single-line
icon row right below the ticker. Same content, way less vertical weight.

**Credential bar.** A slim strip naming Ethan's BCG/Innosight background
with small logo chips, sitting right after the aspirations strip. This is
the "move credibility up" fix from the design doc audit; the full Meet
Ethan section with his complete bio still lives further down the page for
anyone who wants the full story.

**Three phases.** This is the biggest structural change. The old layout
was three tall stacked sections alternating a stock photo left/right. That
had two problems: stock photos undercut credibility, and the stacked
format doesn't let a visitor compare all three phases at once. The new
version is a three-card grid, connected by small arrow icons between them
to reinforce that this is a sequence. Each card has an icon (not a stock
photo), a gradient top-rule, the phase number, the guarantee line, and
the bullet list. This is the bento-style pattern from the design doc,
adapted to make sense for three sequential items rather than an
asymmetric grid.

I dropped the phase stock images entirely rather than swapping them for
different stock images. The design doc audit specifically called these
out as hurting credibility, and there's no real photography to replace
them with yet. Icons carry the same visual weight without that problem.
When real photos or a data point becomes available, they're easy to work
back in.

**Meet Ethan.** Same bio and credentials, tightened typography, smaller
and less ornamented photo treatment (dropped the heavy shadow and thick
border), matching the calmer overall style.

**Final CTA band.** New. A single full-width navy section with one line
and one button, right before the footer. Previously the only closing
moment was whatever came after the Meet Ethan section, which wasn't
really a CTA.

## Header — now scroll-aware

The header starts transparent and overlays the hero (or, on interior
pages, the new PageHeader band — see below) directly. Once you scroll
about 32px, it picks up a solid navy background with a blur and border.
This works because every page now opens with a navy section at the top,
so the transparent header always has a dark background to sit on
regardless of which page you're on.

Also reduced from 144px tall to 64/80px (mobile/desktop), with a
proportionally smaller logo. The old size was eating a huge chunk of the
viewport before any content appeared.

## New: PageHeader component

Contact, Podcast, and Book a Call now each open with a slim navy band
(overline + heading + short subtext) before the page continues in cream.
Previously these pages just started directly in cream with no equivalent
opening beat to the homepage hero. Now every page in the site opens the
same way, which is a big part of what makes a site feel like one designed
system instead of a stack of separately-built screens.

## Cards, buttons, glow — consistency pass carried over

Same fixes as the first round, still true here: one plain card treatment
site-wide instead of translucent glass everywhere, gradient text pulled
back to the hero and actual brand-name mentions instead of on every
heading, the pulse-glow animation limited to primary CTAs instead of
every button, button typography fixed once in the component instead of
overridden per instance.

## Copy

Two em dashes removed from the homepage bio and definition-box copy
(brand guidelines ban these). No other copy was rewritten except the hero
headline, which is explained above.

## Worth knowing before you show Ethan this

- **The pain-point ticker and hero glow are placeholder-quality builds
  of a Subduxion-inspired pattern**, not the specific "cool intro" you
  mentioned. Once you send the details, that section gets refined or
  replaced.
- **No fake client logos or made-up stats anywhere.** The design doc
  flagged that real client metrics and logos are still an open item with
  Ethan. Nothing here fabricates either.
- **Large image files are still large.** `ethan-headshot.png` is 2.7MB,
  `egp-logo-transparent.png` is 620KB. Not a styling issue, but worth
  compressing before this goes live, they'll slow the site down.
