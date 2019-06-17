import { animalService } from '../services/animal.service'
import { adoptionService } from '../services/adoption.service'

export const animalShelter = {
  strict: true,
  namespaced: true,
  state: {
    adoptions: [],
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
        state: 'not_adopted',
      }
    } ,
    unselectFriend (state) {
      state.selectedFriend = undefined
    },
    getAdoptionsSuccess (state, adoptions) {
      state.adoptions = adoptions
    },
  },
  actions: {
    async getAllNotAdopted ({ commit }, animalDetails) {
      animalDetails.state = 'not_adopted'

      let res = await animalService.get(animalDetails)
      res.finished(result => {
        commit('getFriendsSuccess', result)
      })
    },
    async getFriends ({ commit }) {
      let res = await animalService.getAllByAnimalShelter()
      res.started(result => {
        commit('getFriendsSuccess', result)
      })
      .updated(result => {
        commit('getFriendsSuccess', result)
      })
    },
    async getFriend({ commit }, friendId) {
      let getFriend = await animalService.getById(friendId)

      getFriend.finished(friend => {
        commit('getFriendSuccess', friend)
      })
    },
    async createFriend({ commit }, friend) {
      await animalService.create(friend)
      commit('unselectFriend')
    },
    async updateFriend({ commit }, friend) {
      await animalService.update(friend)
      commit('unselectFriend')  // NOT NEEDED
    },
    async deleteFriend({ commit }, friendId) {
      await animalService.remove(friendId)
      commit('unselectFriend')  // NOT NEEDED
    },
    createAdoptionRequest({ commit }, animalId) {
      return adoptionService.create(animalId)
    },
    approveAdoptionRequest({ commit }, request) {
      return adoptionService.approve(request.animalId, request.userId)
    },
    declineAdoptionRequest({ commit }, request) {
      return adoptionService.decline(request.animalId, request.userId)
    },
    async getAdoptions({ commit }) {
      let res = await adoptionService.getAll()

      res.started(result => {
        commit('getAdoptionsSuccess', result)
      })
      .updated(result => {
        commit('getAdoptionsSuccess', result)
      })
    }
  }
}
