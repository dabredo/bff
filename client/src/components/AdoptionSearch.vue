<template>
  <div>
    <v-btn
      v-if="!searchFormDisplayed"
      color="primary"
      dark
      @click="searchFormDisplayed = !searchFormDisplayed"
    >
      Busqueda avanzada
    </v-btn>

    <v-form
      v-if="searchFormDisplayed"
      v-model="valid"
      class="mb-2"
    >
      <v-text-field
        v-model="animalSearched.name"
        :counter="100"
        label="Name"
      />

      <v-text-field
        v-model="animalSearched.breed"
        label="Raza"
        required
      />

      <v-radio-group
        v-model="animalSearched.gender"
        label="Sexo"
      >
        <v-radio
          label="Any"
          value=""
        />
        <v-radio
          label="Macho"
          value="m"
        />
        <v-radio
          label="Hembra"
          value="f"
        />
      </v-radio-group>

      <v-select
        v-model="animalSearched.size"
        :items="sizes"
        label="Tamano"
        multiple
      />

      <v-btn
        color="primary"
        :disabled="!valid"
        @click="search(animalSearched)"
      >
        Buscar
      </v-btn>
      <v-btn
        color="secondary"
        @click="clear()"
      >
        Borrar busqueda
      </v-btn>
      <v-btn
        color="secondary"
        @click="searchFormDisplayed = false"
      >
        Close
      </v-btn>
    </v-form>

    <div
      v-for="friend of friends"
      :key="friend.id"
    >
      <v-card>
        <v-layout
          mb-2
          pb-2
          pt-2
          pl-2
        >
          <v-flex xs5>
            <v-img
              v-if="friend.images.length"
              height="230"
              :src="friend.images[0].url"
            />
          </v-flex>

          <v-flex xs9>
            <v-card-title>
              <div class="headline">
                {{ friend.name }}
              </div>
              <v-layout
                v-if="friend.birthdate"
                justify-end
                class="grey--text"
              >
                {{ friend.birthdate | moment("DD/MM/YYYY") }}
              </v-layout>
            </v-card-title>

            <v-layout row>
              <v-flex xs6>
                <v-list dense>
                  <v-list-tile>
                    <v-list-tile-title
                      class="font-weight-bold"
                    >
                      Raza:
                    </v-list-tile-title>
                    <v-list-tile-sub-title>
                      {{
                        friend.breed
                      }}
                    </v-list-tile-sub-title>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-title
                      class="font-weight-bold"
                    >
                      Sexo:
                    </v-list-tile-title>
                    <v-list-tile-sub-title>
                      <AnimalGender :gender="friend.gender" />
                    </v-list-tile-sub-title>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-title
                      class="font-weight-bold"
                    >
                      Tamano:
                    </v-list-tile-title>
                    <v-list-tile-sub-title>
                      <AnimalSize :size="friend.size" />
                    </v-list-tile-sub-title>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-title />
                    <v-list-tile-sub-title class="font-weight-bold">
                      {{
                        friend.animalShelter
                      }}
                    </v-list-tile-sub-title>
                  </v-list-tile>
                </v-list>
              </v-flex>

              <v-flex>
                <v-layout
                  justify-end
                  align-end
                  fill-height
                >
                  <v-btn
                    class="mb-0"
                    color="secondary"
                    @click="gotToDetails(friend.id)"
                  >
                    Ver detalles
                  </v-btn>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card>
    </div>

    <div v-if="!friends.length">
      <v-alert
        :value="true"
        outline
        color="info"
        icon="info"
        class="text-xs-center"
      >
        No hay resultados para esta busqueda : (
      </v-alert>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

import AnimalSize from "../components/AnimalSize";
import AnimalGender from "../components/AnimalGender";

export default {
  name: "AdoptionSearch",
  components: {
    AnimalSize,
    AnimalGender
  },
  data: function() {
    return {
      searchFormDisplayed: false,
      valid: true,
      animalSearched: {
        gender: ""
      }
    };
  },
  computed: {
    ...mapState("animalShelter", ["friends", "sizes"]),
  },
  created() {
    this.$store.dispatch("animalShelter/getAllNotAdopted", {});
  },
  methods: {
    search(animalSearched) {
      this.$store
        .dispatch("animalShelter/getAllNotAdopted", animalSearched)
        .then(() => (this.searchFormDisplayed = false));
    },
    clear() {
      this.animalSearched = {
        gender: ""
      };

      this.search({});
    },
    gotToDetails(animalId) {
      this.$router.push(`/private/adoption/${animalId}`);
    }
  }
};
</script>
