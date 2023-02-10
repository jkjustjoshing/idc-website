import { defineConfig } from 'astro/config'
import alpinejs from '@astrojs/alpinejs'
import tailwind from '@astrojs/tailwind'
import image from '@astrojs/image'
import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
  integrations: [
    alpinejs(),
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    image(),
    react(),
  ],
})
