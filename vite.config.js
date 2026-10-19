import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // GitHub Pages serves this project under /Khybrio/, so production asset URLs
  // must be prefixed with the repo name — otherwise the browser requests
  // /assets/… at the domain root, 404s the JS/CSS, and renders a white screen.
  // Local dev stays at root so `npm run dev` still opens at localhost:5173/.
  base: command === 'build' ? '/Khybrio/' : '/',
  plugins: [react(), tailwindcss()],
  build: {
    // One app at /. ph/index.html is only a redirect, kept so old /ph/ links and
    // NFC cards still land somewhere. It is a Vite input (not a file in public/)
    // so %BASE_URL% expands inside it, and so dev serves it at /ph/ instead of
    // falling back to the main app.
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        'ph-redirect': resolve(import.meta.dirname, 'ph/index.html'),
      },
    },
  },
}))
