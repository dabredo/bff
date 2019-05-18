<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Best friends</span>
      </v-toolbar-title>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to ="/">Inicio</v-btn>
        <v-btn flat to="/animal-shelter">Protectora de animales</v-btn>
        <v-btn flat to="/adoption">Adopcion</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-btn flat to="/login">
        <span class="mr-2">Login</span>
      </v-btn>
    </v-toolbar>

    <v-content>
        <router-view></router-view>
    </v-content>
  </v-app>
</template>
