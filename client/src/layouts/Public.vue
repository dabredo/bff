<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Best friends</span>
      </v-toolbar-title>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to ="/">Inicio</v-btn>
        <v-btn flat to="/adoption">Adopcion</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-btn v-if="user" flat to="/private/dashboard">
        <span class="">{{ user.email }}</span>
      </v-btn>
      <v-btn v-if="user" v-on:click="logout()" flat>
        <span class="">Logout</span>
      </v-btn>
      <v-btn v-else flat to="/login">
        <span class="">Login</span>
      </v-btn>
    </v-toolbar>

    <v-content>
        <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    computed: {
      ...mapState('user', [ 'user' ])
    },
    methods: {
      logout() {
        this.$store.dispatch('user/logout')
      }
    }
  }
</script>
