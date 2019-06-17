<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Best friends</span>
      </v-toolbar-title>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to ="/private/dashboard">Pagina principal</v-btn>
        <v-btn flat to="/private/animal-shelter">Protectora de animales</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
     {{ user }}
      <v-btn flat v-on:click="logout()">
        <span class="mr-2">Logout</span>
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
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push('/')
    }
  }
}
</script>
