# Khybrio

Marketing site for Khybrio — a digital presence agency in Zamboanga City selling
one bundled package: a professional website, an NFC tap card, and Google Business
Profile + Facebook Page optimization, for local business owners who currently
have none of the three.

Single page, fully responsive, React + Vite.

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

The hero is a **scroll-scrubbed camera flight** through an isometric floating
island — the technique from [oso95/scroll-world](https://github.com/oso95/scroll-world),
where scroll position drives video playback time rather than triggering an
animation.

Higgsfield free-tier credits only cover **one** video generation, so the flight
covers HERO → THE BUNDLE and nothing else. Every later scrubbed section
(showcase, crew) gets the same feeling from CSS/GSAP Ken-Burns moves over stills.
The counter and dot trail run continuously across both, so the handoff between
the two techniques is invisible.

### What was taken from scroll-world

The scrub *core*, ported into a React hook (`src/hooks/useScrubbedVideo.js`).
Four things make it work where a naive `video.currentTime = progress * duration`
falls apart:

- **Blob-seek** — the clip is fetched and handed to the element as an object URL.
  A blob is always seekable, so scrubbing never depends on the host honouring
  HTTP range requests.
- **RAF lerp** — playback chases the scroll target (`cur += (target - cur) * 0.18`)
  instead of snapping, decoupling decode timing from scroll jitter.
- **Seek gating** — a new `currentTime` is only assigned when the decoder is idle
  and the delta clears an epsilon (0.005 desktop / 0.02 mobile). Without it a
  fast flick queues dozens of seeks and the decoder stalls.
- **iOS priming** — mobile Safari won't paint a seeked frame until the element
  has played once, so it play/pauses on first gesture.

What was **not** taken: the dive + connector clip architecture, frame-identical
seam extraction, and multi-scene video chaining. All of it assumes a video budget
of ~10 generations.

---

## Architecture

Every scrubbed section is one primitive, `ScrollScene`, driven from a data array
in `src/scenes/scenes.config.js`:

```jsx
<ScrollScene id="hero" scroll={2.6} milestone={heroMilestone}>
  {({ progressRef, reduced }) => ( /* … */ )}
</ScrollScene>
```

`ScrollScene` owns pinning and scroll progress and **deliberately nothing else** —
it never learns whether it's driving a `<video>` or an `<img>`. That's what makes
the upgrade path cheap: when there's budget for a second flight clip, changing
that scene's `mediaType` from `'image'` to `'video'` and pointing `clip` at the
new file is the entire change.

Progress lives in a ref, not state. A pinned section updates every frame, and
re-rendering the tree 60×/second to move a transform would be pure waste —
children subscribe via `useProgressEffect` and write to the DOM directly.

```
src/
├── content/site.js          ← ALL copy, prices, team, links. Edit here, not in JSX.
├── scenes/scenes.config.js  ← the scene array
├── lib/
│   ├── smoothScroll.js      Lenis ↔ GSAP ScrollTrigger wiring (one instance)
│   ├── sceneRegistry.js     counter + dot trail state
│   └── assets.js            logical name → { src, placeholder }
├── hooks/
│   ├── useScrubbedVideo.js  ← the ported scroll-world core
│   ├── useKenBurns.js       scrubbed zoom/pan, with a depth multiplier
│   ├── useProgressEffect.js per-frame subscription + band/smooth/lerp helpers
│   ├── useMilestone.js      counter milestone for unpinned sections
│   └── usePrefersReducedMotion.js
├── components/  ScrollScene, SceneMedia, AssetImage, Nav, SceneCounter, …
└── sections/    HeroBundle, Problem, Showcase, People, Testimonials, Pricing, Contact, Footer
```

### Two details worth knowing before you touch `ScrollScene`

**Pin length is measured in pixels, never percentages.** A percentage `end`
(`"+=260%"`) resolves against the *trigger element's* height — and pin-spacing
grows that same element, so every `ScrollTrigger.refresh()` feeds a larger height
back in. The document grew to 478,000px before this was caught.

**Milestones are set from inside the ScrollTrigger's `onUpdate`, not from
children.** `onUpdate` only fires while that scene is on screen. Children run off
the shared GSAP ticker and have no idea whether they're in view, so letting them
call `setActiveIndex` directly meant every scene overwrote the counter every
frame and whichever mounted last always won.

---

## Assets

**None of the generated assets are in the repo yet** — see [ASSETS.md](ASSETS.md)
for the full brief, exact paths, spend order, and the ffmpeg encode settings.

The site works without them. `AssetImage` renders the real file and swaps to a
committed SVG placeholder on the image's `error` event; the hero cross-fades two
stills when the flight clip is missing. Drop a real file into `public/assets/`
and it upgrades on next load with no code change and no layout shift.

Note that a dev server returns **200 with `text/html`** for a missing asset rather
than a 404, so `useScrubbedVideo` checks the content type explicitly instead of
trusting `res.ok`.

---

## Accessibility

`prefers-reduced-motion: reduce` disables Lenis, skips every pin, never fetches
the video, and renders a static stacked layout per scene — not a degraded version
of the animated one. See the `ReducedLayout` in each scrubbed section.

---

## Before this is customer-ready

Marked `PLACEHOLDER` in `src/content/site.js`:

- **Pricing** — the PHP figures are structural stand-ins, not quotes.
- **Contact handles** — Messenger / WhatsApp / Viber links are `#`.
- **Form endpoint** — `contact.formEndpoint` is `null`, so the form tells the
  visitor it isn't connected rather than silently dropping their message. Point
  it at anything accepting a JSON POST.
- **Testimonials** — deliberately empty. Real quotes with permission only.
- **Showcase samples** — swap for real client work you have sign-off to show.
