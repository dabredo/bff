import Vue from "vue";
import Vuex from "vuex";

import { animalShelter } from "./animalShelter.module";
import { adoption } from "./adoption.module";
import { user } from "./user.module";
import { notification } from "./notification.module";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    animalShelter,
    adoption,
    user,
    notification
  }
});
