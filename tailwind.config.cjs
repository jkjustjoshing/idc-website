/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    container: {
      center: true,
      padding: 16,
    },
    extend: {
      colors: {
        brand: {
          light: '#6075D2',
          DEFAULT: '#1030BC',
        },
      },
    },
  },
  variants: {},
}
