# 💪 RutinaGym - App de Entrenamiento

Una aplicación web moderna para gestionar rutinas de gimnasio con cronómetros integrados, diseñada con Vue 3, Vite y Tailwind CSS.

## 🚀 Características

- **Tema Dark Estético**: Interfaz oscura con colores fluorescentes (cyan, verde, amarillo, rosa, naranja)
- **4 Perfiles de Usuario**: Matías 💪, Marisa 🏋️‍♀️, Sara 🤸‍♀️, Carla 🏃‍♀️
- **Rutinas Detalladas**: Cada día con calentamiento y ejercicios específicos
- **Pesos Editables**: Modifica kg de mancuernas y discos, guardado en localStorage
- **Cronómetros Inteligentes**: Temporizadores de entrenamiento y descanso
- **Navegación Móvil**: Footer con iconos tipo app móvil
- **Cronómetro Flotante**: Persiste entre secciones mostrando tiempo actual

## 📱 Secciones

### 1. Rutinas 
- Ver rutinas por días (Día 1, Día 2, Día 3)
- Editar pesos de ejercicios
- Información detallada de cada ejercicio
- Calentamientos específicos

### 2. Cronómetros
- Cronómetro principal con modo entrenamiento/descanso  
- Configuración personalizada de tiempos
- Presets rápidos (30s/1min, 1min/1.5min, etc.)
- Estadísticas de sesión
- Cronómetro flotante visible en todas las secciones

### 3. Perfil
- Logo y información de la aplicación
- Características principales

## 🏋️‍♂️ Rutinas Incluidas

**Matías** (Ejemplo completo):
- **Día 1**: Pecho y Bíceps (6 ejercicios + calentamiento)
- **Día 2**: Espalda y Tríceps (3 ejercicios + calentamiento) 
- **Día 3**: Piernas y Core (6 ejercicios + calentamiento)

**Otros usuarios** tienen rutinas básicas que puedes expandir editando `src/data/rutinas.js`

## 🛠️ Instalación y Uso

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo**:
   ```bash
   npm run dev
   ```

3. **Abrir en navegador**: http://localhost:3000

4. **Build para producción**:
   ```bash
   npm run build
   ```

## 🎨 Personalización

### Colores del tema
Los colores están definidos en `tailwind.config.js`:
- `gym-dark`: #0a0a0a (fondo principal)
- `gym-cyan`: #00ffff (cyan fluorescente)
- `gym-green`: #00ff00 (verde fluorescente)
- `gym-yellow`: #ffff00 (amarillo fluorescente)
- `gym-pink`: #ff00ff (rosa fluorescente)
- `gym-orange`: #ff8800 (naranja fluorescente)

### Agregar rutinas
Edita `src/data/rutinas.js` para agregar más días o ejercicios a cualquier usuario.

### Nuevos usuarios
Para agregar usuarios, modifica:
1. `src/data/rutinas.js` - Agrega datos del usuario
2. `src/App.vue` - Agrega opción en el selector

## 🔧 Tecnologías

- **Vue 3** - Framework principal
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Estilos y tema dark
- **Vue Router** - Navegación entre secciones
- **LocalStorage** - Persistencia de datos

## 📝 Funcionalidades Pendientes

- Más rutinas para usuarios secundarios
- Notificaciones sonoras en cronómetros
- Gráficos de progreso
- Export/import de rutinas
- Modo offline completo

¡Entrena duro! 💪🔥 