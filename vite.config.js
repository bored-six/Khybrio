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
}))
