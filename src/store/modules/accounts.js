
export default {
  state: {
    accountDialogStatus: false
  },
  getters: {
    accountDialogStatusGetter (state) {
      return state.accountDialogStatus
    }
  },
  mutations: {
    accountDialogStatusMutation (state, status) {
      state.accountDialogStatus = status
    }
  },
  actions: {
    accountDialogStatusAction (context, status) {
      context.commit('accountDialogStatusMutation', status)
    }
  }
}
