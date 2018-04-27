import Vue from 'vue'
import Vuex from 'vuex'

// Vuex
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    browserLang: 'fin'
  },
  getters: {
    browserLangGetter (state) {
      return state.browserLang
    }
  },
  mutations: {
    browserLangUpdate (state, lang) {
      state.browserLang = lang
    }
  },
  actions: {
    browserLangUpdate (context, lang) {
      context.commit('browserLangUpdate', lang)
    }
  }
})
