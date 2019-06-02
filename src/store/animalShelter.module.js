import { animalService } from '../services/animal.service'
import { adoptionService } from '../services/adoption.service'

export const animalShelter = {
  strict: true,
  namespaced: true,
  state: {
    friends: [],
    selectedFriend: undefined,
    sizes: [
      { value: 'small', text: 'Pequeno' },
      { value: 'medium', text: 'Mediano' },
      { value: 'big', text: 'Grande' }
    ],
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
    getAllNotAdopted ({ commit }, animalDetails) {
      animalDetails.state = 'no_adopted'

      return animalService.get(animalDetails)
        .then(response => commit('getFriendsSuccess', response.data))
    },
    getFriends ({ commit }) {
      return animalService.getAllByAnimalShelter()
        .then(response => commit('getFriendsSuccess', response.data))
    },
    getFriend({ commit }, friendId) {
      return animalService.getById(friendId)
        .then(response => commit('getFriendSuccess', response.data))
    },
    createFriend({ commit, dispatch }, friend) {
      return animalService.create(friend)
        .then(() => {
          dispatch('getFriends')
          .then(() => { commit('unselectFriend') });
        })
    },
    updateFriend({ commit , dispatch }, friend) {
      return animalService.update(friend)
      .then(() => {
        dispatch('getFriends')
        .then(() => { commit('unselectFriend') });
      })
    },
    deleteFriend({ dispatch }, friendId) {
      return animalService.remove(friendId)
        .then(() => dispatch('getFriends'))
    },
    createAdoptionRequest({ commit }, adoptionRequest) {
      return adoptionService.create(adoptionRequest)
    },
    getAdoptions() {
      return adoptionService.getAll()
    }
  }
}
