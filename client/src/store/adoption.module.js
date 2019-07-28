import Vue from "vue";
import { adoptionService } from "../services/adoption.service";

export const adoption = {
  strict: true,
  namespaced: true,
  state: {
    adoptions: [],
    requestState: undefined,
  },
  getters: {},
  mutations: {
    setAdoptions(state, adoptions) {
      state.adoptions = adoptions;
    },
    clearAdoptionRequest(state) {
      state.requestState = undefined;
    },
    failAdoptionRequest(state) {
      state.requestState = 'failed';
    },
    successAdoptionRequest(state) {
      state.requestState = 'success';
    },
  },
  actions: {
    async loadRequestsForUser({ commit }, userId) {
      let res = await adoptionService.getAllByUser(userId);
      res
        .started(result => {
          commit("setAdoptions", result);
        })
        .updated(result => {
          commit("setAdoptions", result);
        });
    },
    async loadRequestsForAnimalShelter({ commit }, animalShelterId) {
      let res = await adoptionService.getAllByAnimalShelter(animalShelterId);
      res
        .started(result => {
          commit("setAdoptions", result);
        })
        .updated(result => {
          commit("setAdoptions", result);
        });
    },
    async request({ commit }, animalId) {
      commit("clearAdoptionRequest");

      let res = await adoptionService.create(animalId)
      res
        .failed((error, command) => {
          console.log(error)
          commit("failAdoptionRequest");
        })
        .await('adoptionRequested', (event, command) => {
          commit("successAdoptionRequest");
        });
    },
    async approveRequest({ commit }, request) {
      let res = await adoptionService.approve(request.animalId, request.userId)
      res
        .failed((error, command) => {
          commit('notification/displayError', "La solicitud de adopcion no se pudo aceptar", { root: true });
        })
        .await('adoptionApproved', (event, command) => {
          commit('notification/displaySuccess', "La solicitud de adopcion ha sido aceptado", { root: true });
        });
    },
    async declineRequest({ commit }, request) {
      let res = await adoptionService.decline(request.animalId, request.userId)
      res
        .failed((error, command) => {
          commit('notification/displayError', "La solicitud de adopcion no se pudo rechazar", { root: true });
        })
        .await('adoptionDeclined', (event, command) => {
          commit('notification/displaySuccess', "La solicitud de adopcion ha sido rechazada", { root: true });
        });
    },
  }
};
