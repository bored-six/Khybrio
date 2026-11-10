/**
 * Contract for the package recommendation at the end of the guided chat.
 * Written before the implementation. Run: npm test
 *
 * The contract, in words:
 *   - Answers are { maps, booking, branches, pain } (business type does not
 *     change the package).
 *   - The packages are a ladder, so the answer is the highest rung with a
 *     reason to be there:
 *       Get ahead   if they want to see their numbers, or have 4+ branches,
 *                   or they already have a good listing AND online booking
 *                   and still want more customers.
 *       Get booked  else if customers message and wait, or messages pile up,
 *                   or the listing is already good but there is no online
 *                   booking.
 *       Get found   otherwise.
 *   - It always comes with 1 to 3 reasons, each one a key that has copy, and
 *     a reason never pitches something the recommended package lacks.
 *   - Missing or junk answers never throw: they fall back to Get found with
 *     the one generic reason.
 */
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { recommend, VALUES } from './recommend.js'
import { questions, reasons as reasonCopy, tiers as tierCopy } from '../content/quiz.js'

const base = { maps: 'none', booking: 'walkin', branches: 'one', pain: 'found' }
const tierOf = (a) => recommend({ ...base, ...a }).tier

const all = []
for (const maps of VALUES.maps)
  for (const booking of VALUES.booking)
    for (const branches of VALUES.branches)
      for (const pain of VALUES.pain) all.push({ maps, booking, branches, pain })

test('there are 144 answer combinations and each gets a valid result', () => {
  assert.equal(all.length, 4 * 3 * 3 * 4)
  for (const a of all) {
    const r = recommend(a)
    assert.ok(['found', 'booked', 'ahead'].includes(r.tier), JSON.stringify(a))
    assert.ok(r.reasons.length >= 1 && r.reasons.length <= 3, JSON.stringify(a))
    assert.equal(new Set(r.reasons).size, r.reasons.length, `duplicate reason for ${JSON.stringify(a)}`)
  }
})

test('every reason key and tier has copy, so the result never renders blank', () => {
  for (const a of all) {
    const r = recommend(a)
    for (const key of r.reasons) {
      assert.equal(typeof reasonCopy[key], 'string', `no copy for reason "${key}"`)
      assert.ok(reasonCopy[key].length > 10)
    }
    assert.ok(tierCopy[r.tier], `no copy for tier "${r.tier}"`)
  }
})

test('the options in the copy are exactly the values the logic understands', () => {
  for (const id of ['maps', 'booking', 'branches', 'pain']) {
    const q = questions.find((x) => x.id === id)
    assert.ok(q, `question "${id}" is missing from the copy`)
    assert.deepEqual(q.options.map((o) => o.value).sort(), [...VALUES[id]].sort())
  }
})

test('wanting to see the numbers is always Get ahead', () => {
  for (const a of all.filter((x) => x.pain === 'numbers')) assert.equal(recommend(a).tier, 'ahead')
})

test('four or more branches is always Get ahead', () => {
  for (const a of all.filter((x) => x.branches === 'many')) assert.equal(recommend(a).tier, 'ahead')
})

test('good listing plus online booking, still wanting customers, is Get ahead', () => {
  assert.equal(tierOf({ maps: 'good', booking: 'online', pain: 'found' }), 'ahead')
  assert.equal(tierOf({ maps: 'good', booking: 'online', pain: 'reach' }), 'ahead')
  // ...but only when BOTH are in place.
  assert.equal(tierOf({ maps: 'stale', booking: 'online', pain: 'reach' }), 'found')
  assert.equal(tierOf({ maps: 'good', booking: 'walkin', pain: 'reach' }), 'booked')
})

test('customers who message and wait get Get booked', () => {
  assert.equal(tierOf({ booking: 'message' }), 'booked')
  assert.equal(tierOf({ booking: 'message', branches: 'few', pain: 'reach' }), 'booked')
})

test('messages piling up is Get booked, even with online booking already', () => {
  assert.equal(tierOf({ pain: 'messages' }), 'booked')
  assert.equal(tierOf({ pain: 'messages', booking: 'online', maps: 'good' }), 'booked')
})

