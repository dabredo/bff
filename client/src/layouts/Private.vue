<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Best friends</span>
      </v-toolbar-title>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          flat
          to="/private/dashboard"
        >
          Pagina principal
        </v-btn>
        <v-btn
          v-if="isAnimalShelter"
          flat
          to="/private/animals"
        >
          Animales
        </v-btn>
        <v-btn
          flat
          to="/private/adoption"
        >
          Adopcion
        </v-btn>
      </v-toolbar-items>
      <v-spacer />
      <v-btn
        v-if="user"
        disabled
        flat
      >
        <span>{{ user.email }}</span>
      </v-btn>
      <v-btn
        flat
        @click="logout()"
      >
        <span>Logout</span>
      </v-btn>
    </v-toolbar>

    <v-snackbar
      v-model="displayNotification"
      :multi-line="true"
      :timeout="5000"
      :top="true"
      :color="type"
    >
      {{ message }}

      <v-btn
        dark
        flat
        @click="closeNotification"
      >
        Cerrar
      </v-btn>
    </v-snackbar>

    <v-content>
      <v-layout
        v-if="hasNotAnAccount"
        class="orange lighten-4 font-weight-bold"
      >
        <v-container>
          <h2>Registrar cuenta</h2>

          <AccountForm />
        </v-container>
      </v-layout>

      <v-layout
        v-if="canNotLoadAccount"
        class="red lighten-3"
      >
        <v-container>
          <h1 class="mb-4">
            Ups something happen
          </h1>

          <p>Sorry, we have experienced some issue loading your account.</p>
          <p>Please try again later or contact us.</p>
        </v-container>
      </v-layout>

      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import AccountForm from "../components/AccountForm";

import { mapState, mapGetters } from "vuex";

export default {
  components: {
    AccountForm
  },
  computed: {
    ...mapState("user", ["user"]),
    ...mapState("notification", ["message", "type"]),
    ...mapGetters({
      'isAnimalShelter': 'user/isAnimalShelter',
      'hasNotAnAccount': 'user/hasNotAnAccount',
      'canNotLoadAccount': 'user/canNotLoadAccount',
    }),
    displayNotification: {
      get: function() {
        return this.$store.state.notification.display;
      },
      set: function(newValue) {
        if (!newValue) {
          this.$store.commit("notification/close");
        }
      }
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push("/");
    },
    closeNotification() {
      this.$store.commit("notification/close");
    }
  }
};
</script>
