import { motion } from 'motion/react'
import { InitialsAvatar } from '../components/InitialsAvatar'
import { team } from '../content/site'

export function Team() {
  return (
    <section id="team" className="relative z-10 bg-cream px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-bright">
          {team.eyebrow}
        </p>
        <h2 className="mt-3 text-[clamp(1.9rem,4.5vw,3rem)] font-bold text-teal-deep">
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
              className="flex gap-5 rounded-[var(--radius-card)] bg-teal-soft/20 p-6 sm:p-7"
            >
              {/* Placeholder avatar — a real headshot drops in here, same box. */}
              <InitialsAvatar initials={m.initials} accent={m.accent} size={72} />
              <div className="min-w-0">
                <h3 className="font-display text-xl font-bold text-teal-deep">{m.name}</h3>
                <p className="text-sm font-medium text-teal-bright">{m.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{m.bio}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {m.focus.map((f) => (
                    <span
                      key={f}
                      className="rounded-full bg-teal-deep/8 px-3 py-1 text-xs font-medium text-teal-deep"
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
