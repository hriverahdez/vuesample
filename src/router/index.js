import Vue from 'vue'
import Router from 'vue-router'
import Contacto from '@/components/Contacto'
import Info from '@/components/Info'
import Dashboard from '@/components/Dashboard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
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
