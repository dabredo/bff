import axios from 'axios'

export const adoptionService = {
    create,
    // update,
    // remove,
    // getById,
    // get,
    getAll
};

const url = 'http://localhost:3000/adoptions'

function create(adoption) {
  return axios.post(url, adoption)
}

function getAll() {
  return axios.get(url)
}

// function update(animal) {
//   return axios.put(url + '/' + animal.id, animal)
// }

// function remove(id) {
//   return axios.delete(url + '/' + id)
// }

// function getById(id) {
//   return axios.get(url + '/' + id)
// }

// function get(query) {
//   const params = new URLSearchParams();

//   if (query.state) {
//     params.append('state', query.state);
//   }

//   if (query.name) {
//     params.append('name', query.name);
//   }

//   if (query.gender) {
//     params.append('gender', query.gender);
//   }

//   if (query.size) {
//     params.append('size', query.size.join());
//   }

//   return axios.get(url, { params })
// }
