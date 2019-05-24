const SET_ALERT_MESSAGE = 'SET_ALERT_MESSAGE'
const CLOSE_ALERT_MESSAGE = 'CLOSE_ALERT_MESSAGE'

const state = {
  alert: {
    type: 'success',
    show: false,
    message: '',
    buttonText: ''
  }
}

const mutations = {
  // Show display alert in dialogs
  [SET_ALERT_MESSAGE] (state, data) {
    state.alert.type = data.type
    state.alert.show = data.show
    state.alert.message = data.message
    state.alert.buttonText = data.buttonText
  },
  // Close alert dialog
  [CLOSE_ALERT_MESSAGE] (state, data) {
    state.alert.type = 'success'
    state.alert.show = false
    state.alert.message = ''
    state.alert.buttonText = ''
  }
}

export default {
  state,
  mutations
}
