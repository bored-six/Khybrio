import { useState } from 'react'
import { motion } from 'motion/react'
import { Plus } from 'lucide-react'
import { InitialsAvatar } from '../components/InitialsAvatar'
import { team } from '../content/site'

/**
 * Team cards flip open a "resume" panel — hover on desktop, tap on mobile —
 * that slides up with the bio and focus areas.
 */
export function Team() {
  const [open, setOpen] = useState(null)

  return (
    <section id="team" className="relative z-10 bg-cream px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-bright">
          {team.eyebrow}
        </p>
        <h2 className="mt-3 text-[clamp(1.9rem,4.5vw,3rem)] font-semibold text-teal-deep">
          {team.title}
        </h2>
        <p className="mt-4 max-w-xl leading-relaxed text-ink-muted">{team.body}</p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {team.members.map((m, i) => (
            <motion.article
              key={m.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setOpen(open === i ? null : i)}
              className="group relative h-52 cursor-pointer overflow-hidden rounded-[var(--radius-card)] bg-teal-soft/20"
            >
              {/* Front — avatar, name, role */}
              <div className="flex h-full items-center gap-5 p-6 sm:p-7">
                <InitialsAvatar initials={m.initials} accent={m.accent} size={72} />
                <div>
                  <h3 className="font-display text-xl font-bold text-teal-deep">{m.name}</h3>
                  <p className="text-sm font-medium text-teal-bright">{m.role}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-muted/70">
                    <Plus size={13} /> Hover for more
                  </span>
                </div>
              </div>

              {/* Resume panel — slides up on hover (desktop) / tap (mobile) */}
              <div
                className={`absolute inset-0 flex flex-col justify-center bg-teal-deep p-6 text-cream transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 sm:p-7 ${
                  open === i ? 'translate-y-0' : 'translate-y-full'
                }`}
              >
                <div className="flex items-center gap-3">
                  <InitialsAvatar initials={m.initials} accent={m.accent} size={44} />
                  <div>
                    <h3 className="font-display text-lg font-bold text-cream">{m.name}</h3>
                    <p className="text-sm font-medium text-teal-soft">{m.role}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-cream/80">{m.bio}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {m.focus.map((f) => (
                    <span
                      key={f}
                      className="rounded-full bg-cream/10 px-2.5 py-1 text-xs font-medium text-cream"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
