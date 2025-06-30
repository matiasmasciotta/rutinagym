<template>
  <div class="min-h-screen bg-gym-dark text-white font-gym">
    <!-- Header -->
    <header class="bg-gym-darker border-b border-gym-light-gray p-4">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-neon">
          RutinaGym
        </h1>
        <!-- Selector de usuario -->
        <div class="relative">
          <select 
            v-model="selectedUser" 
            @change="changeUser"
            class="input-gym text-sm pr-8"
          >
            <option value="matias">Matías 💪</option>
            <option value="marisa">Marisa 🏋️‍♀️</option>
            <option value="sara">Sara 🤸‍♀️</option>
            <option value="carla">Carla 🏃‍♀️</option>
          </select>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="pb-20">
      <router-view />
    </main>

    <!-- Cronómetro Flotante -->
    <div 
      v-if="timerStore.isActive" 
      class="fixed top-20 right-4 z-50 bg-gym-gray rounded-full p-3 border-2 border-gym-cyan shadow-lg shadow-gym-cyan/30"
    >
      <div class="text-center">
        <div class="text-xs text-gym-cyan font-semibold">
          {{ timerStore.isResting ? 'DESCANSO' : 'ENTRENA' }}
        </div>
        <div class="text-lg font-bold text-white">
          {{ formatTime(timerStore.currentTime) }}
        </div>
      </div>
    </div>

    <!-- Bottom Navigation -->
    <nav class="fixed bottom-0 left-0 right-0 bg-gym-darker border-t border-gym-light-gray">
      <div class="flex justify-around py-2">
        <router-link
          to="/rutinas"
          class="flex flex-col items-center p-2 rounded-lg transition-colors"
          :class="$route.name === 'rutinas' ? 'text-gym-cyan' : 'text-gray-400'"
        >
          <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
          </svg>
          <span class="text-xs">Rutinas</span>
        </router-link>

        <router-link
          to="/cronometros"
          class="flex flex-col items-center p-2 rounded-lg transition-colors"
          :class="$route.name === 'cronometros' ? 'text-gym-green' : 'text-gray-400'"
        >
          <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span class="text-xs">Tiempo</span>
        </router-link>

        <router-link
          to="/perfil"
          class="flex flex-col items-center p-2 rounded-lg transition-colors"
          :class="$route.name === 'perfil' ? 'text-gym-yellow' : 'text-gray-400'"
        >
          <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          <span class="text-xs">Perfil</span>
        </router-link>
      </div>
    </nav>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  name: 'App',
  setup() {
    const selectedUser = ref(localStorage.getItem('selectedUser') || 'matias')
    
    // Store global del cronómetro
    const timerStore = reactive({
      isActive: false,
      currentTime: 0,
      isResting: false,
      intervalId: null
    })

    const changeUser = () => {
      localStorage.setItem('selectedUser', selectedUser.value)
      // Aquí se podría emitir un evento global para actualizar los datos
      window.dispatchEvent(new CustomEvent('userChanged', { detail: selectedUser.value }))
    }

    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60)
      const secs = seconds % 60
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    // Hacer el timerStore accesible globalmente
    window.timerStore = timerStore

    return {
      selectedUser,
      timerStore,
      changeUser,
      formatTime
    }
  }
}
</script> 