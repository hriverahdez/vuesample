import Vue from 'vue'
import Router from 'vue-router'

// Routes
import AccountsView from '@/router/views/Accounts-view'
import Contacto from '@/components/Contacto'
import DashboardView from '@/router/views/Dashboard-view'
import DashboardPrueba from '@/components/Dashboard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/accounts',
      name: 'accounts',
      component: AccountsView
    },
    {
      path: '/dashboard',
      name: 'prueba',
      component: DashboardPrueba
    },
    {
      path: '/contacto',
      name: 'contacto',
      component: Contacto
    }
  ],
  mode: 'history'
})
