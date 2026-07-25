/**
 * Generates the Khybrio mark — a bold "K" fused with a radiating signal/sun
 * burst around an "eye", echoing the hand-stamped reference (an S + sunburst).
 * Cream mark on a deep-teal rounded tile, with a subtle grain filter for the
 * distressed-stamp edge. Outputs a grain version (nav/footer/print), a clean
 * version, and a favicon.
 *
 *   node scripts/gen-logo.mjs
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const brandDir = resolve(root, 'public/assets/brand')
const publicDir = resolve(root, 'public')

const TEAL = '#1C4D4A'
const CREAM = '#F5F7F6'
const rad = (d) => (d * Math.PI) / 180
const pt = (cx, cy, r, deg) => [cx + r * Math.cos(rad(deg)), cy + r * Math.sin(rad(deg))]
const f = (n) => Math.round(n * 100) / 100

// --- sunburst rays around the "eye" (lower-left arc, longer to the left) ---
const EYE = { x: 86, y: 120, r: 19 }
function rays() {
  // angle -> outer length; skip the upper-right where the K sits.
  const specs = [
    [204, 40], [184, 52], [166, 60], [148, 46], [130, 56],
    [112, 66], [94, 44], [76, 56], [56, 42], [34, 32],
  ]
  const rIn = EYE.r + 1
  const w = 8 // half-width of each spike, in degrees
  return specs
    .map(([a, len]) => {
      const [x1, y1] = pt(EYE.x, EYE.y, rIn, a - w)
      const [x2, y2] = pt(EYE.x, EYE.y, rIn, a + w)
      const [xt, yt] = pt(EYE.x, EYE.y, rIn + len, a)
      return `M${f(x1)} ${f(y1)} L${f(xt)} ${f(yt)} L${f(x2)} ${f(y2)} Z`
    })
    .join(' ')
}

// --- bold K, upper-right, its base fusing with the eye/burst ---
const K = [
  // stem
  `M110 48 h15 v88 h-15 Z`,
  // upper arm
  `M122 92 L154 50 L166 60 L134 100 Z`,
  // lower arm (reaches down toward the eye/burst)
  `M120 90 L156 128 L146 138 L112 104 Z`,
].join(' ')

function svg({ grain, tile = true, size = 128 }) {
  const filter = grain
    ? `<filter id="grain" x="-20%" y="-20%" width="140%" height="140%">
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="n"/>
    <feDisplacementMap in="SourceGraphic" in2="n" scale="1.7" xChannelSelector="R" yChannelSelector="G"/>
  </filter>`
    : ''
  const groupFilter = grain ? ' filter="url(#grain)"' : ''
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="${size}" height="${size}" role="img" aria-label="Khybrio">
  <defs>${filter}</defs>
  ${tile ? `<rect width="200" height="200" rx="44" fill="${TEAL}"/>` : ''}
  <g${groupFilter} fill="${CREAM}">
    <path d="${rays()}"/>
    <circle cx="${EYE.x}" cy="${EYE.y}" r="${EYE.r}"/>
    <path d="${K}"/>
  </g>
</svg>
`
}

mkdirSync(brandDir, { recursive: true })
writeFileSync(resolve(brandDir, 'khybrio-mark.svg'), svg({ grain: true }))
writeFileSync(resolve(brandDir, 'khybrio-mark-clean.svg'), svg({ grain: false }))
// Glyph only — cream mark, no teal tile — for use on coloured surfaces.
writeFileSync(resolve(brandDir, 'khybrio-glyph.svg'), svg({ grain: false, tile: false }))
// Favicon: clean, no grain (texture just reads as noise at 16px).
writeFileSync(resolve(publicDir, 'favicon.svg'), svg({ grain: false, size: 64 }))

console.log('Wrote khybrio-mark.svg, khybrio-mark-clean.svg, favicon.svg')
