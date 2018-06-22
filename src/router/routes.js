import Vue from 'vue'
import Router from 'vue-router'

// Routes
import AccountsView from '@/router/views/Accounts-view'
import AccountsSelectionView from '@/router/views/Accounts-selection-view'
import AppsView from '@/router/views/Apps-view'
import Contacto from '@/components/Contacto'
import DashboardView from '@/router/views/Dashboard-view'
import DashboardPrueba from '@/components/Dashboard'
import LoginView from '@/router/views/Login-view'
import { store } from '@/store/store'

Vue.use(Router)

const router = new Router({
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
      path: '/accounts-selection',
      name: 'accounts_selection',
      component: AccountsSelectionView
    },
    {
      path: '/apps',
      name: 'apps',
      component: AppsView
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
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/logout',
      name: 'logout',
      component: LoginView,
      beforeEnter (to, from, next) {
        store.dispatch('logout')
        next('/login')
      }
    }
  ],
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  // SI EXISTE EN EL LOCAL STORE EL REMEMBER ME y EL TOKEN, CUENTA ACTIVA, SETEARLO ANTES

  if (!store.getters.isLogged && typeof localStorage.getItem('rememberMe') !== 'undefined' &&
      typeof localStorage.getItem('token') !== 'undefined') {
    // TODO: hacer una consulta al servidor y cargar de nuevo el user en el store / cuenta activa
    // remember me y token -> pasando el token en una consulta graphql, que nos devuelva el user asociado si existe
  }

  // comprobamos a que ruta debe ir
  if (to.name !== 'login' && to.name !== 'accounts_selection' && !store.getters.isLogged) {
    next('/login')
  } else {
    if (to.name === 'login' && store.getters.isLogged) {
      next('/')
    }
    next()
  }
})

export default router
