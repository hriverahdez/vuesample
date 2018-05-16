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
  setAlertMessage: (state, data) => {
    state.alert.type = data.type
    state.alert.show = data.show
    state.alert.message = data.message
    state.alert.buttonText = data.buttonText
  },
  // Close alert dialog
  closeAlertDialog: (state, data) => {
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
