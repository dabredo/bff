import axios from 'axios'

export const animalService = {
    create,
    update,
    remove,
    getById,
    getAllByAnimalShelter,
    getAll
};

const url = 'http://localhost:3000/animals'

function create(animal) {
  return axios.post(url, animal)
}

function update(animal) {
  return axios.put(url + '/' + animal.id, animal)
}

function remove(id) {
  return axios.delete(url + '/' + id)
}

function getById(id) {
  return axios.get(url + '/' + id)
}

function getAllByAnimalShelter() {
  return axios.get(url)
}

function getAll() {
}
