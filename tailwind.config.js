/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'heading-color': '#040404',
        'primary-color': '#8071fd',
        'highlight-color': '#d13267',
        'bg-color': '#262837',
        'bg-component': '#2f304a',
        'text-color': '#d8d8d7',
        'border-color': '#3b3949',
        'bg-main': '#1f1d2c',
        'sidebar-item': '#2f304a',
      },
    },
  },
  plugins: [],
};
