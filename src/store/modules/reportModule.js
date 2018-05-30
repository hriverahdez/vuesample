import { format, subDays } from 'date-fns'

export const ACTIVE_TAB_DATA = 'ACTIVE_TAB_DATA'
// export const ADD_ITEM_FILTER_DATA = 'ADD_ITEM_FILTER_DATA'
// export const APPS_DATA = 'APPS_DATA'
export const BUTTON_SELECTED_DATA = 'BUTTON_SELECTED_DATA'
// export const COUNTRIES_DATA = 'COUNTRIES_DATA'
export const DATE_DATA = 'DATE_DATA'
// export const FORMATS_DATA = 'FORMATS_DATA'
export const GROUPEDBY_VAR_DATA = 'GROUPEDBY_VAR_DATA'
// export const NETWORKS_DATA = 'NETWORKS_DATA'
// export const REMOVE_FILTER_ITEM = 'REMOVE_FILTER_ITEM'
export const STATS_DATA = 'STATS_DATA'

const state = {
  activeTab: 'tab-date',
  // appFilters: [],
  buttonSelectedStat: 'revenue',
  // countryFilters: [],
  date: {
    endDate: format(new Date(), 'YYYY-MM-DD'),
    startDate: format(subDays(new Date(), 30), 'YYYY-MM-DD')
  },
  // formatFilters: [],
  groupedBy: 'DATE',
  // networkFilters: [],
  stats: [],
  statsDataFormatted: []
}

const getters = {
  activeTabGetter (state) {
    return state.activeTab
  },
  // appFiltersGetter (state) {
  //   return state.appFilters
  // },
  buttonSelectedGetter (state) {
    return state.buttonSelectedStat
  },
  // countryFiltersGetter (state) {
  //   return state.countryFilters
  // },
  dateGetter (state) {
    return state.date
  },
  // formatFiltersGetter (state) {
  //   return state.formatFilters
  // },
  groupedByGetter (state) {
    return state.groupedBy
  },
  // networkFiltersGetter (state) {
  //   return state.networkFilters
  // },
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
  [ACTIVE_TAB_DATA] (state, activeTab) {
    state.activeTab = activeTab
  },
  // [ADD_ITEM_FILTER_DATA] (state, [item, groupedBy]) {
  //   let currentFilter = `${groupedBy.toLowerCase()}Filters`
  //   state[currentFilter].push(item)
  // },
  // [APPS_DATA] (state, filters) {
  //   state.appFilters = filters
  // },
  [BUTTON_SELECTED_DATA] (state, buttonSelected) {
    state.buttonSelectedStat = buttonSelected
  },
  // [COUNTRIES_DATA] (state, filters) {
  //   state.countryFilters = filters
  // },
  [DATE_DATA] (state, date) {
    state.date = date
  },
  // [FORMATS_DATA] (state, filters) {
  //   state.formatFilters = filters
  // },
  [GROUPEDBY_VAR_DATA] (state, val) {
    state.groupedBy = val
  },
  // [NETWORKS_DATA] (state, filters) {
  //   state.networkFilters = filters
  // },
  // [REMOVE_FILTER_ITEM] (state, {item, filterType}) {
  //   let items = state[filterType]
  //   items.splice(items.indexOf(item), 1)
  // },
  [STATS_DATA] (state, data) {
    state.stats = data
  }
}

const actions = {
  activeTabAction ({commit}, activeTab) {
    commit(ACTIVE_TAB_DATA, activeTab)
  },
  // addItemFiltersAction ({commit}, [item, groupedBy]) {
  //   commit(ADD_ITEM_FILTER_DATA, [item, groupedBy])
  // },
  // appFiltersAction ({commit}, filters) {
  //   commit(APPS_DATA, filters)
  // },
  buttonSelectedAction ({commit}, selected) {
    commit(BUTTON_SELECTED_DATA, selected)
  },
  // countryFiltersAction ({commit}, filters) {
  //   commit(COUNTRIES_DATA, filters)
  // },
  // formatFiltersAction ({commit}, filters) {
  //   commit(FORMATS_DATA, filters)
  // },
  getDateAction ({commit}, dateRange) {
    commit(DATE_DATA, dateRange)
  },
  groupedByVarDataAction ({commit}, val) {
    commit(GROUPEDBY_VAR_DATA, val)
  },
  // networkFiltersAction ({commit}, filters) {
  //   commit(NETWORKS_DATA, filters)
  // },
  // removeFilterItemAction ({commit}, {item, filterType}) {
  //   commit(REMOVE_FILTER_ITEM, {item, filterType})
  // },
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
