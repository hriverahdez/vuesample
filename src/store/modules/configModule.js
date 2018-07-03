const APP_DATA = 'APP_DATA'
const APP_ID_FILTERS = 'APP_ID_FILTERS'
const ADD_ITEM_FILTER_DATA = 'ADD_ITEM_FILTER_DATA'
const BANNER_POSITIONS_DATA = 'BANNER_POSTIONS_DATA'
const CONFIG_APP_NETWORK_FORM_FIELDS = 'CONFIG_APP_NETWORK_FORM_FIELDS'
const COUNTRIES_DATA = 'COUNTRIES_DATA'
const COUNTRY_ID_FILTERS = 'COUNTRY_ID_FILTERS'
const DASHBOARD_FILTERS_DATA = 'DASHBOARD_FILTERS_DATA'
const FORMATS_DATA = 'FORMATS_DATA'
const FORMAT_ID_FILTERS = 'FORMAT_ID_FILTERS'
const NETWORKS_DATA = 'NETWORKS_DATA'
const NETWORK_ID_FILTERS = 'NETWORK_ID_FILTERS'
const REMOVE_FILTER_ITEM = 'REMOVE_FILTER_ITEM'
const ROLES_ADMIN_DATA = 'ROLES_ADMIN_DATA'
const SKIP_APP_NETWORK_FORM_FIELDS = 'SKIP_APP_NETWORK_FORM_FIELDS'
const SKIP_QUERY_ROLES_ADMIN = 'SKIP_QUERY_ROLES_ADMIN'

const state = {
  appFilters: [],
  appIdFilters: [],
  bannerPositions: [],
  config: [],
  configAppNetworkFormFields: '',
  countryFilters: [],
  countryIdFilters: [],
  formatFilters: [],
  formatIdFilters: [],
  networkFilters: [],
  networkIdFilters: [],
  rolesAdmin: [],
  skipAppNetworkFormFields: true,
  skipRolesAdmin: true
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
  configAppNetworkFormFieldsGetter (state) {
    return state.configAppNetworkFormFields
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
  formatsTypesGetter (state) {
    return state.config.formats
  },
  formatFiltersGetter (state) {
    return state.formatFilters
  },
  formatIdFiltersGetter (state) {
    return state.formatIdFilters
  },
  networkIdsGetter (state) {
    return state.config.networkIds
  },
  networkFiltersGetter (state) {
    return state.networkFilters
  },
  netwworkIdFiltersGetter (state) {
    return state.networkIdFilters
  },
  rolesAdminGetter (state) {
    console.log('entro getter roles')
    console.log(state.rolesAdmin)
    return state.rolesAdmin
  },
  skipAppNetworkFormFieldsGetter (state) {
    return state.skipAppNetworkFormField
  },
  skipQueryRolesAdminGetter (state) {
    return state.skipRolesAdmin
  }
}

const mutations = {
  [ADD_ITEM_FILTER_DATA] (state, [item, groupedBy]) {
    let currentFilter = `${groupedBy.toLowerCase()}Filters`
    let currentIdFilter = `${groupedBy.toLowerCase()}IdFilters`
    if (groupedBy === 'APP') {
      state[currentFilter].push(item.name)
      state[currentIdFilter].push(item.id)
    } else if (groupedBy === 'COUNTRY') {
      state[currentFilter].push(item)
      state[currentIdFilter].push(item.code)
    } else if (groupedBy === 'FORMAT') {
      state[currentFilter].push(item)
      state[currentIdFilter].push(item.id)
    } else if (groupedBy === 'NETWORK') {
      state[currentFilter].push(item)
      state[currentIdFilter].push(item.id)
    }
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
  [CONFIG_APP_NETWORK_FORM_FIELDS] (state, data) {
    state.configAppNetworkFormFields = data
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
  },
  [ROLES_ADMIN_DATA] (state, roles) {
    state.rolesAdmin = roles
  },
  [SKIP_APP_NETWORK_FORM_FIELDS] (state, status) {
    state.skipAppNetworkFormFields = status
  },
  [SKIP_QUERY_ROLES_ADMIN] (state, skip) {
    console.log(skip)
    state.skipRolesAdmin = skip
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
  configAppNetworkFormFieldsAction ({commit}, fields) {
    commit(CONFIG_APP_NETWORK_FORM_FIELDS, fields)
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
  },
  rolesAdminAction ({commit}, roles) {
    commit(ROLES_ADMIN_DATA, roles)
  },
  skipAppNetworkFormFieldsAction ({commit}, status) {
    commit(SKIP_APP_NETWORK_FORM_FIELDS, status)
  },
  skipQueryRolesAdminAction ({commit}, skip) {
    commit(SKIP_QUERY_ROLES_ADMIN, skip)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
