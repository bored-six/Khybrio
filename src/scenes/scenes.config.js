import { A } from '../lib/assets'

/**
 * The flight's stop plan — one scroll, one segment, hard stop on arrival.
 *
 * Scrubbing tied clip time to scroll position, which meant the visitor set the
 * playback speed. A flick sent fifty seconds of camera past in an instant and
 * the footage never rested anywhere; re-timing the mapping only ever changed
 * where the mess happened. So scroll no longer drives the clip at all. It
 * chooses a stop, and the clip travels there under its own power and stops
 * dead.
 *
 * The stops are the middle of each zone's opening hold, which is the one place
 * per zone where the frame is frozen, matches the copy, and is the crisp 4K
 * original rather than a decoded video frame. Travelling between two stops
 * therefore plays the whole beat — fly, land, settle — and ends parked.
 */
const FLIGHT_ZONES = 7
const ZONE_SECONDS = 11 // hold 3 + fly 7 + land 1, per scripts/build-flight.sh
const CLIP_SECONDS = 77.5
const HOLD_CENTRE = 1.5 // into a zone: mid-hold, fully settled on the still

/**
 * Clip-seconds per real second while travelling. 1.0 is true playback speed and
 * feels sluggish at 11s a hop; this covers a zone in a bit over four seconds,
 * which still reads as the camera flying rather than cutting.
 */
const FLIGHT_RATE = 2.5

const flightPlan = {
  stops: Array.from(
    { length: FLIGHT_ZONES },
    (_, i) => (i * ZONE_SECONDS + HOLD_CENTRE) / CLIP_SECONDS,
  ),
  // Which stop the current scroll position is asking for. Plain zone bands, so
  // this stays in lockstep with the copy, which reads the same bands.
  indexAt: (p) => Math.floor(Math.min(0.999999, Math.max(0, p)) * FLIGHT_ZONES),
  rate: FLIGHT_RATE,
  /**
   * Furthest the clip may trail its target before it stops crawling and closes
   * the gap at once. One zone: a normal one-stop hop never hits this, but a
   * flick to the far end would otherwise take 26 seconds to arrive with the
   * copy sitting six zones ahead the whole way. Capped, the visitor always sees
   * the final segment play into its stop no matter how hard they scrolled.
   */
  maxLag: ZONE_SECONDS / CLIP_SECONDS,
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
    /** One scroll, one segment, hard stop — see flightPlan above. */
    clipPlan: flightPlan,
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
