import Vue from 'vue'
import Vuex from 'vuex'

// Module imports
import accountsModule from '@/store/modules/accounts'
import dialogAlertModule from '@/store/modules/dialogAlert'
import endpointModule from '@/store/modules/endpoint'
import reportModule from '@/store/modules/report'
import translationsModule from '@/store/modules/translations'

// Vuex
Vue.use(Vuex)

export const store = new Vuex.Store({
  // state: {
  //   stats: []
  // },
  modules: {
    accountsModule,
    dialogAlertModule,
    endpointModule,
    reportModule,
    translationsModule
  }
  // getters: {
  //   getStatsGetter (state) {
  //     return state.stats
  //   }
  // },
  // mutations: {
  //   getStatsMutation (state, data) {
  //     state.stats = data
  //   }
  // },
  // actions: {
  //   getStatsAction ({commit}, data) {
  //     store.commit('getStatsMutation', data)
  //   }
  // }
})
