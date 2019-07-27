import Vue from "vue";
import { animalService } from "../services/animal.service";
import { adoptionService } from "../services/adoption.service";

export const animalShelter = {
  strict: true,
  namespaced: true,
  state: {
    adoptions: [],
    friends: [],
    selectedImages: [],
    selectedFriend: undefined,
    sizes: [
      { value: "small", text: "Pequeno" },
      { value: "medium", text: "Mediano" },
      { value: "big", text: "Grande" }
    ]
  },
  getters: {},
  mutations: {
    selectImages(state, images) {
      state.selectedImages = images;
    },
    getFriendsSuccess(state, friends) {
      state.friends = friends;
    },
    getFriendSuccess(state, friend) {
      state.selectedFriend = friend;
    },
    selectNewFriend(state) {
      state.selectedFriend = {
        // name: '',
        breed: "",
        gender: "m",
        size: "small",
        birthdate: "",
        state: "not_adopted",
        images: []
      };
    },
    unselectFriend(state) {
      state.selectedFriend = undefined;
      state.selectedImages = [];
    },
    getAdoptionsSuccess(state, adoptions) {
      state.adoptions = adoptions;
    }
  },
  actions: {
    async getAllNotAdopted({ commit }, animalDetails) {
      animalDetails.state = "not_adopted";

      let res = await animalService.get(animalDetails);
      res.finished(async result => {
        const appImage = await Vue.$image;

        for (let i = 0; i < result.length; i++) {
          if (result[i].images.length) {
            let image = result[i].images[0];

            const file = await appImage.getFile({
              id: image.id
            });

            image.url = await file.asDataUrl();
          }
        }

        commit("getFriendsSuccess", result);
      });
    },
    async getFriends({ commit }) {
      let res = await animalService.getAllByAnimalShelter();
      res
        .started(result => {
          commit("getFriendsSuccess", result);
        })
        .updated(result => {
          commit("getFriendsSuccess", result);
        });
    },
    async getFriend({ commit }, friendId) {
      let getFriend = await animalService.getById(friendId);

      let images = [];
      await getFriend.finished(async friend => {
        const appImage = await Vue.$image;

        await friend.images.forEach(async image => {
          const file = await appImage.getFile({
            id: image.id
          });

          images.push({
            id: image.id,
            url: await file.asDataUrl(),
            name: image.name
          });
        });

        commit("selectImages", images);
        commit("getFriendSuccess", friend);
      });
    },
    async createFriend({ commit }, friend) {
      await animalService.create(friend);
      commit("unselectFriend");
    },
    async updateFriend({ commit }, friend) {
      await animalService.update(friend);
      commit("unselectFriend"); // NOT NEEDED
    },
    async deleteFriend({ commit }, friendId) {
      await animalService.remove(friendId);
      commit("unselectFriend"); // NOT NEEDED
    },
    createAdoptionRequest({ commit }, animalId) {
      return adoptionService.create(animalId);
    },
    approveAdoptionRequest({ commit }, request) {
      return adoptionService.approve(request.animalId, request.userId);
    },
    declineAdoptionRequest({ commit }, request) {
      return adoptionService.decline(request.animalId, request.userId);
    },
    async getAdoptionRequestsForUser({ commit }, userId) {
      let res = await adoptionService.getAllByUser(userId);

      res
        .started(result => {
          commit("getAdoptionsSuccess", result);
        })
        .updated(result => {
          commit("getAdoptionsSuccess", result);
        });
    },
    async getAdoptionRequestsForAnimalShelter({ commit }, animalShelterId) {
      let res = await adoptionService.getAllByAnimalShelter(animalShelterId);

      res
        .started(result => {
          commit("getAdoptionsSuccess", result);
        })
        .updated(result => {
          commit("getAdoptionsSuccess", result);
        });
    }
  }
};
