<template>
  <div>
    <v-btn v-if="!searchFormDisplayed" color="primary" dark v-on:click="searchFormDisplayed=!searchFormDisplayed">
      Busqueda avanzada
    </v-btn>

    <v-form v-if="searchFormDisplayed" class="mb-2" v-model="valid">
      <v-text-field
        v-model="animalSearched.name"
        :counter="100"
        label="Name"
      ></v-text-field>

      <v-text-field
          v-model="animalSearched.breed"
          label="Raza"
          required
      ></v-text-field>

      <v-radio-group v-model="animalSearched.gender" label="Sexo">
          <v-radio label="Any" value=""></v-radio>
          <v-radio label="Macho" value="m"></v-radio>
          <v-radio label="Hembra" value="f"></v-radio>
      </v-radio-group>

      <v-select v-model="animalSearched.size"
          :items="sizes"
          label="Tamano"
          multiple
      ></v-select>

      <v-btn color="primary" :disabled="!valid" v-on:click="search(animalSearched)">Buscar</v-btn>
      <v-btn color="secondary" v-on:click="clear()">Borrar busqueda</v-btn>
      <v-btn color="secondary" v-on:click="searchFormDisplayed=false">Close</v-btn>
    </v-form>

    <div v-for="friend of friends" :key="friend.id">
      <v-card>
        <v-layout mb-2 pb-2 pt-2 pl-2>
          <v-flex xs5>
            <v-img v-if="friend.images.length" height="230"  :src="friend.images[0].url"></v-img>
          </v-flex>

          <v-flex xs9>
            <v-card-title>
              <div class="headline">{{ friend.name }}</div>
              <v-layout justify-end v-if="friend.birthdate" class="grey--text">
                {{ friend.birthdate | moment('DD/MM/YYYY') }}
              </v-layout>
            </v-card-title>

            <v-layout row>
            <v-flex xs6>
              <v-list dense>
                <v-list-tile>
                  <v-list-tile-title class="font-weight-bold">Raza:</v-list-tile-title>
                  <v-list-tile-sub-title>{{ friend.breed }}</v-list-tile-sub-title>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-title class="font-weight-bold">Sexo:</v-list-tile-title>
                  <v-list-tile-sub-title>
                    <span v-if="friend.gender == 'm'">Macho</span>
                    <span v-else-if="friend.gender == 'f'">Hembra</span>
                  </v-list-tile-sub-title>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-title class="font-weight-bold">Tamano:</v-list-tile-title>
                  <v-list-tile-sub-title>
                    <span v-if="friend.size">{{ friend.size }}</span>
                  </v-list-tile-sub-title>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-title></v-list-tile-title>
                  <v-list-tile-sub-title class="font-weight-bold">{{ friend.animalShelter }}</v-list-tile-sub-title>
                </v-list-tile>
              </v-list>
            </v-flex>

            <v-flex>
              <v-layout justify-end align-end fill-height>
                  <v-btn class="mb-0" color="secondary" v-on:click="adopt(friend.id)">Adoptar</v-btn>
              </v-layout>
            </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card>
    </div>

    <div v-if="!friends.length">
      <p>No hay resultados para esta busqueda</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'AdoptionSearch',
  data: function() {
    return {
      searchFormDisplayed: false,
      valid: true,
      animalSearched: {
        gender: ''

      }
    }
  },
  computed: {
    ...mapState('animalShelter', [ 'friends', 'sizes' ]),
    ...mapGetters('animalShelter', [ 'friendsCount' ])
  },
  created () {
    this.$store.dispatch('animalShelter/getAllNotAdopted', {});
  },
  methods: {
    search(animalSearched) {
      this.$store.dispatch('animalShelter/getAllNotAdopted', animalSearched)
        .then(() => this.searchFormDisplayed = false)
    },
    clear() {
      this.animalSearched = {
        gender: ''
      }

      this.search({})
    },
    adopt(animalId) {
      this.$router.push(`/private/adoption/${animalId}`)
    }
  }
}
</script>
