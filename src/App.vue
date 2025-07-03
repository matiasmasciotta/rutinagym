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

    <!-- Cronómetro Flotante Draggable -->
    <div 
      v-if="timerStore.isActive || timerStore.currentTime > 0" 
      ref="floatingTimer"
      class="fixed z-50 bg-gym-card rounded-2xl border-2 border-gym-pink shadow-lg shadow-gym-pink/30 cursor-move select-none min-w-[140px]"
      :style="{ top: floatingPosition.y + 'px', left: floatingPosition.x + 'px' }"
      @mousedown="startDrag"
      @touchstart="startDrag"
    >
      <div class="p-4 text-center">
        <div class="text-sm text-gym-cyan font-semibold mb-2">
          {{ timerStore.isResting ? '😴 DESCANSO' : '💪 ENTRENA' }}
        </div>
        <div class="text-2xl font-bold text-white mb-3">
          {{ formatTime(timerStore.currentTime) }}
        </div>
        <!-- Controles -->
        <div class="flex justify-center space-x-3">
          <button
            @click.stop.prevent="toggleFloatingTimer($event)"
            @mousedown.stop.prevent
            @touchstart.stop.prevent="handleTouchStart"
            @touchend.stop.prevent="handleToggleTouch"
            @touchmove.stop.prevent
            class="w-12 h-12 rounded-full bg-gym-cyan text-gym-dark flex items-center justify-center font-bold hover:scale-110 transition-transform active:scale-95 touch-manipulation"
            type="button"
            tabindex="-1"
          >
            <svg v-if="timerStore.isActive" class="w-6 h-6 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M10 9v6m4-6v6"></path>
            </svg>
            <svg v-else class="w-6 h-6 pointer-events-none" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"></path>
            </svg>
          </button>
          <button
            @click.stop.prevent="resetFloatingTimer($event)"
            @mousedown.stop.prevent
            @touchstart.stop.prevent="handleTouchStart"
            @touchend.stop.prevent="handleResetTouch"
            @touchmove.stop.prevent
            class="w-12 h-12 rounded-full bg-gym-orange text-gym-dark flex items-center justify-center font-bold hover:scale-110 transition-transform active:scale-95 touch-manipulation"
            type="button"
            tabindex="-1"
          >
            <svg class="w-6 h-6 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
          </button>
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
import { ref, reactive, onMounted, onUnmounted } from 'vue'

