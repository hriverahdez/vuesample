// Vue import
import Vue from 'vue'

// Apollo import
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'

// Main component import
import App from './App'

// Router import
import router from './router'

// Store import
import { store } from './store.js'

// vue-i18n import
import {i18n} from './i18n'

// Vuetify import
import '@/libs/vuetify'

// Chartkick import
import '@/libs/chartkick'

// Apollo config
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

Vue.config.productionTip = false

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  provide: apolloProvider.provide(),
  components: { App },
  template: '<App/>'
})
