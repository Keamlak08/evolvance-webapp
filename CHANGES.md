# Scroll Fix + Interactive Scroll + Hero Rework + Bento Skills

4 files: 1 bug fix, 1 modified, 2 new. Verified with `tsc --noEmit`,
`npm run build`, and `eslint` before packaging. No new dependencies —
everything here runs on Framer Motion, already in the project.

## Files
**Fixed:** `src/components/IntroSplash.tsx`
**Modified:** `src/pages/Services.tsx`
**New:** `src/components/InteractiveScroll.tsx`, `src/components/SkillsBento.tsx`

---

## The scroll bug

Found it. `IntroSplash.tsx` was setting `document.body.style.overflow =
"hidden"` on mount, with a `useEffect` cleanup meant to restore it. That
cleanup only runs when the component actually unmounts — but the splash
never unmounts, it just renders `null` once it's done (`if (!visible)
return null`). Since `Services.tsx` always renders `<IntroSplash />`
unconditionally, the component stays mounted forever in a "rendering
nothing" state, so that cleanup function never fires, and scroll stays
locked permanently after the intro finishes.

Fixed by restoring `overflow` explicitly inside `finish()`, the same
place that hides the splash, instead of depending on an unmount that was
never going to happen. The `useEffect` cleanup is still there as a
safety net for edge cases like hot-reloading during development, but the
real fix is the explicit restore.

---

## The interactive scroll sequence

New component: `InteractiveScroll.tsx`, sitting between the hero and the
credential bar.

**How it's built:** a tall wrapper (350% of viewport height) drives a
scroll-progress value from 0 to 1 using Framer Motion's `useScroll`.
Inside it, a `sticky top-0 h-screen` panel stays pinned to the screen for
that entire scroll distance, while everything inside it — the heading,
each pain-point card, the solution block — is positioned with opacity and
position tied directly to that scroll progress via `useTransform`. That's
the difference between this and a normal "fade in when scrolled into
view" animation: this tracks the scrollbar directly, so scrolling slower
or faster changes the pacing in real time, and scrolling back up reverses
it.

**The sequence, mapped to scroll progress:**
- 0–5%: blank, matching "a bit blank page" from your instructions
- 5–38%: "Sound familiar?" fades in, then six pain-point cards land one
  at a time in scattered positions around the screen (not stacked, not
  all at once), each styled as a small amber warning card with a
  triangle icon — matching the look in your Subduxion screenshot
- 55–65%: all the cards and the heading clear together
- 68–91%: the solution beat arrives — "Here's how we fix it" plus the
  five "we help you achieve" items, the same content that used to be the
  standalone strip right under the old hero
- 91–97%: fades out
- 97–100%: blank tail, so releasing the pin doesn't look like a jump-cut

**Why it releases cleanly on its own:** once scroll passes the wrapper's
full height, the sticky panel's containing block scrolls out from under
it, and `position: sticky` just... stops being sticky. No manual "unpin"
logic needed. Content is already fully transparent by that point (see
the 97–100% blank tail above), so there's nothing to visually jar when
it happens.

**"See How It Works" skips it entirely.** That button still anchors
straight to `#phases`. There's no `scroll-behavior: smooth` set anywhere
in the project, so it's a hard, instant jump — it never scrolls *through*
this section's progress range, it just teleports past it.

**The old pain-point ticker and standalone aspirations strip are both
gone from the page now** — their content lives inside this new sequence
instead. The `Marquee.tsx` component file is still sitting untouched in
the codebase if you ever want a horizontal ticker again elsewhere.

---

## Hero changes

- **"Evolution" is no longer italic.** Still in the bright gradient, just
  upright now.
- **The two background glow blobs are gone.** No more gradient wash
  behind the hero content.
- **New: a thin glowing horizon line along the very bottom edge.** A 1px
  line, soft white, faded at both ends, with just enough box-shadow blur
  to read as "glowing" without being loud. It's a quiet visual cue that
  there's more below, not a decoration competing for attention.
- **Subhead trimmed.** It was carrying a lot of the "problem → solution"
  narrative that the interactive scroll now owns. Cut down to a single
  line naming what you do, since the scroll sequence right after it now
  handles the fuller story.
- Everything else in the hero (headline, CTAs, the Evolvance definition
  card) is unchanged.

**Still waiting on you:** you mentioned images are coming for the hero
soon. I didn't add a placeholder image slot since we've been avoiding
stock photography on purpose throughout this whole rebuild — once you
send real images, that's a quick follow-up to slot them in properly
rather than guessing at layout now and rebuilding it later.

---

## The bento skills board

New component: `SkillsBento.tsx`, placed right after the three-phase
section and before Meet Ethan. Seven tiles in a bento grid — one large
anchor tile ("Workflow Automation") spanning 2×2, with the rest arranged
around it at different widths so it doesn't read as a flat, repetitive
grid:

Workflow Automation (anchor), Client Callback & Follow-Up, Lead
Generation, AI Training & Upskilling, Data & Reporting, Systems
Integration, Process Documentation.

I picked these seven based on what's already implied elsewhere in your
copy (call analytics, automated workflows, AI training all show up in
the phase bullets already) plus a few adjacent, defensible categories
(CRM integration, documentation) that round out "everything else" without
inventing services that aren't grounded in anything on the site already.
If any of these don't match what you actually offer, they're just array
entries — easy to swap, rename, or add to.

Same visual language as the phase cards: plain card, gradient top-rule,
icon chip, no stock photography.

---

## Placement, start to finish

Hero (full screen) → Interactive Scroll (pain points → solution) →
Credential Bar → Three Phases → **Bento Skills Board (new)** → Meet Ethan
→ Final CTA Band.
