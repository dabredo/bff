<template>
  <v-container>
    <h2 class="headline font-weight-bold mb-2">
      Dashboard informacion
    </h2>

    <AdoptionRequestList
      v-if="isAnimalShelter"
    />
    <div v-else>
      <p>Espacio personal</p>
    </div>
  </v-container>
</template>

<script>
import AdoptionRequestList from "../components/AdoptionRequestList";

import { mapGetters } from "vuex";

export default {
  components: {
    AdoptionRequestList
  },
  computed: {
    ...mapGetters({ 'isAnimalShelter': 'user/isAnimalShelter' })
  }
};
</script>
