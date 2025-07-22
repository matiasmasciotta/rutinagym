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
        <h1 class="text-4xl title-impact">RutinaGym</h1>
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

        <!-- Sección Actualizar Datos -->
        <div class="card-gym">
          <div class="flex items-center justify-center space-x-3 mb-4">
            <svg class="w-6 h-6 text-gym-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            <span class="text-lg font-semibold text-white">Actualizar Rutinas</span>
          </div>
          
          <p class="text-gray-300 text-sm mb-4">
            Sincroniza tu rutina con los últimos datos del entrenador
          </p>
          
          <!-- Información del usuario actual -->
          <div class="bg-gym-light-gray/50 rounded-lg p-3 mb-4">
            <div class="flex items-center justify-center space-x-2 mb-2">
              <svg class="w-4 h-4 text-gym-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              <span class="text-white font-medium">{{ getNombreCompleto(selectedUser) }}</span>
            </div>
            <p class="text-gray-400 text-xs">{{ getEmailUsuario(selectedUser) }}</p>
            <div v-if="ultimaActualizacion" class="mt-2 pt-2 border-t border-gym-light-gray/20">
              <div class="flex items-center justify-center space-x-1">
                <svg class="w-3 h-3 text-gym-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span class="text-green-400 text-xs font-medium">Última actualización:</span>
              </div>
              <p class="text-green-300 text-xs text-center mt-1">{{ ultimaActualizacion }}</p>
            </div>
          </div>

          <!-- Botón de actualizar -->
          <button
            @click="actualizarDatos"
            :disabled="isUpdating"
            :class="isUpdating 
              ? 'bg-gym-gray text-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-gym-green to-gym-emerald hover:from-gym-emerald hover:to-gym-green text-white hover:scale-105'"
            class="w-full px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <svg 
              v-if="isUpdating" 
              class="w-5 h-5 animate-spin" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            <svg 
              v-else 
              class="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            <span>{{ isUpdating ? 'Actualizando...' : 'Actualizar Datos' }}</span>
          </button>

          <!-- Botón restaurar rutina anterior -->
          <button
            v-if="tieneBackup"
            @click="restaurarRutinaAnterior"
            :disabled="isRestoring"
            :class="isRestoring 
              ? 'bg-gym-gray text-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-gym-orange to-gym-pink hover:from-gym-pink hover:to-gym-orange text-white hover:scale-105'"
            class="w-full px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 mt-3"
          >
            <svg 
              v-if="isRestoring" 
              class="w-5 h-5 animate-spin" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            <svg 
              v-else 
              class="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"></path>
            </svg>
            <span>{{ isRestoring ? 'Restaurando...' : 'Restaurar Rutina Anterior' }}</span>
          </button>

          <!-- Información de backup -->
          <div v-if="tieneBackup && backupInfo" class="mt-2 p-2 bg-gym-dark/50 rounded-lg">
            <p class="text-gray-400 text-xs text-center">
              💾 Backup del {{ backupInfo.fecha }} • {{ backupInfo.dias }} días
            </p>
          </div>

          <!-- Mensaje de resultado -->
          <div v-if="updateMessage" class="mt-3 p-3 rounded-lg text-sm" :class="updateMessage.type === 'success' 
            ? 'bg-green-900/50 text-green-300 border border-green-500/30' 
            : 'bg-red-900/50 text-red-300 border border-red-500/30'">
            {{ updateMessage.text }}
          </div>
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
import { ref, onMounted, computed } from 'vue'

