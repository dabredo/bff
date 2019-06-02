<template>
  <v-container>
    <h2 class="headline font-weight-bold mb-2">
      Dashboard information
    </h2>
    <h3>Adoptions</h3>

    <v-list>
      <v-list-tile v-for="adoption in adoptions" :key="adoption.id">

        <v-list-tile-content>
          <v-list-tile-title>Usuario: {{ adoption.userId }}</v-list-tile-title>
          <v-list-tile-sub-title>Animal:{{ adoption.animalId }}</v-list-tile-sub-title>
        </v-list-tile-content>

        <v-list-tile-action>
          <v-btn color="primary">Aceptar</v-btn>
        </v-list-tile-action>

      </v-list-tile>
    </v-list>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    data: function() {
      return {
        adoptions: []
      }
    },
    computed: {
      ...mapState('user', [ 'user' ]),
    },
    created () {
      this.$store.dispatch('animalShelter/getAdoptions')
        .then((response) => {
          console.log(response.data)
          this.adoptions = response.data
        })
    },
    methods: {
    }
  }
</script>
