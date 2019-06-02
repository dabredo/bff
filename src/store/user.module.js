import { userService } from '../services/user.service'

const loggedUser = JSON.parse(localStorage.getItem('user'))

export const user = {
  strict: true,
  namespaced: true,
  state: {
    user: loggedUser || null
  },
  getters: {
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    removeUser (state) {
      state.user = null
    }
  },
  actions: {
    login({ commit }, credentials) {
      return userService.login(credentials)
        .then((user) => {
          commit('setUser', user)
        })
    },
    logout ({ commit }) {
      commit('removeUser')
      userService.logout()
    },
    register ({ dispatch }, user) {
      return userService.create(user)
        .then(() => {
          dispatch('login', user)
        })
    }
  }
}
