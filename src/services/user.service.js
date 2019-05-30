import axios from 'axios'

export const userService = {
    login,
    logout,
    create
};

const url = 'http://localhost:3000/users'

function login(credentials) {
    return axios.post(url, credentials)
        .then(response => {
            if (response.user) {
                localStorage.setItem('user', JSON.stringify(response.user));

                return response.user
            }

            return false
        })
}

function logout() {
    localStorage.removeItem('user')
}

function create(user) {
    return axios.post(url, user)
}
