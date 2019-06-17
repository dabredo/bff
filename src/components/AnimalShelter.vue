<template>
    <v-container>
        <h2 class="headline font-weight-bold mb-2">
            Amigos

            <v-btn v-if="!selectedFriend" color="primary" dark v-on:click="displayAddFriend">
                Anadir
            </v-btn>
        </h2>

        <v-form v-if="selectedFriend" class="mb-2" v-model="valid">
            <v-text-field
                v-model="selectedFriend.name"
                :counter="100"
                :rules="nameRules"
                label="Name"
                required
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
                  v-model="selectedFriend.birthdate"
                  label="Fecha de nacimiento"
                  prepend-icon="event"
                  clearable
                  readonly
                  v-on="on"
                  ></v-text-field>
              </template>
              <v-date-picker v-model="selectedFriend.birthdate" no-title  @input="menu = false"></v-date-picker>
            </v-menu>

            <v-select v-model="selectedFriend.state"
                :items="states"
                label="Estado"
            ></v-select>

            <v-textarea
                v-model="selectedFriend.description"
                :counter="1000"
                :rules="descriptionRules"
                label="Description"
            ></v-textarea>

            <v-btn color="primary" :disabled="!valid" v-on:click="saveFriend(selectedFriend)" class="primar">Guardar</v-btn>
            <v-btn v-on:click="cancel">Cancelar</v-btn>
        </v-form>

        <v-data-table v-if="friendsCount" :headers="headers" :items="friends">
            <template v-slot:items="props">
                <tr>
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.breed }}</td>
                    <td>
                        <template v-if="props.item.gender === 'm'">Macho</template><template v-else>Hembra</template>
                    </td>
                    <td>
                        <template v-if="props.item.size === 'small'">Pequeno</template>
                        <template v-else-if="props.item.size === 'medium'">Mediano</template>
                        <template v-else>Grande</template>
                    </td>
                    <td>{{ props.item.birthdate }}</td>
                    <td>
                        <template v-if="props.item.state === 'not_adopted'">No adoptado</template>
                        <template v-else-if="props.item.state === 'adopted'">Adoptado</template>
                    </td>
                    <td>{{ props.item.createdAt | moment('DD/MM/YYYY') }} </td>
                    <td class="text-xs-right">
                        <v-icon small class="mr-2" v-on:click="viewFriend(props.item.id)">
                            edit
                        </v-icon>
                        <v-icon small class="mr-2" v-on:click="deleteFriend(props.item.id)">
                            delete
                        </v-icon>
                    </td>
                </tr>
            </template>
        </v-data-table>

        <p v-else>There are not friends</p>
    </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'AnimalShelter',
  data: function() {
      return {
        menu: false,
        headers: [
          { text: 'Nombre', value: 'name' },
          { text: 'Raza', value: 'breed'  },
          { text: 'Sexo', value: 'gender' },
          { text: 'Tamano', value: 'size' },
          { text: 'Fecha de nacimiento', value: 'birthdate' },
          { text: 'Estado', value: 'state' },
          { text: 'Creado', value: 'createdAt' },
          { text: 'Opciones', sortable: false }
        ],
        states: [
          { value: 'not_adopted', text: 'No adoptado' },
          { value: 'adopted', text: 'Adoptado' }
        ],
        valid: true,
        nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 100) || 'Name must be less than 100 characters'
        ],
        descriptionRules: [
            v => (!v || v.length <= 1000) || 'Name must be less than 1000 characters'
        ],
      }
  },
  computed: {
    ...mapState('animalShelter', [ 'friends', 'selectedFriend', 'sizes' ]),
    ...mapGetters('animalShelter', [ 'friendsCount' ])
  },
  created () {
      this.$store.dispatch('animalShelter/getFriends');
  },
  methods: {
    displayAddFriend() {
      this.$store.commit('animalShelter/selectNewFriend')
    },

    async saveFriend(friend) {
      if (friend.id) {
        await this.$store.dispatch('animalShelter/updateFriend', friend)
      } else {
        await this.$store.dispatch('animalShelter/createFriend', friend)
      }
    },

    cancel() {
        this.$store.commit('animalShelter/unselectFriend')
    },

    viewFriend(friendId) {
      this.$store.dispatch('animalShelter/getFriend', friendId)
    },

    deleteFriend(friendId) {
      if (confirm('Are you sure?')) {
        this.cancel()

        this.$store.dispatch('animalShelter/deleteFriend', friendId)
      }
    }
  }
}
</script>
