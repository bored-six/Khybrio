import { useEffect } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'motion/react'

/**
 * A number that tweens to `value`. `from` sets the starting point (0 for a
 * count-up on reveal; omit to start at the current value and animate only when
 * it changes, e.g. a pricing toggle).
 */
export function AnimatedNumber({
  value,
  from,
  duration = 0.7,
  format = (v) => Math.round(v).toLocaleString(),
}) {
  const mv = useMotionValue(from ?? value)
  const text = useTransform(mv, (v) => format(v))

  useEffect(() => {
    const controls = animate(mv, value, { duration, ease: [0.16, 1, 0.3, 1] })
    return controls.stop
  }, [value, duration, mv])

  return <motion.span>{text}</motion.span>
}
