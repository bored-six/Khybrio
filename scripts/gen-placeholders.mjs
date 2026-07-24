/**
 * Generates the SVG stand-ins that keep the site working before any Higgsfield
 * asset exists. Run with: npm run placeholders
 *
 * These are committed to the repo on purpose. AssetImage renders the real file
 * first and swaps to one of these on the image's `error` event, so a missing
 * PNG degrades to an on-brand block at the correct aspect ratio rather than a
 * broken-image icon and a collapsed layout.
 *
 * Once you drop a real file into public/assets/, its placeholder simply stops
 * being reached. There is no need to delete them.
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = resolve(root, 'public/assets/placeholders')

const C = {
  deep: '#1C4D4A',
  bright: '#00767F',
  soft: '#A9C6C3',
  cream: '#F5F7F6',
  coral: '#E8622D',
}

/** A rough isometric island so the framing reads correctly while blocking out. */
const island = (w, h, scale = 1) => {
  const cx = w / 2
  const cy = h * 0.56
  const rx = w * 0.26 * scale
  const ry = rx * 0.44
  return `
    <ellipse cx="${cx}" cy="${cy + ry * 2.4}" rx="${rx * 0.8}" ry="${ry * 0.3}" fill="${C.deep}" opacity="0.35"/>
    <path d="M ${cx - rx} ${cy} L ${cx} ${cy + ry * 3.1} L ${cx + rx} ${cy} Z" fill="${C.deep}"/>
    <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${C.bright}"/>
    <ellipse cx="${cx}" cy="${cy - ry * 0.12}" rx="${rx * 0.82}" ry="${ry * 0.8}" fill="${C.soft}" opacity="0.55"/>
    <rect x="${cx - rx * 0.42}" y="${cy - ry * 1.5}" width="${rx * 0.34}" height="${ry * 1.5}" rx="${rx * 0.05}" fill="${C.cream}" opacity="0.75"/>
    <rect x="${cx + rx * 0.1}" y="${cy - ry * 1.05}" width="${rx * 0.22}" height="${ry * 1.05}" rx="${rx * 0.05}" fill="${C.cream}" opacity="0.55"/>
    <circle cx="${cx - rx * 0.05}" cy="${cy - ry * 1.95}" r="${ry * 0.3}" fill="${C.coral}"/>
    <rect x="${cx - rx * 0.06}" y="${cy - ry * 1.75}" width="${ry * 0.09}" height="${ry * 1.75}" fill="${C.cream}" opacity="0.6"/>
  `
}

/** Chibi stand-in for Khybi — proportions only, no detail to contradict later. */
const khybi = (cx, cy, r) => `
  <ellipse cx="${cx}" cy="${cy + r * 1.9}" rx="${r * 1.1}" ry="${r * 0.28}" fill="${C.deep}" opacity="0.3"/>
  <rect x="${cx - r * 0.85}" y="${cy + r * 0.25}" width="${r * 1.7}" height="${r * 1.5}" rx="${r * 0.6}" fill="${C.bright}"/>
  <rect x="${cx - r * 0.85}" y="${cy + r * 0.95}" width="${r * 1.7}" height="${r * 0.26}" fill="${C.coral}"/>
  <circle cx="${cx}" cy="${cy - r * 0.25}" r="${r}" fill="${C.bright}"/>
  <circle cx="${cx - r * 0.34}" cy="${cy - r * 0.3}" r="${r * 0.15}" fill="${C.deep}"/>
  <circle cx="${cx + r * 0.34}" cy="${cy - r * 0.3}" r="${r * 0.15}" fill="${C.deep}"/>
`

const frame = (w, h, label, inner, sub = '') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${label} placeholder">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${C.soft}"/>
      <stop offset="55%" stop-color="${C.bright}"/>
      <stop offset="100%" stop-color="${C.deep}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#sky)"/>
  ${inner}
  <text x="${w / 2}" y="${h - (sub ? 54 : 34)}" text-anchor="middle"
        font-family="ui-sans-serif, system-ui, sans-serif" font-size="${Math.round(Math.min(w, h) * 0.045)}"
        font-weight="700" letter-spacing="2" fill="${C.cream}" opacity="0.82">${label}</text>
  ${
    sub
      ? `<text x="${w / 2}" y="${h - 26}" text-anchor="middle"
        font-family="ui-sans-serif, system-ui, sans-serif" font-size="${Math.round(Math.min(w, h) * 0.032)}"
        fill="${C.cream}" opacity="0.55">${sub}</text>`
      : ''
  }
