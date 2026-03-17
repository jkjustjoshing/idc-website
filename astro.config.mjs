import { defineConfig } from 'astro/config'
import alpinejs from '@astrojs/alpinejs'
import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
  redirects: {
    '/get-involved': '/get-involved/volunteer',
  },
  server: { port: 3000 },
  integrations: [alpinejs()],
  vite: {
    plugins: [tailwindcss()],
  },
})
