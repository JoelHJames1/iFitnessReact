import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env,
  },
  css: {
    postcss: false, // Disable PostCSS processing
  },
})