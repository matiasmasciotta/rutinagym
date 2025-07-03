<template>
  <div class="p-4 space-y-6">
    <!-- Título -->
    <div class="text-center">
      <h2 class="text-3xl title-impact">Cronómetros de Entrenamiento</h2>
    </div>

    <!-- Cronómetro Principal -->
    <div class="card-gym text-center">
      <h3 class="text-xl font-semibold text-gym-cyan mb-4">Cronómetro Principal</h3>
      
      <!-- Display del tiempo -->
      <div class="mb-6">
        <div class="text-5xl font-impact font-black mb-2" 
             :class="preparingPhase ? 'text-gym-yellow' : (timerStore.isResting ? 'text-gym-orange' : 'text-gym-green')">
          {{ formatTime(timerStore.currentTime) }}
        </div>
        <div class="text-lg font-semibold"
             :class="preparingPhase ? 'text-gym-yellow' : (timerStore.isResting ? 'text-gym-orange' : 'text-gym-green')">
          {{ preparingPhase ? '⚡ PREPARÁNDOTE...' : (timerStore.isResting ? '😴 TIEMPO DE DESCANSO' : '💪 TIEMPO DE ENTRENAMIENTO') }}
        </div>
      </div>

      <!-- Controles principales -->
      <div class="grid grid-cols-3 gap-2 mb-6 max-w-sm mx-auto">
        <button
          @click="toggleTimer"
          class="btn-primary text-sm px-3 py-2 flex items-center justify-center"
        >
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="timerStore.isActive" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-9 0h10m-11 0h12"></path>
          </svg>
          {{ timerStore.isActive ? 'Pausar' : 'Iniciar' }}
        </button>
        <button
          @click="resetTimer"
          class="btn-secondary text-sm px-3 py-2 flex items-center justify-center"
        >
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          Reset
        </button>
        <button
          @click="switchMode"
          class="btn-gym bg-gym-orange text-gym-dark text-sm px-3 py-2 flex items-center justify-center"
        >
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="timerStore.isResting" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          {{ timerStore.isResting ? '💪' : '😴' }}
        </button>
      </div>
    </div>

    <!-- Configuración de Tiempos -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Tiempo de Entrenamiento -->
      <div class="card-gym">
        <h4 class="text-lg font-semibold text-gym-green mb-3 flex items-center">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
          Tiempo de Entrenamiento
        </h4>
        <div class="space-y-3">
          <div class="flex items-center space-x-2">
            <label class="text-sm text-gray-300">Minutos:</label>
            <input
              v-model.number="workMinutes"
              type="number"
              min="0"
              max="60"
              class="input-gym w-20 text-center"
              :disabled="!workTimeEditing"
            />
          </div>
          <div class="flex items-center space-x-2">
            <label class="text-sm text-gray-300">Segundos:</label>
            <input
              v-model.number="workSeconds"
              type="number"
              min="0"
              max="59"
              class="input-gym w-20 text-center"
              :disabled="!workTimeEditing"
            />
          </div>
          <button
            @click="saveWorkTime"
            class="w-full btn-primary"
            :disabled="!workTimeEditing"
          >
            💾 Guardar cambios
          </button>
          <button
            v-if="!workTimeEditing"
            @click="editWorkTime"
            class="w-full btn-secondary mt-2"
          >
            ✏️ Editar tiempo
          </button>
        </div>
      </div>

      <!-- Tiempo de Descanso -->
      <div class="card-gym">
        <h4 class="text-lg font-semibold text-gym-orange mb-3 flex items-center">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          Tiempo de Descanso
        </h4>
        <div class="space-y-3">
          <div class="flex items-center space-x-2">
            <label class="text-sm text-gray-300">Minutos:</label>
            <input
              v-model.number="restMinutes"
              type="number"
              min="0"
              max="60"
              class="input-gym w-20 text-center"
              :disabled="!restTimeEditing"
            />
          </div>
          <div class="flex items-center space-x-2">
            <label class="text-sm text-gray-300">Segundos:</label>
            <input
              v-model.number="restSeconds"
              type="number"
              min="0"
              max="59"
              class="input-gym w-20 text-center"
              :disabled="!restTimeEditing"
            />
          </div>
          <button
            @click="saveRestTime"
            class="w-full btn-primary"
            :disabled="!restTimeEditing"
          >
            💾 Guardar cambios
          </button>
          <button
            v-if="!restTimeEditing"
            @click="editRestTime"
            class="w-full btn-secondary mt-2"
          >
            ✏️ Editar tiempo
          </button>
        </div>
      </div>
    </div>

    <!-- Presets de Tiempo -->
    <div class="card-gym">
      <h4 class="text-lg font-semibold text-gym-cyan mb-3">Presets Rápidos</h4>
      <div class="grid grid-cols-2 gap-3">
        <button
          @click="setPreset(30, 60)"
          class="btn-secondary text-sm p-2"
        >
          30s trabajo / 1min descanso
        </button>
        <button
          @click="setPreset(60, 90)"
          class="btn-secondary text-sm p-2"
        >
          1min trabajo / 1.5min descanso
        </button>
        <button
          @click="setPreset(45, 60)"
          class="btn-secondary text-sm p-2"
        >
          45s trabajo / 1min descanso
        </button>
        <button
          @click="setPreset(120, 180)"
          class="btn-secondary text-sm p-2"
        >
          2min trabajo / 3min descanso
        </button>
      </div>
    </div>

    <!-- Estadísticas de la sesión -->
    <div class="card-gym">
      <h4 class="text-lg font-semibold text-gym-pink mb-3">Estadísticas de Sesión</h4>
      <div class="grid grid-cols-2 gap-4">
        <div class="text-center">
          <div class="text-2xl font-bold text-gym-green">{{ Math.floor(totalWorkTime / 60) }}</div>
          <div class="text-sm text-gray-300">Minutos de Entrenamiento</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-gym-orange">{{ Math.floor(totalRestTime / 60) }}</div>
          <div class="text-sm text-gray-300">Minutos de Descanso</div>
        </div>
      </div>
      <button
        @click="resetStats"
        class="w-full btn-secondary mt-3"
      >
        Resetear Estadísticas
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch } from 'vue'

