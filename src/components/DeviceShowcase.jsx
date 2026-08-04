import { Check } from 'lucide-react'

/**
 * Tablet, laptop and phone showing the work running — the "here is the thing"
 * visual for the services section.
 *
 * Drawn in CSS rather than shipped as an image, and that is the whole point. A
 * bitmap of a device cluster would be the same trap the island flight fell
 * into: any raster filling half a section gets magnified on a retina screen and
 * goes soft, and there is no source resolution high enough to stop being
 * upscaled by somebody's display. Borders, radii and type drawn by the browser
 * are resolution-independent — pin-sharp at 1x, 2x and 3x, and no bytes.
 *
 * EVERY size in here is in `cqw`, percent of the stage's own width, because the
 * devices are positioned in percentages. Mixing the two does not work: fixed px
 * internals keep their height while the frames around them shrink, so on a
 * narrow column the laptop's five rows and padding simply burst out of the
 * stage. In container units the whole cluster scales as one object and the
 * arrangement holds at any width.
 *
 * The screens show Khybrio's output, not a product UI — an enquiry landing, the
 * run list working through it, the confirmation going out. Khybrio sells built
 * automations rather than a SaaS dashboard, so a fake console would be claiming
 * a product that does not exist.
 */

/** One row of the laptop's run list. */
function Run({ label, status, tone }) {
  const tones = {
    done: 'bg-teal-bright/15 text-teal-bright',
    live: 'bg-coral/15 text-coral',
    idle: 'bg-teal-deep/8 text-teal-deep/50',
  }
  return (
    <div
      className="flex items-center border-b border-teal-deep/6 last:border-0"
      style={{ gap: '0.5cqw', padding: '0.75cqw 1.1cqw' }}
    >
      <span
        className="shrink-0 rounded-full bg-teal-soft"
        style={{ width: '0.7cqw', height: '0.7cqw' }}
      />
      <span
        className="min-w-0 flex-1 truncate text-teal-deep/75"
        style={{ fontSize: '1.15cqw', lineHeight: 1.35 }}
      >
        {label}
      </span>
      {/* Status pills are the smallest type in the cluster — about 3px once the
          stage is a phone's width, which reads as dirt rather than as a label.
          Below sm they become a plain dot, which says the same thing at a size
          that survives. */}
      <span
        className={`hidden shrink-0 rounded-full font-semibold sm:inline ${tones[tone]}`}
        style={{ fontSize: '0.95cqw', padding: '0.15cqw 0.9cqw', lineHeight: 1.5 }}
      >
        {status}
      </span>
      <span
        aria-hidden="true"
        className={`shrink-0 rounded-full sm:hidden ${tone === 'live' ? 'bg-coral' : tone === 'done' ? 'bg-teal-bright' : 'bg-teal-deep/20'}`}
        style={{ width: '1.6cqw', height: '1.6cqw' }}
      />
    </div>
  )
}

/** A labelled field on the tablet's intake form. */
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