</svg>
`

/** Browser-chrome mockup stand-in for the showcase gallery. */
const mockup = (w, h, label) => {
  const pad = w * 0.06
  const barH = h * 0.09
  return frame(
    w,
    h,
    label,
    `<rect x="${pad}" y="${h * 0.16}" width="${w - pad * 2}" height="${h * 0.68}" rx="14" fill="${C.cream}"/>
     <rect x="${pad}" y="${h * 0.16}" width="${w - pad * 2}" height="${barH}" rx="14" fill="${C.soft}"/>
     <circle cx="${pad + 22}" cy="${h * 0.16 + barH / 2}" r="6" fill="${C.coral}"/>
     <circle cx="${pad + 44}" cy="${h * 0.16 + barH / 2}" r="6" fill="${C.cream}" opacity="0.8"/>
     <circle cx="${pad + 66}" cy="${h * 0.16 + barH / 2}" r="6" fill="${C.cream}" opacity="0.8"/>
     <rect x="${pad + 28}" y="${h * 0.32}" width="${(w - pad * 2) * 0.44}" height="16" rx="8" fill="${C.deep}" opacity="0.75"/>
     <rect x="${pad + 28}" y="${h * 0.4}" width="${(w - pad * 2) * 0.66}" height="10" rx="5" fill="${C.deep}" opacity="0.28"/>
     <rect x="${pad + 28}" y="${h * 0.46}" width="${(w - pad * 2) * 0.55}" height="10" rx="5" fill="${C.deep}" opacity="0.28"/>
     <rect x="${pad + 28}" y="${h * 0.57}" width="120" height="34" rx="17" fill="${C.coral}"/>`,
    'showcase sample',
  )
}

const files = [
  ['01-hero-island.svg', frame(1920, 1080, '01 · HERO ISLAND', island(1920, 1080) + khybi(1180, 620, 26), 'wide establishing shot · 16:9')],
  ['02-bundle-zone.svg', frame(1920, 1080, '02 · BUNDLE ZONE', island(1920, 1080, 1.55) + khybi(760, 660, 34) + khybi(960, 700, 34) + khybi(1160, 660, 34), 'town-centre crop · 16:9')],
  ['03-crew-shiek.svg', frame(768, 1024, '03 · SHIEK', khybi(384, 470, 92), 'desk nook · 3:4')],
  ['04-crew-dave.svg', frame(768, 1024, '04 · DAVE', khybi(384, 470, 92), 'meeting bench · 3:4')],
  ['05-crew-haiqal.svg', frame(768, 1024, '05 · HAIQAL', khybi(384, 470, 92), 'meeting bench · 3:4')],
  ['06-crew-rein.svg', frame(768, 1024, '06 · REIN', khybi(384, 470, 92), 'content corner · 3:4')],
  ['sample-01.svg', mockup(1280, 800, 'SAMPLE 01')],
  ['sample-02.svg', mockup(1280, 800, 'SAMPLE 02')],
  ['sample-03.svg', mockup(1280, 800, 'SAMPLE 03')],
  ['sample-04.svg', mockup(1280, 800, 'SAMPLE 04')],
]

/**
 * Deliberately plain: a placeholder for the logo, not an attempt at it. The
 * real mark is a fused K and signal burst with a grain texture — yours to
 * design, per ASSETS.md.
 */
const markSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128" role="img" aria-label="Khybrio mark placeholder">
  <rect width="128" height="128" rx="26" fill="${C.deep}"/>
  <path d="M44 32 v64 M44 66 l30 -34 M56 66 l22 30" stroke="${C.cream}" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <circle cx="90" cy="44" r="6" fill="${C.coral}"/>
  <path d="M99 35 a13 13 0 0 1 0 18" stroke="${C.coral}" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.75"/>
</svg>
`

mkdirSync(outDir, { recursive: true })
for (const [name, svg] of files) {
  writeFileSync(resolve(outDir, name), svg)
}
writeFileSync(resolve(outDir, 'brand-mark.svg'), markSvg)
writeFileSync(resolve(root, 'public/favicon.svg'), markSvg)

console.log(`Wrote ${files.length + 1} placeholders to public/assets/placeholders/`)
console.log('Wrote public/favicon.svg')
