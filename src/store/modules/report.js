export const STATS_DATA = 'STATS_DATA'

const state = {
  stats: []
}

const getters = {
  statsDataGetter (state) {
    return state.stats
  }
}

const mutations = {
  [STATS_DATA] (state, data) {
    state.stats = data
  }
}

const actions = {
  statsDataAction (context, data) {
    context.commit(STATS_DATA, data)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
