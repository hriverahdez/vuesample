// Current account schema
const ACCOUNT_DATA = 'ACCOUNT_DATA'
// Total accounts from query
const ACCOUNTS_DATA = 'ACCOUNTS_DATA'
const ACCOUNT_DIALOG_STATUS = 'ACCOUNT_DIALOG_STATUS'
// Loader control
const ACCOUNTS_LOADER_STATUS = 'ACCOUNTS_LOADER_STATUS'
const EDIT_INDEX_STATUS = 'EDIT_INDEX_STATUS'
const SKIP_QUERY_ACCOUNTS = 'SKIP_QUERY_ACCOUNTS'

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
  skipQueryAccounts: true
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
  skipQueryAccountsGetter (state) {
    return state.skipQueryAccounts
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
  [SKIP_QUERY_ACCOUNTS] (state, status) {
    state.skipQueryAccounts = status
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
  skipQueryAccountsAction ({commit}, status) {
    commit(SKIP_QUERY_ACCOUNTS, status)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
