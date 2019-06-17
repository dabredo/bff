import Vue from 'vue'
import { userService } from '../services/user.service'

//TODO Do we need this?
const loggedUser = JSON.parse(localStorage.getItem('user'))

export const user = {
  strict: true,
  namespaced: true,
  state: {
    user: loggedUser || null
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
    async isLoggedIn({ commit }) {
      let auth = await Vue.$auth1;
      if (auth.auth.isLoggedIn()) {
        commit('setUser', auth.auth.getProfile().name) //TODO: Do we need this?
      }
    },
    login({ commit }, credentials) {
      return userService.login(credentials)
        .then((user) => {
          commit('setUser', user)
        })
    },
    async logout ({ commit }) {
      let auth = await Vue.$auth1;

      userService.logout()
      commit('removeUser')

      auth.logout()
    },
    register ({ dispatch }, user) {
      return userService.create(user)
        .then(() => {
          dispatch('login', user)
        })
    }
  }
}
