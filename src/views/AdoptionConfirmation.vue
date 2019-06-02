<template>
  <v-container>
    <h2 class="headline font-weight-bold mb-2">
      Enviar solicitud de adopcion
    </h2>

    <p>Name: {{ selectedFriend.name }}</p>
    <p>Breed: {{ selectedFriend.breed }}</p>
    <p>Gender: {{ selectedFriend.gender }}</p>
    <p>Birthdate: {{ selectedFriend.birthdate }}</p>
    <p>Description: {{ selectedFriend.description }}</p>

    <v-btn color="primary" v-on:click="send(selectedFriend.id)">
      Enviar
    </v-btn>
    <v-btn color="secondary" v-on:click="cancel()">
      Cancelar
    </v-btn>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    data: function() {
      return {
      }
    },
    computed: {
      ...mapState('animalShelter', [ 'selectedFriend' ]),
      ...mapState('user', [ 'user' ]),
    },
    created () {
      let animalId = this.$route.params.animalId

      this.$store.dispatch('animalShelter/getFriend', animalId)
    },
    methods: {
      send(animalId) {
        let adoptionRequest = {
          userId: this.user.id,
          animalId: animalId
        }

        this.$store.dispatch('animalShelter/createAdoptionRequest', adoptionRequest)
          .then(() => {
            this.$router.push('/private/dashboard')
          })
      },
      cancel() {
        this.$router.push('/private/dashboard')
      }
    }
  }
</script>
