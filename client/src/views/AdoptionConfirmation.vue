<template>
  <v-container>
    <h2 class="headline font-weight-bold mb-2">
      Detalles del animal
    </h2>

    <v-card v-if="selectedFriend">
      <v-card-text>
        <v-layout
          row
          wrap
        >
          <v-flex sm5>
            <v-list dense>
              <v-list-tile>
                <v-list-tile-title
                  class="font-weight-bold"
                >
                  Nombre:
                </v-list-tile-title>
                <v-list-tile-sub-title>{{ selectedFriend.name }}</v-list-tile-sub-title>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-title
                  class="font-weight-bold"
                >
                  Fecha de nacimiento:
                </v-list-tile-title>
                <v-list-tile-sub-title>{{ selectedFriend.birthdate | moment("DD/MM/YYYY") }}</v-list-tile-sub-title>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-title class="font-weight-bold">
                  Raza:
                </v-list-tile-title>
                <v-list-tile-sub-title>{{ selectedFriend.breed }}</v-list-tile-sub-title>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-title class="font-weight-bold">
                  Sexo:
                </v-list-tile-title>
                <v-list-tile-sub-title>
                  <AnimalGender :gender="selectedFriend.gender" />
                </v-list-tile-sub-title>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-title class="font-weight-bold">
                  Tamano:
                </v-list-tile-title>
                <v-list-tile-sub-title><AnimalSize :size="selectedFriend.size" /></v-list-tile-sub-title>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-title class="font-weight-bold">
                  Protectora:
                </v-list-tile-title>
                <v-list-tile-sub-title>{{ selectedFriend.animalShelter }}</v-list-tile-sub-title>
              </v-list-tile>
            </v-list>
          </v-flex>

          <v-flex
            offset-sm1
            sm6
            mt-3
          >
            <pre class="caption">{{ selectedFriend.description }}</pre>
          </v-flex>
        </v-layout>
      </v-card-text>

      <v-form>
        <v-container fluid>
          <v-layout wrap>
            <v-flex
              v-for="(image, index) in selectedImages"
              :key="index"
              xs12
              sm6
              md4
              lg3
            >
              <v-card v-if="image.url">
                <v-img
                  :src="image.url"
                  :alt="image.name"
                />
                <v-card-title>{{ image.name }}</v-card-title>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>

      <v-card-actions>
        <v-btn
          color="success"
          @click="requestAdoption(selectedFriend.id)"
        >
          Solicitar adopcion
        </v-btn>
        <v-btn
          color="secondary"
          @click="goBack()"
        >
          Volver
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

import AnimalSize from "../components/AnimalSize";
import AnimalGender from "../components/AnimalGender";

export default {
  components: {
    AnimalSize,
    AnimalGender
  },
  data: function() {
    return {};
  },
  computed: {
    ...mapState("animalShelter", ["selectedFriend", "selectedImages"]),
    ...mapState("animalShelter", ["adoptionRequest"]),
  },
  watch: {
    adoptionRequest: function(value) {
        if (value === 'failed') {
          this.$store.commit("notification/displayError", "La adopcion no se puede solicitar");
          return;
        }

        if (value === 'success') {
          this.$store.commit("notification/displaySuccess", "La adopcion se ha solicitado");
          this.$router.push("/private/dashboard");
          return;
        }
    }
  },
  created() {
    let animalId = this.$route.params.animalId;

    this.$store.dispatch("animalShelter/getFriend", animalId);
  },
  methods: {
    requestAdoption: function(animalId) {
      this.$store.dispatch(
        "animalShelter/createAdoptionRequest",
        animalId
      );
    },
    goBack: function() {
      this.$router.push("/adoption");
    }
  }
};
</script>
