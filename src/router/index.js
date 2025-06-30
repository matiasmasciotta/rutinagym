import { createRouter, createWebHistory } from 'vue-router'
import Rutinas from '../views/Rutinas.vue'
import Cronometros from '../views/Cronometros.vue'
import Perfil from '../views/Perfil.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/rutinas'
    },
    {
      path: '/rutinas',
      name: 'rutinas',
      component: Rutinas
    },
    {
      path: '/cronometros',
      name: 'cronometros',
      component: Cronometros
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: Perfil
    }
  ]
})

export default router 