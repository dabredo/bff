import Vue from 'vue'
import { userService } from '../services/user.service'
import { accountService } from '../services/account.service'

//TODO Do we need this?
//const loggedUser = JSON.parse(localStorage.getItem('user'))

export const user = {
  strict: true,
  namespaced: true,
  state: {
    user: null
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
            //GET TYPE
            let userId = auth.auth.getProfile().sub;

            let result = await accountService.getByUserId(userId)
            await result.finished((result) => {
                commit('setUser', {
                    id: userId,
                    email: auth.auth.getProfile().name,
                    type: result.type
                });
            }).failed((error) => {
              console.log(error)
            })

            commit('setUser', {
                id: userId,
                email: auth.auth.getProfile().name,
                type: null
            });
        }
    },
    login({ commit }, credentials) {
      return userService.login(credentials)
        .then((user) => {
          commit('setUser', user)
        })
    },
    async logout({ commit }) {
      let auth = await Vue.$auth1;

      userService.logout()
      commit('removeUser')

      auth.logout()
    },
    register({ dispatch }, user) {
      return userService.create(user)
        .then(() => {
          dispatch('login', user)
        })
    },
    async registerAccount({ commit }, account) {
      await accountService.register(account)

      let auth = await Vue.$auth1;
      let userId = auth.auth.getProfile().sub;

      commit('setUser', {
          id: userId,
          email: auth.auth.getProfile().name,
          type: account.type
      });
    }
  }
}
