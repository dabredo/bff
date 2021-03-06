import Vue from "vue";
import "./plugins/vuetify";
import VeeValidate, { Validator } from "vee-validate";
import es from "vee-validate/dist/locale/es";
import VueMoment from "vue-moment";
import App from "./App.vue";

import auth from "./plugins/auth";
Vue.use(auth);

import { router } from "./router";
import { store } from "./store";

import PrivateLayout from "./layouts/Private";
import PublicLayout from "./layouts/Public";

Vue.component("public-layout", PublicLayout);
Vue.component("private-layout", PrivateLayout);

Vue.use(VueMoment);

Vue.use(VeeValidate, {
  validity: false
});

Validator.localize("es", es);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
