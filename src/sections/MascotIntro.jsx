import { motion } from 'motion/react'
import { Check } from 'lucide-react'
import { AssetImage } from '../components/AssetImage'
import { A } from '../lib/assets'
import { mascot } from '../content/site'

export function MascotIntro() {
  return (
    <section id="khybi" className="relative z-10 overflow-hidden bg-teal-deep px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        {/* Khybi, floating gently over a coral glow, framed on a cream card. */}
        <div className="relative order-2 flex justify-center md:order-1">
          <div className="absolute h-64 w-64 rounded-full bg-coral/20 blur-3xl" />
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="relative"
          >
            <AssetImage
              asset={A.khybiWave}
              loading="eager"
              className="block w-64 sm:w-80"
              style={{ filter: 'drop-shadow(0 24px 34px rgba(0,0,0,0.38))' }}
            />
          </motion.div>
        </div>

        <div className="order-1 md:order-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-soft">
            {mascot.eyebrow}
          </p>
          <h2 className="mt-3 text-[clamp(2rem,5vw,3.25rem)] font-semibold text-cream">
            {mascot.title[0]}
            <span className="text-coral">{mascot.title[1]}</span>
            {mascot.title[2]}
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-cream/80">{mascot.body}</p>
          <ul className="mt-6 flex flex-col gap-3">
            {mascot.points.map((p) => (
              <li key={p} className="flex items-center gap-2.5 text-cream/85">
                <Check size={18} strokeWidth={2.5} color="var(--color-coral)" className="shrink-0" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
