const APP_DATA = 'APP_DATA'
const APP_TOTAL_DATA = 'APP_TOTAL_DATA'

const networks = {
  ADCOLONY: '1003',
  ADMOB: '1002',
  APPLOVIN: '1008',
  CHARTBOOST: '1007',
  CUSTOM_CAMPAIGN: '1011',
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
  appsTotalData: [],
  networks
}

const getters = {
  appDataGetter (state) {
    return state.apps
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
  appTotalDataGetter (state) {
    return state.appsTotalData
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
  [APP_TOTAL_DATA] (state, appsTotalData) {
    state.appsTotalData = appsTotalData
  }
}

const actions = {
  appDataAction ({commit}, data) {
    commit(APP_DATA, data)
  },
  appTotalDataAction ({commit}, appsTotalData) {
    console.log(appsTotalData)
    commit(APP_TOTAL_DATA, appsTotalData)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
