import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { AssetImage } from '../components/AssetImage'
import { IconArrow, IconRepeat, IconYes } from '../components/icons/OfferIcons'
import { A } from '../lib/assets'
import { recommend } from '../lib/recommend'
import { scrollToId } from '../lib/smoothScroll'
import { useContent } from '../content/context'
import { packages } from '../content/offer'
import { details, intro, questions, reasons as reasonCopy, result as R, tiers, ui } from '../content/quiz'
import { jumpTo } from './offer/anchor'
import './contact.css'

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
 * How long after a successful send before the chat will submit again.
 *
 * This is a courtesy rail, NOT security. It lives in localStorage, so anyone
 * who opens a private window or clears storage is past it in seconds. What it
 * actually stops is the common case: the impatient double-click, the "did
 * that send?" resubmit, and idle mischief. Real abuse has to be stopped
 * server-side, which for us means Formspree's own filtering and the reCAPTCHA
 * toggle in its dashboard.
 */
const COOLDOWN_MS = 5 * 60 * 1000
const COOLDOWN_KEY = 'khybrio:lastSent'

const TOTAL = questions.length + 1 // the questions, then the details step
const tierByKey = Object.fromEntries(packages.tiers.map((t) => [t.key, t]))
const labelOf = (id, value) =>
  questions.find((q) => q.id === id)?.options.find((o) => o.value === value)?.label ?? ''

/**
 * What lands in our inbox: who they are, every answer in plain words, and the
 * package the chat showed them, so whoever picks up the lead knows what the
 * visitor was told before the call.
 */
function buildPayload(form, answers, rec) {
  const data = {
    name: form.name.trim(),
    business: form.business.trim(),
    contact: form.contact.trim(),
    'Suggested package': tierByKey[rec.tier].name,
    'Why (shown to them)': rec.reasons.map((k) => reasonCopy[k]).join(' '),
  }
  for (const q of questions) data[q.ask] = labelOf(q.id, answers[q.id])
  // Formspree reads `_replyto` for the Reply-To header. A phone number there
  // risks the send being rejected, so only set it for an email.
  if (data.contact.includes('@')) data._replyto = data.contact
  data._subject = `Free call request: ${data.business || data.name} (${data['Suggested package']})`
  return data
}

/**
 * Khybi's head in a cream disc. Cream on purpose: the mascot is teal, so on
 * the teal chamber it vanishes without a light ground behind it. The renders
 * are 1000px squares with the figure in the middle, so the image is
 * oversized and shifted to frame the face.
 */
function Avatar({ asset, className = '' }) {
  return (
    <span className={`relative block shrink-0 overflow-hidden rounded-full bg-cream ${className}`}>
      <AssetImage asset={asset} className="absolute left-[-55%] top-[-18%] w-[210%] max-w-none" />
    </span>
  )
}

/** Khybi's line: a cream bubble with the tail toward the avatar. */
function Bubble({ children, id }) {
  return (
    <p
      id={id}
      tabIndex={-1}
      className="chat-in rounded-2xl rounded-tl-none bg-cream px-4 py-3 font-medium leading-snug text-teal-deep outline-none sm:text-lg"
    >
      {children}
    </p>
  )
}

