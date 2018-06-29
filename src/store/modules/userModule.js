// Current token
const LOGOUT = 'LOGOUT'
const REMEMBER_ME = 'REMEMBER_ME'
const SET_ACTIVE_ACCOUNT = 'SET_ACTIVE_ACCOUNT'
const TOKEN_DATA = 'TOKEN_DATA'
const USER_DATA = 'USER_DATA'
const USER_ACCOUNTS = 'USER_ACCOUNTS'
const USER_TOKEN_CHECKING = 'USER_TOKEN_CHECKING'

const state = {
  activeAccount: '',
  token: '',
  rememberMe: false,
  user: [],
  userAccountsNumber: 0,
  userAccounts: [],
  userTokenChecking: false
}

const getters = {
  activeAccount (state) {
    return state.activeAccount
  },
  isLogged (state, getters) {
    return (typeof getters.tokenGetter !== 'undefined' && getters.tokenGetter !== '' && getters.userGetter !== 'undefined' && getters.userGetter !== '')
  },
  rememberMe (state) {
    return state.rememberMe
  },
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
    return accountsIds
  },
  userAccountRoles (state, getters) {
    let accountsRoles = []

    if (!getters.userGetter.accounts) {
      return []
    }

    getters.userGetter.accounts.forEach((element) => {
      if (element.account === getters.activeAccount) {
        accountsRoles = element.roles
      }
    })

    return accountsRoles
  },
  userAccounts (state) {
    return state.userAccounts
  },
  userActiveAccountNameGetter (state, getters) {
    if (getters.userAccounts && getters.activeAccount) {
      getters.userAccounts.forEach((element) => {
        if (element._id === getters.activeAccount) {
          return element.name
        }
      })
    }
  },
  userTokenChecking (state) {
    return state.userTokenChecking
  }
}

const mutations = {
  [LOGOUT] (state) {
    state.activeAccount = ''
    state.token = ''
    state.user = []
    state.userAccountsNumber = 0
    state.userAccounts = []
    state.rememberMe = false
    localStorage.removeItem('activeAccount')
    localStorage.removeItem('token')
    localStorage.removeItem('rememberMe')
  },
  [REMEMBER_ME] (state, remember) {
    state.rememberMe = remember
    localStorage.setItem('rememberMe', remember)
  },
  [TOKEN_DATA] (state, data) {
    state.token = data.token
    if (data.rememberMe) {
      state.rememberMe = true
      localStorage.setItem('rememberMe', data.rememberMe)
    }
    localStorage.setItem('token', data.token)
  },
  [USER_DATA] (state, user) {
    state.user = user
  },
  [SET_ACTIVE_ACCOUNT] (state, account) {
    state.activeAccount = account
    localStorage.setItem('activeAccount', account)
  },
  [USER_ACCOUNTS] (state, accounts) {
    state.userAccounts = accounts
  },
  [USER_TOKEN_CHECKING] (state, checking) {
    state.userTokenChecking = checking
  }
}

const actions = {
  logout ({ commit }) {
    commit(LOGOUT)
  },
  rememberMe ({ commit }, remember) {
    commit(REMEMBER_ME, remember)
  },
  tokenDataAction ({commit}, token) {
    commit(TOKEN_DATA, token)
  },
  userDataAction ({commit}, user) {
    commit(USER_DATA, user)
  },
  setActiveUserAccountAction ({commit}, account) {
    commit(SET_ACTIVE_ACCOUNT, account)
  },
  setUserAccounts ({commit}, accounts) {
    commit(USER_ACCOUNTS, accounts)
  },
  setUserTokenChecking ({commit}, checking) {
    commit(USER_TOKEN_CHECKING, checking)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
