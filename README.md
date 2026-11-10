# Khybrio

Marketing site for Khybrio, a studio in Zamboanga City that keeps small businesses in the Philippines "always connected": three packages (Get found, Get booked, Get ahead) built from six services. One page in English, React 19 + Vite + Tailwind v4, on GitHub Pages under /Khybrio/. ph/index.html is a static redirect to / because old links and NFC cards point at /ph/; never delete it.

```bash
npm install
npm run dev
```

| | |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run lint` | Oxlint |
| `npm run check:anchors` | Fails if any in-page link points at a section that does not exist |
| `npm test` | Package recommendation logic (`src/lib/recommend.test.js`) |
| `npm run placeholders` | Regenerate the placeholder SVGs |

---

## The page

Hero, Packages, Services, How it works, About, FAQ, Contact. It was cut from
about 23 screens to about 10 on 2026-11-10. The island fly-through (a
scroll-scrubbed camera flight) went with it; git history before `e4c83c1` has
`Flight.jsx`, `ScrollScene`, `SceneMedia` and the scrub hooks.

The island art lives inside the sections instead: one scene per package card,
one per services pillar (desktop only), and the ambient island loop in About
(video attaches only on screens 768px and wider, with Save-Data and reduced
motion off; everyone else gets the still).

**Contact is a guided chat.** Khybi asks five questions, takes a name and a
way to reach them, posts everything to Formspree, then shows the package we
would start with and why. Copy is `src/content/quiz.js`; the decision is the
pure function in `src/lib/recommend.js`, with its contract written out in
`recommend.test.js`. The option values in the copy and the logic must match,
and the tests fail if they drift. "Saved" only shows when the relay accepted
the send.

Scroll entrances run on GSAP ScrollTrigger through `Words` (headlines) and
`Reveal` (everything else). Markup renders visible and JS applies the hidden
state, with a failsafe reveal, so a missed trigger never hides content.

---

## Structure

- `src/content/offer.js`: hero, packages and services copy (spec: `.claude/specs/offer.md`)
- `src/content/site.js`: Nav, Process, About, FAQ, Footer copy, contact channels and form endpoint
- `src/content/quiz.js`: the guided chat's questions, reasons and result copy
- `src/sections/`: one file per page section; `offer/` holds Packages and Services
- `src/components/`: shared pieces (`Nav`, `Words`, `Reveal`, `AssetImage`, custom icons, ...)
- `src/lib/`: `smoothScroll` (Lenis with GSAP ScrollTrigger), `assets`, `recommend` (which package fits a set of answers)
- `ph/index.html`: redirect only

---

## Accessibility

`prefers-reduced-motion: reduce` disables Lenis and the reveal animations.

---

## Open items

Open items: see BUSINESS.md, "Current status".
