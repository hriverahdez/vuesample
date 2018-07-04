import Vue from 'vue'
import Router from 'vue-router'

// Routes
import AccountsView from '@/router/views/Accounts-view'
import AccountsSelectionView from '@/router/views/Accounts-selection-view'
import AdminUsersView from '@/router/views/Admin-users-view'
import AppsAdmobOauth from '@/router/views/Apps-admobOauth-view'
import AppsView from '@/router/views/Apps-view'
import DashboardView from '@/router/views/Dashboard-view'
import LoginView from '@/router/views/Login-view'
import { store } from '@/store/store'
// import userMixin from '@/mixins/userMixin'
import securityMixin from '@/mixins/securityMixin'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/panel',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true, roles: ['ROLE_USER', 'ROLE_STATS', 'ROLE_ADMIN', 'ROLE_ACCOUNT_MANAGER', 'ROLE_MULTI_ACCOUNT_MANAGER', 'ROLE_BLIND'] }
    },
    {
      path: '/panel/admobOauth',
      name: 'admobOauth',
      component: AppsAdmobOauth,
      meta: { requiresAuth: true, roles: ['ROLE_USER', 'ROLE_STATS', 'ROLE_ADMIN', 'ROLE_ACCOUNT_MANAGER', 'ROLE_MULTI_ACCOUNT_MANAGER', 'ROLE_BLIND'] }
    },
    {
      path: '/panel/accounts',
      name: 'accounts',
      component: AccountsView,
      meta: { requiresAuth: true, roles: ['ROLE_ADMIN'] }
    },
    {
      path: '/panel/admin/users',
      name: 'admin_users',
      component: AdminUsersView,
      meta: { requiresAuth: true, roles: ['ROLE_ADMIN'] }
    },
    {
      path: '/panel/apps',
      name: 'apps',
      component: AppsView,
      meta: { requiresAuth: true, roles: ['ROLE_ADMIN', 'ROLE_ACCOUNT_MANAGER', 'ROLE_MULTI_ACCOUNT_MANAGER'] }
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

  let rememberMe = (typeof localStorage.getItem('rememberMe') !== 'undefined' && localStorage.getItem('rememberMe') !== null)
  let existToken = (typeof localStorage.getItem('token') !== 'undefined' && localStorage.getItem('token') !== null)

  // SI EXISTE EN EL LOCAL STORE EL REMEMBER ME y EL TOKEN, CUENTA ACTIVA, SETEARLO ANTES
  store.dispatch('setUserTokenChecking', false)
  if (!store.getters.isLogged && rememberMe && existToken) {
    store.dispatch('setUserTokenChecking', true)
    store.dispatch('skipUserByTokenAction', false)
  }

  // comprobamos a que ruta debe ir
  if (to.name !== 'login' && (to.name !== 'accounts_selection' || (to.name === 'accounts_selection' && !rememberMe)) && !store.getters.isLogged && to.name !== 'admobOauth') {
    next('/panel/login')
  } else {
    if ((to.name === 'login' || !securityMixin.methods.isGranted(to, store)) && store.getters.isLogged) {
      console.log('redirijo al panel')
      next('/panel')
    }
    next()
  }
})

export default router
