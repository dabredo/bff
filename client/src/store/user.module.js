import Vue from "vue";
import { userService } from "../services/user.service";
import { accountService } from "../services/account.service";

export const user = {
  strict: true,
  namespaced: true,
  state: {
    user: null,
    loading: false,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    unsetUser(state) {
      state.user = null;
    },
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    }
  },
  getters: {
    isAnimalShelter(state) {
      return state.user && state.user.type === 'animal-shelter';
    },
    hasNotAnAccount(state) {
      return state.user && !state.user.type;
    },
    canNotLoadAccount(state) {
      return !state.user;
    },
    isLoading(state) {
      return state.loading;
    }
  },
  actions: {
    async loadLoggedUser({ commit }) {
      commit('startLoading');

      if (!await Vue.$auth.isLoggedIn()) {
        commit('stopLoading');
        return;
      }

      let userId = await Vue.$auth.getLoggedUserId();
      let username = await Vue.$auth.getLoggedUsername();

      let result = await accountService.getByUserId(userId);
      result.finished(result => {
        commit("setUser", {
          id: userId,
          email: username,
          type: result.type
        });

        commit('stopLoading');
      }).failed(error => {
        if (error.message === "Item not found.") {
          commit("setUser", {
            id: userId,
            email: username,
            type: null
          });
        } else {
          //TODO: Log it
        }

        commit('stopLoading');
      })
    },
    async logout({ commit }) {
      userService.logout();
      commit("unsetUser");

      await Vue.$auth.logout();
    },
    async registerAccount({ commit }, account) {
      let userId = await Vue.$auth.getLoggedUserId();
      let username = await Vue.$auth.getLoggedUsername();

      let result = await accountService.register(account)
      result.delivered(command => {
          commit("setUser", {
            id: userId,
            email: username,
            type: account.type
          })
        }
      ).failed(error => {
        //TODO: Log it
        commit('notification/displayError', "The account could not be saved");
      });
    }

    // login({ commit }, credentials) {
    //   return userService.login(credentials).then(user => {
    //     commit("setUser", user);
    //   });
    // },
    // register({ dispatch }, user) {
    //   return userService.create(user).then(() => {
    //     dispatch("login", user);
    //   });
    // },
  }
};
