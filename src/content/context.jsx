import { createContext, useContext } from 'react'

/**
 * Which copy set the tree is rendering.
 *
 * There are two pages on one domain — the international automation page (/)
 * and the Philippine local page (/ph) — built as separate Vite entries, so each
 * ships only its own copy. Sections used by both read their content from here
 * instead of importing content/site.js directly; page-exclusive sections (the
 * flight, the tap-card demo) still import their own module, since there is
 * nothing to switch between.
 */
const ContentContext = createContext(null)

export function ContentProvider({ value, children }) {
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}

// Provider and hook belong together here — splitting them across two modules
// to satisfy fast refresh would mean a second import in every section for no
// benefit at runtime. The cost is that edits to this one file do a full reload.
// eslint-disable-next-line react/only-export-components
export function useContent() {
  const value = useContext(ContentContext)
  if (!value) {
    throw new Error('useContent must be used inside a <ContentProvider>')
  }
  return value
}
