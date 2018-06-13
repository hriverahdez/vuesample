const APP_BY_ID_DATA = 'APP_BY_ID_DATA'
// Current account schema
const APP_DATA = 'APP_DATA'
// Total apps from query
const APPS_DATA = 'APPS_DATA'
const APP_DIALOG_STATUS = 'APP_DIALOG_STATUS'
const APP_ID = 'APP_ID'
const APP_MANAGE_NETWORK_PROFILE_DIALOG_STATUS = 'APP_MANAGE_NETWORK_PROFILE_DIALOG_STATUS'
const APP_NETWORK_CONFIG_DIALOG_STATUS = 'APP_NETWORK_CONFIG_DIALOG_STATUS'
const APP_REMOVE_DIALOG_STATUS = 'APP_REMOVE_DIALOG_STATUS'
const EDIT_APP_INDEX_STATUS = 'EDIT_APP_INDEX_STATUS'
const REMOVE_APP_PERMISSION_INPUT = 'REMOVE_APP_PERMISSION_INPUT'
const SELECTED_APP_NETWORK_DATATABLE = 'SELECTED_APP_NETWORK_DATATABLE'
const SELECTED_NETWORK_TO_MANAGE = 'SELECTED_NETWORK_TO_MANAGE'
const SKIP_APP_BY_ID_QUERY = 'SKIP_APP_BY_ID_QUERY'

const networks = {
  ADCOLONY: '1003',
  ADMOB: '1002',
  APPLOVIN: '1008',
  CHARTBOOST: '1007',
  FACEBOOK: '1009',
  HYPRMX: '1015',
  KIIP: '1006',
  INMOBI: '1012',
  IRONSOURCE: '1017',
  MOBUSI: '1001',
  MOBUSI_SSP: '1010',
  MOBVISTA: '1014',
  MOPUB: '1016',
  UNITYADS: '1004',
  STARTAPP: '1013',
  VUNGLE: '1005'
}

const state = {
  apps: [],
  // Use when app-network config dialos appears
  appById: {},
  // Comunicate account data between components
  appData: {
    name: '',
    bundle: '',
    platform: '',
    description: '',
    banner_position: ''
  },
  appDialogStatus: false,
  appId: '',
  appManageNetworkProfileDialogStatus: false,
  appNetworkConfigDialogStatus: false,
  appRemoveDialogStatus: false,
  // Index element to know if its edited mode
  editedAppIndex: -1,
  networks,
  removeAppPermissionInput: '',
  selectedAppNetworkInDatatable: {},
  selectedNetworkToManage: '',
  skipAppByIdQuery: true
}

const getters = {
  appByIdDataGetter (state) {
    return state.appById
  },
  appByIdNetworksGetter (state, getters) {
    return getters.appByIdDataGetter.networks
  },
  appDataGetter (state) {
    return state.appData
  },
  appsDataGetter (state) {
    return state.apps
  },
  appDialogStatusGetter (state) {
    return state.appDialogStatus
  },
  appIdGetter (state) {
    return state.appId
  },
  appIdAndNameGetter (state, getters) {
    const createdObject = []
    getters.appsDataGetter.map((app) => {
      let appObject = {}
      appObject['id'] = app._id
      appObject['name'] = app.name
      createdObject.push(appObject)
    })
    return createdObject
  },
  appManageNetworkProfileDialogStatusGetter (state) {
    return state.appManageNetworkProfileDialogStatus
  },
  appNamesGetter (state, getters) {
    const appNames = []
    getters.appsDataGetter.map((app) => {
      appNames.push(app.name)
    })
    return appNames
  },
  appNetworkConfigDialogStatusGetter (state) {
    return state.appNetworkConfigDialogStatus
  },
  editedAppIndexGetter (state) {
    return state.editedAppIndex
  },
  networkNamesGetter (state, getters) {
    const networkNames = []
    for (let key in getters.networksGetter) {
      networkNames.push(key)
    }
    return networkNames
  },
  networksGetter (state) {
    return state.networks
  },
  removeAppPermissionInputGetter (state) {
    return state.removeAppPermissionInput
  },
  selectedAppNetworkInDatatableGetter (state) {
    return state.selectedAppNetworkInDatatable
  },
  selectedNetworkToManageGetter (state) {
    return state.selectedNetworkToManage
  },
  skipAppByIdQueryGetter (state) {
    return state.skipAppByIdQuery
  }
}

const mutations = {
  [APP_BY_ID_DATA] (state, appData) {
    state.appById = appData
  },
  [APP_DATA] (state, app) {
    state.appData = app
  },
  [APPS_DATA] (state, data) {
    state.apps = data
  },
  [APP_DIALOG_STATUS] (state, status) {
    state.appDialogStatus = status
  },
  [APP_ID] (state, id) {
    state.appId = id
  },
  [APP_MANAGE_NETWORK_PROFILE_DIALOG_STATUS] (state, status) {
    state.appManageNetworkProfileDialogStatus = status
  },
  [APP_NETWORK_CONFIG_DIALOG_STATUS] (state, status) {
    state.appNetworkConfigDialogStatus = status
  },
  [APP_REMOVE_DIALOG_STATUS] (state, status) {
    state.appRemoveDialogStatus = status
  },
  [EDIT_APP_INDEX_STATUS] (state, indexValue) {
    state.editedAppIndex = indexValue
  },
  [REMOVE_APP_PERMISSION_INPUT] (state, data) {
    state.removeAppPermissionInput = data
  },
  [SELECTED_APP_NETWORK_DATATABLE] (state, data) {
    state.selectedAppNetworkInDatatable = data
  },
  [SELECTED_NETWORK_TO_MANAGE] (state, network) {
    state.selectedNetworkToManage = network
  },
  [SKIP_APP_BY_ID_QUERY] (state, status) {
    state.skipAppByIdQuery = status
  }
}

const actions = {
  appByIdDataAction ({commit}, appData) {
    commit(APP_BY_ID_DATA, appData)
  },
  appDataAction ({commit}, data) {
    commit(APPS_DATA, data)
  },
  appDialogStatusAction ({commit}, showDialog) {
    commit(APP_DIALOG_STATUS, showDialog)
  },
  appIdAction ({commit}, id) {
    commit(APP_ID, id)
  },
  appManageNetworkProfileDialogStatusAction ({commit}, showDialog) {
    commit(APP_MANAGE_NETWORK_PROFILE_DIALOG_STATUS, showDialog)
  },
  appNetworkConfigDialogStatusAction ({commit}, showDialog) {
    commit(APP_NETWORK_CONFIG_DIALOG_STATUS, showDialog)
  },
  appRemoveDialogStatusAction ({commit}, showDialog) {
    commit(APP_REMOVE_DIALOG_STATUS, showDialog)
  },
  appSchemaAction ({commit}, currentApp) {
    commit(APP_DATA, currentApp)
  },
  editedAppIndexStatusAction ({commit}, indexValue) {
    commit(EDIT_APP_INDEX_STATUS, indexValue)
  },
  removeAppPermissionInputAction ({commit}, data) {
    commit(REMOVE_APP_PERMISSION_INPUT, data)
  },
  selectedAppNetworkInDatatableAction ({commit}, data) {
    commit(SELECTED_APP_NETWORK_DATATABLE, data)
  },
  selectedNetworkToManageAction ({commit}, network) {
    commit(SELECTED_NETWORK_TO_MANAGE, network)
  },
  skipAppByIdQueryAction ({commit}, status) {
    commit(SKIP_APP_BY_ID_QUERY, status)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
