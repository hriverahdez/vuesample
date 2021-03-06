// Vue import
import Vue from 'vue'

// Apollo import
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'
import { ApolloLink, concat } from 'apollo-link'
import VueApollo from 'vue-apollo'

// Vue filters
import Vue2Filters from 'vue2-filters'

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

Vue.use(Vue2Filters)

// Apollo config
const host = `${process.env.API_BASE_URL}/public/graphql`

const introspectionQueryResultData = require('./fragmentTypes.json')

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
})

const customFetch = (uri, options) => fetch(`${host}/${uri}`, options)

const dynLink = createHttpLink({
  fetch: customFetch
})

// add the authorization to the headers
const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      auth: 'mazinga ' + localStorage.getItem('token') || null,
      account: localStorage.getItem('activeAccount') || null
    }
  })
  return forward(operation)
})

const apolloClient = new ApolloClient({
  link: concat(authMiddleware, dynLink),
  cache: new InMemoryCache({fragmentMatcher}),
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

Vue.filter('noneValueCharacter', (val) => {
  if (val) {
    return val
  } else {
    return '-'
  }
})

Vue.filter('percentageFormat', function (val) {
  if (val) {
    return `${val.toFixed(2).replace('.', ',')}%`
  } else {
    return false
  }
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
