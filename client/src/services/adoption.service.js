import Vue from "vue";

export const adoptionService = {
  create,
  approve,
  decline,
  getAll
};

async function create(animalId) {
  const app = await Vue.$app;

  return await app.shelterManagment
    .friend(animalId)
    .requestAdoption()
    .failed(err => console.error("error", err));
}

async function approve(animalId, userId) {
  const app = await Vue.$app;

  return await app.shelterManagment
    .friend(animalId)
    .approveAdoption({ userId: userId })
    .failed(err => console.error("error", err));
}

async function decline(animalId, userId) {
  const app = await Vue.$app;

  return await app.shelterManagment
    .friend(animalId)
    .declineAdoption({ userId: userId })
    .failed(err => console.error("error", err));
}

async function getAll() {
  const app = await Vue.$app;

  return app.lists.adoptions.readAndObserve({
    orderBy: { createdAt: "ascending" }
  });
}