export default {
  name: 'Cronometros',
  setup() {
    // Referencias del cronómetro
    const timerStore = window.timerStore
    const workMinutes = ref(1)
    const workSeconds = ref(0)
    const restMinutes = ref(1)
    const restSeconds = ref(0)
    
    // Estados de edición
    const workTimeEditing = ref(false)
    const restTimeEditing = ref(false)
    const preparingPhase = ref(false)
    const preparingTime = ref(5) // 5 segundos de preparación
    
    // Configuración de tiempos (por defecto 1 minuto cada uno)
    const workTime = ref(60) // segundos
    const restTime = ref(60) // segundos
    
    // Estadísticas
    const totalWorkTime = ref(parseInt(localStorage.getItem('totalWorkTime')) || 0)
    const totalRestTime = ref(parseInt(localStorage.getItem('totalRestTime')) || 0)
    
    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60)
      const secs = seconds % 60
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    const toggleTimer = () => {
      if (timerStore.isActive) {
        // Pausar
        clearInterval(timerStore.intervalId)
        timerStore.isActive = false
      } else {
        // Iniciar
        if (timerStore.currentTime === 0) {
          // Iniciar fase de preparación si no estamos descansando
          if (!timerStore.isResting) {
            preparingPhase.value = true
            timerStore.currentTime = preparingTime.value
          } else {
            timerStore.currentTime = restTime.value
          }
        }
        
        timerStore.intervalId = setInterval(() => {
          if (timerStore.currentTime > 0) {
            timerStore.currentTime--
            
            // Solo actualizar estadísticas si no estamos en preparación
            if (!preparingPhase.value) {
              if (timerStore.isResting) {
                totalRestTime.value++
              } else {
                totalWorkTime.value++
              }
            }
          } else {
            // Tiempo terminado
            if (preparingPhase.value) {
              // Fin de preparación, comenzar entrenamiento
              preparingPhase.value = false
              timerStore.currentTime = workTime.value
            } else {
              // Tiempo terminado - cambiar modo automáticamente
              switchMode()
            }
          }
        }, 1000)
        
        timerStore.isActive = true
      }
    }

    const resetTimer = () => {
      clearInterval(timerStore.intervalId)
      timerStore.isActive = false
      preparingPhase.value = false
      timerStore.currentTime = timerStore.isResting ? restTime.value : workTime.value
    }

    const switchMode = () => {
      preparingPhase.value = false
      timerStore.isResting = !timerStore.isResting
      timerStore.currentTime = timerStore.isResting ? restTime.value : workTime.value
      
      // Si estaba corriendo, continuar con el nuevo tiempo
      if (timerStore.isActive) {
        clearInterval(timerStore.intervalId)
        toggleTimer()
      }
    }

    const editWorkTime = () => {
      workTimeEditing.value = true
    }

    const saveWorkTime = () => {
      workTime.value = workMinutes.value * 60 + workSeconds.value
      workTimeEditing.value = false
      if (!timerStore.isResting && !timerStore.isActive && !preparingPhase.value) {
        timerStore.currentTime = workTime.value
      }
    }

    const editRestTime = () => {
      restTimeEditing.value = true
    }

    const saveRestTime = () => {
      restTime.value = restMinutes.value * 60 + restSeconds.value
      restTimeEditing.value = false
      if (timerStore.isResting && !timerStore.isActive) {
        timerStore.currentTime = restTime.value
      }
    }

    const setPreset = (work, rest) => {
      workTime.value = work
      restTime.value = rest
      
      workMinutes.value = Math.floor(work / 60)
      workSeconds.value = work % 60
      restMinutes.value = Math.floor(rest / 60)
      restSeconds.value = rest % 60
      
      // Deshabilitar edición
      workTimeEditing.value = false
      restTimeEditing.value = false
      
      if (!timerStore.isActive && !preparingPhase.value) {
        timerStore.currentTime = timerStore.isResting ? rest : work
      }
    }

    const resetStats = () => {
      totalWorkTime.value = 0
      totalRestTime.value = 0
      localStorage.setItem('totalWorkTime', '0')
      localStorage.setItem('totalRestTime', '0')
    }

    // Guardar estadísticas en localStorage
    watch([totalWorkTime, totalRestTime], () => {
      localStorage.setItem('totalWorkTime', totalWorkTime.value.toString())
      localStorage.setItem('totalRestTime', totalRestTime.value.toString())
    })

    // Escuchar eventos del cronómetro flotante
    const handleFloatingToggle = () => {
      toggleTimer()
    }

    const handleFloatingReset = () => {
      resetTimer()
    }

    onMounted(() => {
      // Inicializar el cronómetro
      if (timerStore.currentTime === 0) {
        timerStore.currentTime = workTime.value
      }
      
      // Escuchar eventos globales
      window.addEventListener('toggleTimer', handleFloatingToggle)
      window.addEventListener('resetTimer', handleFloatingReset)
    })

    onUnmounted(() => {
      // Limpiar event listeners
      window.removeEventListener('toggleTimer', handleFloatingToggle)
      window.removeEventListener('resetTimer', handleFloatingReset)
      // No limpiar el cronómetro al salir de la vista para mantenerlo flotante
    })

    return {
      timerStore,
      workMinutes,
      workSeconds,
      restMinutes,
      restSeconds,
      totalWorkTime,
      totalRestTime,
      workTimeEditing,
      restTimeEditing,
      preparingPhase,
      formatTime,
      toggleTimer,
      resetTimer,
      switchMode,
      editWorkTime,
      saveWorkTime,
      editRestTime,
      saveRestTime,
      setPreset,
      resetStats
    }
  }
}
</script> 