import Vue from 'vue'
import Router from 'vue-router'

import Home from './components/Home.vue'
import Adoption from './components/Adoption.vue'
import AnimalShelter from './components/AnimalShelter.vue'

Vue.use(Router)

const routes = [
  { path: '/', component: Home },
  { path: '/adoption', component: Adoption },
  { path: '/animal-shelter', component: AnimalShelter },
]

export const router = new Router({
  routes
})
