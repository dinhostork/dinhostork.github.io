import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2020',
    cssTarget: 'chrome100',
    // O limite do import dinâmico em SystemVisual mantém Three.js fora do
    // bundle inicial; o code splitting natural cuida do resto.
    chunkSizeWarningLimit: 1000,
  },
})
