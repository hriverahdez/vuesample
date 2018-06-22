// Vue import
import Vue from 'vue'

// Apollo import
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink, concat } from 'apollo-link'
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

// Vue-awesome
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

Vue.component('icon', Icon)

// Apollo config
const host = 'http://stage.do.linkitox.com/public/graphql'

const customFetch = (uri, options) => fetch(`${host}/${uri}`, options)

const dynLink = createHttpLink({
  fetch: customFetch
})

// add the authorization to the headers
const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: localStorage.getItem('token') || null
    }
  })
  return forward(operation)
})

const apolloClient = new ApolloClient({
  link: concat(authMiddleware, dynLink),
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
