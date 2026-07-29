import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@fontsource-variable/fraunces'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'

import './index.css'
import PhApp from './PhApp.jsx'
import { ContentProvider } from './content/context.jsx'
import * as content from './content/ph.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContentProvider value={content}>
      <PhApp />
    </ContentProvider>
  </StrictMode>,
)