function ResultCard({ rec, saved, sending, form, onRestart, onRetry }) {
  const tier = tierByKey[rec.tier]
  const firstName = form.name.trim().split(/\s+/)[0]
  const status =
    saved === 'sent'
      ? firstName
        ? R.saved(firstName)
        : R.savedNoName
      : saved === 'cooldown'
        ? R.cooldown
        : R.notSaved

  return (
    <div className="chat-in">
      <div className="flex items-end gap-3">
        <Avatar asset={A.khybiPhone} className="h-16 w-16 sm:h-20 sm:w-20" />
        <p
          id="chat-status"
          tabIndex={-1}
          role="status"
          className={`mb-3 rounded-2xl rounded-bl-none px-4 py-3 font-medium leading-snug outline-none ${
            saved === 'error' ? 'bg-coral text-cream' : 'bg-cream text-teal-deep'
          }`}
        >
          {status}
        </p>
      </div>
      {saved === 'error' ? (
        <button
          type="button"
          onClick={onRetry}
          disabled={sending}
          className="mt-3 rounded-full border-2 border-cream/40 px-4 py-2 text-sm font-semibold text-cream transition-colors hover:bg-cream/10 disabled:opacity-60"
        >
          {sending ? ui.retrying : ui.retry}
        </button>
      ) : null}

      <article className="mt-6 overflow-hidden rounded-[22px] bg-cream text-teal-deep">
        <div className="relative aspect-[16/9] overflow-hidden">
          <AssetImage
            asset={A[tiers[rec.tier].scene]}
            className="chat-scene h-full w-full object-cover"
          />
        </div>
        <div className="p-5 sm:p-7">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-teal-bright">
            {tiers[rec.tier].lead}
          </p>
          <h3 className="mt-1 font-display text-3xl font-bold sm:text-4xl">{tier.name}</h3>
          <p className="mt-2 leading-relaxed text-ink-muted">{tier.line}</p>

          <p className="mt-6 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-teal-bright">
            {R.whyLabel}
          </p>
          <ul className="mt-3 space-y-2.5">
            {rec.reasons.map((key, i) => (
              <li
                key={key}
                className="chat-in flex gap-2.5 leading-snug"
                style={{ animationDelay: `${0.25 + i * 0.12}s` }}
              >
                <span className="mt-0.5 shrink-0 text-coral">
                  <IconYes size={18} />
                </span>
                <span className="text-ink/85">{reasonCopy[key]}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 grid gap-5 border-t-2 border-teal-deep/10 pt-5 sm:grid-cols-2">
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-teal-bright">
                {packages.setupLabel}
              </p>
              {tier.inherits ? (
                <p className="mt-2 text-sm font-semibold">{tier.inherits}</p>
              ) : null}
              <ul className="mt-2 space-y-1.5 text-sm leading-snug text-ink/80">
                {tier.setup.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-0.5 shrink-0 text-teal-bright">
                      <IconYes size={16} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-teal-bright">
                {packages.monthlyLabel}
              </p>
              <ul className="mt-2 space-y-1.5 text-sm leading-snug text-ink/80">
                {tier.monthly.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-0.5 shrink-0 text-teal-bright">
                      <IconRepeat size={16} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-6 rounded-xl bg-teal-soft/30 px-4 py-3 text-sm leading-relaxed text-teal-deep">
            {R.note}
          </p>
        </div>
      </article>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm font-semibold">
        <a
          href={R.seeAll.href}
          onClick={jumpTo(R.seeAll.href)}
          className="inline-flex items-center gap-2 text-cream underline decoration-cream/40 underline-offset-4 hover:decoration-cream"
        >
          {R.seeAll.label}
          <IconArrow size={16} />
        </a>
        <button type="button" onClick={onRestart} className="text-cream/70 hover:text-cream">
          {ui.restart}
        </button>
      </div>
    </div>
  )
}

/**
 * The closing section: instead of a blank form, Khybi asks five questions,
 * takes a name and a way to reach them, then shows the package we would start
 * with and says the details are saved.
 *
 * One question on screen at a time, not a scrolling transcript: it holds its
 * height, works with a thumb, and never traps the page scroll inside a panel.
 *
 * The send is honest about its outcome. "Saved" only appears when the relay
 * accepted it; if it failed, the visitor still gets their package (they
 * earned it) with a channel that works today and a retry.
 */
export function Contact() {
  const { contact } = useContent()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [form, setForm] = useState({ name: '', business: '', contact: '' })
  const [sending, setSending] = useState(false)
  const [saved, setSaved] = useState(null) // 'sent' | 'error' | 'cooldown' once done
  const gotcha = useRef(null)
  const touched = useRef(false)

  const done = saved !== null
  const question = questions[step]
  const rec = done ? recommend(answers) : null

  // Move focus to the new question (or the result) so keyboard and screen
  // reader users follow the conversation. Skipped until the visitor has
  // interacted, so loading the page never steals focus or scrolls to here.
  useEffect(() => {
    if (!touched.current) return
    const target = document.getElementById(done ? 'chat-status' : 'chat-ask')
    target?.focus({ preventScroll: true })
    // The result is taller than a question; bring its top back into view.
    if (done) {
      const top = document.getElementById('chat')?.getBoundingClientRect().top ?? 0
      if (top < 0) scrollToId('chat', -96)
    }
  }, [step, done])

  const pick = (value) => {
    touched.current = true
    setAnswers((a) => ({ ...a, [question.id]: value }))
    setStep((s) => s + 1)
  }

  const back = () => {
    touched.current = true
    setStep((s) => Math.max(0, s - 1))
  }

  const restart = () => {
    touched.current = true
    setSaved(null)
    setAnswers({})
    setStep(0)
  }

  const send = async () => {
    touched.current = true
    if (sending) return
    // Honeypot. `_gotcha` is Formspree's own convention; a filled one is
    // almost always a bot, so nothing is sent (the monthly allowance is a
    // shared resource). It shows the not-saved state rather than a fake
    // "Saved": if an autofill tool ever fills this for a real person, they
    // are told to message us instead of believing a lead went through.
    if (gotcha.current?.value) {
      setSaved('error')
      return
    }
    if (!contact.formEndpoint) {
      setSaved('error')
      return
    }
    // Guarded: Safari in private mode throws on localStorage rather than
    // returning null, and a storage exception must never cost us a lead.
    try {
      const last = Number(localStorage.getItem(COOLDOWN_KEY) || 0)
      if (last && Date.now() - last < COOLDOWN_MS) {
        setSaved('cooldown')
        return
      }
    } catch {
      /* no storage, no rail: send anyway */
    }

    setSending(true)
    try {
      const res = await fetch(contact.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(buildPayload(form, answers, recommend(answers))),
      })
      if (res.ok) {
        // Only stamp on success: a failed send must not lock the visitor out
        // of retrying the one thing the whole page asks them to do.
        try {
          localStorage.setItem(COOLDOWN_KEY, String(Date.now()))
        } catch {
          /* storage unavailable; the send already worked */
        }
      }
      setSaved(res.ok ? 'sent' : 'error')
    } catch {
      setSaved('error')
    } finally {
      setSending(false)
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    send()
  }

  const field =
    'w-full rounded-xl border-2 border-cream/25 bg-transparent px-4 py-3 text-cream outline-none transition-colors placeholder:text-cream/40 focus:border-coral'

  return (
    <section id="contact" className="relative z-10 bg-cream px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-bright">
            {intro.eyebrow}
          </p>
          <h2 className="mt-3 text-[clamp(1.9rem,4.5vw,3rem)] font-bold text-teal-deep">
            {intro.title}
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-ink-muted">{intro.body}</p>

          <p className="mt-9 text-sm font-semibold text-teal-deep">{contact.channelsLabel}</p>
          <ul className="mt-3 flex flex-col gap-3">
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
                      <span className="block font-semibold text-teal-deep">{channel.label}</span>
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
        </div>

        {/* The chat chamber. */}
        <div
          id="chat"
          className="relative self-start rounded-[28px] bg-teal-deep p-5 text-cream shadow-[0_40px_70px_-40px_rgba(15,43,41,0.8)] sm:rounded-[36px] sm:p-8"
        >
          {/* Khybi standing on the chamber's top edge, desktop only: stacked
              on a phone he would land on the channel list above. The render
              has clear space under the feet, hence the pull down. */}
          {done ? null : (
            <AssetImage
              asset={A.khybiWave}
              className="chat-bob pointer-events-none absolute bottom-full right-8 hidden w-24 translate-y-[17px] lg:block"
            />
          )}
          {done ? (
            <ResultCard
              rec={rec}
              saved={saved}
              sending={sending}
              form={form}
              onRestart={restart}
              onRetry={send}
            />
          ) : (
            <>
              {/* Who is talking, and how far along. */}
              <div className="flex items-center gap-3">
                <Avatar asset={A.khybiWave} className="h-12 w-12" />
                <div className="min-w-0 flex-1">
                  <p className="font-display text-lg font-bold leading-none">Khybi</p>
                  <p className="mt-1 text-xs text-cream/60">{ui.step(Math.min(step + 1, TOTAL), TOTAL)}</p>
                </div>
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={back}
                    className="rounded-full border-2 border-cream/25 px-3.5 py-1.5 text-sm font-semibold text-cream/85 transition-colors hover:border-cream/60 hover:text-cream"
                  >
                    {ui.back}
                  </button>
                ) : null}
              </div>

              <div
                className="mt-4 flex gap-1.5"
                role="progressbar"
                aria-valuemin={1}
                aria-valuemax={TOTAL}
                aria-valuenow={Math.min(step + 1, TOTAL)}
                aria-label="Progress through the questions"
              >
                {Array.from({ length: TOTAL }, (_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${
                      i < step ? 'bg-cream/70' : i === step ? 'bg-coral' : 'bg-cream/15'
                    }`}
                  />
                ))}
              </div>

              {/* `key` remounts the step so its entrance replays. min-height
                  keeps the chamber from jumping between short and long steps. */}
              <div key={step} className="mt-7 min-h-[21rem]">
                {question ? (
                  <>
                    {step === 0 ? (
                      <p className="mb-3 text-sm leading-relaxed text-cream/70">{intro.greeting}</p>
                    ) : null}
                    <Bubble id="chat-ask">{question.ask}</Bubble>
                    <div
                      role="group"
                      aria-labelledby="chat-ask"
                      className={
                        // Many short options: two columns on a phone (a
                        // single column would be eleven rows), loose pills
                        // from sm up. Few long options: one column.
                        question.options.length > 5
                          ? 'mt-5 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap'
                          : 'mt-5 flex flex-col gap-2.5'
                      }
                    >
                      {question.options.map((option, i) => {
                        const chosen = answers[question.id] === option.value
                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => pick(option.value)}
                            aria-pressed={chosen}
                            style={{ animationDelay: `${0.08 + i * 0.04}s` }}
                            className={`chat-in group flex min-h-12 items-center justify-between gap-3 border-2 px-4 py-2.5 text-left font-medium transition-colors duration-200 ${
                              question.options.length > 5
                                ? 'rounded-2xl text-sm leading-tight sm:rounded-full sm:text-base'
                                : 'rounded-2xl'
                            } ${
                              chosen
                                ? 'border-coral bg-coral text-cream'
                                : 'border-cream/25 text-cream hover:border-cream hover:bg-cream/10'
                            }`}
                          >
                            {option.label}
                            {question.options.length > 5 ? null : (
                              <span className="shrink-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                                <IconArrow size={18} />
                              </span>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </>
                ) : (
                  <form onSubmit={onSubmit} className="flex flex-col gap-4">
                    <Bubble id="chat-ask">{details.ask}</Bubble>
                    {/* Honeypot: off-screen rather than display:none, because
                        the cruder bots skip fields that are obviously hidden.
                        `inert` keeps it out of focus order and away from
                        assistive tech entirely. */}
                    <div
                      inert
                      aria-hidden="true"
                      style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
                    >
                      <input ref={gotcha} type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
                    </div>
                    <div className="mt-1 grid gap-4 sm:grid-cols-2">
                      {['name', 'business'].map((key) => (
                        <label key={key} className="flex flex-col gap-2">
                          <span className="text-sm font-medium text-cream/80">{details.fields[key].label}</span>
                          <input
                            name={key}
                            required
                            value={form[key]}
                            onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                            autoComplete={details.fields[key].autoComplete}
                            placeholder={details.fields[key].placeholder}
                            className={field}
                          />
                        </label>
                      ))}
                    </div>
                    <label className="flex flex-col gap-2">
                      <span className="text-sm font-medium text-cream/80">{details.fields.contact.label}</span>
                      <input
                        name="contact"
                        required
                        value={form.contact}
                        onChange={(e) => setForm((f) => ({ ...f, contact: e.target.value }))}
                        autoComplete={details.fields.contact.autoComplete}
                        placeholder={details.fields.contact.placeholder}
                        className={field}
                      />
                    </label>
                    <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-3">
                      <button
                        type="submit"
                        disabled={sending}
                        className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-coral px-7 py-3 font-semibold text-cream transition-transform duration-300 hover:scale-[1.03] disabled:opacity-60"
                      >
                        {sending ? details.sending : details.submit}
                        {sending ? null : <IconArrow size={18} />}
                      </button>
                      <p className="text-xs text-cream/55">{details.privacy}</p>
                    </div>
                  </form>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
