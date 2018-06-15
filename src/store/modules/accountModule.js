// Current account schema
const ACCOUNT_DATA = 'ACCOUNT_DATA'
// Total accounts from query
const ACCOUNTS_DATA = 'ACCOUNTS_DATA'
const ACCOUNT_DIALOG_STATUS = 'ACCOUNT_DIALOG_STATUS'
// Loader control
const ACCOUNTS_LOADER_STATUS = 'ACCOUNTS_LOADER_STATUS'
const EDIT_INDEX_STATUS = 'EDIT_INDEX_STATUS'
const NETWORK_PROFILES_DATA = 'NETWORK_PROFILES_DATA'

const state = {
  accounts: [],
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
  // Info network profiles when launch dialog manage profiles from app view datatable
  networkProfiles: ''
}

const getters = {
  accountsDataGetter (state) {
    return state.accounts
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
  networkProfilesDataGetter (state) {
    return state.networkProfiles
  }
}

const mutations = {
  [ACCOUNT_DATA] (state, account) {
    state.accountData = account
  },
  [ACCOUNT_DIALOG_STATUS] (state, status) {
    state.accountDialogStatus = status
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
  [NETWORK_PROFILES_DATA] (state, profiles) {
    state.networkProfiles = profiles
  }
}

const actions = {
  accountSchemaAction ({commit}, currentAccount) {
    commit(ACCOUNT_DATA, currentAccount)
  },
  accountsDataAction ({commit}, accounts) {
    commit(ACCOUNTS_DATA, accounts)
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
  networkProfilesDataAction ({commit}, profiles) {
    console.log('entra', profiles)
    commit(NETWORK_PROFILES_DATA, profiles)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
