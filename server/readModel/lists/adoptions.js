'use strict';

const fields = {
  user: { initialState: '' },
  username: { initialState: '' },
  animalId:  { initialState: '' },
  animalName:  { initialState: '' },
  state:  { initialState: 'requested' },
  createdAt: { initialState: 0, fastLookup: true },
  repliedAt: { initialState: 0, fastLookup: true }
};

const projections = {
  'shelterManagment.friend.adoptionRequested' (adoptions, event) {
    adoptions.add({
      user: event.data.user,
      username: event.data.username,
      animalId: event.aggregate.id,
      animalName: event.data.animalName,
      createdAt: event.metadata.timestamp,
    })
  },
  'shelterManagment.friend.adoptionApproved' (adoptions, event) {
    adoptions.update({
      where: { id: event.aggregate.id },
      set: {
        state: 'approved',
        repliedAt: event.metadata.timestamp
      }
    })
  },
  'shelterManagment.friend.adoptionDeclined' (adoptions, event) {
    adoptions.update({
      where: { id: event.aggregate.id },
      set: {
        state: 'declined',
        repliedAt: event.metadata.timestamp
      }
    })
  }
};

const transformations = {};

module.exports = { fields, projections, transformations };
