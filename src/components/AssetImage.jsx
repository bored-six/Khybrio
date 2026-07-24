import { useEffect, useState } from 'react'

/**
 * Renders a generated asset, falling back to its committed SVG placeholder if
 * the real file isn't there yet. The swap happens on the element's `error`
 * event, so no build-time check is needed and dropping a real PNG into
 * public/assets/ upgrades the page on next load with zero code change.
 */
export function AssetImage({
  asset,
  className = '',
  style,
  loading = 'lazy',
  fetchPriority,
  ref,
}) {
  const [src, setSrc] = useState(asset.src)
  const [fellBack, setFellBack] = useState(false)

  useEffect(() => {
    setSrc(asset.src)
    setFellBack(false)
  }, [asset.src])

  return (
    <img
      // React 19 passes `ref` as an ordinary prop — scene layers need a handle
      // on the element to drive opacity/clip-path per frame.
      ref={ref}
      src={src}
      alt={asset.alt ?? ''}
      className={className}
      style={style}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
      draggable={false}
      onError={() => {
        // Guard against a loop if the placeholder is missing too.
        if (fellBack) return
        setFellBack(true)
        setSrc(asset.placeholder)
      }}
    />
  )
}