test('a good listing with no online booking moves up to Get booked', () => {
  assert.equal(tierOf({ maps: 'good', booking: 'walkin' }), 'booked')
})

test('the plain case is Get found', () => {
  assert.equal(tierOf({}), 'found')
  assert.equal(tierOf({ maps: 'unsure' }), 'found')
  assert.equal(tierOf({ maps: 'stale', branches: 'few', pain: 'reach' }), 'found')
  assert.equal(tierOf({ maps: 'none', booking: 'online', pain: 'reach' }), 'found')
})

test('a reason never pitches something the package does not include', () => {
  const needsBooked = ['booking-message', 'pain-messages', 'listing-good']
  const needsAhead = ['pain-numbers', 'branches-many', 'basics-done', 'reach-ads']
  for (const a of all) {
    const r = recommend(a)
    if (r.tier === 'found') {
      for (const k of r.reasons) assert.ok(![...needsBooked, ...needsAhead].includes(k), `${k} on Get found`)
    }
    if (r.tier === 'booked') {
      for (const k of r.reasons) assert.ok(!needsAhead.includes(k), `${k} on Get booked`)
    }
  }
})

test('the first reason is the one that decided the tier', () => {
  assert.equal(recommend({ ...base, pain: 'numbers' }).reasons[0], 'pain-numbers')
  assert.equal(recommend({ ...base, branches: 'many' }).reasons[0], 'branches-many')
  assert.equal(recommend({ ...base, booking: 'message' }).reasons[0], 'booking-message')
  assert.equal(recommend({ ...base, maps: 'good', booking: 'online' }).reasons[0], 'basics-done')
  assert.equal(recommend(base).reasons[0], 'maps-none')
})

test('missing or junk answers fall back to Get found without throwing', () => {
  for (const junk of [undefined, null, {}, { maps: 'banana' }, { pain: 42, booking: null }, 'x']) {
    const r = recommend(junk)
    assert.equal(r.tier, 'found')
    assert.deepEqual(r.reasons, ['default'])
  }
})

test('one junk field does not discard the valid ones', () => {
  assert.equal(recommend({ maps: 'banana', booking: 'message', branches: 'one', pain: 'found' }).tier, 'booked')
  assert.equal(recommend({ pain: 'numbers' }).tier, 'ahead')
})

test('every reason is true of the answers given, never a line about something they did not say', () => {
  // reason key -> the condition on the answers that must hold for it to appear
  const truth = {
    'maps-none': (a) => a.maps === 'none',
    'maps-stale': (a) => a.maps === 'stale',
    'maps-unsure': (a) => a.maps === 'unsure',
    'listing-good': (a) => a.maps === 'good' && a.booking !== 'online',
    'basics-done': (a) => a.maps === 'good' && a.booking === 'online',
    'booking-message': (a) => a.booking === 'message',
    'pain-messages': (a) => a.pain === 'messages',
    'pain-numbers': (a) => a.pain === 'numbers',
    'want-found': (a) => a.pain === 'found',
    'reach-start': (a) => a.pain === 'reach',
    'reach-ads': (a) => a.pain === 'reach',
    'branches-few': (a) => a.branches === 'few',
    'branches-many': (a) => a.branches === 'many',
    default: () => false, // full answers always give a real reason
  }
  for (const key of Object.keys(reasonCopy)) assert.ok(truth[key], `reason "${key}" has no truth rule in this test`)
  for (const a of all) {
    for (const key of recommend(a).reasons) {
      assert.ok(truth[key](a), `"${key}" shown for ${JSON.stringify(a)}`)
    }
  }
})

test('the answer that bothers them most is always among the reasons', () => {
  const painKeys = {
    found: ['want-found', 'basics-done'],
    messages: ['pain-messages'],
    numbers: ['pain-numbers'],
    reach: ['reach-start', 'reach-ads', 'basics-done'],
  }
  for (const a of all) {
    const { reasons } = recommend(a)
    assert.ok(
      reasons.some((k) => painKeys[a.pain].includes(k)),
      `pain "${a.pain}" not reflected for ${JSON.stringify(a)}: ${reasons}`,
    )
  }
})
