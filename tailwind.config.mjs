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
        'brand-black': '#212529',
        'brand-black-100': '#6E7482',
        'brand-black-200': '#565D6D',
        'brand-black-300': '#3D4558',
        'brand-black-400': '#2E3344',
        'brand-black-500': '#212529',
        'brand-black-600': '#1A1E23',
        'brand-black-700': '#131519',
        'brand-black-800': '#0D0E11',
        'brand-black-900': '#070708',
        'brand-slate': "#343a40",
        'brand-slate-800': '#212529',
        'brand-slate-700': "#525e6f",
        'brand-slate-500': '#3f474f'
      },
    },
  },
  plugins: [],
}
