/**
 * Single source of truth for every generated asset.
 *
 * Each entry carries a `src` (the real file you generate — see ASSETS.md) and a
 * `placeholder` (an SVG stand-in committed to the repo at the same aspect
 * ratio). Nothing here is conditional at build time: components render `src`
 * and swap to `placeholder` on the image's `error` event, so dropping a real
 * PNG into public/assets/ upgrades the site with no code change and no
 * layout shift.
 */

const world = (name, alt) => ({
  src: `/assets/world/${name}.png`,
  placeholder: `/assets/placeholders/${name}.svg`,
  alt,
})

const showcase = (name, alt) => ({
  src: `/assets/showcase/${name}.png`,
  placeholder: `/assets/placeholders/${name}.svg`,
  alt,
})

export const A = {
  heroIsland: world(
    '01-hero-island',
    'Wide isometric view of the Khybrio island, all zones visible',
  ),
  bundleZone: world(
    '02-bundle-zone',
    'The island town centre: glass office, NFC kiosk and signal tower',
  ),
  crewShiek: world('03-crew-shiek', 'Khybi at a desk nook with a floating laptop'),
  crewDave: world('04-crew-dave', 'Khybi with a briefcase, mid-handshake'),
  crewHaiqal: world('05-crew-haiqal', 'Khybi holding a tablet pitch deck'),
  crewRein: world('06-crew-rein', 'Khybi with a phone and floating like bubbles'),

  samples: [
    showcase('sample-01', 'Client website mockup'),
    showcase('sample-02', 'Client website mockup'),
    showcase('sample-03', 'Client website mockup'),
    showcase('sample-04', 'Client website mockup'),
  ],

  /** The single Higgsfield video on the whole site. */
  heroToBundleClip: '/assets/world/hero-to-bundle.mp4',

  /** Grain version — nav, footer, and the printed NFC card face. */
  mark: {
    src: '/assets/brand/khybrio-mark.svg',
    placeholder: '/assets/placeholders/brand-mark.svg',
    alt: 'Khybrio',
  },
  /** Grain-free version for favicon and other very small sizes. */
  markClean: {
    src: '/assets/brand/khybrio-mark-clean.svg',
    placeholder: '/assets/placeholders/brand-mark.svg',
    alt: 'Khybrio',
  },
}
