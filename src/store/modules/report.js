import { format, subDays } from 'date-fns'

export const STATS_DATA = 'STATS_DATA'
export const GROUPEDBY_VAR_DATA = 'GROUPEDBY_VAR_DATA'
export const DATE_DATA = 'DATE_DATA'
export const BUTTON_SELECTED_DATA = 'BUTTON_SELECTED_DATA'

const state = {
  buttonSelectedStat: 'revenue',
  date: {
    endDate: format(new Date(), 'YYYY-MM-DD'),
    startDate: format(subDays(new Date(), 30), 'YYYY-MM-DD')
  },
  groupedBy: 'DATE',
  stats: [],
  statsDataFormatted: []
}

const getters = {
  buttonSelectedGetter (state) {
    return state.buttonSelectedStat
  },
  dateGetter (state) {
    return state.date
  },
  groupedByGetter (state) {
    return state.groupedBy
  },
  statsDataGetter (state) {
    return state.stats
  },
  // Formatted Data to show stats info
  statsDataFormattedGetter (state, getters) {
    let data = []
    let object = {}
    object['name'] = 'Requests'
    object['data'] = {}
    getters.statsDataGetter.map((item) => {
      object['data'][item.label] = item[`${state.buttonSelectedStat}`]
    })
    data.push(object)
    return data
  },
  statsDataFormattedWithoutNameGetter (state, getters) {
    let object = {}
    getters.statsDataGetter.map((item) => {
      object[item.label] = item[`${state.buttonSelectedStat}`]
    })
    return object
  }
}

const mutations = {
  [BUTTON_SELECTED_DATA] (state, buttonSelected) {
    state.buttonSelectedStat = buttonSelected
  },
  [DATE_DATA] (state, date) {
    state.date = date
  },
  [GROUPEDBY_VAR_DATA] (state, val) {
    state.groupedBy = val
  },
  [STATS_DATA] (state, data) {
    state.stats = data
  }
}

const actions = {
  buttonSelectedAction ({commit}, selected) {
    commit(BUTTON_SELECTED_DATA, selected)
  },
  getDateAction ({commit}, date) {
    commit(DATE_DATA, date)
  },
  groupedByVarDataAction ({commit}, val) {
    commit(GROUPEDBY_VAR_DATA, val)
  },
  statsDataAction ({commit}, data) {
    commit(STATS_DATA, data)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
