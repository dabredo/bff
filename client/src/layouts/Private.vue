<template>
  <v-app v-if="user">
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Best friends</span>
      </v-toolbar-title>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to="/private/dashboard">Pagina principal</v-btn>
        <v-btn
          v-if="user.type === 'animal-shelter'"
          flat
          to="/private/animal-shelter"
          >Protectora de animales</v-btn
        >
        <v-btn flat to="/private/adoption">Adopcion</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-btn v-if="user" disabled flat>
        <span>{{ user.email }}</span>
      </v-btn>
      <v-btn v-if="user" v-on:click="logout()" flat>
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

      <v-btn dark flat @click="closeNotification">
        Cerrar
      </v-btn>
    </v-snackbar>

    <v-content>
      <v-layout v-if="!user.type" class="orange lighten-4 font-weight-bold">
        <v-container>
          <h2>Registrar cuenta</h2>

          <AccountForm></AccountForm>
        </v-container>
      </v-layout>

      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import AccountForm from "../components/AccountForm";

import { mapState } from "vuex";

export default {
  components: {
    AccountForm
  },
  computed: {
    ...mapState("user", ["user"]),
    ...mapState("notification", ["message", "type"]),
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
