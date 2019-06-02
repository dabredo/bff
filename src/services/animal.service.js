import axios from 'axios'

export const animalService = {
    create,
    update,
    remove,
    getById,
    getAllByAnimalShelter,
    get,
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

function get(query) {
  const params = new URLSearchParams();

  if (query.state) {
    params.append('state', query.state);
  }

  if (query.name) {
    console.log(query.name)
    params.append('name', query.name);
  }

  if (query.gender) {
    params.append('gender', query.gender);
  }

  if (query.size) {
    params.append('size', query.size.join());
  }

  return axios.get(url, { params })
}
