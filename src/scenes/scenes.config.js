import { A } from '../lib/assets'

/**
 * The scrubbed scenes, as data.
 *
 * The flight is the centrepiece: one pinned scene scrubbing all seven island
 * zones as a single continuous take.
 *
 * The flight is being generated a segment at a time (HIGGSFIELD.md, clips 1–7).
 * Segment 1 exists, so the opening of the scene is a real scrubbed camera move
 * and the rest is still the crossfade-and-push over the stills. `clipRange` is
 * the only thing that has to change as more segments land — stitch them and
 * widen the range; at [0, 1] the whole flight is video and the stills go back
 * to being the fallback they were designed as.
 */
export const scenes = {
  flight: {
    id: 'flight',
    mediaType: 'video',
    clip: A.flightClip,
    /**
     * Scene progress the clip covers. Segment 1 flies from the wide island
     * (zone 1) to the web desk (zone 3), so it ends where zone 3's still is
     * fully solid — seg 2.5 of 7 — and dissolves onto that identical framing.
     * The desk-nook still that zone 2 would otherwise show is skipped: its copy
     * rides the moving camera instead, which is what the flight was always
     * meant to do.
     */
    clipRange: [0, 2.5 / 7],
    /** Ambient loop over zone 1, before the visitor has scrolled anything. */
    heroLoop: A.heroLoop,
    // Seven zones, in flight order — must line up with content/site.js
    // `flight.zones`. Re-ordered for the automation cut: the code-brackets nook
    // opens the three lines of work, and the crew scenes now carry the process
    // beats (handshake = the audit, phone = running in parallel, tablet =
    // handover) rather than one person each.
    stills: [
      A.hero,
      A.shiek,
      A.webDesk,
      A.signalTower,
      A.dave,
      A.nfcKiosk,
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
