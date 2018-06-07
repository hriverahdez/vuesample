// Current token
const TOKEN_DATA = 'TOKEN_DATA'
const USER_DATA = 'USER_DATA'

const state = {
  token: '',
  user: [],
  userAccountsNumber: 0
}

const getters = {
  tokenGetter (state) {
    return state.token
  },
  userGetter (state) {
    return state.user
  },
  userAccountsNumberGetter (state, getters) {
    console.log(getters.userGetter)
    return (getters.userGetter.accounts) ? getters.userGetter.accounts.length : []
  }
}

const mutations = {
  [TOKEN_DATA] (state, token) {
    state.token = token
  },
  [USER_DATA] (state, user) {
    state.user = user
  }
}

const actions = {
  tokenDataAction ({commit}, token) {
    commit(TOKEN_DATA, token)
  },
  userDataAction ({commit}, user) {
    commit(USER_DATA, user)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
