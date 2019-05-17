import { animalService } from '../services/animal.service'

export const animalShelter = {
  strict: true,
  namespaced: true,
  state: {
    friends: [],
    selectedFriend: undefined
  },
  getters: {
    friendsCount: state => {
      return state.friends.length
    }
  },
  mutations: {
    getFriendsSuccess (state, friends) {
      state.friends = friends
    },
    getFriendSuccess (state, friend) {
      state.selectedFriend = friend
    },
    selectNewFriend (state) {
      state.selectedFriend = {
        name: '',
        breed: '',
        gender: 'm',
        size: 'small',
        birthdate: '',
        state: 'no_adopted',
      }
    } ,
    unselectFriend (state) {
      state.selectedFriend = undefined
    }
  },
  actions: {
    getFriends ({ commit }) {
      animalService.getAllByAnimalShelter()
        .then(response => commit('getFriendsSuccess', response.data))
    },
    getFriend({ commit }, friendId) {
      animalService.getById(friendId)
        .then(response => commit('getFriendSuccess', response.data))
    },
    createFriend({ commit, dispatch }, friend) {
      animalService.create(friend)
        .then(() => {
          dispatch('getFriends')
          .then(() => { commit('unselectFriend') });
        })
    },
    updateFriend({ commit , dispatch }, friend) {
      animalService.update(friend)
      .then(() => {
        dispatch('getFriends')
        .then(() => { commit('unselectFriend') });
      })
    },
    deleteFriend({ dispatch }, friendId) {
      animalService.remove(friendId)
        .then(() => dispatch('getFriends'))
    }
  }
}
