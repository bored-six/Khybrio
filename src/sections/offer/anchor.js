import { scrollToId } from '../../lib/smoothScroll'

/**
 * Click handler for in-page links. Keeps the real `href` on the element (so
 * the link works with JS off, middle-click and copy-link) and hands the
 * scroll to Lenis, which a native jump would fight.
 */
export const jumpTo = (href) => (e) => {
  e.preventDefault()
  scrollToId(href.replace(/^#/, ''))
}
