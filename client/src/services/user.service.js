import axios from "axios";

export const userService = {
  login,
  logout,
  create
};

const url = "http://localhost:4000/users";

function login(credentials) {
  return axios.post(url, credentials).then(response => {
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));

      return response.data;
    }

    return false;
  });
}

function logout() {
  localStorage.removeItem("user");
}

function create(user) {
  return axios.post(url, user);
}
