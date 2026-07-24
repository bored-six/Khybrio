import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { contact } from '../content/site'

/**
 * The form posts to `contact.formEndpoint` (Formspree, Netlify Forms, your own
 * handler — anything that accepts a JSON POST). Until that's configured there
 * is no backend to accept a submission, so rather than silently swallowing
 * messages the form says so and points at the channels above it, which work
 * today.
 */
export function Contact() {
  const [status, setStatus] = useState('idle')

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!contact.formEndpoint) {
      setStatus('unconfigured')
      return
    }

    setStatus('sending')
    const data = Object.fromEntries(new FormData(e.currentTarget))
    try {
      const res = await fetch(contact.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      })
      setStatus(res.ok ? 'sent' : 'error')
      if (res.ok) e.target.reset()
    } catch {
      setStatus('error')
    }
  }

  const field =
    'w-full rounded-xl border border-teal-soft bg-cream px-4 py-3 text-ink outline-none transition-colors placeholder:text-ink-muted/60 focus:border-teal-bright'

  return (
    <section
      id="contact"
      className="relative z-10 bg-cream px-5 py-24 sm:px-8 sm:py-32"
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
                  <span>
                    <span className="block font-semibold text-teal-deep">
                      {channel.label}
                    </span>
                    <span className="block text-sm text-ink-muted">{channel.handle}</span>
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
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-teal-deep">Your name</span>
              <input name="name" required className={field} placeholder="Juan Dela Cruz" />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-teal-deep">Business name</span>
              <input name="business" required className={field} placeholder="Your shop" />
            </label>
          </div>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-teal-deep">
              Email or mobile number
            </span>
            <input name="contact" required className={field} placeholder="09XX XXX XXXX" />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-teal-deep">What do you sell?</span>
            <textarea
              name="message"
              rows={5}
              required
              className={`${field} resize-y`}
              placeholder="A couple of sentences is plenty."
            />
          </label>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="mt-2 self-start rounded-full bg-coral px-8 py-3.5 font-semibold text-cream transition-transform duration-300 hover:scale-[1.03] disabled:opacity-60"
          >
            {status === 'sending' ? 'Sending…' : 'Send message'}
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
          {status === 'unconfigured' ? (
            <p className="text-sm font-medium text-coral">
              This form isn’t connected yet — set{' '}
              <code className="rounded bg-teal-soft/40 px-1.5 py-0.5 text-[0.85em]">
                contact.formEndpoint
              </code>{' '}
              in <code className="text-[0.85em]">src/content/site.js</code>. Message us on
              Messenger, WhatsApp or Viber in the meantime.
            </p>
          ) : null}
        </form>
      </div>
    </section>
  )
}
