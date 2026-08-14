import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { AssetImage } from '../components/AssetImage'
import { A } from '../lib/assets'
import { useContent } from '../content/context'

// Stylised platform glyphs (cream on the teal chip). Messaging-app glyphs are
// kept below so a WhatsApp/Viber row can be switched on from content/site.js
// the moment there's a number worth publishing.
const cream = 'var(--color-cream)'
const Email = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={cream} strokeWidth="2">
    <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
    <path d="m3.5 6.5 8.5 6 8.5-6" />
  </svg>
)
const Facebook = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill={cream}>
    <path d="M13.5 21v-7h2.4l.4-2.8h-2.8V9.4c0-.8.3-1.4 1.5-1.4h1.4V5.5c-.7-.1-1.5-.2-2.3-.2-2.3 0-3.9 1.4-3.9 4v2H8v2.8h2.6V21h2.9Z" />
  </svg>
)
const Instagram = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={cream} strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1.2" fill={cream} stroke="none" />
  </svg>
)
const Messenger = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill={cream}>
    <path d="M12 2C6.5 2 2 6.1 2 11.2c0 2.8 1.4 5.3 3.6 7v3.3l3.3-1.8c.9.3 1.9.4 3 .4 5.5 0 10-4.1 10-9.3S17.5 2 12 2Zm1 12.4-2.5-2.7-4.9 2.7 5.4-5.7 2.6 2.7 4.8-2.7-5.4 5.7Z" />
  </svg>
)
const Whatsapp = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill={cream}>
    <path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.4A10 10 0 1 0 12 2Zm5.3 13.6c-.2.6-1.2 1.1-1.7 1.2-.5.1-1 .3-3.3-.7-2.8-1.2-4.5-4-4.6-4.2-.1-.2-1.1-1.4-1.1-2.7 0-1.3.7-1.9.9-2.1.2-.2.4-.3.6-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.1.1.3 0 .4l-.4.6c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.2.1.4.1.5-.1l.9-1c.2-.2.4-.2.5-.1l1.9.9c.3.2.5.2.5.4.1.1.1.9-.1 1.4Z" />
  </svg>
)
const Viber = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill={cream}>
    <path d="M12 2C7 2 3 5.6 3 10c0 2.4 1.2 4.6 3.1 6v3.5L9 17.6c.9.2 2 .4 3 .4 5 0 9-3.6 9-8s-4-8-9-8Zm-1 4.2c.3 0 .5.1.7.3.5.4.9 1 1.2 1.6.1.2.1.4 0 .6l-.5.6c-.1.1-.1.2 0 .4.3.6.8 1.1 1.4 1.4.2.1.3.1.4 0l.5-.5c.2-.2.4-.2.6-.1.6.3 1.2.7 1.6 1.3.2.3.2.6-.1.9-.3.3-.7.6-1.1.6-.2 0-3.7-.3-5.5-3.6-.4-.7-.6-1.4-.6-2.1 0-.5.2-.9.5-1.2.2-.2.5-.3.7-.3Z" />
  </svg>
)
const CHANNEL_ICONS = {
  email: Email,
  facebook: Facebook,
  instagram: Instagram,
  messenger: Messenger,
  whatsapp: Whatsapp,
  viber: Viber,
}

/**
 * The form posts to `contact.formEndpoint` (Formspree, Netlify Forms, your own
 * handler — anything that accepts a JSON POST). Until that's configured there
 * is no backend to accept a submission, so rather than silently swallowing
 * messages the form says so and points at the channels above it, which work
 * today.
 */
/**
 * How long after a successful send before the form will submit again.
 *
 * This is a courtesy rail, NOT security. It lives in localStorage, so anyone
 * who opens a private window or clears storage is past it in seconds — and it
 * is worth being clear-eyed about that rather than believing the form is
 * protected. What it actually stops is the common case: the impatient
 * double-click, the "did that send?" resubmit, and idle mischief. Real abuse
 * has to be stopped server-side, which for us means Formspree's own filtering
 * and the reCAPTCHA toggle in its dashboard.
 */
const COOLDOWN_MS = 5 * 60 * 1000
const COOLDOWN_KEY = 'khybrio:lastSent'

