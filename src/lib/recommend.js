/**
 * Which package fits a set of answers from the guided chat.
 *
 * Pure and dependency-free so it can be tested without a browser
 * (recommend.test.js states the contract). Copy for every reason key lives in
 * content/quiz.js; this file only decides.
 *
 * The packages are a ladder (each includes the one before), so the answer is
 * the highest rung that has a reason to be there. The first reason returned is
 * always the one that decided the rung.
 */

/** The answer values the logic understands. content/quiz.js must match. */
export const VALUES = {
  maps: ['none', 'stale', 'good', 'unsure'],
  booking: ['message', 'walkin', 'online'],
  branches: ['one', 'few', 'many'],
  pain: ['found', 'messages', 'numbers', 'reach'],
}

const MAPS_REASON = { none: 'maps-none', stale: 'maps-stale', unsure: 'maps-unsure' }

/** Keep only the fields holding a value we know. Junk never throws. */
function clean(answers) {
  const out = {}
  if (!answers || typeof answers !== 'object') return out
  for (const key of Object.keys(VALUES)) {
    if (VALUES[key].includes(answers[key])) out[key] = answers[key]
  }
  return out
}

/**
 * Order the reasons: the one that decided the rung first, then the thing they
 * said bothers them most (always shown, so the card answers what they told
 * us), then whatever else is true, capped at three.
 */
function pickReasons(deciders, painReason, rest) {
  const ordered = [deciders[0], painReason, ...deciders.slice(1), ...rest].filter(Boolean)
  const unique = [...new Set(ordered)]
  return unique.length ? unique.slice(0, 3) : ['default']
}

export function recommend(answers) {
  const a = clean(answers)
  if (Object.keys(a).length === 0) return { tier: 'found', reasons: ['default'] }

  const basicsDone = a.maps === 'good' && a.booking === 'online'
  const wantsCustomers = a.pain === 'found' || a.pain === 'reach'
  const mapsReason = MAPS_REASON[a.maps]

  if (a.pain === 'numbers' || a.branches === 'many' || (basicsDone && wantsCustomers)) {
    const deciders = [
      a.pain === 'numbers' && 'pain-numbers',
      a.branches === 'many' && 'branches-many',
      basicsDone && wantsCustomers && 'basics-done',
    ].filter(Boolean)
    const painReason = {
      numbers: 'pain-numbers',
      messages: 'pain-messages',
      reach: basicsDone ? 'basics-done' : 'reach-ads',
      found: basicsDone ? 'basics-done' : 'want-found',
    }[a.pain]
    const rest = [a.booking === 'message' && 'booking-message', mapsReason]
    return { tier: 'ahead', reasons: pickReasons(deciders, painReason, rest) }
  }

  const listingGood = a.maps === 'good' && a.booking !== 'online'
  if (a.booking === 'message' || a.pain === 'messages' || listingGood) {
    const deciders = [
      a.booking === 'message' && 'booking-message',
      a.pain === 'messages' && 'pain-messages',
      listingGood && 'listing-good',
    ].filter(Boolean)
    const painReason = { messages: 'pain-messages', found: 'want-found', reach: 'reach-start' }[a.pain]
    const rest = [mapsReason, a.branches === 'few' && 'branches-few']
    return { tier: 'booked', reasons: pickReasons(deciders, painReason, rest) }
  }

  const painReason = { found: 'want-found', reach: 'reach-start' }[a.pain]
  return {
    tier: 'found',
    reasons: pickReasons([mapsReason].filter(Boolean), painReason, [a.branches === 'few' && 'branches-few']),
  }
}
