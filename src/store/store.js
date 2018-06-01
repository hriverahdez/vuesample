import Vue from 'vue'
import Vuex from 'vuex'

// Module imports
import accountModule from '@/store/modules/accountModule'
import appModule from '@/store/modules/appModule'
import configModule from '@/store/modules/configModule'
import dialogAlertModule from '@/store/modules/dialogAlert'
// import endpointModule from '@/store/modules/endpoint'
import reportModule from '@/store/modules/reportModule'
import translationsModule from '@/store/modules/translations'

// Vuex
Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    accountModule,
    appModule,
    configModule,
    dialogAlertModule,
    // endpointModule,
    reportModule,
    translationsModule
  }
})
