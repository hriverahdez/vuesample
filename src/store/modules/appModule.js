const APP_BY_ID_DATA = 'APP_BY_ID_DATA'
// Current account schema
const APP_DATA = 'APP_DATA'
// Total apps from query
const APPS_DATA = 'APPS_DATA'
const APP_DIALOG_STATUS = 'APP_DIALOG_STATUS'
// const APPS_IDS_AND_NAMES_BY_ACCOUNT_ID = 'APPS_IDS_AND_NAMES_BY_ACCOUNT_ID'
// Loader control
const APPS_LOADER_STATUS = 'APPS_LOADER_STATUS'
const APP_ID = 'APP_ID'
const APP_MANAGE_NETWORK_PROFILE_DIALOG_STATUS = 'APP_MANAGE_NETWORK_PROFILE_DIALOG_STATUS'
const APP_NETWORK_CONFIG_DIALOG_STATUS = 'APP_NETWORK_CONFIG_DIALOG_STATUS'
const APP_REMOVE_DIALOG_STATUS = 'APP_REMOVE_DIALOG_STATUS'
const EDIT_APP_INDEX_STATUS = 'EDIT_APP_INDEX_STATUS'
const NETWORK_PROFILES_DATA = 'NETWORK_PROFILES_DATA'
const REMOVE_APP_PERMISSION_INPUT = 'REMOVE_APP_PERMISSION_INPUT'
const SELECTED_APP_NETWORK_DATATABLE = 'SELECTED_APP_NETWORK_DATATABLE'
const SELECTED_NETWORK_TO_MANAGE = 'SELECTED_NETWORK_TO_MANAGE'
const SKIP_APP_BY_ID_QUERY = 'SKIP_APP_BY_ID_QUERY'
// const SKIP_NETWORK_PROFILES_QUERY = 'SKIP_NETWORK_PROFILES_QUERY'

const networks = {
  ADCOLONY: '1003',
  ADMOB: '1002',
  APPLOVIN: '1008',
  CHARTBOOST: '1007',
  FACEBOOK: '1009',
  HYPRMX: '1015',
  INMOBI: '1012',
  IRONSOURCE: '1017',
  MOBUSI: '1001',
  MOBVISTA: '1014',
  MOPUB: '1016',
  UNITYADS: '1004',
  STARTAPP: '1013',
  VUNGLE: '1005'
}

const state = {
  apps: [],
  // Use when app-network config dialog appears
  appById: {},
  // Comunicate account data between components
  appData: {
    name: '',
    platform: '',
    bundle: '',
    description: '',
    banner_position: '',
    icon: ''
  },
  appDialogStatus: false,
  appId: '',
  appsLoaderStatus: true,
  appManageNetworkProfileDialogStatus: false,
  appNetworkConfigDialogStatus: false,
  appRemoveDialogStatus: false,
  // Save app names in from the beginning in Dashboard view
  // appsNamesAndIds: '',
  // Index element to know if its edited mode
  editedAppIndex: -1,
  // network: {
  //   title: 'NetworkIntegration1008',
  //   var01: 'report_key',
  //   var02: 'sdk_key'
  // },
  networks,
  // Info network profiles when launch dialog manage profiles from app view datatable
  networkProfiles: '',
  removeAppPermissionInput: '',
  selectedAppNetworkInDatatable: {},
  selectedNetworkToManage: ''
  // skipAppByIdQuery: true,
  // skipNetworkProfiles: true
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
  // appNamesAndIdsGetter (state) {
  //   return state.appNamesAndIds
  // },
  // appNamesAndIdsFormattedGetter (state, getters) {
  //   let finalObject = {}
  //   getters.appNamesAndIdsGetter.map((item) => {
  //     finalObject[item._id] = item.name
  //   })
  //   return finalObject
  // },
  appNetworkConfigDialogStatusGetter (state) {
    return state.appNetworkConfigDialogStatus
  },
  appsLoaderStatusGetter (state) {
    return state.appsLoaderStatus
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
  networkProfilesDataGetter (state) {
    return state.networkProfiles
  },
  networkProfilesListGetter (state, getters) {
    if (getters.networkProfilesDataGetter) {
      let networkProfiles = []
      getters.networkProfilesDataGetter.map((item) => {
        networkProfiles.push(item.networkProfiles)
      })
      // item.networkProfiles.find(e => e.profiles)
      let currentNetworkProfile = networkProfiles[0].find(e => e.profiles)
      let profiles = currentNetworkProfile.profiles
      return profiles
    }
  },
  removeAppPermissionInputGetter (state) {
    return state.removeAppPermissionInput
  },
  selectedAppNetworkInDatatableGetter (state) {
    return state.selectedAppNetworkInDatatable
  },
  selectedNetworkIdToManageGetter (state) {
    let networkName = state.selectedNetworkToManage
    return networks[networkName]
  },
  // selectedNetworkIdToFormattedManageGetter (state, getters) {
  //   return `NetworkIntegration${getters.selectedNetworkIdToManageGetter}`
  // },
  selectedNetworkToManageGetter (state) {
    return state.selectedNetworkToManage
  },
  skipAppByIdQueryGetter (state) {
    return state.skipAppByIdQuery
  }
  // skipNetworkProfilesGetter (state) {
  //   return state.skipNetworkProfiles
  // }
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
  // [APPS_IDS_AND_NAMES_BY_ACCOUNT_ID] (state, data) {
  //   state.appNamesAndIds = data
  // },
  [APP_NETWORK_CONFIG_DIALOG_STATUS] (state, status) {
    state.appNetworkConfigDialogStatus = status
  },
  [APP_REMOVE_DIALOG_STATUS] (state, status) {
    state.appRemoveDialogStatus = status
  },
  [APPS_LOADER_STATUS] (state, status) {
    state.appsLoaderStatus = status
  },
  [EDIT_APP_INDEX_STATUS] (state, indexValue) {
    state.editedAppIndex = indexValue
  },
  [NETWORK_PROFILES_DATA] (state, profiles) {
    state.networkProfiles = profiles
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
  // [SKIP_NETWORK_PROFILES_QUERY] (state, status) {
  //   state.skipNetworkProfiles = status
  // }
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
  // appsNamesAndIdsAction ({commit}, data) {
  //   commit(APPS_IDS_AND_NAMES_BY_ACCOUNT_ID, data)
  // },
  appNetworkConfigDialogStatusAction ({commit}, showDialog) {
    commit(APP_NETWORK_CONFIG_DIALOG_STATUS, showDialog)
  },
  appRemoveDialogStatusAction ({commit}, showDialog) {
    commit(APP_REMOVE_DIALOG_STATUS, showDialog)
  },
  appSchemaAction ({commit}, currentApp) {
    commit(APP_DATA, currentApp)
  },
  appsLoaderStatusAction ({commit}, status) {
    commit(APPS_LOADER_STATUS, status)
  },
  editedAppIndexStatusAction ({commit}, indexValue) {
    commit(EDIT_APP_INDEX_STATUS, indexValue)
  },
  networkProfilesDataAction ({commit}, profiles) {
    commit(NETWORK_PROFILES_DATA, profiles)
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
  // skipNetworkProfilesAction ({commit}, status) {
  //   commit(SKIP_NETWORK_PROFILES_QUERY, status)
  // }
}

export default {
  state,
  getters,
  mutations,
  actions
}
