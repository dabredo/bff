<template>
  <v-container>
    <AdoptionRequestList />
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
