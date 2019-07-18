import Vue from "vue";

async function create(animal) {
  const app = await Vue.$app;

  return await app.shelterManagment
    .friend()
    .add(animal)
    .failed(err => console.error("error", err));
}

async function update(animal) {
  const app = await Vue.$app;

  return await app.shelterManagment
    .friend(animal.id)
    .update(animal)
    .failed(err => console.error(err));
}

async function remove(id) {
  const app = await Vue.$app;

  return await app.shelterManagment
    .friend(id)
    .delete()
    .failed(err => console.error(err));
}

async function getById(id) {
  const app = await Vue.$app;

  return await app.lists.friends.readOne({
    where: { id: id }
  });
}

async function getAllByAnimalShelter() {
  const app = await Vue.$app;

  //TODO: Do it in backend
  let where = {
    user: app.auth.getProfile().sub
  };


  return app.lists.friends.readAndObserve({
    where: where,
    orderBy: { createdAt: "descending" }
  });
}

async function get(query) {
  let where = {};
  if (query.state) {
    where.state = query.state;
  }

  if (query.name) {
    where.name = query.name;
  }

  if (query.gender) {
    where.gender = query.gender;
  }

  if (query.size) {
    where.size = query.size;
  }

  const app = await Vue.$app;

  return app.lists.friends.read({
    where: where,
    orderBy: { timestamp: "descending" }
  });
}

export const animalService = {
  create,
  update,
  remove,
  getById,
  getAllByAnimalShelter,
  get
};
