import Vue from "vue";

export const adoptionService = {
  create,
  approve,
  decline,
  getAllByUser,
  getAllByAnimalShelter,
};

async function create(animalId) {
  const app = await Vue.$app;

  return app.shelterManagment
    .friend(animalId)
    .requestAdoption()
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

async function getAllByUser(userId) {
  const app = await Vue.$app;

  return app.lists.adoptions.readAndObserve({
      where: { user: userId },
      orderBy: { createdAt: "ascending" }
  });
}

async function getAllByAnimalShelter(animalShelterId) {
  const app = await Vue.$app;

  return app.lists.adoptions.readAndObserve({
      where: { animalShelterId: animalShelterId },
      orderBy: { createdAt: "ascending" }
  });
}
