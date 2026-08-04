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
 * EVERY internal size is in `cqw`, percent of the stage's own width, because
 * the devices are positioned in percentages. Mixing units does not work: fixed
 * px internals keep their height while the frames around them shrink, so on a
 * narrow column the laptop's rows burst out of the stage.
 *
 * `active` is a service index, not a device index — the mapping lives in
 * DEVICE_OF so the list can stay in its own order.
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
 * this section was rebuilt to fix. A device that is merely further back should
 * still look like a physical object, so it stays essentially opaque and simply
 * sits lower and smaller with a tighter shadow.
 */
function depth(isActive, base) {
  return {
    transform: `perspective(1200px) ${base} scale(${isActive ? 1.05 : 0.94})`,
    filter: isActive ? 'none' : 'saturate(0.9) brightness(0.96)',
    opacity: isActive ? 1 : 0.94,
    boxShadow: isActive
      ? '0 38px 72px -26px rgba(15,43,41,0.6), 0 8px 18px -8px rgba(15,43,41,0.4)'
      : '0 14px 34px -20px rgba(15,43,41,0.45)',
    transition:
      'transform 700ms cubic-bezier(.2,.7,.2,1), opacity 500ms, filter 500ms, box-shadow 700ms',
  }
}

/** Deep bezel — a gradient, not a flat fill, so the frame reads as a body. */
const BEZEL = 'linear-gradient(160deg, #2c625f 0%, #1c4d4a 42%, #123331 100%)'

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
      style={{ gap: '0.5cqw', padding: '0.75cqw 1.1cqw', '--i': i }}
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
      {/* Below sm these pills sit at about 3px, which reads as dirt rather
          than as a label, so they become a dot that survives the size. */}
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
    <div style={{ marginTop: '1.3cqw' }}>
      <div
        className="rounded-full bg-teal-deep/20"
        style={{ height: '0.45cqw', width: '4.5cqw' }}
        aria-hidden="true"
      />
      <div
        className="rounded-[0.5cqw] bg-teal-deep/6"
        style={{ height: '2.2cqw', width: w, marginTop: '0.6cqw' }}
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
      // is tuned to the cluster rather than picked: at 16/11 the devices packed
      // into the top half with a band of nothing beneath, and 16/7.5 is where
      // the phone overlaps the laptop's lower edge and the three read as one.
      style={{ aspectRatio: '16 / 7.5', containerType: 'inline-size' }}
      role="img"
      aria-label="A tablet, laptop and phone: an enquiry arriving, the automation running it, and the local listing it feeds"
    >
      {/* Soft ground shadow so the cluster sits on something. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute rounded-[50%] bg-teal-deep/10 blur-2xl"
        style={{ left: '8%', right: '8%', bottom: '-4%', height: '14%' }}
      />

      {/* TABLET — websites & booking. Back left, tilted away. */}
      <div className="absolute" style={{ left: 0, top: '2%', width: '40%', zIndex: active === TABLET ? 30 : 10 }}>
        <div className="dev-float" style={{ animationDelay: '-2.5s' }}>
          <div
            className="relative"
            style={{
              background: BEZEL,
              padding: '0.8cqw',
              borderRadius: '2.3cqw',
              ...depth(active === TABLET, 'rotateY(9deg)'),
            }}
          >
            <div
              className="relative overflow-hidden bg-cream"
              style={{ borderRadius: '1.6cqw', padding: '1.6cqw' }}
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
                style={{ height: '2.6cqw', borderRadius: '0.65cqw', marginTop: '1.6cqw' }}
                aria-hidden="true"
              />
              <div
                className="bg-teal-deep/10"
                style={{ height: '2.6cqw', borderRadius: '0.65cqw', marginTop: '1cqw' }}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>

      {/* LAPTOP — workflow automation. Largest, front right. */}
      <div className="absolute" style={{ right: 0, top: '12%', width: '68%', zIndex: active === LAPTOP ? 30 : 20 }}>
        <div className="dev-float">
          <div style={depth(active === LAPTOP, 'rotateY(-2deg)')}>
            <div
              style={{
                background: BEZEL,
                padding: '1cqw',
                paddingBottom: 0,
                borderRadius: '1.6cqw 1.6cqw 0 0',
              }}
            >
              <div
                className="relative overflow-hidden bg-cream"
                style={{ borderRadius: '1cqw 1cqw 0 0' }}
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
                      style={{ padding: '1.2cqw 1.1cqw 0.5cqw' }}
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
                    {/* Keyed on `active` so the queue re-runs each time the
                        laptop comes forward — the section's main sign of life. */}
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
            <div
              style={{
                background: 'linear-gradient(180deg,#1c4d4a,#0f2b29)',
                height: '1.2cqw',
                borderRadius: '0 0 0.5cqw 0.5cqw',
              }}
            />
            <div
              className="mx-auto bg-teal-deep/40"
              style={{ height: '0.5cqw', width: '22%', borderRadius: '0 0 99px 99px' }}
            />
          </div>
        </div>
      </div>

      {/* PHONE — local presence. Front, overlapping both. */}
      <div className="absolute" style={{ bottom: 0, left: '20%', width: '15%', zIndex: active === PHONE ? 30 : 25 }}>
        <div className="dev-float" style={{ animationDelay: '-5s' }}>
          <div
            style={{
              background: BEZEL,
              padding: '0.5cqw',
              borderRadius: '1.7cqw',
              ...depth(active === PHONE, 'rotateY(-7deg)'),
            }}
          >
            <div className="relative overflow-hidden bg-cream" style={{ borderRadius: '1.3cqw' }}>
              {active === PHONE ? <span key={active} className="dev-sheen" /> : null}
              <div className="flex justify-center" style={{ padding: '0.8cqw 0 0.5cqw' }}>
                <span
                  className="rounded-full bg-teal-deep/15"
                  style={{ height: '0.45cqw', width: '3cqw' }}
                />
              </div>
              <div style={{ padding: '0 1.2cqw 2cqw' }}>
                {/* Local presence: the listing and the reviews it collects. */}
                <div
                  className="mx-auto grid place-items-center rounded-full bg-coral/12"
                  style={{ width: '3.6cqw', height: '3.6cqw' }}
                >
                  <MapPin size={10} strokeWidth={3} color="var(--color-coral)" />
                </div>
                <p
                  className="text-center font-bold text-teal-deep"
                  style={{ fontSize: '1cqw', lineHeight: 1.25, marginTop: '0.9cqw' }}
                >
                  Open now
                </p>
                <div
                  className="flex justify-center"
                  style={{ gap: '0.25cqw', marginTop: '0.7cqw' }}
                  aria-hidden="true"
                >
                  {[0, 1, 2, 3, 4].map((n) => (
                    <Star key={n} size={5} strokeWidth={0} fill="var(--color-coral)" />
                  ))}
                </div>
                <div style={{ marginTop: '1.1cqw' }} aria-hidden="true">
                  <div className="rounded-full bg-teal-deep/10" style={{ height: '0.45cqw', width: '100%' }} />
                  <div
                    className="rounded-full bg-teal-deep/10"
                    style={{ height: '0.45cqw', width: '80%', marginTop: '0.6cqw' }}
                  />
                </div>
                <div
                  className="flex items-center justify-center bg-coral font-bold text-cream"
                  style={{
                    height: '2.4cqw',
                    borderRadius: '0.5cqw',
                    marginTop: '1.2cqw',
                    fontSize: '0.85cqw',
                  }}
                >
                  <Check size={6} strokeWidth={4} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
