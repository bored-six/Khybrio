/**
 * Every in-page link the copy points at must land on a section that exists.
 *
 * A dead anchor fails silently: the click does nothing and nobody notices
 * until a visitor does. This reads the hrefs and nav ids out of the content
 * files and checks each one against the `id="..."` attributes in src/.
 *
 * Run: npm run check:anchors
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const root = new URL('../src/', import.meta.url).pathname

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name)
    return statSync(p).isDirectory() ? walk(p) : [p]
  })
}

const files = walk(root).filter((f) => /\.(jsx?|mjs)$/.test(f))
const ids = new Set()
for (const f of files) {
  for (const m of readFileSync(f, 'utf8').matchAll(/\bid="([\w-]+)"/g)) ids.add(m[1])
}

const site = await import(join(root, 'content/site.js'))
const offer = await import(join(root, 'content/offer.js'))
const quiz = await import(join(root, 'content/quiz.js'))

const targets = []
const collect = (value, path) => {
  if (typeof value === 'string') {
    if (/^#[\w-]+$/.test(value)) targets.push([value.slice(1), path])
  } else if (Array.isArray(value)) {
    value.forEach((v, i) => collect(v, `${path}[${i}]`))
  } else if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) collect(v, `${path}.${k}`)
  }
}
collect(offer, 'offer')
collect(site, 'site')
collect(quiz, 'quiz')
site.nav.forEach((item, i) => targets.push([item.id, `site.nav[${i}].id`]))

const missing = targets.filter(([id]) => !ids.has(id))
if (missing.length) {
  for (const [id, path] of missing) console.error(`dead anchor #${id}  (from ${path})`)
  process.exit(1)
}
console.log(`ok: ${targets.length} anchors, all land on a section`)
