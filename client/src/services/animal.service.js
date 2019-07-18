import Vue from "vue";

async function create(animal) {
  let app = await Vue.$auth1;

  return await app.shelterManagment
    .friend()
    .add(animal)
    .failed(err => console.error("error", err));
}

async function update(animal) {
  let app = await Vue.$auth1;

  return await app.shelterManagment
    .friend(animal.id)
    .update(animal)
    .failed(err => console.error(err));
}

async function remove(id) {
  let app = await Vue.$auth1;

  return await app.shelterManagment
    .friend(id)
    .delete()
    .failed(err => console.error(err));
}

async function getById(id) {
  let app = await Vue.$auth1;

  return await app.lists.friends.readOne({
    where: { id: id }
  });
}

async function getAllByAnimalShelter() {
  let app = await Vue.$auth1;

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
  let app = await Vue.$auth1;

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
