import Vue from 'vue'

// Apollo
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'

// Vue instance
import App from './App'

// Router
import router from './router'

// Vuetify
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

// i18n
import { i18n } from './i18n'

// Apollo
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

// Vuetify
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
  i18n,
  provide: apolloProvider.provide(),
  components: { App },
  template: '<App/>'
})
