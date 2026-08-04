import { Check, MapPin, Star } from 'lucide-react'

/**
 * Tablet, laptop and phone — one per line of work — with the list beside them
 * driving which is in front.
 *
 * Drawn in CSS rather than shipped as an image, and that is the point. A bitmap
 * of a device cluster is the trap the island flight fell into: any raster
 * filling half a section gets magnified on a retina screen and goes soft, and
 * no source resolution outruns somebody's display. Browser-drawn borders, radii
 * and type are resolution-independent — sharp at 1x, 2x and 3x, and no bytes.
 *
 * What makes them read as devices rather than three rounded rectangles is the
 * hardware, not the screens: a laptop needs a hinge and a keyboard deck that
 * splays outward in perspective with a finger lip cut into its front edge; a
 * phone needs an island, a home bar and side buttons; a tablet needs an even
 * bezel with a camera on it. Without those a viewer reads "boxes at three
 * sizes", which is exactly what they are underneath.
 *
 * EVERY internal size is in `cqw`, percent of the stage's own width, because
 * the devices are positioned in percentages. Mixing units does not work: fixed
 * px internals keep their height while the frames around them shrink, so on a
 * narrow column the laptop's rows burst out of the stage.
 *
 * The screens show Khybrio's output, not a product console. Khybrio sells built
 * automations rather than a SaaS dashboard, so a fake product UI would be
 * claiming something that does not exist.
 */

/** service index → which device stands for it */
const LAPTOP = 0
const TABLET = 1
const PHONE = 2

/**
 * Shared look for a device that is / is not the one being talked about.
 *
 * The inactive state is carried by SCALE and SHADOW, not by fading. Dropping
 * the opacity to 0.62 washed the dark bezels out against a cream page and left
 * two pale outlines beside one solid device — the exact flat, weightless look
 * this section was rebuilt to fix. A device merely further back should still
 * read as a physical object, so it stays opaque and simply sits smaller with a
 * tighter shadow.
 */
function depth(isActive, base) {
  return {
    transform: `perspective(1200px) ${base} scale(${isActive ? 1.05 : 0.94})`,
    filter: isActive ? 'none' : 'saturate(0.9) brightness(0.96)',
    opacity: isActive ? 1 : 0.94,
    transition: 'transform 700ms cubic-bezier(.2,.7,.2,1), opacity 500ms, filter 500ms',
  }
}

const shadow = (isActive) =>
  isActive
    ? '0 38px 72px -26px rgba(15,43,41,0.6), 0 8px 18px -8px rgba(15,43,41,0.4)'
    : '0 14px 34px -20px rgba(15,43,41,0.45)'

/** Anodised dark body — a gradient, so the frame reads as a moulded shell. */
const BEZEL = 'linear-gradient(155deg, #33706c 0%, #1c4d4a 45%, #0f2b29 100%)'
/** Brushed aluminium, for the laptop deck. */
const DECK = 'linear-gradient(178deg, #cbd8d5 0%, #aabfbb 55%, #8ea6a2 100%)'

/** Lens dot on a bezel. */
function Camera({ size = '0.34cqw' }) {
  return (
    <span
      aria-hidden="true"
      className="rounded-full"
      style={{
        width: size,
        height: size,
        background: 'radial-gradient(circle at 35% 30%, #6f8f8c, #0c2422 70%)',
        boxShadow: 'inset 0 0 0 0.06cqw rgba(255,255,255,0.18)',
      }}
    />
  )
}

