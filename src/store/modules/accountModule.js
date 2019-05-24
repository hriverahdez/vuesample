// Current account schema
const ACCOUNT_DATA = 'ACCOUNT_DATA'
// Total accounts from query
const ACCOUNTS_DATA = 'ACCOUNTS_DATA'

const ACCOUNT_BY_ID_DATA = 'ACCOUNT_BY_ID_DATA'
const ACCOUNT_DIALOG_STATUS = 'ACCOUNT_DIALOG_STATUS'
const GET_NETWORKS_PROFILES = 'GET_NETWORKS_PROFILES'
// Loader control
const ACCOUNTS_LOADER_STATUS = 'ACCOUNTS_LOADER_STATUS'
const EDIT_INDEX_STATUS = 'EDIT_INDEX_STATUS'
const SKIP_QUERY_ACCOUNTS = 'SKIP_QUERY_ACCOUNTS'
const SKIP_QUERY_ACCOUNT_BY_ID = 'SKIP_QUERY_ACCOUNT_BY_ID'
const SKIP_QUERY_GET_NETWORKS_PROFILES = 'SKIP_QUERY_GET_NETWORKS_PROFILES'

const state = {
  accounts: [],
  accountById: [],
  // Show or hide dialog
  accountDialogStatus: false,
  // Comunicate account data between components
  accountData: {
    name: '',
    description: '',
    disabled: false
  },
  accountsLoaderStatus: true,
  // Index element to know if its edited mode
  editedIndex: -1,
  getNetworksProfiles: [],
  skipQueryAccounts: true,
  skipQueryAccountById: true,
  skipQueryGetNetworksProfiles: true
}

const getters = {
  accountsDataGetter (state) {
    return state.accounts
  },
  accountByIdGetter (state) {
    return state.accountById
  },
  accountDialogStatusGetter (state) {
    return state.accountDialogStatus
  },
  accountDataGetter (state) {
    return state.accountData
  },
  accountNames (state) {
    let names = []
    state.accounts.map((account) => names.push(account.name))
    return names
  },
  accountsLoaderStatusGetter (state) {
    return state.accountsLoaderStatus
  },
  editedIndexGetter (state) {
    return state.editedIndex
  },
  getNetworksProfilesGetter (state) {
    return state.getNetworksProfiles
  },
  getNetworksProfilesLengthGetter (state, getters) {
    if (getters.getNetworksProfilesGetter.networkProfiles) {
      let networkProfiles = getters.getNetworksProfilesGetter.networkProfiles
      let newNetworksArray = []
      networkProfiles.map((network) => {
        let newNetworksObject = {}
        newNetworksObject.networkId = network.networkId
        newNetworksObject.numberOfProfiles = network.profiles.length
        newNetworksArray.push(newNetworksObject)
      })
      return newNetworksArray
    }
  },
  networkProfilesStatusGetter (state, getters) {
    if (getters.accountByIdGetter) {
      return getters.accountByIdGetter.networkProfiles
    }
  },
  skipQueryAccountsGetter (state) {
    return state.skipQueryAccounts
  },
  skipQueryAccountByIdGetter (state) {
    return state.skipQueryAccountById
  },
  skipQueryGetNetworksProfilesGetter (state) {
    return state.skipQueryGetNetworksProfiles
  }
}

const mutations = {
  [ACCOUNT_DATA] (state, account) {
    state.accountData = account
  },
  [ACCOUNT_DIALOG_STATUS] (state, status) {
    state.accountDialogStatus = status
  },
  [ACCOUNT_BY_ID_DATA] (state, account) {
    state.accountById = account
  },
  [ACCOUNTS_DATA] (state, accounts) {
    state.accounts = accounts
  },
  [ACCOUNTS_LOADER_STATUS] (state, status) {
    state.accountsLoaderStatus = status
  },
  [EDIT_INDEX_STATUS] (state, indexValue) {
    state.editedIndex = indexValue
  },
  [GET_NETWORKS_PROFILES] (state, profiles) {
    state.getNetworksProfiles = profiles
  },
  [SKIP_QUERY_ACCOUNTS] (state, status) {
    state.skipQueryAccounts = status
  },
  [SKIP_QUERY_ACCOUNT_BY_ID] (state, status) {
    state.skipQueryAccountById = status
  },
  [SKIP_QUERY_GET_NETWORKS_PROFILES] (state, status) {
    state.skipQueryGetNetworksProfiles = status
  }
}

const actions = {
  accountSchemaAction ({commit}, currentAccount) {
    commit(ACCOUNT_DATA, currentAccount)
  },
  accountsDataAction ({commit}, accounts) {
    commit(ACCOUNTS_DATA, accounts)
  },
  accountsByIdDataAction ({commit}, account) {
    commit(ACCOUNT_BY_ID_DATA, account)
  },
  accountDialogStatusAction ({commit}, showDialog) {
    commit(ACCOUNT_DIALOG_STATUS, showDialog)
  },
  accountsLoaderStatusAction ({commit}, status) {
    commit(ACCOUNTS_LOADER_STATUS, status)
  },
  editedIndexStatusAction ({commit}, indexValue) {
    commit(EDIT_INDEX_STATUS, indexValue)
  },
  getNetworksProfilesAction ({commit}, profiles) {
    commit(GET_NETWORKS_PROFILES, profiles)
  },
  skipQueryAccountsAction ({commit}, status) {
    commit(SKIP_QUERY_ACCOUNTS, status)
  },
  skipQueryAccountByIdAction ({commit}, status) {
    commit(SKIP_QUERY_ACCOUNT_BY_ID, status)
  },
  skipQueryGetNetworksProfilesAction ({commit}, status) {
    commit(SKIP_QUERY_GET_NETWORKS_PROFILES, status)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
