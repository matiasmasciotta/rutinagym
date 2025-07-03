<template>
  <div class="p-4 h-full flex flex-col items-center justify-center">
    <!-- Logo Principal -->
    <div class="text-center space-y-6">
      <!-- Icono de Gym -->
      <div class="flex justify-center">
        <div class="w-32 h-32 bg-gradient-to-br from-gym-cyan to-gym-green rounded-full flex items-center justify-center shadow-2xl shadow-gym-cyan/30">
          <svg class="w-16 h-16 text-gym-dark" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
      </div>

      <!-- Título -->
      <div class="space-y-2">
        <h1 class="text-4xl font-bold text-neon">RutinaGym</h1>
        <p class="text-xl text-gray-300">Tu compañero de entrenamiento</p>
      </div>

      <!-- Configurador de Theme -->
      <div class="space-y-4 text-center max-w-md">
        <div class="card-gym">
          <div class="flex items-center justify-center space-x-3 mb-4">
            <svg class="w-6 h-6 text-gym-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
            <span class="text-lg font-semibold text-white">Configuración de Tema</span>
          </div>
          
          <!-- Selector de modo -->
          <div class="flex justify-center space-x-2 mb-4">
            <button
              @click="setTheme('dark')"
              :class="currentTheme === 'dark' 
                ? 'bg-gradient-cyber text-white shadow-lg shadow-cyan-500/25' 
                : 'bg-gym-light-gray text-gray-300 hover:bg-gym-gray'"
              class="px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
              </svg>
              <span>Modo Oscuro</span>
            </button>
            
            <button
              @click="setTheme('light')"
              :class="currentTheme === 'light' 
                ? 'bg-gradient-to-r from-gym-yellow to-gym-orange text-white shadow-lg shadow-yellow-500/25' 
                : 'bg-gym-light-gray text-gray-300 hover:bg-gym-gray'"
              class="px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
              <span>Modo Claro</span>
            </button>
          </div>
          
          <p class="text-gray-300 text-sm">
            {{ currentTheme === 'dark' ? 'Interfaz oscura para entrenamientos nocturnos' : 'Interfaz clara para entrenamientos diurnos' }}
          </p>
        </div>

        <!-- Información adicional -->
        <div class="card-gym">
          <div class="flex items-center justify-center space-x-3 mb-2">
            <svg class="w-6 h-6 text-gym-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span class="text-lg font-semibold text-white">Entrena con Propósito</span>
          </div>
          <p class="text-gray-300 text-sm">Lleva el control de tus rutinas y progreso</p>
        </div>

        <div class="card-gym">
          <div class="flex items-center justify-center space-x-3 mb-2">
            <svg class="w-6 h-6 text-gym-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span class="text-lg font-semibold text-white">Cronometra tu Tiempo</span>
          </div>
          <p class="text-gray-300 text-sm">Optimiza tus descansos entre series</p>
        </div>

        <div class="card-gym">
          <div class="flex items-center justify-center space-x-3 mb-2">
            <svg class="w-6 h-6 text-gym-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            <span class="text-lg font-semibold text-white">Perfiles Personalizados</span>
          </div>
          <p class="text-gray-300 text-sm">Rutinas adaptadas para cada usuario</p>
        </div>
      </div>

      <!-- Versión -->
      <div class="pt-8">
        <p class="text-gray-500 text-sm">v1.0.0 - Made with 💪 for gym enthusiasts</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'Perfil',
  setup() {
    const currentTheme = ref('dark')

    const setTheme = (theme) => {
      currentTheme.value = theme
      localStorage.setItem('theme', theme)
      
      // Aplicar tema al documento
      const body = document.body
      if (theme === 'light') {
        body.classList.add('light-mode')
        body.classList.remove('dark-mode')
      } else {
        body.classList.add('dark-mode')
        body.classList.remove('light-mode')
      }
      
      // Emitir evento para que otros componentes se actualicen
      window.dispatchEvent(new CustomEvent('themeChanged', { detail: theme }))
    }

    const loadTheme = () => {
      const savedTheme = localStorage.getItem('theme') || 'dark'
      setTheme(savedTheme)
    }

    onMounted(() => {
      loadTheme()
    })

    return {
      currentTheme,
      setTheme
    }
  }
}
</script> 