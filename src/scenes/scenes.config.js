import { A } from '../lib/assets'

/**
 * The scrubbed scenes, as data.
 *
 * The flight is the centrepiece: one pinned scene scrubbing all eight island
 * zones as a single continuous take (crossfade + camera push over the stills).
 * It runs as `mediaType: 'image'` today — the closest we can get to the planned
 * flight without true image-to-video. When real Seedance clips exist, drop the
 * stitched file at A.flightClip and flip `mediaType` to 'video'; the pin/scrub
 * machinery underneath doesn't change.
 */
export const scenes = {
  flight: {
    id: 'flight',
    mediaType: 'image', // 'video' once A.flightClip exists
    clip: A.flightClip,
    // heroLoop intentionally omitted — the 1080p loop wasn't crisp enough, so
    // the hero shows the sharp still (01-hero). Re-add A.heroLoop here if a
    // genuinely HD loop is generated later.
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
