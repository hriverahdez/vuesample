import Vue from 'vue'
import Vuex from 'vuex'

// Module imports
import accountsModule from '@/store/modules/accounts'
import translationsModule from '@/store/modules/translations'

// Vuex
Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    accountsModule,
    translationsModule
  },
  state: {
    alert: {
      type: 'success',
      show: false,
      message: ''
    }
  },
  mutations: {
    // Show display alert in dialogs
    setAlertMessage: (state, data) => {
      state.alert.type = data.type
      state.alert.show = data.show
      state.alert.message = data.message
      setTimeout(() => {
        state.alert.type = 'success'
        state.alert.show = false
        state.alert.message = ''
        store.dispatch(data.dialog, false)
        store.dispatch('dataAccountAction', {
          name: '',
          description: '',
          disabled: ''})
      }, data.timeout)
    }
  }
})
