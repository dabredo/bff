export const animalShelter = {
  namespaced: true,
  state: {
    friends: [],
  },
  getters: {
    friendsCount: state => {
      return state.friends.length
    }
  },
  mutations: {
    add (state, friend) {
      state.friends.push(friend)
    }
  },
  actions: {
  }
}