function Run({ label, status, tone, i }) {
  const tones = {
    done: 'bg-teal-bright/15 text-teal-bright',
    live: 'bg-coral/15 text-coral',
    idle: 'bg-teal-deep/8 text-teal-deep/50',
  }
  const dots = { done: 'bg-teal-bright', live: 'bg-coral', idle: 'bg-teal-deep/20' }
  return (
    <div
      className="dev-row flex items-center border-b border-teal-deep/6 last:border-0"
      style={{ gap: '0.5cqw', padding: '0.72cqw 1.1cqw', '--i': i }}
    >
      <span
        className={`shrink-0 rounded-full ${tone === 'live' ? 'live-dot bg-coral' : 'bg-teal-soft'}`}
        style={{ width: '0.7cqw', height: '0.7cqw' }}
      />
      <span
        className="min-w-0 flex-1 truncate text-teal-deep/75"
        style={{ fontSize: '1.15cqw', lineHeight: 1.35 }}
      >
        {label}
      </span>
      {/* Below sm these pills sit at about 3px, which reads as dirt rather than
          as a label, so they become a dot that survives the size. */}
      <span
        className={`hidden shrink-0 rounded-full font-semibold sm:inline ${tones[tone]}`}
        style={{ fontSize: '0.95cqw', padding: '0.15cqw 0.9cqw', lineHeight: 1.5 }}
      >
        {status}
      </span>
      <span
        aria-hidden="true"
        className={`shrink-0 rounded-full sm:hidden ${dots[tone]}`}
        style={{ width: '1.6cqw', height: '1.6cqw' }}
      />
    </div>
  )
}

function Field({ label, w = '100%' }) {
  return (
    <div style={{ marginTop: '1.25cqw' }}>
      <div
        className="rounded-full bg-teal-deep/20"
        style={{ height: '0.45cqw', width: '4.5cqw' }}
        aria-hidden="true"
      />
      <div
        className="rounded-[0.5cqw] bg-teal-deep/6"
        style={{ height: '2.1cqw', width: w, marginTop: '0.55cqw' }}
      >
        <span className="sr-only">{label}</span>
      </div>
    </div>
  )
}

