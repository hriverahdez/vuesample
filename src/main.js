// Vue import
import Vue from 'vue'

// Apollo import
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'

// Main component import
import App from '@/App'

// Router import
import router from '@/router/routes'

// Store import
import { store } from '@/store/store'

// vue-i18n import
import {i18n} from '@/config/i18n'

// Vuetify import
import '@/config/vuetify'

// Chartkick import
import '@/config/chartkick'

// Apollo config
const host = 'http://stage.do.linkitox.com/public/graphql'

const customFetch = (uri, options) => fetch(`${host}/${uri}`, options)

const dynLink = createHttpLink({
  fetch: customFetch
})

const apolloClient = new ApolloClient({
  link: dynLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
})

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

// Filters
Vue.filter('capitalize', (val) => {
  return val.charAt(0).toUpperCase() + val.slice(1)
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
