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
        'gym-dark': '#0a0a0a',
        'gym-darker': '#050505',
        'gym-gray': '#1a1a1a',
        'gym-light-gray': '#2a2a2a',
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