const APP_DATA = 'APP_DATA'
const ADD_ITEM_FILTER_DATA = 'ADD_ITEM_FILTER_DATA'
const BANNER_POSITIONS_DATA = 'BANNER_POSTIONS_DATA'
const COUNTRIES_DATA = 'COUNTRIES_DATA'
const DASHBOARD_FILTERS_DATA = 'DASHBOARD_FILTERS_DATA'
const FORMATS_DATA = 'FORMATS_DATA'
const NETWORKS_DATA = 'NETWORKS_DATA'
const REMOVE_FILTER_ITEM = 'REMOVE_FILTER_ITEM'

const state = {
  appFilters: [],
  bannerPositions: [],
  config: [],
  countryFilters: [],
  formatFilters: [],
  networkFilters: []
}

const getters = {
  appFiltersGetter (state) {
    return state.appFilters
  },
  bannerPositionsGetter (state) {
    return state.bannerPositions.bannerPositions
  },
  countryFiltersGetter (state) {
    return state.countryFilters
  },
  dashboardFiltersGetter (state) {
    return state.config
  },
  formatFiltersGetter (state) {
    return state.formatFilters
  },
  networkFiltersGetter (state) {
    return state.networkFilters
  }
}

const mutations = {
  [ADD_ITEM_FILTER_DATA] (state, [item, groupedBy]) {
    let currentFilter = `${groupedBy.toLowerCase()}Filters`
    state[currentFilter].push(item)
  },
  [APP_DATA] (state, filters) {
    state.appFilters = filters
  },
  [BANNER_POSITIONS_DATA] (state, position) {
    state.bannerPositions = position
  },
  [COUNTRIES_DATA] (state, filters) {
    state.countryFilters = filters
  },
  [DASHBOARD_FILTERS_DATA] (state, data) {
    state.config = data
  },
  [FORMATS_DATA] (state, filters) {
    state.formatFilters = filters
  },
  [NETWORKS_DATA] (state, filters) {
    state.networkFilters = filters
  },
  [REMOVE_FILTER_ITEM] (state, {item, filterType}) {
    let items = state[filterType]
    items.splice(items.indexOf(item), 1)
  }
}

const actions = {
  addItemFiltersAction ({commit}, [item, groupedBy]) {
    commit(ADD_ITEM_FILTER_DATA, [item, groupedBy])
  },
  appFiltersAction ({commit}, filters) {
    commit(APP_DATA, filters)
  },
  bannerPositionsDataAction ({commit}, position) {
    commit(BANNER_POSITIONS_DATA, position)
  },
  countryFiltersAction ({commit}, filters) {
    commit(COUNTRIES_DATA, filters)
  },
  dashboardFiltersAction ({commit}, data) {
    commit(DASHBOARD_FILTERS_DATA, data)
  },
  formatFiltersAction ({commit}, filters) {
    commit(FORMATS_DATA, filters)
  },
  networkFiltersAction ({commit}, filters) {
    commit(NETWORKS_DATA, filters)
  },
  removeFilterItemAction ({commit}, {item, filterType}) {
    commit(REMOVE_FILTER_ITEM, {item, filterType})
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
