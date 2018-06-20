const APP_DATA = 'APP_DATA'
const APP_ID_FILTERS = 'APP_ID_FILTERS'
const ADD_ITEM_FILTER_DATA = 'ADD_ITEM_FILTER_DATA'
const BANNER_POSITIONS_DATA = 'BANNER_POSTIONS_DATA'
const COUNTRIES_DATA = 'COUNTRIES_DATA'
const COUNTRY_ID_FILTERS = 'COUNTRY_ID_FILTERS'
const DASHBOARD_FILTERS_DATA = 'DASHBOARD_FILTERS_DATA'
const FORMATS_DATA = 'FORMATS_DATA'
const FORMAT_ID_FILTERS = 'FORMAT_ID_FILTERS'
const NETWORKS_DATA = 'NETWORKS_DATA'
const NETWORK_ID_FILTERS = 'NETWORK_ID_FILTERS'
const REMOVE_FILTER_ITEM = 'REMOVE_FILTER_ITEM'

const state = {
  appFilters: '',
  appIdFilters: '',
  bannerPositions: [],
  config: [],
  countryFilters: [],
  countryIdFilters: [],
  formatFilters: [],
  formatIdFilters: [],
  networkFilters: [],
  networkIdFilters: []
}

const getters = {
  appFiltersGetter (state) {
    return state.appFilters
  },
  appIdFiltersGetter (state) {
    return state.appIdFilters
  },
  bannerPositionsGetter (state) {
    return state.bannerPositions.bannerPositions
  },
  countryFiltersGetter (state) {
    return state.countryFilters
  },
  countryIdFiltersGetter (state) {
    return state.countryIdFilters
  },
  dashboardFiltersGetter (state) {
    return state.config
  },
  formatFiltersGetter (state) {
    return state.formatFilters
  },
  formatIdFiltersGetter (state) {
    return state.formatIdFilters
  },
  networkFiltersGetter (state) {
    return state.networkFilters
  },
  netwworkIdFiltersGetter (state) {
    return state.networkIdFilters
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
  [APP_ID_FILTERS] (state, filters) {
    state.appIdFilters = filters
  },
  [BANNER_POSITIONS_DATA] (state, position) {
    state.bannerPositions = position
  },
  [COUNTRIES_DATA] (state, filters) {
    state.countryFilters = filters
  },
  [COUNTRY_ID_FILTERS] (state, filters) {
    state.countryIdFilters = filters
  },
  [DASHBOARD_FILTERS_DATA] (state, data) {
    state.config = data
  },
  [FORMATS_DATA] (state, filters) {
    state.formatFilters = filters
  },
  [FORMAT_ID_FILTERS] (state, filters) {
    state.formatIdFilters = filters
  },
  [NETWORKS_DATA] (state, filters) {
    state.networkFilters = filters
  },
  [NETWORK_ID_FILTERS] (state, filters) {
    state.networkIdFilters = filters
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
  appIdsFiltersAction ({commit}, filters) {
    commit(APP_ID_FILTERS, filters)
  },
  bannerPositionsDataAction ({commit}, position) {
    commit(BANNER_POSITIONS_DATA, position)
  },
  countryFiltersAction ({commit}, filters) {
    commit(COUNTRIES_DATA, filters)
  },
  countryIdsFiltersAction ({commit}, filters) {
    commit(COUNTRY_ID_FILTERS, filters)
  },
  dashboardFiltersAction ({commit}, data) {
    commit(DASHBOARD_FILTERS_DATA, data)
  },
  formatFiltersAction ({commit}, filters) {
    commit(FORMATS_DATA, filters)
  },
  formatIdsFiltersAction ({commit}, filters) {
    commit(FORMAT_ID_FILTERS, filters)
  },
  networkFiltersAction ({commit}, filters) {
    commit(NETWORKS_DATA, filters)
  },
  networkIdsFiltersAction ({commit}, filters) {
    commit(NETWORK_ID_FILTERS, filters)
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
