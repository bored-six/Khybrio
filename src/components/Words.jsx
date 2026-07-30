import { Fragment } from 'react'
import { motion } from 'motion/react'

/**
 * Word-by-word masked reveal for section headlines. Each word rises out of
 * its own overflow clip as the heading scrolls into view — the editorial
 * "type being set" gesture that makes a section opening feel deliberate.
 *
 * Whole words, never letters: per-letter staggers read as a toy, and they
 * break screen readers' word boundaries. The joining spaces live OUTSIDE the
 * inline-block wrappers — a trailing space inside one collapses to nothing —
 * so the text selects, wraps and reads exactly like a plain string.
 */
export function Words({ text }) {
  return (
    <>
      {String(text)
        .split(' ')
        .map((word, i) => (
          <Fragment key={`${word}-${i}`}>
            {/* The pb/-mb pair gives descenders room inside the clip without
                adding visual line height. */}
            <span className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom">
              <motion.span
                className="inline-block"
                initial={{ y: '115%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.65, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                {word}
              </motion.span>
            </span>{' '}
          </Fragment>
        ))}
    </>
  )
}
