/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'fluent-blue': '#0078D4',
        'fluent-bg': '#F3F2F1',
        'fluent-gray': '#E1DFDD',
        'fluent-dark': '#323130',
        'pucp-blue': '#1a2d6d',
        'pucp-gold': '#f0b90b',
      },
      fontFamily: {
        'segoe': ['Segoe UI', 'Inter', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        'DEFAULT': '2px',
        'lg': '4px',
        'full': '9999px',
      }
    },
  },
  plugins: [],
}
