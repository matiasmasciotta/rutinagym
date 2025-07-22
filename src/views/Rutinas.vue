<template>
  <div class="p-4 space-y-6">
    <!-- Selector de días -->
    <div class="grid grid-cols-3 gap-4">
      <button
        v-for="dia in rutinasUsuario.days || []"
        :key="'dia' + dia.dayNumber"
        @click="diaSeleccionado = 'dia' + dia.dayNumber"
        class="p-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105"
        :class="diaSeleccionado === 'dia' + dia.dayNumber 
          ? 'bg-gradient-modern text-white shadow-xl shadow-purple-500/30 border-2 border-transparent' 
          : 'bg-gradient-to-r from-gym-gray to-gym-light-gray text-white hover:bg-gradient-to-r hover:from-gym-light-gray hover:to-gym-card shadow-lg border-2 border-gym-light-gray/30'"
      >
        {{ getNombreDia('dia' + dia.dayNumber) }}
      </button>
    </div>

    <!-- Rutina del día seleccionado -->
    <div v-if="rutinaActual" class="space-y-4">
      <!-- Título del día -->
      <div class="text-center">
        <div v-if="editingTitulo" class="space-y-3">
          <input
            v-model="rutinaActual.titulo"
            class="input-gym text-center text-2xl font-bold bg-transparent border-2 border-gym-cyan"
            placeholder="Título de la rutina"
          />
          <div class="flex justify-center space-x-2">
            <button
              @click="guardarTitulo"
              class="btn-primary"
            >
              💾 Guardar
            </button>
            <button
              @click="cancelarEdicionTitulo"
              class="btn-secondary"
            >
              ❌ Cancelar
            </button>
          </div>
        </div>
        <div v-else class="flex items-center justify-center space-x-3">
          <h2 class="text-3xl title-impact routine-title">
            {{ rutinaActual.titulo }}
          </h2>
          <button
            @click="toggleEditingTitulo"
            class="text-gym-cyan hover:text-gym-green transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
          </button>
        </div>
        
        <!-- Información de fecha y modificaciones -->
        <div v-if="infoRutina" class="text-center mt-2 space-y-1">
          <div class="flex items-center justify-center space-x-2">
            <svg class="w-4 h-4 text-gym-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4M3 7h18v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"></path>
            </svg>
            <span class="text-gray-300 text-sm">{{ infoRutina.fecha }}</span>
          </div>
          <div v-if="infoRutina.modificadaPorUsuario" class="flex items-center justify-center space-x-1">
            <svg class="w-3 h-3 text-gym-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
            <span class="text-yellow-400 text-xs">Modificada por usuario</span>
          </div>
        </div>
      </div>

      <!-- Calentamiento -->
      <div v-if="rutinaActual.calentamiento" class="card-gym">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-lg font-semibold text-gym-yellow flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            Calentamiento
          </h3>
          <button
            @click="toggleEditingCalentamiento()"
            class="text-gym-yellow hover:text-gym-green transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
          </button>
        </div>
        
        <div v-if="editingCalentamiento" class="space-y-3">
          <div>
            <label class="text-sm font-semibold text-gym-yellow">Ejercicio:</label>
            <textarea
              v-model="rutinaActual.calentamiento.ejercicio"
              class="input-gym w-full mt-1 resize-none"
              rows="2"
              placeholder="Descripción del calentamiento"
            />
          </div>
          <div>
            <label class="text-sm font-semibold text-gym-yellow">Duración:</label>
            <input
              v-model="rutinaActual.calentamiento.duracion"
              class="input-gym w-full mt-1"
              placeholder="ej: 5-10 minutos, 4 series de 30 segundos"
            />
          </div>
          <div>
            <label class="text-sm font-semibold text-gym-yellow">Descanso:</label>
            <input
              v-model="rutinaActual.calentamiento.descanso"
              class="input-gym w-full mt-1"
              placeholder="ej: 30 seg entre series"
            />
          </div>
          <div class="flex space-x-2">
            <button
              @click="guardarCalentamiento"
              class="btn-primary flex-1"
            >
              💾 Guardar
            </button>
            <button
              @click="cancelarEdicionCalentamiento"
              class="btn-secondary"
            >
              ❌ Cancelar
            </button>
          </div>
        </div>
        
        <div v-else class="space-y-3">
          <p class="text-white font-medium">{{ rutinaActual.calentamiento.ejercicio }}</p>
          <div class="space-y-2">
            <div v-if="rutinaActual.calentamiento.duracion" class="info-badge duracion-badge">
              ⏱️ Duración: {{ rutinaActual.calentamiento.duracion }}
            </div>
            <div v-if="rutinaActual.calentamiento.descanso" class="info-badge series-badge">
              ⏸️ Descanso: {{ rutinaActual.calentamiento.descanso }}
            </div>
          </div>
        </div>
      </div>

      <!-- Ejercicios -->
      <div class="space-y-4">
        <div
          v-for="ejercicio in rutinaActual.items"
          :key="ejercicio._id"
          class="card-gym"
        >
          <!-- Ejercicio individual -->
          <div v-if="ejercicio.type === 'exercise'">
            <div class="flex items-start justify-between mb-3">
              <h4 class="text-lg font-semibold text-white flex-1">
                {{ ejercicio.name }}
              </h4>
              <button
                @click="toggleEditing(ejercicio._id)"
                class="text-gym-cyan hover:text-gym-green transition-colors ml-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <!-- Grupo de ejercicios -->
          <div v-else-if="ejercicio.type === 'group'">
            <div class="flex items-start justify-between mb-3">
              <h4 class="text-lg font-semibold text-gym-yellow flex-1">
                🏋️‍♀️ {{ ejercicio.name }}
              </h4>
              <button
                @click="toggleEditing(ejercicio._id)"
                class="text-gym-cyan hover:text-gym-green transition-colors ml-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
              </button>
            </div>
            
            <!-- Ejercicios del grupo -->
            <div class="space-y-3 ml-4 border-l-2 border-gym-yellow/30 pl-4">
              <div v-for="subEjercicio in ejercicio.exercises" :key="subEjercicio._id" class="bg-gym-gray/50 p-3 rounded-lg">
                <h5 class="font-semibold text-white mb-3">{{ subEjercicio.name }}</h5>
                <div class="space-y-2">
                  <div class="info-badge series-badge">
                    🔄 Series: {{ subEjercicio.series }}
                  </div>
                  <div class="info-badge reps-badge">
                    ⚡ Reps: {{ subEjercicio.repetitions }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Información del ejercicio (solo para exercises, no groups) -->
          <div v-if="ejercicio.type === 'exercise'" class="space-y-3">
            <!-- Nombre del ejercicio (editable) -->
            <div class="space-y-2">
              <span class="text-gray-400 font-semibold text-sm">Ejercicio:</span>
              <div v-if="editingId === ejercicio._id">
                <textarea
                  v-model="ejercicio.name"
                  class="input-gym w-full resize-none"
                  rows="2"
                  placeholder="Nombre del ejercicio"
                />
              </div>
            </div>

            <!-- Pesos - Diseño mejorado -->
            <div class="space-y-2 my-4">
              <!-- Peso principal -->
              <div v-if="editingId === ejercicio._id" class="text-center space-y-2">
                <span class="text-gym-orange font-semibold text-sm">Peso:</span>
                <div class="flex items-center space-x-2">
                  <input
                    v-model.number="ejercicio.peso"
                    type="number"
                    min="0"
                    step="0.5"
                    class="input-gym w-20 text-center"
                  />
                  <span class="text-gray-300 text-sm">kg</span>
                </div>
              </div>
              <div v-else class="info-badge peso-badge">
                🏋️ Peso: {{ ejercicio.peso > 0 ? ejercicio.peso + ' kg' : 'Sin peso' }}
              </div>
              
              <!-- Peso complemento -->
              <div v-if="ejercicio.pesoComplemento || editingId === ejercicio._id">
                <div v-if="editingId === ejercicio._id" class="text-center space-y-2">
                  <span class="text-gym-pink font-semibold text-sm">Peso comp:</span>
                  <div class="flex items-center space-x-2">
                    <input
                      v-model.number="ejercicio.pesoComplemento"
                      type="number"
                      min="0"
                      step="0.5"
                      class="input-gym w-20 text-center"
                      placeholder="0"
                    />
                    <span class="text-gray-300 text-sm">kg</span>
                  </div>
                </div>
                <div v-else-if="ejercicio.pesoComplemento" class="info-badge velocidad-badge">
                  ➕ Peso Comp: {{ ejercicio.pesoComplemento }} kg
                </div>
              </div>
            </div>

            <!-- Series y Repeticiones - Diseño mejorado -->
            <div class="space-y-2 my-4">
              <!-- Series -->
              <div v-if="editingId === ejercicio._id" class="text-center space-y-2">
                <span class="text-gym-cyan font-semibold text-sm">Series:</span>
                <input
                  v-model.number="ejercicio.series"
                  type="number"
                  min="1"
                  max="10"
                  class="input-gym w-20 text-center"
                />
              </div>
              <div v-else class="info-badge series-badge">
                🔄 Series: {{ ejercicio.series }}
              </div>
              
              <!-- Repeticiones -->
              <div v-if="editingId === ejercicio._id" class="text-center space-y-2">
                <span class="text-gym-green font-semibold text-sm">Reps:</span>
                <input
                  v-model="ejercicio.repetitions"
                  type="text"
                  class="input-gym w-full"
                  placeholder="ej: 12, 12+10+8, al fallo"
                />
              </div>
              <div v-else class="info-badge reps-badge">
                ⚡ Reps: {{ ejercicio.repetitions }}
              </div>
            </div>

            <!-- Duración y Velocidad - Diseño mejorado -->
            <div v-if="(ejercicio.duracion && !tieneRepeticionesConTiempo(ejercicio.repetitions)) || ejercicio.velocidad || editingId === ejercicio._id" class="space-y-2 my-4">
              <!-- Duración -->
              <div v-if="(ejercicio.duracion && !tieneRepeticionesConTiempo(ejercicio.repetitions)) || editingId === ejercicio._id">
                <div v-if="editingId === ejercicio._id" class="text-center space-y-2">
                  <span class="text-gym-yellow font-semibold text-sm">Duración:</span>
                  <input
                    v-model="ejercicio.duracion"
                    type="text"
                    class="input-gym w-full"
                    placeholder="ej: 30 seg, 1 min"
                  />
                </div>
                <div v-else-if="ejercicio.duracion && !tieneRepeticionesConTiempo(ejercicio.repetitions)" class="info-badge duracion-badge">
                  ⏱️ Duración: {{ ejercicio.duracion }}
                </div>
              </div>
              
              <!-- Velocidad -->
              <div v-if="ejercicio.velocidad || editingId === ejercicio._id">
                <div v-if="editingId === ejercicio._id" class="text-center space-y-2">
                  <span class="text-gym-green font-semibold text-sm">Velocidad:</span>
                  <input
                    v-model="ejercicio.velocidad"
                    type="text"
                    class="input-gym w-full"
                    placeholder="ej: 8 km/h, moderada"
                  />
                </div>
                <div v-else-if="ejercicio.velocidad" class="info-badge velocidad-badge">
                  🚀 Velocidad: {{ ejercicio.velocidad }}
                </div>
              </div>
            </div>

            <!-- Descripción -->
            <div class="space-y-2 mt-4">
              <span class="text-gray-400 font-semibold text-sm">Notas:</span>
              <div v-if="editingId === ejercicio._id">
                <textarea
                  v-model="ejercicio.notes"
                  class="input-gym w-full resize-none"
                  rows="3"
                  placeholder="Descripción, técnica, consejos..."
                />
              </div>
              <div v-else class="space-y-2">
                <!-- Notas principales -->
                <div v-if="ejercicio.notes" class="mt-2">
                  <p class="notes-text text-gray-300">{{ ejercicio.notes }}</p>
                </div>
                
                <!-- Notas adicionales del usuario (si existen y son diferentes) -->
                <div v-if="ejercicio.notasUsuario && ejercicio.notasUsuario !== ejercicio.notes" class="mt-2">
                  <div class="flex items-center space-x-2 mb-1">
                    <svg class="w-3 h-3 text-gym-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                    <span class="text-yellow-400 text-xs">Mis notas:</span>
                  </div>
                  <p class="notes-text bg-gym-yellow/10 border border-gym-yellow/20 rounded p-2 text-yellow-100">{{ ejercicio.notasUsuario }}</p>
                </div>
                
                <!-- Mensaje cuando no hay notas -->
                <div v-if="!ejercicio.notes && !ejercicio.notasUsuario" class="text-gray-500 text-sm">Sin notas</div>
              </div>
            </div>
          </div>

          <!-- Botones de acción -->
          <div v-if="editingId === ejercicio._id" class="grid grid-cols-2 gap-2 mt-4">
            <button
              @click="guardarCambios"
              class="btn-primary"
            >
              💾 Guardar
            </button>
            <button
              @click="cancelarEdicion"
              class="btn-secondary"
            >
              ❌ Cancelar
            </button>
            <button
              @click="duplicarEjercicio(ejercicio)"
              class="btn-gym bg-gym-pink text-gym-dark"
            >
              📋 Duplicar
            </button>
            <button
              @click="eliminarEjercicio(ejercicio._id)"
              class="btn-gym bg-red-600 text-white hover:bg-red-700"
            >
              🗑️ Eliminar
            </button>
          </div>
        </div>

        <!-- Botón para agregar nuevo ejercicio -->
        <div class="text-center mt-6">
          <button
            @click="agregarEjercicio"
            class="btn-primary text-lg px-6 py-3"
          >
            ➕ Agregar Nuevo Ejercicio
          </button>
        </div>
      </div>
    </div>

    <!-- Estado vacío -->
    <div v-else class="text-center py-8">
      <p class="text-gray-400">No hay rutinas disponibles para este día</p>
      <button
        @click="crearRutinaDia"
        class="btn-primary mt-4"
      >
        ➕ Crear Rutina para este Día
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { rutinasData } from '../data/rutinas.js'

export default {
  name: 'Rutinas',
  setup() {
    const usuarioActual = ref(localStorage.getItem('selectedUser') || 'matias')
    const diaSeleccionado = ref(localStorage.getItem('diaSeleccionado') || 'dia1')
    const editingId = ref(null)
    const editingCalentamiento = ref(false)
    const editingTitulo = ref(false)
    const datosLocales = ref({})
    const calentamientoOriginal = ref({})
    const tituloOriginal = ref('')

    // Cargar datos del localStorage o usar datos por defecto
    const cargarDatos = () => {
      const datosGuardados = localStorage.getItem(`rutinas_${usuarioActual.value}`)
      if (datosGuardados) {
        datosLocales.value = JSON.parse(datosGuardados)
      } else {
        datosLocales.value = JSON.parse(JSON.stringify(rutinasData[usuarioActual.value]?.data)) || {}
      }
    }

    const rutinasUsuario = computed(() => {
      return datosLocales.value || {}
    })

    const rutinaActual = computed(() => {
      const dayNumber = parseInt(diaSeleccionado.value.replace('dia', ''))
      return rutinasUsuario.value.days?.find(day => day.dayNumber === dayNumber) || null
    })

    const infoRutina = computed(() => {
      if (!rutinasUsuario.value) return null

      try {
        // Obtener fecha de actualización
        let fechaActualizacion = null
        
        if (rutinasUsuario.value.updateDate) {
          fechaActualizacion = new Date(rutinasUsuario.value.updateDate)
        } else if (rutinasUsuario.value.updatedAt) {
          fechaActualizacion = new Date(rutinasUsuario.value.updatedAt)
        }

        let fechaFormateada = 'Sin fecha'
        if (fechaActualizacion && !isNaN(fechaActualizacion)) {
          const opciones = {
            year: 'numeric',
            month: 'long', 
            day: 'numeric'
          }
          fechaFormateada = fechaActualizacion.toLocaleDateString('es-AR', opciones)
        }

        // Detectar si fue modificada por el usuario
        // Si existe un flag de modificación local o si no coincide con datos originales
        const modificacionLocalKey = `rutinas_modificada_${usuarioActual.value}`
        const fueModificadaLocalmente = localStorage.getItem(modificacionLocalKey) === 'true'

        return {
          fecha: fechaFormateada,
          modificadaPorUsuario: fueModificadaLocalmente
        }

      } catch (error) {
        console.error('Error al obtener info de rutina:', error)
        return null
      }
    })

    const getNombreDia = (dia) => {
      const nombres = {
        dia1: 'Día 1',
        dia2: 'Día 2',
        dia3: 'Día 3'
      }
      return nombres[dia] || dia
    }

    const toggleEditing = (id) => {
      editingId.value = editingId.value === id ? null : id
    }

    const guardarCambios = () => {
      localStorage.setItem(`rutinas_${usuarioActual.value}`, JSON.stringify(datosLocales.value))
      
      // Marcar que fue modificada localmente por el usuario
      const modificacionLocalKey = `rutinas_modificada_${usuarioActual.value}`
      localStorage.setItem(modificacionLocalKey, 'true')
      
      editingId.value = null
      console.log(`💾 Rutina modificada localmente por el usuario: ${usuarioActual.value}`)
    }

    const cancelarEdicion = () => {
      // Recargar datos para cancelar cambios
      cargarDatos()
      editingId.value = null
    }

    const agregarEjercicio = () => {
      if (!rutinaActual.value) {
        crearRutinaDia()
      }
      
      const nuevoId = Date.now().toString()
      const nuevoEjercicio = {
        _id: nuevoId,
        type: "exercise",
        name: "Nuevo Ejercicio",
        series: 3,
        repetitions: "12",
        peso: 0,
        pesoComplemento: 0,
        notes: "",
        exercises: []
      }
      
      rutinaActual.value.items.push(nuevoEjercicio)
      editingId.value = nuevoId
      localStorage.setItem(`rutinas_${usuarioActual.value}`, JSON.stringify(datosLocales.value))
      
      // Marcar que fue modificada localmente por el usuario
      const modificacionLocalKey = `rutinas_modificada_${usuarioActual.value}`
      localStorage.setItem(modificacionLocalKey, 'true')
      
      console.log(`➕ Ejercicio agregado localmente por el usuario: ${usuarioActual.value}`)
    }

    const duplicarEjercicio = (ejercicio) => {
      const nuevoId = Date.now().toString()
      const ejercicioDuplicado = {
        ...ejercicio,
        _id: nuevoId,
        name: ejercicio.name + " (Copia)"
      }
      
      rutinaActual.value.items.push(ejercicioDuplicado)
      editingId.value = nuevoId
      localStorage.setItem(`rutinas_${usuarioActual.value}`, JSON.stringify(datosLocales.value))
      
      // Marcar que fue modificada localmente por el usuario
      const modificacionLocalKey = `rutinas_modificada_${usuarioActual.value}`
      localStorage.setItem(modificacionLocalKey, 'true')
      
      console.log(`📋 Ejercicio duplicado localmente por el usuario: ${usuarioActual.value}`)
    }

    const eliminarEjercicio = (id) => {
      if (confirm('¿Estás seguro de que quieres eliminar este ejercicio?')) {
        const index = rutinaActual.value.items.findIndex(e => e._id === id)
        if (index > -1) {
          rutinaActual.value.items.splice(index, 1)
          editingId.value = null
          localStorage.setItem(`rutinas_${usuarioActual.value}`, JSON.stringify(datosLocales.value))
          
          // Marcar que fue modificada localmente por el usuario
          const modificacionLocalKey = `rutinas_modificada_${usuarioActual.value}`
          localStorage.setItem(modificacionLocalKey, 'true')
          
          console.log(`🗑️ Ejercicio eliminado localmente por el usuario: ${usuarioActual.value}`)
        }
      }
    }

    const crearRutinaDia = () => {
      const dayNumber = parseInt(diaSeleccionado.value.replace('dia', ''))
      if (!datosLocales.value.days) {
        datosLocales.value.days = []
      }
      
      const existingDay = datosLocales.value.days.find(day => day.dayNumber === dayNumber)
      if (!existingDay) {
        const nuevoDia = {
          dayNumber: dayNumber,
          muscularGroups: ["NUEVO GRUPO"],
          items: [],
          titulo: `Rutina ${getNombreDia(diaSeleccionado.value)}`,
          calentamiento: {
            ejercicio: "Calentamiento general",
            duracion: "5-10 minutos",
            descanso: "30 seg entre series"
          },
          _id: Date.now().toString()
        }
        datosLocales.value.days.push(nuevoDia)
        localStorage.setItem(`rutinas_${usuarioActual.value}`, JSON.stringify(datosLocales.value))
        
        // Marcar que fue modificada localmente por el usuario
        const modificacionLocalKey = `rutinas_modificada_${usuarioActual.value}`
        localStorage.setItem(modificacionLocalKey, 'true')
        
        console.log(`📅 Nueva rutina de día creada localmente por el usuario: ${usuarioActual.value}`)
      }
    }

    const toggleEditingCalentamiento = () => {
      if (editingCalentamiento.value) {
        cancelarEdicionCalentamiento()
      } else {
        calentamientoOriginal.value = JSON.parse(JSON.stringify(rutinaActual.value.calentamiento))
        editingCalentamiento.value = true
      }
    }

    const guardarCalentamiento = () => {
      editingCalentamiento.value = false
      localStorage.setItem(`rutinas_${usuarioActual.value}`, JSON.stringify(datosLocales.value))
      
      // Marcar que fue modificada localmente por el usuario
      const modificacionLocalKey = `rutinas_modificada_${usuarioActual.value}`
      localStorage.setItem(modificacionLocalKey, 'true')
      
      console.log(`💾 Calentamiento modificado localmente por el usuario: ${usuarioActual.value}`)
    }

    const cancelarEdicionCalentamiento = () => {
      if (calentamientoOriginal.value) {
        rutinaActual.value.calentamiento = calentamientoOriginal.value
      }
      editingCalentamiento.value = false
    }

    const toggleEditingTitulo = () => {
      if (editingTitulo.value) {
        cancelarEdicionTitulo()
      } else {
        tituloOriginal.value = rutinaActual.value.titulo
        editingTitulo.value = true
      }
    }

    const guardarTitulo = () => {
      editingTitulo.value = false
      localStorage.setItem(`rutinas_${usuarioActual.value}`, JSON.stringify(datosLocales.value))
      
      // Marcar que fue modificada localmente por el usuario
      const modificacionLocalKey = `rutinas_modificada_${usuarioActual.value}`
      localStorage.setItem(modificacionLocalKey, 'true')
      
      console.log(`💾 Título modificado localmente por el usuario: ${usuarioActual.value}`)
    }

    const cancelarEdicionTitulo = () => {
      rutinaActual.value.titulo = tituloOriginal.value
      editingTitulo.value = false
    }

    // Función para detectar si las repeticiones contienen tiempo
    const tieneRepeticionesConTiempo = (repetitions) => {
      if (!repetitions) return false
      const repetitionsStr = repetitions.toString().toLowerCase()
      const palabrasTiempo = ['minuto', 'min', 'segundo', 'seg', 'hora', 'hr', 'h', 'segundo', 'segundos', 'minutos', 'horas']
      return palabrasTiempo.some(palabra => repetitionsStr.includes(palabra))
    }

    const handleUserChange = (event) => {
      usuarioActual.value = event.detail
      cargarDatos()
    }

    const handleRutinasActualizadas = (event) => {
      if (event.detail.usuario === usuarioActual.value) {
        console.log(`🔄 Recargando rutinas para ${usuarioActual.value}`)
        cargarDatos()
        
        // Limpiar flag de modificación local ya que se actualizó desde la API
        const modificacionLocalKey = `rutinas_modificada_${usuarioActual.value}`
        localStorage.removeItem(modificacionLocalKey)
        console.log(`🆕 Flag de modificación local limpiado para ${usuarioActual.value}`)
      }
    }

    // Watcher para guardar el día seleccionado en localStorage
    watch(diaSeleccionado, (nuevoDia) => {
      localStorage.setItem('diaSeleccionado', nuevoDia)
    })

    onMounted(() => {
      cargarDatos()
      window.addEventListener('userChanged', handleUserChange)
      window.addEventListener('rutinasActualizadas', handleRutinasActualizadas)
    })

    onUnmounted(() => {
      window.removeEventListener('userChanged', handleUserChange)
      window.removeEventListener('rutinasActualizadas', handleRutinasActualizadas)
    })

    return {
      diaSeleccionado,
      rutinasUsuario,
      rutinaActual,
      editingId,
      editingCalentamiento,
      editingTitulo,
      getNombreDia,
      toggleEditing,
      guardarCambios,
      cancelarEdicion,
      agregarEjercicio,
      duplicarEjercicio,
      eliminarEjercicio,
      crearRutinaDia,
      toggleEditingCalentamiento,
      guardarCalentamiento,
      cancelarEdicionCalentamiento,
      toggleEditingTitulo,
      guardarTitulo,
      cancelarEdicionTitulo,
      tieneRepeticionesConTiempo,
      infoRutina
    }
  }
}
</script> 