// Current account schema
const ACCOUNT_DATA = 'ACCOUNT_DATA'
// Total accounts from query
const ACCOUNTS_DATA = 'ACCOUNTS_DATA'
const ACCOUNT_DIALOG_STATUS = 'ACCOUNT_DIALOG_STATUS'
const EDIT_INDEX_STATUS = 'EDIT_INDEX_STATUS'

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
  // Index element to know if its edited mode
  editedIndex: -1
}

const getters = {
  accountsDataGetter (state) {
    return state.accounts
  },
  accountDialogStatusGetter (state) {
    return state.accountDialogStatus
  },
  // dataAccountGetter (state) {
  //   return state.dataAccount
  // },
  accountNames (state) {
    let names = []
    state.accounts.map((account) => names.push(account.name))
    return names
  }
}

const mutations = {
  [ACCOUNT_DATA] (state, account) {
    state.accountData = account
  },
  [ACCOUNTS_DATA] (state, accounts) {
    state.accounts = accounts
  },
  [ACCOUNT_DIALOG_STATUS] (state, status) {
    state.accountDialogStatus = status
  },
  [EDIT_INDEX_STATUS] (state, indexValue) {
    state.editedIndex = indexValue
  }
  // getAccountsMutation (state, accounts) {
  //   state.accounts = accounts
  // }
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
  // accountDialogStatusAction (context, status) {
  //   context.commit('accountDialogStatusMutation', status)
  // },
  editedIndexStatusAction ({commit}, indexValue) {
    commit(EDIT_INDEX_STATUS, indexValue)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
