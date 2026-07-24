import { Star } from 'lucide-react'

/** Review rating. Plain SVG icon — no generated image needed here. */
export function StarRating({ rating = 5, size = 16 }) {
  return (
    <span className="inline-flex gap-1" aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={size}
          strokeWidth={0}
          fill={i < rating ? 'var(--color-coral)' : 'var(--color-teal-soft)'}
        />
      ))}
    </span>
  )
}
