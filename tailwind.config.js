/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        'heading-color':'#15214f',
        'text-color': '#999',
        'primary-color':'#6e66e3',
        'highlight-color':'#d13267',
        'bg-color':'#e2e2e2',
        'bg-component':'#f4f4f4'
      },
    },
  },
  plugins: [],
}
