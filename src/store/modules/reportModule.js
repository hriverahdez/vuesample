import { format, subDays } from 'date-fns'

const ACTIVE_TAB_DATA = 'ACTIVE_TAB_DATA'
const BUTTON_SELECTED_DATA = 'BUTTON_SELECTED_DATA'
const DATE_DATA = 'DATE_DATA'
const GROUPEDBY_VAR_DATA = 'GROUPEDBY_VAR_DATA'
const STATS_DATA = 'STATS_DATA'
const RANGE_DATA = 'RANGE_DATA'

const state = {
  activeTab: 'tab-date',
  buttonSelectedStat: 'revenue',
  date: {
    endDate: format(new Date(), 'YYYY-MM-DD'),
    startDate: format(subDays(new Date(), 30), 'YYYY-MM-DD')
  },
  groupedBy: 'DATE',
  stats: [],
  statsDataFormatted: [],
  range: []
}

const getters = {
  activeTabGetter (state) {
    return state.activeTab
  },
  rangeGetter (state) {
    return state.range
  },
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
  [RANGE_DATA] (state, range) {
    state.range = range
  },
  [ACTIVE_TAB_DATA] (state, activeTab) {
    state.activeTab = activeTab
  },
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
  rangeAction ({commit}, range) {
    commit(RANGE_DATA, range)
  },
  activeTabAction ({commit}, activeTab) {
    commit(ACTIVE_TAB_DATA, activeTab)
  },
  buttonSelectedAction ({commit}, selected) {
    commit(BUTTON_SELECTED_DATA, selected)
  },
  getDateAction ({commit}, dateRange) {
    commit(DATE_DATA, dateRange)
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