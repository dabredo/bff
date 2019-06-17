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
      <v-card class="mb-2">
        <v-card-title primary-title>
          <div>
            <div class="headline">{{ friend.name }} <span v-if="friend.breed">({{ friend.breed }})</span></div>
            <span v-if="friend.birthdate" class="grey--text mr-4">{{ friend.birthdate }}</span>
            <span class="grey--text">
              <span v-if="friend.gender == 'm'">Macho</span>
              <span v-else-if="friend.gender == 'f'">Hembra</span>
            </span>
          </div>
        </v-card-title>

        <v-card-text>
          <p>{{ friend.user }}</p>
          <pre>{{ friend.description }}</pre>
        </v-card-text>

        <v-card-actions>
          <v-btn color="secondary" v-on:click="adopt(friend.id)">Adoptar</v-btn>
        </v-card-actions>
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