export default {
  name: 'App',
  setup() {
    const selectedUser = ref(localStorage.getItem('selectedUser') || 'matias')
    const floatingTimer = ref(null)
    
    // Posición del cronómetro flotante
    const floatingPosition = reactive({
      x: window.innerWidth - 120, // Posición inicial derecha
      y: 80 // Posición inicial superior
    })
    
    // Variables para el dragging
    const isDragging = ref(false)
    const dragOffset = reactive({ x: 0, y: 0 })
    
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

    // Funciones de dragging
    const startDrag = (e) => {
      // Solo iniciar drag si no es un botón
      if (e.target.closest('button')) {
        return // No arrastrar si se tocó un botón
      }
      
      isDragging.value = true
      const clientX = e.clientX || e.touches[0].clientX
      const clientY = e.clientY || e.touches[0].clientY
      
      dragOffset.x = clientX - floatingPosition.x
      dragOffset.y = clientY - floatingPosition.y
      
      document.addEventListener('mousemove', onDrag)
      document.addEventListener('mouseup', stopDrag)
      document.addEventListener('touchmove', onDrag)
      document.addEventListener('touchend', stopDrag)
      
      e.preventDefault()
    }

    const onDrag = (e) => {
      if (!isDragging.value) return
      
      const clientX = e.clientX || e.touches[0].clientX
      const clientY = e.clientY || e.touches[0].clientY
      
      let newX = clientX - dragOffset.x
      let newY = clientY - dragOffset.y
      
      // Limitar a los bordes de la ventana
      const timerWidth = 120
      const timerHeight = 120
      newX = Math.max(0, Math.min(window.innerWidth - timerWidth, newX))
      newY = Math.max(0, Math.min(window.innerHeight - timerHeight, newY))
      
      floatingPosition.x = newX
      floatingPosition.y = newY
    }

    const stopDrag = () => {
      isDragging.value = false
      document.removeEventListener('mousemove', onDrag)
      document.removeEventListener('mouseup', stopDrag)
      document.removeEventListener('touchmove', onDrag)
      document.removeEventListener('touchend', stopDrag)
    }

    // Controles del cronómetro flotante
    const toggleFloatingTimer = (e) => {
      // Prevenir cualquier comportamiento por defecto INMEDIATAMENTE
      if (e) {
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()
      }
      
      if (timerStore.isActive) {
        // PAUSAR: Detener completamente el cronómetro
        clearInterval(timerStore.intervalId)
        timerStore.intervalId = null
        timerStore.isActive = false
        console.log('⏸️ Cronómetro PAUSADO')
      } else {
        // PLAY: Iniciar o reanudar cronómetro
        if (timerStore.currentTime === 0) {
          // Inicializar con tiempo de entrenamiento por defecto
          timerStore.currentTime = timerStore.isResting ? 90 : 180
          console.log('🆕 Nuevo cronómetro iniciado:', timerStore.currentTime, 'segundos')
        } else {
          console.log('▶️ Cronómetro REANUDADO desde:', timerStore.currentTime, 'segundos')
        }
        
        timerStore.isActive = true
        timerStore.intervalId = setInterval(() => {
          if (timerStore.currentTime > 0) {
            timerStore.currentTime--
          } else {
            // Timer terminado
            clearInterval(timerStore.intervalId)
            timerStore.intervalId = null
            timerStore.isActive = false
            console.log('⏰ Timer terminado!')
            
            // Alternar entre entrenamiento y descanso
            if (timerStore.isResting) {
              // Cambiar a modo entrenamiento
              timerStore.isResting = false
              timerStore.currentTime = 180 // 3 minutos
              console.log('💪 Cambiando a ENTRENAMIENTO')
            } else {
              // Cambiar a modo descanso
              timerStore.isResting = true
              timerStore.currentTime = 90 // 1.5 minutos
              console.log('😴 Cambiando a DESCANSO')
            }
            
            // Auto-iniciar el siguiente timer
            timerStore.isActive = true
            timerStore.intervalId = setInterval(() => {
              if (timerStore.currentTime > 0) {
                timerStore.currentTime--
              } else {
                clearInterval(timerStore.intervalId)
                timerStore.intervalId = null
                timerStore.isActive = false
                console.log('⏰ Ciclo completado')
              }
            }, 1000)
          }
        }, 1000)
      }
      
      // NO enviar evento para evitar doble ejecución
      // window.dispatchEvent(new CustomEvent('toggleTimer'))
    }

    const resetFloatingTimer = (e) => {
      // Prevenir cualquier comportamiento por defecto INMEDIATAMENTE
      if (e) {
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()
      }
      
      // RESET: Limpiar completamente el cronómetro
      clearInterval(timerStore.intervalId)
      timerStore.intervalId = null
      timerStore.isActive = false
      timerStore.currentTime = 0
      timerStore.isResting = false
      console.log('🔄 Cronómetro RESETEADO')
      
      // Retornar false para asegurar que no se propague
      return false
    }
    
    // Variables para manejar touch events correctamente
    const touchStartTime = ref(0)
    const touchStartPos = ref({ x: 0, y: 0 })
    
    const handleTouchStart = (e) => {
      e.preventDefault()
      e.stopPropagation()
      e.stopImmediatePropagation()
      
      touchStartTime.value = Date.now()
      touchStartPos.value = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      }
      console.log('👆 Touch start en botón')
      return false
    }
    
    const handleToggleTouch = (e) => {
      e.preventDefault()
      e.stopPropagation()
      e.stopImmediatePropagation()
      
      const touchDuration = Date.now() - touchStartTime.value
      const touchEndPos = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      }
      
      const moveDistance = Math.sqrt(
        Math.pow(touchEndPos.x - touchStartPos.value.x, 2) + 
        Math.pow(touchEndPos.y - touchStartPos.value.y, 2)
      )
      
      // Solo ejecutar si fue un tap rápido y sin mucho movimiento
      if (touchDuration < 300 && moveDistance < 10) {
        console.log('⏯️ Toggle timer ejecutado')
        toggleFloatingTimer(e)
      } else {
        console.log('❌ Touch cancelado - duración:', touchDuration, 'distancia:', moveDistance)
      }
      
      return false
    }
    
    const handleResetTouch = (e) => {
      e.preventDefault()
      e.stopPropagation()
      e.stopImmediatePropagation()
      
      const touchDuration = Date.now() - touchStartTime.value
      const touchEndPos = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      }
      
      const moveDistance = Math.sqrt(
        Math.pow(touchEndPos.x - touchStartPos.value.x, 2) + 
        Math.pow(touchEndPos.y - touchStartPos.value.y, 2)
      )
      
      // Solo ejecutar si fue un tap rápido y sin mucho movimiento
      if (touchDuration < 300 && moveDistance < 10) {
        console.log('🔄 Reset timer ejecutado')
        resetFloatingTimer(e)
      } else {
        console.log('❌ Touch reset cancelado - duración:', touchDuration, 'distancia:', moveDistance)
      }
      
      return false
    }

    // Actualizar posición cuando cambie el tamaño de ventana
    const updatePosition = () => {
      const timerWidth = 120
      const timerHeight = 120
      if (floatingPosition.x + timerWidth > window.innerWidth) {
        floatingPosition.x = window.innerWidth - timerWidth
      }
      if (floatingPosition.y + timerHeight > window.innerHeight) {
        floatingPosition.y = window.innerHeight - timerHeight
      }
    }

    onMounted(() => {
      window.addEventListener('resize', updatePosition)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', updatePosition)
      stopDrag()
    })

    // Hacer el timerStore accesible globalmente
    window.timerStore = timerStore

    return {
      selectedUser,
      timerStore,
      floatingTimer,
      floatingPosition,
      changeUser,
      formatTime,
      startDrag,
      toggleFloatingTimer,
      resetFloatingTimer,
      handleTouchStart,
      handleToggleTouch,
      handleResetTouch,
      touchStartPos
    }
  }
}
</script> 