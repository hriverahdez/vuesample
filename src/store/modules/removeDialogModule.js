const REMOVE_DIALOG_DATA = 'REMOVE_DIALOG_DATA'
const REMOVE_DIALOG_STATUS = 'REMOVE_DIALOG_STATUS'
const INPUT_VALUE = 'INPUT_VALUE'

const state = {
  inputValue: '',
  removeDialogData: {},
  removeDialogStatus: false

}

const getters = {
  inputValueGetter (state) {
    return state.inputValue
  },
  removeDialogDataGetter (state) {
    return state.removeDialogData
  },
  removeDialogStatusGetter (state) {
    return state.removeDialogStatus
  }
}

const mutations = {
  [INPUT_VALUE] (state, data) {
    state.inputValue = data
  },
  [REMOVE_DIALOG_DATA] (state, data) {
    state.removeDialogData = data
  },
  [REMOVE_DIALOG_STATUS] (state, status) {
    state.removeDialogStatus = status
  }
}

const actions = {
  inputValueAction ({commit}, data) {
    commit(INPUT_VALUE, data)
  },
  removeDialogDataAction ({commit}, data) {
    console.log('entra action', data)
    commit(REMOVE_DIALOG_DATA, data)
  },
  removeDialogStatusAction ({commit}, showDialog) {
    commit(REMOVE_DIALOG_STATUS, showDialog)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
