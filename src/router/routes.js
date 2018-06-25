import Vue from 'vue'
import Router from 'vue-router'

// Routes
import AccountsView from '@/router/views/Accounts-view'
import AccountsSelectionView from '@/router/views/Accounts-selection-view'
import AppsView from '@/router/views/Apps-view'
import DashboardView from '@/router/views/Dashboard-view'
import LoginView from '@/router/views/Login-view'
import { store } from '@/store/store'
import userMixin from '@/mixins/userMixin'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/panel',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/panel/accounts',
      name: 'accounts',
      component: AccountsView
    },
    {
      path: '/panel/apps',
      name: 'apps',
      component: AppsView
    },
    {
      path: '/panel/accounts-selection',
      name: 'accounts_selection',
      component: AccountsSelectionView
    },
    {
      path: '/panel/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/panel/logout',
      name: 'logout',
      component: LoginView
    },
    {
      path: '/',
      redirect: '/panel'
    }
  ],
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  if (to.name === 'logout') {
    store.dispatch('logout')
    next()
  }

  // SI EXISTE EN EL LOCAL STORE EL REMEMBER ME y EL TOKEN, CUENTA ACTIVA, SETEARLO ANTES

  // console.log('rememberMe: ' + localStorage.getItem('rememberMe'))
  // console.log('is logged')
  // console.log(store.getters.isLogged)
  // console.log(localStorage.getItem('rememberMe'))
  // console.log(localStorage.getItem('token'))

  store.dispatch('setUserTokenChecking', false)
  if (!store.getters.isLogged && typeof localStorage.getItem('rememberMe') !== 'undefined' &&
      localStorage.getItem('rememberMe') !== null && typeof localStorage.getItem('token') !== 'undefined' && localStorage.getItem('token') !== null) {
    store.dispatch('setUserTokenChecking', true)
    userMixin.apollo.userByToken.skip = false
  }

  // comprobamos a que ruta debe ir
  if (to.name !== 'login' && to.name !== 'accounts_selection' && !store.getters.isLogged) {
    next('/panel/login')
  } else {
    if (to.name === 'login' && store.getters.isLogged) {
      next('/panel')
    }
    next()
  }
})

export default router
