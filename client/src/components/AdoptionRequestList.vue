<template>
  <v-container>
    <h3>Adoptions</h3>

    <v-list>
      <v-list-tile v-for="adoption in adoptions" :key="adoption.id">
        <v-list-tile-content>
          <v-list-tile-title>Usuario: {{ adoption.username }} - {{ adoption.createdAt | moment('DD/MM/YYYY')}}</v-list-tile-title>
          <v-list-tile-sub-title>Animal:{{ adoption.animalName }} - {{ adoption.state }}</v-list-tile-sub-title>
        </v-list-tile-content>

        <v-list-tile-action>
          <span v-if="adoption.state === 'approved'">Approved</span>
          <v-btn v-else color="success" v-on:click="approveRequest(adoption.animalId, adoption.user)">Aceptar</v-btn>
        </v-list-tile-action>

        <v-list-tile-action class="ml-2">
          <span v-if="adoption.state === 'declined'">Declined</span>
          <v-btn v-else color="error" v-on:click="declineRequest(adoption.animalId, adoption.user)">Decline</v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    computed: {
      ...mapState('animalShelter', [ 'adoptions' ]),
      ...mapState('user', [ 'user' ]),
    },
    async created () {
    console.log('CREATED')
      this.$store.dispatch('animalShelter/getAdoptions')
    },
    methods: {
      declineRequest(animalId, userId) {
        let request = {
          animalId: animalId,
          userId: userId
        };

        this.$store.dispatch('animalShelter/declineAdoptionRequest', request)
      },
      approveRequest(animalId, userId) {
        let request = {
          animalId: animalId,
          userId: userId
        };

        this.$store.dispatch('animalShelter/approveAdoptionRequest', request)
      },
    }
  }
</script>
