/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      gridTemplateRows: {
        'auto-fill-100': 'repeat(auto-fill, minmax(100px, 1fr))',
        'auto-fit-100': 'repeat(auto-fit, minmax(100px, 1fr))',
        'auto': 'auto'
      },
      maxWidth: {
        'screen-xs': '400px',
      },
      colors: {
        'brand-blue': '#455ca1',
        'brand-blue-100': '#3f5493',
        'brand-blue-200': '#3a4c86',
        'brand-blue-300': '#344478',
        'brand-blue-400': '#2e3c6a',
        'brand-blue-500': '#28355c',
        'brand-blue-600': '#222d4f',
        'brand-blue-700': '#1C2541',
        'brand-blue-800': '#161d33',
        'brand-blue-900': '#101526',
        'brand-red': '#A4243B',
        'brand-yellow': '#FFBD59',
        'brand-black-900': '#181818',
        'brand-black-800': '#212121',
        'brand-black-700': '#3d3d3d',
        'brand-orange': '#ff7900'
      },
    },
  },
  plugins: [],
}
