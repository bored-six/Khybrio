/**
 * Generates four placeholder "sample project" mockups — browser-framed landing
 * pages in the brand family, one per business type — so the Work gallery looks
 * like real screenshots until real client sites drop in.
 *
 *   node scripts/gen-showcase.mjs
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const out = resolve(root, 'public/assets/showcase')

const CREAM = '#F5F7F6'
const INK = '#0f2b29'

// name, tagline, accent, hero background, kind
const projects = [
  ['Aling Nena’s', 'Fresh from the store', '#E8622D', '#1C4D4A', 'Sari-sari store'],
  ['Bright Smile', 'Book your check-up', '#00767F', '#0e3b39', 'Dental clinic'],
  ['JR Barbershop', 'Sharp, every time', '#1C4D4A', '#2a2a2e', 'Barbershop'],
  ['Grace Milk Tea', 'Sip the good stuff', '#8b5cf6', '#3b2a4d', 'Milk tea shop'],
]

function mockup([name, tagline, accent, heroBg]) {
  const W = 1280
  const H = 800
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${name} website mockup">
  <rect width="${W}" height="${H}" fill="${CREAM}"/>
  <!-- browser chrome -->
  <rect x="0" y="0" width="${W}" height="56" fill="#e9edeb"/>
  <circle cx="34" cy="28" r="7" fill="${accent}"/>
  <circle cx="58" cy="28" r="7" fill="#cdd6d3"/>
  <circle cx="82" cy="28" r="7" fill="#cdd6d3"/>
  <rect x="120" y="16" width="${W - 200}" height="24" rx="12" fill="${CREAM}"/>
  <text x="140" y="33" font-family="ui-sans-serif,system-ui" font-size="13" fill="#8aa39f">${name.toLowerCase().replace(/[^a-z]/g, '')}.ph</text>

  <!-- hero -->
  <rect x="0" y="56" width="${W}" height="380" fill="${heroBg}"/>
  <circle cx="26" cy="120" r="10" fill="${accent}"/>
  <text x="46" y="126" font-family="ui-serif,Georgia" font-size="20" font-weight="700" fill="${CREAM}">${name}</text>
  <g font-family="ui-sans-serif,system-ui" font-size="13" fill="${CREAM}" opacity="0.8">
    <text x="${W - 360}" y="126">Menu</text><text x="${W - 290}" y="126">About</text><text x="${W - 210}" y="126">Visit</text>
  </g>
  <rect x="${W - 150}" y="106" width="110" height="34" rx="17" fill="${accent}"/>
  <text x="${W - 128}" y="128" font-family="ui-sans-serif,system-ui" font-size="13" font-weight="700" fill="${CREAM}">Contact</text>

  <text x="80" y="250" font-family="ui-serif,Georgia" font-size="52" font-weight="700" fill="${CREAM}">${name}</text>
  <text x="80" y="292" font-family="ui-sans-serif,system-ui" font-size="20" fill="${CREAM}" opacity="0.85">${tagline}</text>
  <rect x="80" y="322" width="170" height="46" rx="23" fill="${accent}"/>
  <text x="104" y="351" font-family="ui-sans-serif,system-ui" font-size="15" font-weight="700" fill="${CREAM}">Get in touch</text>
  <rect x="740" y="150" width="460" height="250" rx="18" fill="${CREAM}" opacity="0.12"/>
  <rect x="770" y="180" width="400" height="190" rx="12" fill="${accent}" opacity="0.5"/>

  <!-- content cards -->
  ${[0, 1, 2]
    .map((i) => {
      const x = 80 + i * 380
      return `<rect x="${x}" y="490" width="330" height="230" rx="16" fill="#ffffff" stroke="#e2e8e5"/>
      <rect x="${x + 24}" y="514" width="120" height="90" rx="10" fill="${accent}" opacity="0.25"/>
      <rect x="${x + 24}" y="620" width="220" height="14" rx="7" fill="${INK}" opacity="0.75"/>
      <rect x="${x + 24}" y="644" width="270" height="10" rx="5" fill="${INK}" opacity="0.25"/>
      <rect x="${x + 24}" y="662" width="240" height="10" rx="5" fill="${INK}" opacity="0.25"/>`
    })
    .join('\n  ')}
  <rect x="0" y="756" width="${W}" height="44" fill="${heroBg}"/>
</svg>
`
}

mkdirSync(out, { recursive: true })
projects.forEach((p, i) => {
  writeFileSync(resolve(out, `sample-0${i + 1}.svg`), mockup(p))
})
console.log('Wrote 4 showcase mockups')
