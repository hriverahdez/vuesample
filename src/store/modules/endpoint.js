const state = {
  endpoint: 'report'
}

const mutations = {
  // Modify endpoint uri
  endpointModifyMutation (state, endpoint) {
    state.endpoint = endpoint
  }
}

const actions = {
  endpointModifyAction (context, endpoint) {
    context.commit('endpointModifyMutation', endpoint)
  }
}

export default {
  state,
  mutations,
  actions
}
