export const rutinasData = {
  matias: {
    nombre: "Matías",
    emoji: "💪",
    rutinas: {
      "dia1": {
        titulo: "Pecho y Bíceps",
        calentamiento: {
          ejercicio: "Planchas + Flexiones de brazo",
          duracion: "4 planchas de 30 segundos con 10 flexiones",
          descanso: "30 seg entre series"
        },
        ejercicios: [
          {
            id: 1,
            nombre: "Pecho plano en banco + Contracción con disco",
            peso: 60,
            pesoComplemento: 10,
            repeticiones: "12 + 12 + 10 + 10",
            series: 4,
            descripcion: "Pecho plano (60KG) + Contracción disco 12 reps (10kg)"
          },
          {
            id: 2,
            nombre: "Press Inclinado mancuernas + Press cerrado",
            peso: 20,
            pesoComplemento: 8,
            repeticiones: "12",
            series: 4,
            descripcion: "Press inclinado (20kg) + Press cerrado (8kg)"
          },
          {
            id: 3,
            nombre: "Apertura inclinada + Cierre mancuerna",
            peso: 15,
            repeticiones: "12",
            series: 4,
            descripcion: "Apertura inclinada (15kg) + Cierre 12 reps"
          },
          {
            id: 4,
            nombre: "Bíceps con barra W",
            peso: 20,
            repeticiones: "12 + 12 + 10 + 10",
            series: 4,
            descripcion: "Bíceps barra W (20kg)"
          },
          {
            id: 5,
            nombre: "Bíceps alternado mancuerna",
            peso: 20,
            repeticiones: "12",
            series: 4,
            descripcion: "Bíceps alternado (20kg)"
          },
          {
            id: 6,
            nombre: "Bíceps en TRX",
            peso: 0,
            repeticiones: "al fallo",
            series: 4,
            descripcion: "Bíceps TRX hasta el fallo"
          }
        ]
      },
      "dia2": {
        titulo: "Espalda y Tríceps",
        calentamiento: {
          ejercicio: "Remo en TRX",
          repeticiones: "12",
          series: 4
        },
        ejercicios: [
          {
            id: 1,
            nombre: "Dominadas + Fondos en cajón",
            peso: 0,
            repeticiones: "al fallo",
            series: 4,
            descripcion: "Dominadas con banda + Fondos al fallo"
          },
          {
            id: 2,
            nombre: "Remo mancuerna + Patada burro",
            peso: 30,
            pesoComplemento: 8,
            repeticiones: "12",
            series: 4,
            descripcion: "Remo 1 brazo (30kg) + Patada burro (8kg) 10 reps"
          },
          {
            id: 3,
            nombre: "Press nuca + Tríceps copa",
            peso: 20,
            repeticiones: "4",
            series: 4,
            descripcion: "Press nuca agarre copa (20kg) + Tríceps copa (20kg) 10 reps"
          }
        ]
      },
      "dia3": {
        titulo: "Piernas y Core",
        calentamiento: {
          ejercicio: "Plancha frontal",
          duracion: "30 segundos x 30 descanso",
          series: 4
        },
        ejercicios: [
          {
            id: 1,
            nombre: "Elevación de piernas",
            peso: 0,
            repeticiones: "12",
            series: 4
          },
          {
            id: 2,
            nombre: "Rodilla al pecho TRX",
            peso: 0,
            repeticiones: "15",
            series: 4
          },
          {
            id: 3,
            nombre: "Sentadillas ISO",
            peso: 0,
            duracion: "1 minuto",
            series: 4
          },
          {
            id: 4,
            nombre: "Sentadillas con FITBALL",
            peso: 0,
            repeticiones: "15",
            series: 4
          },
          {
            id: 5,
            nombre: "Pistol al cajón",
            peso: 15,
            repeticiones: "12",
            series: 4,
            descripcion: "Con mancuerna 15kg"
          },
          {
            id: 6,
            nombre: "Peso muerto mancuernas",
            peso: 20,
            repeticiones: "12",
            series: 4,
            descripcion: "Mancuernas 20kg"
          }
        ]
      }
    }
  },
  marisa: {
    nombre: "Marisa",
    emoji: "🏋️‍♀️",
    rutinas: {
      "dia1": {
        titulo: "Cardio y Tonificación",
        calentamiento: {
          ejercicio: "Jumping Jacks + Burpees",
          duracion: "3 series de 20 segundos",
          descanso: "15 seg entre series"
        },
        ejercicios: [
          {
            id: 1,
            nombre: "Sentadillas con peso",
            peso: 15,
            repeticiones: "15",
            series: 3,
            descripcion: "Sentadillas con mancuerna (15kg)"
          },
          {
            id: 2,
            nombre: "Press de hombros",
            peso: 8,
            repeticiones: "12",
            series: 3,
            descripcion: "Press hombros mancuernas (8kg)"
          }
        ]
      },
      "dia2": {
        titulo: "Fuerza Superior",
        ejercicios: [
          {
            id: 1,
            nombre: "Flexiones modificadas",
            peso: 0,
            repeticiones: "10",
            series: 3
          }
        ]
      }
    }
  },
  sara: {
    nombre: "Sara",
    emoji: "🤸‍♀️",
    rutinas: {
      "dia1": {
        titulo: "Funcional y Flexibilidad",
        ejercicios: [
          {
            id: 1,
            nombre: "Yoga flow + Plancha",
            peso: 0,
            duracion: "5 minutos",
            series: 2
          }
        ]
      }
    }
  },
  carla: {
    nombre: "Carla",
    emoji: "🏃‍♀️",
    rutinas: {
      "dia1": {
        titulo: "Resistencia y Cardio",
        ejercicios: [
          {
            id: 1,
            nombre: "Correr en cinta",
            peso: 0,
            duracion: "20 minutos",
            velocidad: "8 km/h"
          }
        ]
      }
    }
  }
} 