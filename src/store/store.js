import Vue from 'vue'
import Vuex from 'vuex'

// Module imports
import accountsModule from '@/store/modules/accounts'
import configModule from '@/store/modules/config'
import dialogAlertModule from '@/store/modules/dialogAlert'
import endpointModule from '@/store/modules/endpoint'
import reportModule from '@/store/modules/report'
import translationsModule from '@/store/modules/translations'

// Vuex
Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    accountsModule,
    configModule,
    dialogAlertModule,
    endpointModule,
    reportModule,
    translationsModule
  }
})
