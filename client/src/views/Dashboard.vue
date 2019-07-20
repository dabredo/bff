<template>
  <v-container>
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
