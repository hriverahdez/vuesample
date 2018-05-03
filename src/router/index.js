import Vue from 'vue'
import Router from 'vue-router'

// Routes
import Contacto from '@/components/Contacto'
import Dashboard from '../views/Dashboard-view'
import DashboardPrueba from '@/components/Dashboard'
import Info from '@/components/Info'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/dashboard',
      name: 'dashboard-prueba',
      component: DashboardPrueba
    },
    {
      path: '/info',
      name: 'info',
      component: Info
    },
    {
      path: '/contacto',
      name: 'contacto',
      component: Contacto
    }
  ]
})
