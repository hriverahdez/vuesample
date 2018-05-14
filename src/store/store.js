import Vue from 'vue'
import Vuex from 'vuex'

// Module imports
import accountsModule from '@/store/modules/accounts'
import dialogAlertModule from '@/store/modules/dialogAlert'
import translationsModule from '@/store/modules/translations'

// Vuex
Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    accountsModule,
    translationsModule,
    dialogAlertModule
  }
})
