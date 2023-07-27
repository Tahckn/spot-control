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
        'heading-color':'#040404',
        'primary-color':'#E6C939',
        'highlight-color':'#d13267',
        'bg-color':'#242529',
        'bg-component':'#353537',
        'text-color':'#fbebdd',
        'border-color':'#575337',
      },
    },
  },
  plugins: [],
}
