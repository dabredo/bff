import Vue from 'vue'
import Router from 'vue-router'

import Home from './components/Home.vue'
import AnimalShelter from './components/AnimalShelter.vue'
import Adoption from './views/Adoption.vue'
import AdoptionConfirmation from './views/AdoptionConfirmation.vue'
import Login from './views/Login.vue'
import Registration from './views/Registration.vue'
import Dashboard from './views/Dashboard.vue'

Vue.use(Router)

const routes = [
  { path: '/', component: Home },
  { path: '/adoption', component: Adoption },
  { path: '/animal-shelter', component: AnimalShelter },
  { path: '/login', component: Login },
  { path: '/registration', component: Registration },
  {
    path: '/private/dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true,
      layout: 'private'
    }
  },
  {
    path: '/private/animal-shelter',
    component: AnimalShelter,
    meta: {
      requiresAuth: true,
      layout: 'private'
    }
  },
  {
    path: '/private/adoption/:animalId',
    component: AdoptionConfirmation,
    meta: {
      requiresAuth: true,
      layout: 'private'
    }
  },
]

export const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    localStorage.removeItem('path');
  }

  const loggedIn = localStorage.getItem('user');

  if (to.meta.requiresAuth && !loggedIn) {
    localStorage.setItem('path', to.path);

    next('/login')
  } else {
    next()
  }
})
