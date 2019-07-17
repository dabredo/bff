<template>
  <v-container>
    <h2 class="headline font-weight-bold mb-2">
      Dashboard informacion
    </h2>

    <AdoptionRequestList v-if="user.type === 'animal-shelter'"></AdoptionRequestList>
    <div v-else>
      <p>Espacio personal</p>
    </div>
  </v-container>
</template>

<script>
  import AdoptionRequestList from '../components/AdoptionRequestList'

  import { mapState } from 'vuex';

  export default {
    components: {
      AdoptionRequestList
    },
    computed: {
      ...mapState('user', [ 'user' ]),
    },
  }
</script>
