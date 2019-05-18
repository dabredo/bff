<template>
    <v-container>
        <h2 class="headline font-weight-bold mb-2">
            Amigos

            <v-btn v-if="!selectedFriend" color="primary" dark v-on:click="displayAddFriend">
                Anadir
            </v-btn>
        </h2>

        <v-form v-if="selectedFriend" class="mb-2">
            <v-text-field
                v-model="selectedFriend.name"
                :counter="10"
                label="Name"
                required
            ></v-text-field>

            <v-text-field
                v-model="selectedFriend.breed"
                label="Raza"
            ></v-text-field>

            <v-radio-group v-model="selectedFriend.gender" label="Sexo">
                <v-radio label="Macho" value="m"></v-radio>
                <v-radio label="Hembra" value="f"></v-radio>
            </v-radio-group>

            <v-select v-model="selectedFriend.size"
                :items="sizes"
                label="Tamano"
            ></v-select>

            <v-text-field
                v-model="selectedFriend.birthdate"
                label="Fecha de nacimiento"
            ></v-text-field>

            <v-select v-model="selectedFriend.state"
                :items="states"
                label="Estado"
            ></v-select>

            <v-textarea
                v-model="selectedFriend.description"
                label="Description"
            ></v-textarea>

            <v-btn color="primary" v-on:click="saveFriend(selectedFriend)" class="primar">Guardar</v-btn>
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
                        <template v-if="props.item.state === 'no_adopted'">No adoptado</template>
                        <template v-else-if="props.item.state === 'adopted'">Adoptado</template>
                    </td>
                    <td> - </td>
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
        headers: [
          { text: 'Nombre', value: 'name' },
          { text: 'Raza', value: 'breed'  },
          { text: 'Sexo', value: 'gender' },
          { text: 'Tamano', value: 'size' },
          { text: 'Fecha de nacimiento', value: 'birthdate' },
          { text: 'Estado', value: 'state' },
          { text: 'Creado', sortable: false },
          { text: 'Opciones', sortable: false }
        ],
        sizes: [
          { value: 'small', text: 'Pequeno' },
          { value: 'medium', text: 'Mediano' },
          { value: 'big', text: 'Grande' }
        ],
        states: [
          { value: 'no_adopted', text: 'No adoptado' },
          { value: 'adopted', text: 'Adoptado' }
        ]
      }
  },
  computed: {
    ...mapState('animalShelter', [ 'friends', 'selectedFriend' ]),
    ...mapGetters('animalShelter', [ 'friendsCount' ])
  },
  created () {
      this.$store.dispatch('animalShelter/getFriends');
  },
  methods: {
    displayAddFriend() {
      this.$store.commit('animalShelter/selectNewFriend')
    },

    saveFriend(friend) {
      if (friend.id) {
        this.$store.dispatch('animalShelter/updateFriend', friend)
      } else {
        this.$store.dispatch('animalShelter/createFriend', friend)
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
