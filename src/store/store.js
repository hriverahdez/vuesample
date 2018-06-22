import Vue from 'vue'
import Vuex from 'vuex'

// Module imports
import accountModule from '@/store/modules/accountModule'
import appModule from '@/store/modules/appModule'
import configModule from '@/store/modules/configModule'
import dialogAlertModule from '@/store/modules/dialogAlert'
import globalModule from '@/store/modules/globalModule'
// import endpointModule from '@/store/modules/endpoint'
import reportModule from '@/store/modules/reportModule'
import translationsModule from '@/store/modules/translations'
import userModule from '@/store/modules/userModule'

// Vuex
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    accountId: '5b10f0d09a5fd6245f658384',
    DAU: false
  },
  getters: {
    checkDAUState (state) {
      return state.DAU
    },
    accountIdGetter (state) {
      return state.accountId
    }
  },
  modules: {
    accountModule,
    appModule,
    configModule,
    dialogAlertModule,
    globalModule,
    // endpointModule,
    reportModule,
    translationsModule,
    userModule
  }
})
