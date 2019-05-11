import Vue from 'vue';
import Vuex from 'vuex';

import { animalShelter } from './animalShelter.module'

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    animalShelter
  }
});
