<template>
  <v-form v-if="selectedFriend" class="mb-2" v-model="valid">
    <v-text-field
      v-model="selectedFriend.name"
      :counter="100"
      v-validate="'required|max:100'"
      :error-messages="errors.collect('name')"
      data-vv-name="name"
      data-vv-as="Nombre"
      label="Nombre"
    ></v-text-field>

    <v-text-field
      v-model="selectedFriend.breed"
      label="Raza"
      required
    ></v-text-field>

    <v-radio-group v-model="selectedFriend.gender" label="Sexo">
      <v-radio label="Macho" value="m"></v-radio>
      <v-radio label="Hembra" value="f"></v-radio>
    </v-radio-group>

    <v-select v-model="selectedFriend.size"
      :items="sizes"
      label="Tamano"
    ></v-select>

    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-right="40"
      lazy
      transition="scale-transition"
      offset-y
      full-width
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          :value="dateFormatted"
          label="Fecha de nacimiento"
          prepend-icon="event"
          clearable
          readonly
          v-on="on"
          ></v-text-field>
      </template>
      <v-date-picker
        v-model="selectedFriend.birthdate"
        no-title
        @input="menu = false"
      ></v-date-picker>
    </v-menu>

    <v-select v-model="selectedFriend.state"
      :items="states"
      label="Estado"
    ></v-select>

    <v-textarea
      v-model="selectedFriend.description"
      :counter="1000"
      v-validate="'max:1000'"
      :error-messages="errors.collect('description')"
      data-vv-name="description"
      data-vv-as="Descripcion"
      label="Descripcion"
      data-vv-validate-on="change"
    ></v-textarea>

    <v-btn color="primary" :disabled="!valid" v-on:click="saveFriend(selectedFriend)" class="primar">Guardar</v-btn>
    <v-btn v-on:click="cancel()">Cancelar</v-btn>
  </v-form>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'AnimalForm',
  data: function() {
    return {
      valid: true,
      menu: false,
      states: [
        { value: 'not_adopted', text: 'No adoptado' },
        { value: 'adopted', text: 'Adoptado' }
      ],
    }
  },
  computed: {
    ...mapState('animalShelter', [ 'selectedFriend', 'sizes' ]),
    dateFormatted() {
      return this.selectedFriend.birthdate ? this.$moment(this.selectedFriend.birthdate).format('DD/MM/YYYY') : ''
    },
  },
  methods: {
    async saveFriend(friend) {
      let valid = await this.$validator.validate();
      if (!valid) {
        return;
      }

      if (friend.id) {
        await this.$store.dispatch('animalShelter/updateFriend', friend)
      } else {
        await this.$store.dispatch('animalShelter/createFriend', friend)
      }

      this.$store.commit('notification/displaySuccess', "Friend was saved")
    },

    async cancel() {
      this.$validator.detach("name");
      this.$store.commit('animalShelter/unselectFriend')
    },
  }
}
</script>
