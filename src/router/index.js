import Vue from 'vue'
import Router from 'vue-router'
import Contacto from '@/components/Contacto'
import Info from '@/components/Info'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'contacto',
      component: Contacto
    },
    {
      path: '/info',
      name: 'info',
      component: Info
    }
  ]
})
