import Vue from 'vue'
import Vuex from 'vuex'

// Module imports
import accountModule from '@/store/modules/accountModule'
import appModule from '@/store/modules/appModule'
import configModule from '@/store/modules/configModule'
import dialogAlertModule from '@/store/modules/dialogAlert'
import globalModule from '@/store/modules/globalModule'
// import endpointModule from '@/store/modules/endpoint'
import removeDialogModule from '@/store/modules/removeDialogModule'
import reportModule from '@/store/modules/reportModule'
import translationsModule from '@/store/modules/translations'
import userModule from '@/store/modules/userModule'

// Vuex
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    DAU: false
  },
  getters: {
    checkDAUState (state) {
      return state.DAU
    }
  },
  modules: {
    accountModule,
    appModule,
    configModule,
    dialogAlertModule,
    globalModule,
    // endpointModule,
    removeDialogModule,
    reportModule,
    translationsModule,
    userModule
  }
})
