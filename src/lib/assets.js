/**
 * Single source of truth for every generated asset.
 *
 * Each entry carries a `src` (the real file — see HIGGSFIELD.md) and a
 * `placeholder` (an SVG stand-in committed to the repo at the same aspect
 * ratio). Components render `src` and swap to `placeholder` on the image's
 * `error` event, so dropping a real PNG into public/assets/ upgrades the site
 * with no code change and no layout shift.
 */

// Vite rewrites base into index.html and imported modules, but NOT into string
// literals like these — so build them off BASE_URL ('/' in dev, '/Khybrio/' in
// the GitHub Pages build). Without this, images 404 under the repo subpath.
const BASE = import.meta.env.BASE_URL

// Served as full-resolution WebP (quality 90) — visually identical to the
// source PNGs but ~1MB total instead of ~34MB, which is what killed load time.
// The original PNGs stay in the repo as the source of truth.
const world = (name, alt) => ({
  src: `${BASE}assets/world/${name}.webp`,
  placeholder: `${BASE}assets/placeholders/${name}.svg`,
  alt,
})

export const A = {
  // The seven island renders. `hero` is the footer and the About poster;
  // the other six are cropped into the package cards and the services index.
  hero: world('01-hero', 'Wide isometric view of the Khybrio island'),
  webDesk: world('02-web-desk', 'Khybi at the web desk with a floating browser'),
  nfcKiosk: world('03-nfc-kiosk', 'Khybi tapping an NFC card to a phone'),
  signalTower: world('04-signal-tower', 'Khybi on the map-pin platform by the signal tower'),
  shiek: world('05-shiek', 'Khybi at a desk nook with floating code brackets'),
  dave: world('06-dave', 'Khybi with a briefcase, mid-handshake'),
  haiqal: world('07-haiqal', 'Khybi presenting a tablet pitch deck'),

  // `samples` is gone with the showcase section — it fed four invented client
  // projects under a "Recent work" heading. The generated SVGs are still in
  // public/assets/showcase/ if a real portfolio section comes back.

  // Ambient 16s loop of the whole island (1920x1080, ~3MB), beside the About
  // headline. About.jsx only attaches it on wide screens near the viewport,
  // never on save-data or reduced motion; `hero` is the still in its place.
  heroLoop: {
    src: `${BASE}assets/world/hero-loop.mp4`,
    alt: 'The Khybrio island, with Khybi at work',
  },

  mark: {
    src: `${BASE}assets/brand/khybrio-mark.png`,
    placeholder: `${BASE}assets/placeholders/brand-mark.svg`,
    alt: 'Khybrio',
  },
  markClean: {
    src: `${BASE}assets/brand/khybrio-mark.png`,
    placeholder: `${BASE}assets/placeholders/brand-mark.svg`,
    alt: 'Khybrio',
  },
  // Cream glyph, no tile — for placing on coloured surfaces (e.g. the NFC card).
  markGlyph: {
    src: `${BASE}assets/brand/khybrio-glyph.png`,
    placeholder: `${BASE}assets/placeholders/brand-mark.svg`,
    alt: 'Khybrio',
  },
  /**
   * Full supplied lockup — symbol + KHYBRIO wordmark + "Local digital presence"
   * descriptor. Transparent cream, so it only goes on the deep-teal surfaces
   * (footer). Use `mark` for the small nav lockup; this one needs room to read.
   */
  logoFull: {
    src: `${BASE}assets/brand/khybrio-logo-full-transparent.png`,
    placeholder: `${BASE}assets/placeholders/brand-mark.svg`,
    alt: 'Khybrio',
  },

  // `teamPhotos` went with the team section. The headshots are still in
  // public/assets/team/ — nothing requests them, so they cost no page weight,
  // and they are there if the section ever comes back.

  // Generated Khybi mascot renders (cream background, watermark removed).
  khybiWave: {
    src: `${BASE}assets/brand/khybi-wave.webp`,
    placeholder: `${BASE}assets/placeholders/brand-mark.svg`,
    alt: 'Khybi, the Khybrio mascot, waving',
  },
  khybiPhone: {
    src: `${BASE}assets/brand/khybi-phone.webp`,
    placeholder: `${BASE}assets/placeholders/brand-mark.svg`,
    alt: 'Khybi offering a phone',
  },
}
