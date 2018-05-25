import { format, subDays } from 'date-fns'

export const STATS_DATA = 'STATS_DATA'
// Dinamyc query variables
export const GROUPEDBY_VAR_DATA = 'GROUPEDBY_VAR_DATA'
export const DATE_DATA = 'DATE_DATA'

const state = {
  stats: [],
  groupedBy: 'DATE',
  date: {
    endDate: format(new Date(), 'YYYY-MM-DD'),
    startDate: format(subDays(new Date(), 30), 'YYYY-MM-DD')
  },
  statsDataFormatted: []
}

const getters = {
  statsDataGetter (state) {
    return state.stats
  },
  groupedByGetter (state) {
    return state.groupedBy
  },
  dateGetter (state) {
    return state.date
  },
  // Formatted Data to show stats info
  statsDataFormattedGetter (state, getters) {
    let data = []
    let object = {}
    object['name'] = 'Requests'
    object['data'] = {}
    getters.statsDataGetter.map((item) => {
      object['data'][item.label] = item.requests
    })
    data.push(object)
    return data
  },
  statsDataFormattedWithoutNameGetter (state, getters) {
    let object = {}
    getters.statsDataGetter.map((item) => {
      object[item.label] = item.requests
    })
    return object
  }
}

const mutations = {
  [STATS_DATA] (state, data) {
    state.stats = data
  },
  [GROUPEDBY_VAR_DATA] (state, val) {
    state.groupedBy = val
  },
  [DATE_DATA] (state, date) {
    state.date = date
  }
}

const actions = {
  statsDataAction ({commit}, data) {
    commit(STATS_DATA, data)
  },
  groupedByVarDataAction ({commit}, val) {
    commit(GROUPEDBY_VAR_DATA, val)
  },
  getDateAction ({commit}, date) {
    commit(DATE_DATA, date)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
