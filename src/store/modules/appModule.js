export const APP_DATA = 'APP_DATA'

const state = {
  apps: []
}

const getters = {
  appDataGetter (state) {
    return state.apps
  },
  appIdAndName (state, getters) {
    const names = []
    getters.appDataGetter.map((app) => {
      let appObject = {}
      appObject['id'] = app._id
      appObject['name'] = app.name
      names.push(appObject)
    })
    return names
  }
}

const mutations = {
  [APP_DATA] (state, data) {
    state.apps = data
  }
}

const actions = {
  appDataAction ({commit}, data) {
    commit(APP_DATA, data)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
