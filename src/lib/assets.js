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
  // The seven island zones, in flight order. 08-rein is still on disk but no
  // longer in the flight — that crew zone was retired with the team change.
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

  /**
   * The scrubbed island flight, 74s: hold, fly, hold, fly. Each zone opens on
   * a 3.5s freeze of the original 4K still it was generated from (the same
   * files this module exports below), so the zone's copy can be read against a
   * clean frame before the camera moves on.
   *
   * Holding the ORIGINAL rather than the clip's own last frame earns its keep
   * twice: the source PNG is sharper than any decoded video frame, and
   * consecutive segments do not actually meet — they land 0.76–0.90 SSIM apart
   * — so the still is the anchor that absorbs the drift on both sides. Every
   * junction is a 0.5s crossfade.
   *
   * Watermark painted out (the source is stamped bottom-right), and encoded at
   * a short GOP so seeking to an arbitrary time stays cheap — scrubbing a
   * default-GOP clip turns to mush.
   */
  flightClip: `${BASE}assets/world/island-flight.mp4`,

  /**
   * Ambient loop over the hero zone, before the visitor scrolls. Ping-ponged
   * locally from the Higgsfield clip — the source drifts, so its first and last
   * frames don't match and looping it raw snapped on every wrap.
   */
  heroLoop: `${BASE}assets/world/hero-loop.mp4`,

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
    alt: 'Khybrio — local digital presence',
  },

  /**
   * Real team headshots, keyed by the `photo` field on each member in
   * content/site.js. A member who omits the key falls back to the initials
   * avatar, so the grid stays even.
   */
  teamPhotos: {
    shiek: {
      src: `${BASE}assets/team/shiek.jpg`,
      placeholder: `${BASE}assets/placeholders/05-shiek.svg`,
      alt: 'Shiek Abdurahman',
    },
    dave: {
      src: `${BASE}assets/team/dave.jpg`,
      placeholder: `${BASE}assets/placeholders/06-dave.svg`,
      alt: 'Dave Calio',
    },
    haiqal: {
      src: `${BASE}assets/team/haiqal.jpg`,
      placeholder: `${BASE}assets/placeholders/07-haiqal.svg`,
      alt: 'Haiqal Munjalin',
    },
  },

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
