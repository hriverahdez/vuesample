// Current account schema
const APP_DATA = 'APP_DATA'
// Total apps from query
const APPS_DATA = 'APPS_DATA'
const APP_DIALOG_STATUS = 'APP_DIALOG_STATUS'
const APP_ID = 'APP_ID'
const APP_NETWORK_CONFIG_DIALOG_STATUS = 'APP_NETWORK_CONFIG_DIALOG_STATUS'
const APP_REMOVE_DIALOG_STATUS = 'APP_REMOVE_DIALOG_STATUS'
const EDIT_APP_INDEX_STATUS = 'EDIT_APP_INDEX_STATUS'
const REMOVE_APP_PERMISSION_INPUT = 'REMOVE_APP_PERMISSION_INPUT'

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
  // Comunicate account data between components
  appData: {
    name: '',
    bundle: '',
    platform: '',
    URL: '',
    description: ''
  },
  appDialogStatus: false,
  appId: '',
  appNetworkConfigDialogStatus: false,
  appRemoveDialogStatus: false,
  // Index element to know if its edited mode
  editedAppIndex: -1,
  networks,
  removeAppPermissionInput: ''
}

const getters = {
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
  }
}

const mutations = {
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
  }
}

const actions = {
  appDataAction ({commit}, data) {
    commit(APPS_DATA, data)
  },
  appDialogStatusAction ({commit}, showDialog) {
    commit(APP_DIALOG_STATUS, showDialog)
  },
  appIdAction ({commit}, id) {
    commit(APP_ID, id)
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
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
