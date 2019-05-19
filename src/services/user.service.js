import axios from 'axios'

export const userService = {
    login,
    logout,
    register
};

const url = 'http://localhost:3000/users'

function login(credentials) {
    return axios.post(url, credentials)
        .then(response => {
            if (response.user) {
                localStorage.setItem('user', JSON.stringify(user));
                return response.user
            }

            return false
        })
}

function logout() {
    localStorage.removeItem('user')
}

function register(user) {
    return axios.post(url, user)
}
