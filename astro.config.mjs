import { defineConfig } from 'astro/config'
import alpinejs from '@astrojs/alpinejs'
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
  redirects: {
    '/get-involved': '/get-involved/volunteer',
  },
  server: { port: 3000 },
  integrations: [
    alpinejs(),
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
  ],
})
