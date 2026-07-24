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

const world = (name, alt) => ({
  src: `${BASE}assets/world/${name}.png`,
  placeholder: `${BASE}assets/placeholders/${name}.svg`,
  alt,
})

const showcase = (name, alt) => ({
  src: `${BASE}assets/showcase/${name}.png`,
  placeholder: `${BASE}assets/placeholders/${name}.svg`,
  alt,
})

export const A = {
  // The eight island zones, in flight order.
  hero: world('01-hero', 'Wide isometric view of the Khybrio island'),
  webDesk: world('02-web-desk', 'Khybi at the web desk with a floating browser'),
  nfcKiosk: world('03-nfc-kiosk', 'Khybi tapping an NFC card to a phone'),
  signalTower: world('04-signal-tower', 'Khybi on the map-pin platform by the signal tower'),
  shiek: world('05-shiek', 'Khybi at a desk nook with floating code brackets'),
  dave: world('06-dave', 'Khybi with a briefcase, mid-handshake'),
  haiqal: world('07-haiqal', 'Khybi presenting a tablet pitch deck'),
  rein: world('08-rein', 'Khybi with a phone and floating like bubbles'),

  samples: [
    showcase('sample-01', 'Client website mockup'),
    showcase('sample-02', 'Client website mockup'),
    showcase('sample-03', 'Client website mockup'),
    showcase('sample-04', 'Client website mockup'),
  ],

  /**
   * Optional: the one continuous flight clip. Absent by default — the flight
   * runs as a scroll-scrubbed crossfade + camera push over the eight stills,
   * which needs no video. Drop a real Seedance/stitched clip here and flip the
   * flight scene's mediaType to 'video' to upgrade to true 3D parallax.
   */
  flightClip: `${BASE}assets/world/island-flight.mp4`,

  mark: {
    src: `${BASE}assets/brand/khybrio-mark.svg`,
    placeholder: `${BASE}assets/placeholders/brand-mark.svg`,
    alt: 'Khybrio',
  },
  markClean: {
    src: `${BASE}assets/brand/khybrio-mark-clean.svg`,
    placeholder: `${BASE}assets/placeholders/brand-mark.svg`,
    alt: 'Khybrio',
  },
}
