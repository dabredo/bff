import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import Adoption from './components/Adoption.vue'
import AnimalShelter from './components/AnimalShelter.vue'

Vue.config.productionTip = false

Vue.use(Router)

const routes = [
  { path: '/adoption', component: Adoption },
  { path: '/animal-shelter', component: AnimalShelter },
]

const router = new Router({
  routes
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
