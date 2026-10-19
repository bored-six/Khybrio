# Khybrio

Marketing site for Khybrio, a digital services studio in Zamboanga City: website packages, Google Business Profile setup and workflow automation for small businesses in the Philippines. One page in English, React 19 + Vite + Tailwind v4, on GitHub Pages under /Khybrio/. ph/index.html is a static redirect to / because old links and NFC cards point at /ph/; never delete it.

```bash
npm install
npm run dev
```

| | |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run lint` | Oxlint |
| `npm run placeholders` | Regenerate the placeholder SVGs |

---

## The signature interaction

A **scroll-scrubbed camera flight** over the Khybrio island, using the technique
from [oso95/scroll-world](https://github.com/oso95/scroll-world): scroll position
drives the visuals instead of triggering a one-shot animation.

One pinned scene (`ScrollScene`, `src/sections/Flight.jsx`) scrubs a slow camera
push and crossfade over three island stills, one per zone, with a numbered
counter. Per-zone copy and buttons read the same scroll-progress value as the
camera, so nothing drifts out of sync. A short ambient loop plays over the first
zone. The zones are data: `src/scenes/scenes.config.js` and `flight` in
`src/content/site.js` must stay in the same order.

Two things to know before touching `ScrollScene`. Progress lives in a ref, not
state (children subscribe through `useProgressEffect` and write to the DOM
directly), because re-rendering 60 times a second to move a transform is waste.
And the pin length is set in pixels, never percentages: a percentage `end`
resolves against the trigger's own height, which pin-spacing grows, so every
refresh fed a bigger number back in.

`SceneMedia` can also scrub a video clip (`mediaType: 'video'`) through
`useScrubbedVideo`, the scroll-world core ported to a hook: blob-seek, RAF lerp,
seek gating and iOS priming. The flight runs on stills today because they are
sharper than the 1080p footage was.

---

## Structure

- `src/content/site.js`: Problem, Process, About, FAQ, Contact, Footer, Nav and flight copy
- `src/content/offer.js`: hero and offer copy
- `src/sections/`: one file per page section; `offer/` holds the five offer sections
- `src/components/`: shared pieces (`ScrollScene`, `SceneMedia`, `SceneCounter`, `Nav`, `AssetImage`, ...)
- `src/scenes/`, `src/hooks/`, `src/lib/sceneRegistry.js`: the flight's scene data, scrub hooks and counter state
- `src/lib/`: `smoothScroll` (Lenis with GSAP ScrollTrigger), `assets`
- `ph/index.html`: redirect only

---

## Accessibility

`prefers-reduced-motion: reduce` disables Lenis and the reveal animations, and the flight falls back to a static stacked layout.

---

## Open items

Open items: see BUSINESS.md, "Current status".
