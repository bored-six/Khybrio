import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Globe, Phone, Nfc } from 'lucide-react'
import { AssetImage } from '../components/AssetImage'
import { A } from '../lib/assets'
import { nfcDemo } from '../content/ph'

// Simple, stylised platform glyphs (lucide dropped brand icons).
const IgIcon = ({ size, color, className }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke={color} strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1.2" fill={color} stroke="none" />
  </svg>
)
const FbIcon = ({ size, color, className }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill={color}>
    <path d="M13.5 21v-7h2.4l.4-2.8h-2.8V9.4c0-.8.3-1.4 1.5-1.4h1.4V5.5c-.7-.1-1.5-.2-2.3-.2-2.3 0-3.9 1.4-3.9 4v2H8v2.8h2.6V21h2.9Z" />
  </svg>
)

const ICONS = { globe: Globe, phone: Phone, instagram: IgIcon, facebook: FbIcon }

/**
 * Interactive NFC demo: hover (or tap on mobile) the card and it moves to the
 * phone, a coral ripple fires at the contact point, and the details fly onto
 * the screen. Placeholder details live in content/site.js.
 */
export function NfcTapDemo() {
  const [tapped, setTapped] = useState(false)
  const toggle = () => setTapped((t) => !t)

  return (
    <section
      id="tap-demo"
      className="relative z-10 bg-cream px-5 py-16 sm:px-8 sm:py-20"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-bright">
            {nfcDemo.eyebrow}
          </p>
          <h2 className="mt-3 text-[clamp(1.9rem,4.5vw,3rem)] font-bold text-teal-deep">
            {nfcDemo.title}
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-ink-muted">{nfcDemo.body}</p>
          <button
            type="button"
            onClick={toggle}
            className="mt-7 rounded-full bg-coral px-7 py-3.5 font-semibold text-cream transition-transform duration-300 hover:scale-[1.04]"
          >
            {tapped ? 'Reset' : 'Tap the card'}
          </button>
        </div>

        {/* Interactive stage */}
        <div
          className="relative mx-auto flex h-[26rem] w-full max-w-sm cursor-pointer items-center justify-center select-none"
          onMouseEnter={() => setTapped(true)}
          onMouseLeave={() => setTapped(false)}
          onClick={toggle}
        >
          {/* Phone */}
          <div className="relative h-[24rem] w-[12.5rem] rounded-[2.2rem] border-[6px] border-teal-deep bg-teal-deep shadow-[0_20px_60px_rgba(15,43,41,0.28)]">
            <div className="absolute left-1/2 top-2.5 h-1.5 w-16 -translate-x-1/2 rounded-full bg-cream/20" />
            <div className="absolute inset-2 mt-6 overflow-hidden rounded-[1.6rem] bg-cream p-4">
              <p className="font-display text-sm font-bold text-teal-deep">Your Business</p>
              <p className="text-[0.7rem] text-ink-muted">Tap received</p>
              <div className="mt-4 space-y-2.5">
                <AnimatePresence>
                  {tapped &&
                    nfcDemo.rows.map((row, i) => {
                      const Icon = ICONS[row.icon] ?? Globe
                      return (
                        <motion.div
                          key={row.label}
                          initial={{ opacity: 0, x: 18 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 18 }}
                          transition={{ delay: 0.18 + i * 0.08, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="flex items-center gap-2.5 rounded-lg bg-teal-soft/25 px-2.5 py-2"
                        >
                          <Icon size={15} color="var(--color-teal-bright)" className="shrink-0" />
                          <span className="truncate text-[0.72rem] font-medium text-teal-deep">
                            {row.label}
                          </span>
                        </motion.div>
                      )
                    })}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Ripple at the tap point */}
          <AnimatePresence>
            {tapped ? (
              <motion.span
                key="ripple"
                initial={{ scale: 0, opacity: 0.5 }}
                animate={{ scale: 3.2, opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="pointer-events-none absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-coral"
              />
            ) : null}
          </AnimatePresence>

          {/* The Khybrio NFC card — slides to the phone when tapped. */}
          <motion.div
            animate={
              tapped
                ? { x: 0, y: -150, rotate: -8, scale: 0.82 }
                : { x: 90, y: 90, rotate: 10, scale: 1 }
            }
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            className="absolute h-28 w-44 overflow-hidden rounded-2xl bg-teal-deep p-3.5 shadow-[0_14px_40px_rgba(15,43,41,0.4)] ring-1 ring-cream/10"
          >
            {/* Coral sash — echoes Khybi's diagonal accent. */}
            <span
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'linear-gradient(118deg, transparent 58%, rgba(232,98,45,0.95) 58%, rgba(232,98,45,0.95) 70%, transparent 70%)',
              }}
            />
            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-center gap-1.5">
                <AssetImage asset={A.markGlyph} className="h-6 w-6" />
                <span className="font-display text-sm font-bold tracking-tight text-cream">
                  Khybrio
                </span>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-[0.5rem] font-semibold uppercase tracking-[0.15em] text-cream/70">
                  Tap to connect
                </span>
                <Nfc size={18} color="var(--color-cream)" strokeWidth={2} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
