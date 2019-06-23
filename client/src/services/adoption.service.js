import Vue from 'vue'

export const adoptionService = {
    create,
    approve,
    decline,
    getAll
};

async function create(animalId) {
  let app = await Vue.$auth1

  return await app.shelterManagment
    .friend(animalId)
    .requestAdoption()
    .failed(err => console.error('error', err))
}

async function approve(animalId, userId) {
  let app = await Vue.$auth1

  return await app.shelterManagment
    .friend(animalId)
    .approveAdoption({ userId: userId })
    .failed(err => console.error('error', err))
}

async function decline(animalId, userId) {
  let app = await Vue.$auth1

  return await app.shelterManagment
    .friend(animalId)
    .declineAdoption({ userId: userId })
    .failed(err => console.error('error', err))
}

async function getAll() {
  let app = await Vue.$auth1

  return app.lists.adoptions
    .readAndObserve({
    orderBy: { createdAt: 'ascending' }
  })
}
