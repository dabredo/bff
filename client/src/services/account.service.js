import Vue from 'vue'

async function create(animal) {
  let app = await Vue.$auth1

  return await app.shelterManagment
    .friend()
    .add(animal)
    .failed(err => console.error('error', err))
}

async function update(animal) {
  let app = await Vue.$auth1

  return await app.shelterManagment
    .friend(animal.id)
    .update(animal)
    .failed(err => console.error(err))
}

async function remove(id) {
  let app = await Vue.$auth1

  return await app.shelterManagment.friend(id).delete()
    .failed(err => console.error(err))
}

async function getByUserId(userId) {
  let app = await Vue.$auth1

  return await app.lists.accounts.readOne({
      where: { id: userId }
  })
}

export const animalService = {
    create,
    update,
    remove,
    getByUserId,
};
