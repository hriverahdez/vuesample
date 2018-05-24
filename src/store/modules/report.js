export const STATS_DATA = 'STATS_DATA'
// Dinamyc query variable
export const GROUPEDBY_VAR_DATA = 'GROUPEDBY_VAR_DATA'

const state = {
  stats: [],
  groupedBy: 'DATE'
}

const getters = {
  statsDataGetter (state) {
    return state.stats
  },
  groupedByGetter (state) {
    return state.groupedBy
  }
}

const mutations = {
  [STATS_DATA] (state, data) {
    state.stats = data
  },
  [GROUPEDBY_VAR_DATA] (state, val) {
    state.groupedBy = val
  }
}

const actions = {
  statsDataAction ({commit}, data) {
    commit(STATS_DATA, data)
  },
  groupedByVarDataAction ({commit}, val) {
    commit(GROUPEDBY_VAR_DATA, val)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