export function DeviceShowcase({ className = '' }) {
  return (
    <div
      className={`relative w-full ${className}`}
      // containerType makes every cqw below resolve against THIS box.
      //
      // The ratio is tuned to the cluster, not picked: the devices are sized in
      // cqw, so their heights follow the stage's WIDTH while this sets its
      // height. At 16/11 the three of them packed into the top half and the
      // phone floated clear of the laptop with a band of nothing under it. 16/7
      // is the height at which the phone overlaps the laptop's lower edge and
      // the cluster reads as one object.
      style={{ aspectRatio: '16 / 7.5', containerType: 'inline-size' }}
      role="img"
      aria-label="A tablet, laptop and phone showing an enquiry arriving, the automation running, and the confirmation going out"
    >
      {/* TABLET — back left, tilted away so it reads as the furthest object. */}
      <div
        className="absolute bg-teal-deep shadow-[0_18px_40px_-18px_rgba(15,43,41,0.45)]"
        style={{
          left: 0,
          top: '2%',
          width: '40%',
          padding: '0.8cqw',
          borderRadius: '2.3cqw',
          transform: 'perspective(1200px) rotateY(9deg)',
        }}
      >
        <div
          className="overflow-hidden bg-cream"
          style={{ borderRadius: '1.6cqw', padding: '1.6cqw' }}
        >
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

      {/* LAPTOP — the hero object: largest, front, and the one with the work in
          it. Sits right so the tablet reads behind its left edge. */}
      <div className="absolute" style={{ right: 0, top: '12%', width: '68%' }}>
        <div
          className="bg-teal-deep shadow-[0_26px_60px_-24px_rgba(15,43,41,0.5)]"
          style={{ padding: '1cqw', paddingBottom: 0, borderRadius: '1.6cqw 1.6cqw 0 0' }}
        >
          <div className="overflow-hidden bg-cream" style={{ borderRadius: '1cqw 1cqw 0 0' }}>
            <div
              className="flex items-center border-b border-teal-deep/8 bg-teal-soft/15"
              style={{ gap: '0.6cqw', padding: '1cqw 1.3cqw' }}
            >
              <span
                className="rounded-full bg-coral/70"
                style={{ width: '0.85cqw', height: '0.85cqw' }}
              />
              <span
                className="rounded-full bg-teal-soft"
                style={{ width: '0.85cqw', height: '0.85cqw' }}
              />
              <span
                className="rounded-full bg-teal-soft"
                style={{ width: '0.85cqw', height: '0.85cqw' }}
              />
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
                <Run label="Order → sheet → confirmation" status="Done" tone="done" />
                <Run label="Invoice overdue → reminder" status="Running" tone="live" />
                <Run label="Enquiry → contact → notify" status="Done" tone="done" />
                <Run label="Booking → calendar → reminder" status="Done" tone="done" />
                <Run label="Month-end → report" status="Queued" tone="idle" />
              </div>
            </div>
          </div>
        </div>
        {/* base + hinge */}
        <div
          className="bg-teal-deep/90"
          style={{ height: '1.2cqw', borderRadius: '0 0 0.5cqw 0.5cqw' }}
        />
        <div
          className="mx-auto bg-teal-deep/40"
          style={{ height: '0.5cqw', width: '22%', borderRadius: '0 0 99px 99px' }}
        />
      </div>

      {/* PHONE — front centre-left, overlapping both, so the cluster reads with
          depth instead of as three things in a row. */}
      <div
        className="absolute bg-teal-deep shadow-[0_18px_36px_-14px_rgba(15,43,41,0.5)]"
        style={{
          bottom: 0,
          left: '20%',
          width: '15%',
          padding: '0.5cqw',
          borderRadius: '1.7cqw',
          transform: 'perspective(1200px) rotateY(-7deg)',
        }}
      >
        <div className="overflow-hidden bg-cream" style={{ borderRadius: '1.3cqw' }}>
          <div className="flex justify-center" style={{ padding: '0.8cqw 0 0.5cqw' }}>
            <span
              className="rounded-full bg-teal-deep/15"
              style={{ height: '0.45cqw', width: '3cqw' }}
            />
          </div>
          <div style={{ padding: '0 1.2cqw 2cqw' }}>
            <div
              className="mx-auto grid place-items-center rounded-full bg-teal-bright/12"
              style={{ width: '3.6cqw', height: '3.6cqw' }}
            >
              <Check size={11} strokeWidth={3} color="var(--color-coral)" />
            </div>
            <p
              className="text-center font-bold text-teal-deep"
              style={{ fontSize: '1cqw', lineHeight: 1.25, marginTop: '0.9cqw' }}
            >
              Booking
              <br />
              confirmed
            </p>
            <div style={{ marginTop: '1.2cqw' }} aria-hidden="true">
              <div
                className="rounded-full bg-teal-deep/10"
                style={{ height: '0.45cqw', width: '100%' }}
              />
              <div
                className="rounded-full bg-teal-deep/10"
                style={{ height: '0.45cqw', width: '80%', marginTop: '0.6cqw' }}
              />
            </div>
            <div
              className="bg-coral"
              style={{ height: '2.2cqw', borderRadius: '0.5cqw', marginTop: '1.2cqw' }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