export default {
  name: 'Perfil',
  setup() {
    const currentTheme = ref('dark')
    const isUpdating = ref(false)
    const updateMessage = ref(null)
    
    // Usuario seleccionado actual
    const selectedUser = computed(() => {
      return localStorage.getItem('selectedUser') || 'matias'
    })

    // Variables para backup y restauración
    const isRestoring = ref(false)
    const tieneBackup = computed(() => {
      const backupKey = `rutinas_backup_${selectedUser.value}`
      return localStorage.getItem(backupKey) !== null
    })
    const backupInfo = computed(() => {
      if (!tieneBackup.value) return null
      
      const backupKey = `rutinas_backup_${selectedUser.value}`
      const infoKey = `rutinas_backup_info_${selectedUser.value}`
      
      try {
        const backup = JSON.parse(localStorage.getItem(backupKey))
        const info = JSON.parse(localStorage.getItem(infoKey) || '{}')
        
        return {
          fecha: info.fecha || 'desconocida',
          dias: backup?.days?.length || 0
        }
      } catch (error) {
        return null
      }
    })

    const ultimaActualizacion = computed(() => {
      const rutinasKey = `rutinas_${selectedUser.value}`
      
      try {
        const rutinas = localStorage.getItem(rutinasKey)
        if (!rutinas) return null
        
        const data = JSON.parse(rutinas)
        
        // Intentar obtener fecha de updateDate o updatedAt
        let fechaActualizacion = null
        
        if (data.updateDate) {
          fechaActualizacion = new Date(data.updateDate)
        } else if (data.updatedAt) {
          fechaActualizacion = new Date(data.updatedAt)
        }
        
        if (!fechaActualizacion || isNaN(fechaActualizacion)) return null
        
        // Formatear fecha en español
        const opciones = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }
        
        return fechaActualizacion.toLocaleDateString('es-AR', opciones)
        
      } catch (error) {
        console.error('Error al obtener fecha de actualización:', error)
        return null
      }
    })

    // Mapeo de usuarios a emails
    const userEmailMap = {
      'matias': 'matiasmasciotta@gmail.com',
      'marisa': 'marisagfridman@gmail.com', 
      'sara': 'sarahi055@hotmail.com',
      'carla': 'calumasciotta@gmail.com'
    }

    // Mapeo de nombres completos
    const userNameMap = {
      'matias': 'Matías 💪',
      'marisa': 'Marisa 🏋️‍♀️',
      'sara': 'Sara 🤸‍♀️',
      'carla': 'Carla 🏃‍♀️'
    }

    const getEmailUsuario = (usuario) => {
      return userEmailMap[usuario] || 'email@example.com'
    }

    const getNombreCompleto = (usuario) => {
      return userNameMap[usuario] || usuario
    }

    // URL de la API de rutinas Pick Basket
    const API_URL = 'https://rutinas.pickbasquet.com/api/v1/gym-routines/public/search'

    // Función para hacer merge inteligente de rutinas
    const mergeRutinasInteligente = (rutinasAntiguas, rutinasNuevas) => {
      try {
        // Crear copia de las rutinas nuevas (base)
        const rutinaMergeada = JSON.parse(JSON.stringify(rutinasNuevas))

        // Mergear cada día
        if (rutinasAntiguas.days && rutinasNuevas.days) {
          rutinaMergeada.days = rutinasNuevas.days.map(diaNuevo => {
            // Buscar día correspondiente en rutinas antiguas
            const diaAntiguo = rutinasAntiguas.days.find(d => d.dayNumber === diaNuevo.dayNumber)
            
            if (!diaAntiguo) {
              console.log(`📅 Día ${diaNuevo.dayNumber} es nuevo, usando datos de API`)
              return diaNuevo
            }

            // Mergear ejercicios del día
            const diaConMerge = { ...diaNuevo }
            
            if (diaAntiguo.items && diaNuevo.items) {
              diaConMerge.items = diaNuevo.items.map(ejercicioNuevo => {
                
                if (ejercicioNuevo.type === 'exercise') {
                  // Buscar ejercicio con mismo nombre en rutina antigua
                  const ejercicioAntiguo = diaAntiguo.items.find(e => 
                    e.type === 'exercise' && 
                    e.name === ejercicioNuevo.name
                  )

                  if (ejercicioAntiguo) {
                    // PRESERVAR pesos y notas del usuario
                    const ejercicioMergeado = { ...ejercicioNuevo }
                    
                    // Preservar pesos si el usuario los modificó
                    if (ejercicioAntiguo.peso !== undefined && ejercicioAntiguo.peso !== 0) {
                      ejercicioMergeado.peso = ejercicioAntiguo.peso
                      console.log(`💪 Preservando peso ${ejercicioAntiguo.peso}kg para "${ejercicioNuevo.name}"`)
                    }
                    
                    if (ejercicioAntiguo.pesoComplemento !== undefined && ejercicioAntiguo.pesoComplemento !== 0) {
                      ejercicioMergeado.pesoComplemento = ejercicioAntiguo.pesoComplemento
                      console.log(`➕ Preservando peso complemento ${ejercicioAntiguo.pesoComplemento}kg para "${ejercicioNuevo.name}"`)
                    }

                    // Preservar notas del usuario si las tenía modificadas
                    if (ejercicioAntiguo.notes && ejercicioAntiguo.notes.trim() !== '') {
                      // Solo preservar si son diferentes o más detalladas que las nuevas
                      if (ejercicioAntiguo.notes !== ejercicioNuevo.notes || !ejercicioNuevo.notes) {
                        ejercicioMergeado.notes = ejercicioAntiguo.notes
                        console.log(`📝 Preservando notas del usuario para "${ejercicioNuevo.name}"`)
                      }
                    }

                    // Si ya había notasUsuario, preservarlas
                    if (ejercicioAntiguo.notasUsuario) {
                      ejercicioMergeado.notasUsuario = ejercicioAntiguo.notasUsuario
                      console.log(`📝 Preservando notas de usuario existentes para "${ejercicioNuevo.name}"`)
                    }

                    // Preservar otros campos personalizados
                    if (ejercicioAntiguo.duracion && ejercicioAntiguo.duracion !== ejercicioNuevo.duracion) {
                      ejercicioMergeado.duracion = ejercicioAntiguo.duracion
                    }
                    
                    if (ejercicioAntiguo.velocidad && ejercicioAntiguo.velocidad !== ejercicioNuevo.velocidad) {
                      ejercicioMergeado.velocidad = ejercicioAntiguo.velocidad
                    }

                    return ejercicioMergeado
                  }
                }
                
                // Si no hay match o es un grupo, usar el nuevo
                console.log(`🆕 Ejercicio nuevo o modificado: "${ejercicioNuevo.name}"`)
                return ejercicioNuevo
              })
            }

            console.log(`✅ Día ${diaNuevo.dayNumber} mergeado correctamente`)
            return diaConMerge
          })
        }

        console.log('🎉 Merge inteligente completado exitosamente')
        return rutinaMergeada

      } catch (error) {
        console.error('❌ Error en merge inteligente:', error)
        return rutinasNuevas // Fallback a rutinas nuevas
      }
    }

    const actualizarDatos = async () => {
      isUpdating.value = true
      updateMessage.value = null

      try {
        const email = getEmailUsuario(selectedUser.value)
        
        console.log(`🔄 Iniciando actualización para ${selectedUser.value} (${email})`)

        // Verificar si la URL está configurada
        if (API_URL === 'https://tu-api.com/rutinas') {
          throw new Error('⚙️ Necesitas configurar la URL real de tu API en Perfil.vue línea 108')
        }

        // CREAR BACKUP antes de actualizar
        const rutinasKey = `rutinas_${selectedUser.value}`
        const rutinasActuales = localStorage.getItem(rutinasKey)
        
        if (rutinasActuales) {
          const backupKey = `rutinas_backup_${selectedUser.value}`
          const infoKey = `rutinas_backup_info_${selectedUser.value}`
          
          // Guardar backup
          localStorage.setItem(backupKey, rutinasActuales)
          
          // Guardar info del backup
          localStorage.setItem(infoKey, JSON.stringify({
            fecha: new Date().toLocaleDateString('es-AR'),
            timestamp: Date.now()
          }))
          
          console.log('💾 Backup creado antes de la actualización')
        }

        // Hacer petición HTTP
        const response = await fetch(`${API_URL}?email=${encodeURIComponent(email)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        
        console.log('📥 Respuesta recibida:', data)

        // Verificar que la respuesta tenga la estructura esperada
        if (!data.success || !data.data) {
          throw new Error('Formato de respuesta inválido')
        }

        // MERGE INTELIGENTE: Preservar pesos y notas del usuario si es la misma rutina
        const rutinasAnteriores = localStorage.getItem(rutinasKey)
        let datosMergeados = data.data

        if (rutinasAnteriores) {
          try {
            const rutinasAntes = JSON.parse(rutinasAnteriores)
            datosMergeados = mergeRutinasInteligente(rutinasAntes, data.data)
            console.log('🔄 Merge inteligente realizado - pesos y notas preservados')
          } catch (error) {
            console.warn('⚠️ Error en merge, usando datos nuevos:', error)
            datosMergeados = data.data
          }
        }

        // Guardar los datos mergeados en localStorage
        localStorage.setItem(rutinasKey, JSON.stringify(datosMergeados))
        
        console.log(`💾 Datos guardados localmente para ${selectedUser.value}`)

        // Emitir evento para que otros componentes se actualicen
        window.dispatchEvent(new CustomEvent('rutinasActualizadas', { 
          detail: { 
            usuario: selectedUser.value, 
            data: datosMergeados 
          } 
        }))

        updateMessage.value = {
          type: 'success',
          text: `✅ Rutina actualizada correctamente (${datosMergeados.days?.length || 0} días cargados)`
        }

        console.log('🎉 Actualización completada exitosamente')

      } catch (error) {
        console.error('❌ Error al actualizar datos:', error)
        
        let errorMessage = error.message
        
        // Mensajes de error más claros
        if (error.message.includes('fetch')) {
          if (API_URL === 'https://tu-api.com/rutinas') {
            errorMessage = '⚙️ Necesitas configurar la URL real de tu API'
          } else {
            errorMessage = `🌐 No se pudo conectar a la API: ${API_URL}`
          }
        } else if (error.message.includes('CORS')) {
          errorMessage = '🚫 Error de CORS: La API debe permitir peticiones desde tu dominio'
        }
        
        updateMessage.value = {
          type: 'error',
          text: `❌ ${errorMessage}`
        }
      } finally {
        isUpdating.value = false
        
        // Limpiar mensaje después de 8 segundos para errores de configuración
        setTimeout(() => {
          updateMessage.value = null
        }, 8000)
      }
    }

    const restaurarRutinaAnterior = async () => {
      isRestoring.value = true
      updateMessage.value = null

      try {
        const backupKey = `rutinas_backup_${selectedUser.value}`
        const rutinasKey = `rutinas_${selectedUser.value}`
        
        const backup = localStorage.getItem(backupKey)
        
        if (!backup) {
          throw new Error('No se encontró backup anterior')
        }

        console.log(`🔙 Restaurando rutina anterior para ${selectedUser.value}`)

        // Restaurar desde backup
        localStorage.setItem(rutinasKey, backup)
        
        console.log('💾 Rutina anterior restaurada exitosamente')

        // Emitir evento para que otros componentes se actualicen
        const backupData = JSON.parse(backup)
        window.dispatchEvent(new CustomEvent('rutinasActualizadas', { 
          detail: { 
            usuario: selectedUser.value, 
            data: backupData 
          } 
        }))

        updateMessage.value = {
          type: 'success',
          text: `🔙 Rutina anterior restaurada correctamente (${backupData.days?.length || 0} días)`
        }

        console.log('🎉 Restauración completada exitosamente')

      } catch (error) {
        console.error('❌ Error al restaurar rutina:', error)
        
        updateMessage.value = {
          type: 'error',
          text: `❌ Error: ${error.message}`
        }
      } finally {
        isRestoring.value = false
        
        // Limpiar mensaje después de 5 segundos
        setTimeout(() => {
          updateMessage.value = null
        }, 5000)
      }
    }

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
      selectedUser,
      isUpdating,
      isRestoring,
      updateMessage,
      tieneBackup,
      backupInfo,
      ultimaActualizacion,
      setTheme,
      actualizarDatos,
      restaurarRutinaAnterior,
      getEmailUsuario,
      getNombreCompleto
    }
  }
}
</script> 