// Current token
const LOGOUT = 'LOGOUT'
const REMEMBER_ME = 'REMEMBER_ME'
const SET_ACTIVE_ACCOUNT = 'SET_ACTIVE_ACCOUNT'
const SKIP_ADMIN_USERS_QUERY = 'SKIP_ADMIN_USERS_QUERY'
const SKIP_USER_BY_TOKEN = 'SKIP_USER_BY_TOKEN'
const TOKEN_DATA = 'TOKEN_DATA'
const USER_CRUD_ACCOUNTS = 'USER_CRUD_ACCOUNTS'
const USER_DATA = 'USER_DATA'
const USER_DATA_CRUD = 'USER_DATA_CRUD'
const USER_DIALOG_STATUS = 'USER_DIALOG_STATUS'
const USER_ACCOUNTS = 'USER_ACCOUNTS'
const USER_EDIT_INDEX_STATUS = 'USER_EDIT_INDEX_STATUS'
const USER_TOKEN_CHECKING = 'USER_TOKEN_CHECKING'
const USERS_DATA = 'USERS_DATA'

const state = {
  activeAccount: '',
  token: '',
  rememberMe: false,
  skipAdminUsersQuery: true,
  skipUserByToken: true,
  user: [],
  userAccountsNumber: 0,
  userAccounts: [],
  userTokenChecking: false,
  userEditedIndex: -1,
  userCRUD: [],
  userDialogStatus: false,
  users: []
}

const getters = {
  activeAccount (state) {
    return state.activeAccount
  },
  getUserDialogStatus (state) {
    // console.log(state.userDialogStatus)
    return state.userDialogStatus
  },
  isLogged (state, getters) {
    return (typeof getters.tokenGetter !== 'undefined' && getters.tokenGetter !== '' && getters.userGetter !== 'undefined' && getters.userGetter !== '')
  },
  rememberMe (state) {
    return state.rememberMe
  },
  skipAdminUsersQueryGetter () {
    return state.skipAdminUsersQuery
  },
  skipUserByTokenGetter () {
    return state.skipUserByToken
  },
  tokenGetter (state) {
    return state.token
  },
  userGetter (state) {
    return state.user
  },
  usersDataGetter (state) {
    return state.users
  },
  userCrudGetter (state) {
    return state.userCRUD
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
  userCrudAccounts (state) {
    return state.userCRUD.accounts ? state.userCRUD.accounts : []
  },
  userCrudAccountsNames (state) {
    if (!state.userCRUD.accounts) {
      return []
    }

    let accountsNames = []
    state.userCRUD.accounts.forEach((account) => {
      accountsNames.push({ '_id': account.account })
    })

    return accountsNames
  },
  userEmails (state) {
    let emails = []
    state.users.map((user) => emails.push(user.email))
    return emails
  },
  userTokenChecking (state) {
    return state.userTokenChecking
  }
}

const mutations = {
  [USER_DIALOG_STATUS] (state, status) {
    state.userDialogStatus = status
  },
  [USER_EDIT_INDEX_STATUS] (state, indexValue) {
    state.userEditedIndex = indexValue
  },
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
  [SKIP_ADMIN_USERS_QUERY] (state, status) {
    state.skipAdminUsersQuery = status
  },
  [SKIP_USER_BY_TOKEN] (state, status) {
    state.skipUserByToken = status
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
  [USER_DATA_CRUD] (state, user) {
    state.userCRUD = user
  },
  [USERS_DATA] (state, users) {
    state.users = users
  },
  [SET_ACTIVE_ACCOUNT] (state, account) {
    state.activeAccount = account
    localStorage.setItem('activeAccount', account)
  },
  [USER_ACCOUNTS] (state, accounts) {
    state.userAccounts = accounts
  },
  [USER_CRUD_ACCOUNTS] (state, accounts) {
    state.userCrudAccounts = accounts
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
  skipAdminUsersQueryAction ({ commit }, status) {
    commit(SKIP_ADMIN_USERS_QUERY, status)
  },
  skipUserByTokenAction ({ commit }, status) {
    commit(SKIP_USER_BY_TOKEN, status)
  },
  tokenDataAction ({commit}, token) {
    commit(TOKEN_DATA, token)
  },
  userDataAction ({commit}, user) {
    commit(USER_DATA, user)
  },
  userDataCrudAction ({commit}, user) {
    commit(USER_DATA_CRUD, user)
  },
  usersDataAction ({commit}, users) {
    commit(USERS_DATA, users)
  },
  userDialogStatusAction ({commit}, showDialog) {
    commit(USER_DIALOG_STATUS, showDialog)
  },
  userSchemaAction ({commit}, currentUser) {
    commit(USER_DATA, currentUser)
  },
  setActiveUserAccountAction ({commit}, account) {
    commit(SET_ACTIVE_ACCOUNT, account)
  },
  setUserAccounts ({commit}, accounts) {
    commit(USER_ACCOUNTS, accounts)
  },
  setUserCrudAccounts ({commit}, accounts) {
    commit(USER_CRUD_ACCOUNTS, accounts)
  },
  setUserEditedIndexStatusAction ({commit}, indexValue) {
    commit(USER_EDIT_INDEX_STATUS, indexValue)
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
