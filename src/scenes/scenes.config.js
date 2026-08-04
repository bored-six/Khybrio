import { A } from '../lib/assets'

/**
 * Scroll-time to clip-time for the flight — the soft stop on every landing.
 *
 * The clip is built as seven 11-second zones of hold / fly / land (see
 * A.flightClip). Scrubbed linearly, each 1.5s landing is 1.9% of the run — on a
 * ~9000px pin that is about 170px of scroll, gone in a flick. The frames are
 * held but nothing feels held. So the dwell is bought here instead: a zone's
 * scroll is split unevenly, spending a third of it crossing the 3 static
 * seconds of the opening still and another third crossing the 1 static second
 * of the landing, leaving the middle third to cover 7 seconds of camera move.
 *
 * The camera therefore eases to a stop on each arrival, sits there while the
 * copy is up, and only pulls away once the visitor keeps scrolling. Zone
 * boundaries are preserved exactly, so this never desynchronises the copy.
 */
const FLIGHT_ZONES = 7
const ZONE_SECONDS = 11 // hold 3 + fly 7 + land 1, per build-flight.sh
const CLIP_SECONDS = 77.5

// Where each beat ends, in seconds within a zone, and the share of that zone's
// scroll it is given. Widen SCROLL_SHARE's outer values for a longer stop.
const BEAT_SECONDS = [3, 10, ZONE_SECONDS]
const SCROLL_SHARE = [0.3, 0.38, 0.32]

function flightWarp(p) {
  const s = Math.min(FLIGHT_ZONES - 1e-6, Math.max(0, p) * FLIGHT_ZONES)
  const zone = Math.floor(s)
  let f = s - zone // 0..1 across this zone's scroll

  let fromT = 0
  let fromF = 0
  for (let i = 0; i < BEAT_SECONDS.length; i++) {
    if (f <= fromF + SCROLL_SHARE[i] || i === BEAT_SECONDS.length - 1) {
      const local = Math.min(1, (f - fromF) / SCROLL_SHARE[i])
      const t = fromT + local * (BEAT_SECONDS[i] - fromT)
      return Math.min(1, (zone * ZONE_SECONDS + t) / CLIP_SECONDS)
    }
    fromF += SCROLL_SHARE[i]
    fromT = BEAT_SECONDS[i]
  }
  return p
}

/**
 * The scrubbed scenes, as data.
 *
 * The flight is the centrepiece: one pinned scene scrubbing all seven island
 * zones as a single continuous take.
 *
 * All seven segments from HIGGSFIELD.md are stitched into one 77.5-second take
 * that runs hold / fly / land per zone (see A.flightClip), so `clipRange` is
 * [0, 1]. The stills below are back to being the pure fallback they were
 * designed as: reduced motion, a failed fetch, or a slow first paint.
 *
 * Zone holds open at 0, 11, 22, 33, 44, 55, 66s against an 11.071s band — the
 * 0.071s/zone drift is absorbed by the hold being 3s long. This is also why `W`
 * in Flight.jsx had to tighten: the copy has to be fully up while its image is
 * frozen, not still fading in.
 */
export const scenes = {
  flight: {
    id: 'flight',
    mediaType: 'video',
    clip: A.flightClip,
    /** All seven segments exist, so the video carries the whole flight. */
    clipRange: [0, 1],
    /** Soft stop on each arrival — see flightWarp above. */
    clipWarp: flightWarp,
    /** Ambient loop over zone 1, before the visitor has scrolled anything. */
    heroLoop: A.heroLoop,
    // Seven zones, in flight order — must line up with content/site.js
    // `flight.zones`.
    //
    // This order is dictated by the footage, not chosen. Each Higgsfield clip
    // is a camera move BETWEEN two specific stills, so the seven only chain one
    // way: hero → web desk → NFC kiosk → signal tower → desk nook → bench →
    // bench again. Re-ordering the zones would mean re-generating clips.
    //
    // The copy was re-sequenced to match (site.js `flight.zones`) so each block
    // still lands on the still it was written for, and so the two nav groups
    // stay contiguous: zones 1-3 are the three lines of work, 4-6 the process
    // beats in chronological order.
    stills: [
      A.hero,
      A.webDesk,
      A.nfcKiosk,
      A.signalTower,
      A.shiek,
      A.dave,
      A.haiqal,
    ],
    // Viewport-heights the flight stays pinned for. ~1.6 per zone across 7
    // zones, so a single scroll gesture stays within a zone instead of blowing
    // straight through to the next — each zone gets a deliberate hold.
    scroll: 11.2,
    zoom: [1, 1.12],
    pan: [0, -3],
    transition: 'crossfade',
  },
  // The showcase scene is gone with its section — it scrubbed four invented
  // client projects under a "Recent work" heading. Real work goes back in here
  // when there is some to show.
}
