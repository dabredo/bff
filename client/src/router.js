import Vue from "vue";
import Router from "vue-router";

import Home from "./components/Home.vue";
import Animal from "./views/Animal.vue";
import Adoption from "./views/Adoption.vue";
import AdoptionConfirmation from "./views/AdoptionConfirmation.vue";
import Login from "./views/Login.vue";
import Registration from "./views/Registration.vue";
import Dashboard from "./views/Dashboard.vue";

Vue.use(Router);

const routes = [
  { path: "/", component: Home },
  { path: "/adoption", component: Adoption },
  { path: "/login", component: Login },
  { path: "/registration", component: Registration },
  {
    path: "/private/dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true,
      layout: "private"
    }
  },
  {
    path: "/private/animals",
    component: Animal,
    meta: {
      requiresAuth: true,
      layout: "private"
    }
  },
  {
    path: "/private/adoption/:animalId",
    component: AdoptionConfirmation,
    meta: {
      requiresAuth: true,
      layout: "private"
    }
  },
  {
    path: "/private/adoption",
    component: Adoption,
    meta: {
      requiresAuth: true,
      layout: "private"
    }
  }
];

export const router = new Router({
  routes
});

router.beforeEach(async (to, from, next) => {
  //XXX: Redirect from auth0
  if (to.path == "/logout") {
    localStorage.removeItem("path");
    next("/");
  }

  if (to.path == "/login") {
    localStorage.setItem("path", "/private/dashboard");

    return await Vue.$auth.login("/#/private/dashboard");
  }

  if (to.meta.requiresAuth && !await Vue.$auth.isLoggedIn()) {
    localStorage.setItem("path", to.path);

    return await Vue.$auth.login(to.path);
  }

  //Hack to redirect after login
  const path = localStorage.getItem("path");
  localStorage.removeItem("path");

  if (path) {
    next(path);
  } else {
    next();
  }
});
