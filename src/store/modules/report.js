import { format, subDays } from 'date-fns'

export const APPS_DATA = 'APPS_DATA'
export const BUTTON_SELECTED_DATA = 'BUTTON_SELECTED_DATA'
export const COUNTRIES_DATA = 'COUNTRIES_DATA'
export const DATE_DATA = 'DATE_DATA'
export const FORMATS_DATA = 'FORMATS_DATA'
export const GROUPEDBY_VAR_DATA = 'GROUPEDBY_VAR_DATA'
export const NETWORKS_DATA = 'NETWORKS_DATA'
export const STATS_DATA = 'STATS_DATA'

const state = {
  appFilters: [],
  buttonSelectedStat: 'revenue',
  countryFilters: [],
  date: {
    endDate: format(new Date(), 'YYYY-MM-DD'),
    startDate: format(subDays(new Date(), 30), 'YYYY-MM-DD')
  },
  formatFilters: [],
  groupedBy: 'DATE',
  networkFilters: [],
  stats: [],
  statsDataFormatted: []
}

const getters = {
  appFiltersGetter (state) {
    return state.appFilters
  },
  buttonSelectedGetter (state) {
    return state.buttonSelectedStat
  },
  countryFiltersGetter (state) {
    return state.countryFilters
  },
  dateGetter (state) {
    return state.date
  },
  formatFiltersGetter (state) {
    return state.formatFilters
  },
  groupedByGetter (state) {
    return state.groupedBy
  },
  networkFiltersGetter (state) {
    return state.networkFilters
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
  [APPS_DATA] (state, filters) {
    state.appFilters = filters
  },
  [BUTTON_SELECTED_DATA] (state, buttonSelected) {
    state.buttonSelectedStat = buttonSelected
  },
  [COUNTRIES_DATA] (state, filters) {
    state.countryFilters = filters
  },
  [DATE_DATA] (state, date) {
    state.date = date
  },
  [FORMATS_DATA] (state, filters) {
    state.formatFilters = filters
  },
  [GROUPEDBY_VAR_DATA] (state, val) {
    state.groupedBy = val
  },
  [NETWORKS_DATA] (state, filters) {
    state.networkFilters = filters
  },
  [STATS_DATA] (state, data) {
    state.stats = data
  }
}

const actions = {
  appFiltersAction ({commit}, filters) {
    commit(APPS_DATA, filters)
  },
  buttonSelectedAction ({commit}, selected) {
    commit(BUTTON_SELECTED_DATA, selected)
  },
  countryFiltersAction ({commit}, filters) {
    commit(COUNTRIES_DATA, filters)
  },
  formatFiltersAction ({commit}, filters) {
    commit(FORMATS_DATA, filters)
  },
  getDateAction ({commit}, date) {
    commit(DATE_DATA, date)
  },
  groupedByVarDataAction ({commit}, val) {
    commit(GROUPEDBY_VAR_DATA, val)
  },
  networkFiltersAction ({commit}, filters) {
    commit(NETWORKS_DATA, filters)
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
