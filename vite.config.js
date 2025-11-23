// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Client_photography_Website/', // use exact repo name and slashes
  plugins: [react()],
});
