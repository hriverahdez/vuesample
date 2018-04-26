// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import App from './App'
import router from './router'
import {
  Vuetify,
  VApp,
  VAvatar,
  VBtn,
  VCard,
  VDataTable,
  VDialog,
  VGrid,
  VIcon,
  VList,
  VNavigationDrawer,
  VTextField,
  VToolbar,
  VTooltip,
  transitions
} from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'

const httpLink = new HttpLink({
  uri: 'http://stage.do.linkitox.com/public/graphql/account'
})

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
})

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

Vue.use(Vuetify, {
  components: {
    VApp,
    VAvatar,
    VBtn,
    VCard,
    VDataTable,
    VDialog,
    VGrid,
    VIcon,
    VList,
    VNavigationDrawer,
    VTextField,
    VToolbar,
    VTooltip,
    transitions
  },
  theme: {
    primary: '#ee44aa',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  provide: apolloProvider.provide(),
  components: { App },
  template: '<App/>'
})
