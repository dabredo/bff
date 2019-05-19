import Vue from 'vue'
import Router from 'vue-router'

import Home from './components/Home.vue'
import Adoption from './components/Adoption.vue'
import AnimalShelter from './components/AnimalShelter.vue'
import Login from './views/Login.vue'

Vue.use(Router)

const routes = [
  { path: '/', component: Home },
  { path: '/adoption', component: Adoption },
  { path: '/animal-shelter', component: AnimalShelter },
  { path: '/login', component: Login },

  { path: '/private', component: Home, meta: { requiresAuth: true } }, //TEST
]

export const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
    const loggedIn = localStorage.getItem('user');

    if (to.meta.requiresAuth && !loggedIn) {
        next('/login')
    } else {
        next()
    }
})
