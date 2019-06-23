'use strict';

const fields = {
  user: { initialState: '' },
  name:  { initialState: '' },
  size: { initialState: '' },
  gender: { initialState: '' },
  breed: { initialState: '' },
  birthdate: { initialState: '' },
  description: { initialState: '' },
  images: { initialState: [] },
  state: { initialState: 'not_adopted' },
  createdAt: { initialState: 0, fastLookup: true }
};

const projections = {
  'shelterManagment.friend.added' (friends, event) {
    friends.add({
      user: event.data.user,
      name: event.data.name,
      size: event.data.size,
      gender: event.data.gender,
      breed: event.data.breed,
      birthdate: event.data.birthdate,
      description: event.data.description,
      images: event.data.images,
      state: event.data.state,
      createdAt: event.metadata.timestamp
    });
  },

  'shelterManagment.friend.updated' (friends, event) {
    friends.update({
      where: { id: event.aggregate.id },
      set: {
        name: event.data.name,
        size: event.data.size,
        gender: event.data.gender,
        breed: event.data.breed,
        birthdate: event.data.birthdate,
        description: event.data.description,
        images: event.data.images,
        state: event.data.state,
      }
    });
  },

  'shelterManagment.friend.adopted' (friends, event) {
    friends.update({
      where: { id: event.aggregate.id },
      set: {
        state: event.data.state
      }
    });
  },

  'shelterManagment.friend.deleted' (friends, event) {
    friends.remove({
      where: { id: event.aggregate.id }
    });
  }
};

module.exports = { fields, projections };