export function DeviceShowcase({ active = LAPTOP, className = '' }) {
  return (
    <div
      className={`relative w-full ${className}`}
      // containerType makes every cqw below resolve against THIS box. The ratio
      // is tuned to the cluster rather than picked: it is the height at which
      // the phone overlaps the laptop's lower edge and the three read as one
      // object rather than as a row of separate things.
      style={{ aspectRatio: '16 / 8', containerType: 'inline-size' }}
      role="img"
      aria-label="A tablet, laptop and phone: an enquiry arriving, the automation running it, and the local listing it feeds"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute rounded-[50%] bg-teal-deep/10 blur-2xl"
        style={{ left: '8%', right: '8%', bottom: '-3%', height: '13%' }}
      />

      {/* ── TABLET — websites & booking ─────────────────────────────────── */}
      <div
        className="absolute"
        // Stacking is physical, not a focus indicator. The phone stands in
        // front of the laptop and stays there — driving z off `active` put the
        // laptop over the phone whenever automation was lit, which clipped the
        // phone in half and read as a glitch. Only the tablet moves, and only
        // far enough to clear the laptop it is tucked behind.
        style={{ left: 0, top: '3%', width: '38%', zIndex: active === TABLET ? 22 : 10 }}
      >
        <div className="dev-float" style={{ animationDelay: '-2.5s' }}>
          <div style={depth(active === TABLET, 'rotateY(10deg)')}>
            <div
              className="relative"
              style={{
                background: BEZEL,
                padding: '1.15cqw',
                borderRadius: '2cqw',
                boxShadow: shadow(active === TABLET),
              }}
            >
              {/* even bezel with the camera centred on it — the tell that this
                  is a tablet and not a phone blown up */}
              <div className="flex justify-center" style={{ paddingBottom: '0.55cqw' }}>
                <Camera size="0.3cqw" />
              </div>
              <div
                className="relative overflow-hidden bg-cream"
                style={{ borderRadius: '0.9cqw', padding: '1.5cqw' }}
              >
                {active === TABLET ? <span key={active} className="dev-sheen" /> : null}
                <p className="font-bold text-teal-deep" style={{ fontSize: '1.2cqw' }}>
                  New enquiry
                </p>
                <Field label="Name" />
                <Field label="Service" w="80%" />
                <Field label="Preferred date" w="60%" />
                <div
                  className="bg-coral"
                  style={{ height: '2.5cqw', borderRadius: '0.6cqw', marginTop: '1.5cqw' }}
                  aria-hidden="true"
                />
              </div>
              {/* volume rocker on the top edge */}
              <span
                aria-hidden="true"
                className="absolute rounded-full"
                style={{ right: '18%', top: '-0.3cqw', width: '5%', height: '0.3cqw', background: '#17403e' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── LAPTOP — workflow automation ────────────────────────────────── */}
      <div
        className="absolute"
        style={{ right: 0, top: '10%', width: '68%', zIndex: 20 }}
      >
        <div className="dev-float">
          <div style={depth(active === LAPTOP, 'rotateY(-2deg)')}>
            {/* LID */}
            <div
              style={{
                background: BEZEL,
                padding: '0.95cqw',
                paddingTop: '1.5cqw',
                borderRadius: '1.4cqw 1.4cqw 0 0',
                boxShadow: shadow(active === LAPTOP),
              }}
            >
              <div
                className="absolute left-1/2 flex -translate-x-1/2"
                style={{ top: '0.55cqw' }}
              >
                <Camera />
              </div>
              <div
                className="relative overflow-hidden bg-cream"
                style={{ borderRadius: '0.5cqw' }}
              >
                {active === LAPTOP ? <span key={active} className="dev-sheen" /> : null}
                <div
                  className="flex items-center border-b border-teal-deep/8 bg-teal-soft/15"
                  style={{ gap: '0.6cqw', padding: '1cqw 1.3cqw' }}
                >
                  <span className="rounded-full bg-coral/70" style={{ width: '0.85cqw', height: '0.85cqw' }} />
                  <span className="rounded-full bg-teal-soft" style={{ width: '0.85cqw', height: '0.85cqw' }} />
                  <span className="rounded-full bg-teal-soft" style={{ width: '0.85cqw', height: '0.85cqw' }} />
                  <span
                    className="rounded-full bg-teal-deep/8"
                    style={{ height: '1.2cqw', width: '30%', marginLeft: '0.8cqw' }}
                  />
                </div>
                <div className="flex">
                  <div
                    className="shrink-0 border-r border-teal-deep/6 bg-teal-soft/10"
                    style={{ width: '16%', padding: '1cqw' }}
                  >
                    {['100%', '80%', '60%', '80%', '65%'].map((w, i) => (
                      <div
                        key={i}
                        className={`rounded-full ${i === 1 ? 'bg-coral/50' : 'bg-teal-deep/10'}`}
                        style={{ height: '0.65cqw', width: w, marginBottom: '1cqw' }}
                      />
                    ))}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div
                      className="flex items-center justify-between"
                      style={{ padding: '1.1cqw 1.1cqw 0.4cqw' }}
                    >
                      <p className="font-bold text-teal-deep" style={{ fontSize: '1.2cqw' }}>
                        Today’s runs
                      </p>
                      <span
                        className="hidden rounded-full bg-teal-bright/12 font-semibold text-teal-bright sm:inline"
                        style={{ fontSize: '0.95cqw', padding: '0.15cqw 0.9cqw' }}
                      >
                        Live
                      </span>
                    </div>
                    {/* keyed on `active` so the queue re-runs whenever the
                        laptop comes forward — the section's main sign of life */}
                    <div key={active}>
                      <Run i={0} label="Order → sheet → confirmation" status="Done" tone="done" />
                      <Run i={1} label="Invoice overdue → reminder" status="Running" tone="live" />
                      <Run i={2} label="Enquiry → contact → notify" status="Done" tone="done" />
                      <Run i={3} label="Booking → calendar → reminder" status="Done" tone="done" />
                      <Run i={4} label="Month-end → report" status="Queued" tone="idle" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* HINGE — a darker seam between lid and deck. */}
            <div
              style={{
                height: '0.55cqw',
                background: 'linear-gradient(180deg,#0c2422,#17403e)',
              }}
            />

            {/* DECK — splays wider than the lid, which is what sells the
                perspective. A rectangle here reads as a picture frame on a
                stand; the taper reads as a laptop seen from slightly above. */}
            <div
              style={{
                height: '1.9cqw',
                background: DECK,
                clipPath: 'polygon(-2.2% 0, 102.2% 0, 105% 100%, -5% 100%)',
                borderRadius: '0 0 0.5cqw 0.5cqw',
              }}
            >
              {/* finger lip cut into the front edge */}
              <div
                className="mx-auto"
                style={{
                  width: '13%',
                  height: '0.55cqw',
                  marginTop: '1.35cqw',
                  background: 'rgba(12,36,34,0.22)',
                  borderRadius: '0 0 99px 99px',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── PHONE — local presence ──────────────────────────────────────── */}
      <div
        className="absolute"
        style={{ bottom: 0, left: '21%', width: '16%', zIndex: 30 }}
      >
        <div className="dev-float" style={{ animationDelay: '-5s' }}>
          <div style={depth(active === PHONE, 'rotateY(-8deg)')}>
            <div
              className="relative"
              style={{
                background: BEZEL,
                padding: '0.45cqw',
                borderRadius: '2.1cqw',
                boxShadow: shadow(active === PHONE),
              }}
            >
              <div
                className="relative overflow-hidden bg-cream"
                style={{ borderRadius: '1.75cqw' }}
              >
                {active === PHONE ? <span key={active} className="dev-sheen" /> : null}

                {/* dynamic island — sits ON the screen, which is what makes a
                    phone read as a phone rather than as a small tablet */}
                <div
                  aria-hidden="true"
                  className="absolute left-1/2 -translate-x-1/2 rounded-full"
                  style={{ top: '0.5cqw', width: '38%', height: '0.85cqw', background: '#0c2422', zIndex: 5 }}
                />

                <div style={{ padding: '2.3cqw 1.1cqw 2.2cqw' }}>
                  <div
                    className="mx-auto grid place-items-center rounded-full bg-coral/12"
                    style={{ width: '3.4cqw', height: '3.4cqw' }}
                  >
                    <MapPin size={9} strokeWidth={3} color="var(--color-coral)" />
                  </div>
                  <p
                    className="text-center font-bold text-teal-deep"
                    style={{ fontSize: '1cqw', lineHeight: 1.25, marginTop: '0.8cqw' }}
                  >
                    Open now
                  </p>
                  <div
                    className="flex justify-center"
                    style={{ gap: '0.22cqw', marginTop: '0.6cqw' }}
                    aria-hidden="true"
                  >
                    {[0, 1, 2, 3, 4].map((n) => (
                      <Star key={n} size={5} strokeWidth={0} fill="var(--color-coral)" />
                    ))}
                  </div>
                  <div style={{ marginTop: '1cqw' }} aria-hidden="true">
                    <div className="rounded-full bg-teal-deep/10" style={{ height: '0.45cqw', width: '100%' }} />
                    <div
                      className="rounded-full bg-teal-deep/10"
                      style={{ height: '0.45cqw', width: '80%', marginTop: '0.55cqw' }}
                    />
                  </div>
                  <div
                    className="flex items-center justify-center bg-coral text-cream"
                    style={{ height: '2.2cqw', borderRadius: '0.5cqw', marginTop: '1cqw' }}
                  >
                    <Check size={6} strokeWidth={4} />
                  </div>
                </div>

                {/* home indicator */}
                <div
                  aria-hidden="true"
                  className="absolute left-1/2 -translate-x-1/2 rounded-full bg-teal-deep/30"
                  style={{ bottom: '0.55cqw', width: '34%', height: '0.3cqw' }}
                />
              </div>

              {/* side buttons, on the outside of the shell */}
              <span
                aria-hidden="true"
                className="absolute rounded-full"
                style={{ left: '-0.22cqw', top: '20%', width: '0.24cqw', height: '7%', background: '#17403e' }}
              />
              <span
                aria-hidden="true"
                className="absolute rounded-full"
                style={{ left: '-0.22cqw', top: '31%', width: '0.24cqw', height: '11%', background: '#17403e' }}
              />
              <span
                aria-hidden="true"
                className="absolute rounded-full"
                style={{ right: '-0.22cqw', top: '26%', width: '0.24cqw', height: '14%', background: '#17403e' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
