import Vue from "vue";
import { userService } from "../services/user.service";
import { accountService } from "../services/account.service";

//TODO Do we need this?
//const loggedUser = JSON.parse(localStorage.getItem('user'))

export const user = {
  strict: true,
  namespaced: true,
  state: {
    user: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    removeUser(state) {
      state.user = null;
    }
  },
  actions: {
    async isLoggedIn({ commit }) {
      if (await Vue.$auth.isLoggedIn()) {
        //GET TYPE
        let userId = await Vue.$auth.getLoggedUserId();
        let username = await Vue.$auth.getLoggedUsername();

        let result = await accountService.getByUserId(userId);
        await result
          .finished(result => {
            commit("setUser", {
              id: userId,
              email: username,
              type: result.type
            });
          })
          .failed(error => {
            console.log(error);
          });

        commit("setUser", {
          id: userId,
          email: username,
          type: null
        });
      }
    },
    login({ commit }, credentials) {
      return userService.login(credentials).then(user => {
        commit("setUser", user);
      });
    },
    async logout({ commit }) {
      userService.logout();
      commit("removeUser");

      await Vue.$auth.logout();
    },
    register({ dispatch }, user) {
      return userService.create(user).then(() => {
        dispatch("login", user);
      });
    },
    async registerAccount({ commit }, account) {
      await accountService.register(account);

      let userId = await Vue.$auth.getLoggedUserId();
      let username = await Vue.$auth.getLoggedUsername();

      commit("setUser", {
        id: userId,
        email: username,
        type: account.type
      });
    }
  }
};
