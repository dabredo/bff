<template>
  <v-container>
    <h2 class="headline font-weight-bold mb-2">
      Amigos

      <v-btn
        v-if="!selectedFriend"
        color="primary"
        dark
        @click="displayAddFriend"
      >
        Anadir
      </v-btn>
    </h2>

    <AnimalForm />

    <AnimalList />
  </v-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";

import AnimalForm from "../components/AnimalForm";
import AnimalList from "../components/AnimalList";

export default {
  components: {
    AnimalForm,
    AnimalList
  },
  computed: {
    ...mapState("animalShelter", ["selectedFriend"]),
  },
  methods: {
    async displayAddFriend() {
      this.$store.commit("animalShelter/selectNewFriend");
    },
  }
};
</script>
