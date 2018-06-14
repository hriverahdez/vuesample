// Current token
const TOKEN_DATA = 'TOKEN_DATA'
const USER_DATA = 'USER_DATA'
const LOGOUT = 'LOGOUT'
const SET_ACTIVE_ACCOUNT = 'SET_ACTIVE_ACCOUNT'
const USER_ACCOUNTS = 'USER_ACCOUNTS'

const state = {
  activeAccount: '',
  token: '',
  user: [],
  userAccountsNumber: 0,
  userAccounts: []
}

const getters = {
  tokenGetter (state) {
    return state.token
  },
  userGetter (state) {
    return state.user
  },
  userAccountsNumberGetter (state, getters) {
    return (getters.userGetter.accounts) ? getters.userGetter.accounts.length : []
  },
  userAccountsIds (state, getters) {
    const accountsIds = []

    if (!getters.userGetter.accounts) {
      return []
    }

    getters.userGetter.accounts.forEach((element) => {
      accountsIds.push(element.account)
    })
    console.log(accountsIds)
    return accountsIds
  },
  userAccounts (state) {
    return state.userAccounts
  }
}

const mutations = {
  [TOKEN_DATA] (state, token) {
    state.token = token
  },
  [USER_DATA] (state, user) {
    state.user = user
  },
  [SET_ACTIVE_ACCOUNT] (state, account) {
    state.activeAccount = account
  },
  [LOGOUT] (state) {
    state.activeAccount = ''
    state.token = ''
    state.user = []
    state.userAccountsNumber = 0
    state.userAccounts = []
  },
  [USER_ACCOUNTS] (state, accounts) {
    state.userAccounts = accounts
  }
}

const actions = {
  tokenDataAction ({commit}, token) {
    commit(TOKEN_DATA, token)
  },
  userDataAction ({commit}, user) {
    commit(USER_DATA, user)
  },
  logout ({ commit }) {
    commit(LOGOUT)
  },
  setActiveUserAccountAction ({commit}, account) {
    commit(SET_ACTIVE_ACCOUNT, account)
  },
  setUserAccounts ({commit}, accounts) {
    commit(USER_ACCOUNTS, accounts)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
