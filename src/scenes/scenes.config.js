import { A } from '../lib/assets'

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
