
export default {
  state: {
    accounts: [],
    // Show or hide dialog
    accountDialogStatus: false,
    // Comunicate account data between components
    dataAccount: {
      name: '',
      description: '',
      disabled: false
    },
    editedIndex: -1
  },
  getters: {
    accountDialogStatusGetter (state) {
      return state.accountDialogStatus
    },
    dataAccountGetter (state) {
      return state.dataAccount
    },
    accountNames (state) {
      let names = []
      state.accounts.map((account) => names.push(account.name))
      return names
    }
  },
  mutations: {
    accountDialogStatusMutation (state, status) {
      state.accountDialogStatus = status
    },
    dataAccountMutation (state, data) {
      state.dataAccount = data
    },
    editedIndexMutation (state, index) {
      state.editedIndex = index
    },
    getAccountsMutation (state, accounts) {
      state.accounts = accounts
    }
  },
  actions: {
    accountDialogStatusAction (context, status) {
      context.commit('accountDialogStatusMutation', status)
    },
    dataAccountAction (context, data) {
      context.commit('dataAccountMutation', data)
    },
    editedIndexAction (context, index) {
      context.commit('editedIndexMutation', index)
    }
  }
}
