/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'gym-dark': '#1e1e1e',
        'gym-darker': '#171717',
        'gym-gray': '#2d2d2d',
        'gym-light-gray': '#3a3a3a',
        'gym-card': '#404040',
        'gym-cyan': '#00ffff',
        'gym-green': '#00ff00',
        'gym-yellow': '#ffff00',
        'gym-pink': '#ff00ff',
        'gym-orange': '#ff8800',
      },
      fontFamily: {
        'gym': ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
} 