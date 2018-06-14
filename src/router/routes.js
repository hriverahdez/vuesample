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

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
      beforeEnter: (to, from, next) => {
        console.log(store.getters.tokenGetter)
        if (store.getters.tokenGetter === '') {
          next('/login')
        } else {
          next()
        }
      }
    },
    {
      path: '/accounts',
      name: 'accounts',
      component: AccountsView,
      beforeEnter: (to, from, next) => {
        if (store.getters.tokenGetter === '') {
          next('/login')
        } else {
          next()
        }
      }
    },
    {
      path: '/accounts-selection',
      name: 'accounts_selection',
      component: AccountsSelectionView,
      beforeEnter: (to, from, next) => {
        console.log(store.getters.tokenGetter)
        if (store.getters.tokenGetter === '') {
          next('/login')
        } else {
          next()
        }
      }
    },
    {
      path: '/apps',
      name: 'apps',
      component: AppsView,
      beforeEnter: (to, from, next) => {
        if (store.getters.tokenGetter === '') {
          next('/login')
        } else {
          next()
        }
      }
    },
    {
      path: '/dashboard',
      name: 'prueba',
      component: DashboardPrueba,
      beforeEnter: (to, from, next) => {
        if (store.getters.tokenGetter === '') {
          next('/login')
        } else {
          next()
        }
      }
    },
    {
      path: '/contacto',
      name: 'contacto',
      component: Contacto,
      beforeEnter: (to, from, next) => {
        if (store.getters.tokenGetter === '') {
          next('/login')
        } else {
          next()
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      beforeEnter: (to, from, next) => {
        console.log(store)
        console.log(store.getters.tokenGetter)
        if (store.getters.tokenGetter !== '') {
          next('/')
        } else {
          next()
        }
      }
    },
    {
      path: '/logout',
      name: 'logout',
      component: LoginView,
      beforeRouteLeave (to, from, next) {
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
