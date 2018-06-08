const APP_DATA = 'APP_DATA'
const APP_DIALOG_STATUS = 'APP_DIALOG_STATUS'

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
  appDialogStatus: false,
  networks
}

const getters = {
  appDataGetter (state) {
    return state.apps
  },
  appDialogStatusGetter (state) {
    return state.appDialogStatus
  },
  appIdAndNameGetter (state, getters) {
    const createdObject = []
    getters.appDataGetter.map((app) => {
      let appObject = {}
      appObject['id'] = app._id
      appObject['name'] = app.name
      createdObject.push(appObject)
    })
    return createdObject
  },
  appNamesGetter (state, getters) {
    const appNames = []
    getters.appDataGetter.map((app) => {
      appNames.push(app.name)
    })
    return appNames
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
  }
}

const mutations = {
  [APP_DATA] (state, data) {
    state.apps = data
  },
  [APP_DIALOG_STATUS] (state, status) {
    state.appDialogStatus = status
  }
}

const actions = {
  appDataAction ({commit}, data) {
    commit(APP_DATA, data)
  },
  appDialogStatusAction ({commit}, showDialog) {
    commit(APP_DIALOG_STATUS, showDialog)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
