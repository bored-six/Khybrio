import { useState } from 'react'
import { motion } from 'motion/react'
import { Plus } from 'lucide-react'
import { useContent } from '../content/context'

/**
 * Objection-handling accordion. Native <button> rows with aria-expanded so it
 * stays keyboard- and screen-reader-friendly; one panel open at a time.
 *
 * Sits directly before Pricing — the questions here (cost, timeline, ownership)
 * are the ones that stop an owner from reading the plans at all.
 */
function Item({ item, open, onToggle, id }) {
  return (
    <div className="border-b border-teal-soft/50">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-button`}
          className="flex w-full items-center justify-between gap-6 py-5 text-left"
        >
          <span className="font-semibold text-teal-deep sm:text-lg">{item.q}</span>
          <Plus
            size={20}
            aria-hidden="true"
            className={`shrink-0 transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
            color="var(--color-teal-bright)"
          />
        </button>
      </h3>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-button`}
        hidden={!open}
        className="pb-6 pr-10"
      >
        <p className="max-w-2xl leading-relaxed text-ink-muted">{item.a}</p>
      </div>
    </div>
  )
}

export function Faq() {
  const { faq } = useContent()
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="relative z-10 bg-cream px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-bright">
          {faq.eyebrow}
        </p>
        <h2 className="mt-3 text-[clamp(1.9rem,4.5vw,3rem)] font-bold text-teal-deep">
          {faq.title}
        </h2>

        <div className="mt-10">
          {faq.items.map((item, i) => (
            <motion.div
              key={item.q}
              initial={{ opacity: 0, x: -36 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              <Item
                id={`faq-${i}`}
                item={item}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
