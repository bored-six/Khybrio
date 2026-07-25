import { motion } from 'motion/react'
import { Globe, Nfc, MapPin, Check } from 'lucide-react'
import { services } from '../content/site'

const ICONS = { globe: Globe, nfc: Nfc, pin: MapPin }

export function Services() {
  return (
    <section id="services" className="relative z-10 bg-cream px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-bright">
          {services.eyebrow}
        </p>
        <h2 className="mt-3 max-w-3xl text-[clamp(1.9rem,4.5vw,3rem)] font-bold text-teal-deep">
          {services.title}
        </h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-ink-muted">{services.body}</p>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {services.items.map((item, i) => {
            const Icon = ICONS[item.icon] ?? Globe
            return (
              <motion.article
                key={item.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8 }}
                className="group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] bg-teal-soft/20 p-7 ring-1 ring-transparent transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(15,43,41,0.15)] hover:ring-coral/40"
              >
                {/* coral accent bar reveals on hover */}
                <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-coral transition-transform duration-500 ease-out group-hover:scale-x-100" />
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-teal-deep transition-transform duration-500 ease-out group-hover:-rotate-6 group-hover:scale-110">
                  <Icon size={22} color="var(--color-cream)" strokeWidth={1.9} />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-teal-deep">{item.name}</h3>
                <p className="mt-2.5 leading-relaxed text-ink-muted">{item.body}</p>
                <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5">
                  {item.points.map((p) => (
                    <li
                      key={p}
                      className="flex items-center gap-2 text-sm text-teal-deep transition-transform duration-300 group-hover:translate-x-0.5"
                    >
                      <Check size={15} strokeWidth={2.5} color="var(--color-coral)" className="shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.article>
            )
          })}
        </div>

        {/* How we work — three steps */}
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {services.steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-[var(--radius-card)] border border-teal-soft/60 p-6"
            >
              <span className="font-display text-2xl font-bold text-coral">{step.n}</span>
              <h4 className="mt-3 font-display text-lg font-bold text-teal-deep">{step.name}</h4>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
