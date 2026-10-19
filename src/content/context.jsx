import { createContext, useContext } from 'react'

/**
 * The copy set the tree renders. There is one page and one copy set
 * (content/site.js), supplied once in main.jsx; sections read it from here
 * instead of importing the module directly.
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
