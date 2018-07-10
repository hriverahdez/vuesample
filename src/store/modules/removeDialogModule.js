const HEADER_TEXT = 'HEADER_TEXT'
const INPUT_VALUE = 'INPUT_VALUE'
const NAME_OF_THE_EVENT_TO_EMIT = 'NAME_OF_THE_EVENT_TO_EMIT'
const REMOVE_DIALOG_DATA = 'REMOVE_DIALOG_DATA'
const REMOVE_DIALOG_STATUS = 'REMOVE_DIALOG_STATUS'

const state = {
  headerText: '',
  inputValue: '',
  nameOfTheEventToEmit: '',
  removeDialogData: {},
  removeDialogStatus: false

}

const getters = {
  headerTextGetter (state) {
    return state.headerText
  },
  inputValueGetter (state) {
    return state.inputValue
  },
  nameOfTheEventToEmitGetter (state) {
    return state.nameOfTheEventToEmit
  },
  removeDialogDataGetter (state) {
    return state.removeDialogData
  },
  removeDialogStatusGetter (state) {
    return state.removeDialogStatus
  }
}

const mutations = {
  [HEADER_TEXT] (state, text) {
    state.headerText = text
  },
  [INPUT_VALUE] (state, data) {
    state.inputValue = data
  },
  [NAME_OF_THE_EVENT_TO_EMIT] (state, name) {
    state.nameOfTheEventToEmit = name
  },
  [REMOVE_DIALOG_DATA] (state, data) {
    state.removeDialogData = data
  },
  [REMOVE_DIALOG_STATUS] (state, status) {
    state.removeDialogStatus = status
  }
}

const actions = {
  headerTextAction ({commit}, text) {
    commit(HEADER_TEXT, text)
  },
  inputValueAction ({commit}, data) {
    commit(INPUT_VALUE, data)
  },
  nameOfTheEventToEmitAction ({commit}, name) {
    commit(NAME_OF_THE_EVENT_TO_EMIT, name)
  },
  removeDialogDataAction ({commit}, data) {
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
