export const DASHBOARD_FILTERS_DATA = 'DASHBOARD_FILTERS_DATA'

const state = {
  config: []
}

const getters = {
  dashboardFiltersGetter (state) {
    return state.config
  }
}

const mutations = {
  [DASHBOARD_FILTERS_DATA] (state, data) {
    state.config = data
  }
}

const actions = {
  dashboardFiltersAction (context, data) {
    context.commit(DASHBOARD_FILTERS_DATA, data)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
