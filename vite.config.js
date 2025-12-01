import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Client_photography_Website/', // 👈 important for GitHub Pages
})
