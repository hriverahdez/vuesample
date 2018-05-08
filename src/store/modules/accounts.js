
export default {
  state: {
    // Show or hide dialog
    accountDialogStatus: false,
    // Comunicate account data between components
    dataAccount: {
      name: null,
      description: null,
      disabled: false
    },
    // editedIndex: -1
    editedIndex: -1
  },
  getters: {
    accountDialogStatusGetter (state) {
      return state.accountDialogStatus
    },
    dataAccountGetter (state) {
      return state.dataAccount
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
