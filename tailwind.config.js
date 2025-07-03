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
        // Fondos oscuros más suaves
        'gym-dark': '#2a2a2a',
        'gym-darker': '#1f1f1f',
        'gym-gray': '#3a3a3a',
        'gym-light-gray': '#4a4a4a',
        'gym-card': '#3d3d3d',
        
        // Fondos claros para modo claro
        'gym-light-bg': '#f8fafc',
        'gym-light-card': '#ffffff',
        'gym-light-card-alt': '#f1f5f9',
        
        // Colores modernos con gradientes
        'gym-cyan': '#06b6d4',
        'gym-cyan-light': '#67e8f9',
        'gym-green': '#10b981',
        'gym-green-light': '#6ee7b7',
        'gym-yellow': '#f59e0b',
        'gym-yellow-light': '#fbbf24',
        'gym-pink': '#ec4899',
        'gym-pink-light': '#f9a8d4',
        'gym-orange': '#f97316',
        'gym-orange-light': '#fb923c',
        'gym-purple': '#8b5cf6',
        'gym-purple-light': '#a78bfa',
        'gym-blue': '#3b82f6',
        'gym-blue-light': '#60a5fa',
        'gym-indigo': '#6366f1',
        'gym-indigo-light': '#818cf8',
        'gym-emerald': '#059669',
        'gym-emerald-light': '#34d399',
        'gym-slate': '#64748b',
        'gym-slate-light': '#94a3b8',
      },
      fontFamily: {
        'gym': ['Inter', 'system-ui', 'sans-serif'],
        'impact': ['Impact', 'Arial Black', 'sans-serif'],
        'crossfit': ['Oswald', 'Impact', 'Arial Black', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-modern': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-cyber': 'linear-gradient(135deg, #06b6d4 0%, #10b981 100%)',
        'gradient-warm': 'linear-gradient(135deg, #f97316 0%, #ec4899 100%)',
        'gradient-cool': 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
        'gradient-emerald': 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
        'gradient-sunset': 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
        'gradient-purple': 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
      }
    },
  },
  plugins: [],
} 