export function Contact() {
  const { contact } = useContent()
  const f = contact.fields
  const [status, setStatus] = useState('idle')

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!contact.formEndpoint) {
      setStatus('unconfigured')
      return
    }

    // Guarded: Safari in private mode throws on localStorage rather than
    // returning null, and a storage exception must never cost us a lead.
    try {
      const last = Number(localStorage.getItem(COOLDOWN_KEY) || 0)
      if (last && Date.now() - last < COOLDOWN_MS) {
        setStatus('cooldown')
        return
      }
    } catch {
      /* no storage, no rail — send anyway */
    }

    setStatus('sending')
    const data = Object.fromEntries(new FormData(e.currentTarget))

    // Formspree (and most form relays) read `_replyto` to set the Reply-To
    // header on the notification email. Our email field is named `contact`,
    // which they do not recognise — so without this, hitting Reply on a new
    // lead replies to Formspree and you copy the address across by hand every
    // time. `_subject` is the same idea: it stops every enquiry landing under
    // an identical generic subject line.
    if (data.contact) data._replyto = data.contact
    data._subject = `Audit request — ${data.business || data.name || 'new enquiry'}`
    try {
      const res = await fetch(contact.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      })
      setStatus(res.ok ? 'sent' : 'error')
      if (res.ok) {
        e.target.reset()
        // Only stamp on success — a failed send must not lock the visitor out
        // of retrying the one thing the whole page asks them to do.
        try {
          localStorage.setItem(COOLDOWN_KEY, String(Date.now()))
        } catch {
          /* storage unavailable; the send already worked, which is what matters */
        }
      }
    } catch {
      setStatus('error')
    }
  }

  const field =
    'w-full rounded-xl border border-teal-soft bg-cream px-4 py-3 text-ink outline-none transition-colors placeholder:text-ink-muted/60 focus:border-teal-bright'

  return (
    <section
      id="contact"
      className="relative z-10 bg-cream px-5 py-16 sm:px-8 sm:py-20"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-bright">
            {contact.eyebrow}
          </p>
          <h2 className="mt-3 text-[clamp(1.9rem,4.5vw,3rem)] font-bold text-teal-deep">
            {contact.title}
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-ink-muted">{contact.body}</p>

          <ul className="mt-9 flex flex-col gap-3">
            {contact.channels.map((channel) => (
              <li key={channel.label}>
                <a
                  href={channel.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex items-center justify-between rounded-[var(--radius-card)] bg-teal-soft/25 px-5 py-4 transition-colors hover:bg-teal-soft/45"
                >
                  <span className="flex items-center gap-3.5">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-teal-deep">
                      {(() => {
                        const Icon = CHANNEL_ICONS[channel.icon]
                        return Icon ? <Icon /> : null
                      })()}
                    </span>
                    <span>
                      <span className="block font-semibold text-teal-deep">
                        {channel.label}
                      </span>
                      <span className="block text-sm text-ink-muted">{channel.handle}</span>
                    </span>
                  </span>
                  <ArrowUpRight
                    size={20}
                    className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    color="var(--color-teal-bright)"
                  />
                </a>
              </li>
            ))}
          </ul>

          {/* Khybi, offering you a way to reach out. */}
          <div className="mt-8 hidden items-end gap-2 sm:flex">
            <AssetImage
              asset={A.khybiPhone}
              className="w-36"
              style={{ filter: 'drop-shadow(0 16px 22px rgba(15,43,41,0.22))' }}
            />
            <span className="mb-8 rounded-2xl rounded-bl-none bg-teal-deep px-4 py-2.5 text-sm font-medium text-cream">
              Here’s where to reach us.
            </span>
          </div>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          {/* Honeypot. `_gotcha` is Formspree's own convention: anything with
              this field filled is discarded silently, so a bot never learns it
              failed. Bots fill every input they find in the DOM; a human never
              sees this one.

              It matters more than it looks. A monthly submission allowance is
              a shared resource, and one script can exhaust it in a minute —
              after which real enquiries are REJECTED and we never find out
              they tried. Cheap insurance against a silent, invisible failure.

              Off-screen rather than `display:none` or `hidden`, because the
              cruder bots skip fields that are obviously hidden. aria-hidden and
              tabIndex keep it away from screen readers and keyboard tabbing. */}
          <input
            type="text"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-teal-deep">{f.name.label}</span>
              <input name="name" required className={field} placeholder={f.name.placeholder} />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-teal-deep">{f.business.label}</span>
              <input
                name="business"
                required
                className={field}
                placeholder={f.business.placeholder}
              />
            </label>
          </div>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-teal-deep">{f.contact.label}</span>
            <input name="contact" required className={field} placeholder={f.contact.placeholder} />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-teal-deep">{f.message.label}</span>
            <textarea
              name="message"
              rows={5}
              required
              className={`${field} resize-y`}
              placeholder={f.message.placeholder}
            />
          </label>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="mt-2 self-start rounded-full bg-coral px-8 py-3.5 font-semibold text-cream transition-transform duration-300 hover:scale-[1.03] disabled:opacity-60"
          >
            {status === 'sending' ? 'Sending…' : contact.submitLabel}
          </button>

          {status === 'sent' ? (
            <p className="text-sm font-medium text-teal-bright">
              Got it — we’ll reply within a day.
            </p>
          ) : null}
          {status === 'error' ? (
            <p className="text-sm font-medium text-coral">
              That didn’t go through. Use one of the channels on the left instead.
            </p>
          ) : null}
          {/* Written for the visitor, not the developer. This used to name a
              config key and a source file — a small-business owner who filled
              the form in and pressed send was told to go and edit
              src/content/site.js. It is the last thing anyone sees before they
              give up, on a page whose whole argument is that we are competent
              at plumbing. The fix for the endpoint belongs in the code comment
              on `contact.formEndpoint`, where a developer will actually look. */}
          {status === 'unconfigured' ? (
            <p className="text-sm font-medium text-coral">
              {contact.fallbackNote}
            </p>
          ) : null}
          {/* Reassuring, not accusatory. Almost everyone who trips this is a
              real person who was not sure the first one went through. */}
          {status === 'cooldown' ? (
            <p className="text-sm font-medium text-teal-bright">{contact.cooldownNote}</p>
          ) : null}
        </form>
      </div>
    </section>
  )
}
