export const notification = {
  strict: true,
  namespaced: true,
  state: {
    display: false,
    message: '',
    type: ''
  },
  mutations: {
    displayError (state, message) {
      state.message = message
      state.type = 'errouccess'
      state.display = true
    },
    displaySuccess (state, message) {
      state.message = message
      state.type = 'success'
      state.display = true
    },
    close(state) {
      state.display = false
    }

  }
}
