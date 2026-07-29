# Asset generation brief

Everything the site expects you to produce, with the exact paths the code reads.
Nothing here is wired to an API — you generate these yourself in Higgsfield and
drop the files in.

The site **works right now without any of them**. `AssetImage` renders the real
file and falls back to a committed SVG placeholder on the image's `error` event,
and the hero falls back to a still crossfade when the flight clip is missing. So
you can add these one at a time, in any order, and nothing breaks in between.

---

## Spend order (this matters — free-tier credits don't roll over)

1. **Still #1 (hero wide)** and **still #2 (bundle zone)** first.
2. **Stop and compare them.** Do they read as the *same island* — same edge
   material, same ground texture, same light, same camera angle — or as two
   different worlds? If they don't match, fix the prompt and reroll now. Every
   later asset inherits this decision.
3. Only once both match: **the flight video** (one generation, Kling 3.0).
4. Only once the flight is confirmed: **the four crew stills**.

Everything after that is CSS/GSAP. There is no second video anywhere on the site.

---

## World lock

Every image is a different zone or crop of the **same small floating island**
established in image #1:

- same island edge and base material
- same ground textures and plants
- same light source and time of day (warm afternoon)
- same isometric camera angle

Only *which zone* is in frame and *how close* the crop is may change. Scrolling
between them should feel like touring one consistent little world.

**Khybi** — the mascot — must be visually identical in every shot: small chibi
vinyl-figurine proportions, rounded, teal body with a coral accent stripe/badge,
simple friendly dot eyes, no text or logos printed on the figure. Only pose and
props change per zone.

Prefix every prompt with the same style preamble so the set stays cohesive.

---

## Files

Model: **GPT Image 2** for stills.

| Path | Ratio | Suggested size | Contents |
|---|---|---|---|
| `public/assets/world/01-hero-island.png` | 16:9 | 3840×2160 | Full island at a distance, every zone visible: teal-glass mini office, NFC kiosk, signal tower with map-pin and Facebook-flag banners, vinta-striped hut. A few tiny Khybi figures doing small tasks, one waving at the viewer. Warm afternoon light, gentle shadows, **open sky at the top for the headline**. |
| `public/assets/world/02-bundle-zone.png` | 16:9 | 3840×2160 | Closer isometric crop on the town-centre cluster — glass office, NFC kiosk and signal tower together in one frame. Khybi doing all three tasks at once: one at the desk, one tapping a card to a phone, one on the map-pin platform. Same island base and lighting as #1. |
| `public/assets/world/03-crew-shiek.png` | 3:4 | 1536×2048 | Small desk nook elsewhere on the same island. Khybi with a floating laptop showing code brackets, calm focused stance. |
| `public/assets/world/04-crew-dave.png` | 3:4 | 1536×2048 | Small meeting-bench area. Khybi holding a briefcase, one arm out mid-handshake. |
| `public/assets/world/05-crew-haiqal.png` | 3:4 | 1536×2048 | Same meeting-bench area. Khybi holding a tablet / pitch deck, **visibly different pose from #4**. |
| `public/assets/showcase/sample-01…04.png` | 16:10 | 1600×1000 | Real client project mockups. Not generated — screenshots of actual work. |

The crew renders track the team. `08-rein.webp` is still on disk but no longer
in the flight — that zone was retired when Rein left, taking the flight from
eight zones to seven. Delete it if the team stays at three.

The footer reuses a CSS-zoomed crop of `01-hero-island.png` centred on the waving
Khybi. No separate generation. Testimonial ratings are Lucide SVG stars — no
image either.

---

## The flight video

One generation, **Kling 3.0 image-to-video** (roughly half the credit cost of
Seedance). Image-to-video from still #1, targeting the framing of still #2.

- Camera drifts **down and forward**, starting on the wide island framing and
  arriving on the bundle-zone framing.
- 4–6 seconds.
- **Locked exposure** — any auto-exposure drift reads as flicker when scrubbed.
- No cuts, no subject animation beyond gentle ambient movement.

Save to `public/assets/world/hero-to-bundle.mp4`, then re-encode for scrubbing:

```bash
ffmpeg -i raw.mp4 -c:v libx264 -pix_fmt yuv420p -g 4 -keyint_min 4 \
  -sc_threshold 0 -crf 20 -movflags +faststart -an \
  public/assets/world/hero-to-bundle.mp4
```

**The small GOP is the whole point.** `-g 4` puts a keyframe every 4 frames, so
seeking to an arbitrary time is cheap. At a default GOP of 250 the decoder has to
walk from the previous keyframe on every seek and scrubbing turns to mush.

`ffmpeg` isn't installed on this machine — `brew install ffmpeg` when you need it.

Nothing in the code changes when you add the clip. `useScrubbedVideo` fetches it,
finds a real video this time instead of the dev server's HTML fallback, and fades
it in over the stills.

---

## Logo

Yours to design, per your brief. What the code expects:

| Path | Notes |
|---|---|
| `public/assets/brand/khybrio-mark.svg` | Grain version. Nav, footer, printed NFC card face. |
| `public/assets/brand/khybrio-mark-clean.svg` | No grain. Favicon and other small sizes, where texture just reads as noise. |
| `public/favicon.svg` | Currently the placeholder mark — overwrite with the clean version. |

The brief, restated so it's in the repo: a single **fused** letterform-and-icon
mark — not a letter sitting next to an icon. A bold "K" merged with a radiating
signal / location-ping burst emerging from or behind one side of the letter,
echoing "get found". Cream `#F5F7F6` on solid deep teal `#1C4D4A`, with a light
hand-stamped grain overlaid on the shape (SVG noise filter or a textured overlay
clipped to the mark) rather than a perfectly clean vector edge.

Build it as SVG, not a Higgsfield raster, so it stays crisp at favicon size and
scales cleanly to print.

---

## Optional: parallax cutouts

`SceneMedia` accepts a `foreground` asset that drifts at a different rate from
the background (`depth: 0.45`), faking depth. A single flat PNG can't do this —
the subject has to be a separate transparent layer.

If you want real parallax on the crew shots, export a background-removed cutout
of Khybi alongside each 3:4 still and pass it as `foreground`. Entirely optional;
without it the scenes run a plain Ken-Burns move and look fine.

---

## Brand reference

| Token | Hex | Pantone | Use |
|---|---|---|---|
| Deep Teal | `#1C4D4A` | 3155 C | Anchor |
| Bright Teal | `#00767F` | 3145 C | Interactive |
| Soft Teal-Gray | `#A9C6C3` | 5493 C | Surfaces, tints |
| Warm Cream | `#F5F7F6` | — | Light background |
| Vinta Coral | `#E8622D` | 165 C | Signature accent, **sparingly** |

Coral echoes the vinta boat sails. Type: Space Grotesk for display, Inter for
body. Generous whitespace, 20px card radius, no decorative gradients, no
stock-photo clichés, no emoji in headlines.

---

## Regenerating placeholders

```bash
npm run placeholders
```

Rewrites `public/assets/placeholders/`. You never need to delete these — once a
real file exists its placeholder simply stops being reached.
