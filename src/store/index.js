import Vue from 'vue';
import Vuex from 'vuex';

import { animalShelter } from './animalShelter.module'
import { user } from './user.module'

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    animalShelter,
    user
  }
});
