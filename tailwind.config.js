/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Lexend', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
        'lexend': ['Lexend', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 