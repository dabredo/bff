<template>
    <div>
        <h2>Amigos</h2>
        <button v-if="!selectedFriend" v-on:click="displayAddFriend">Anadir</button>

        <div v-if="selectedFriend">
          <div>
            <label>Name</label>
            <input type="text" v-model="selectedFriend.name">
          </div>

          <div>
            <label>Raza</label>
            <input type="text" v-model="selectedFriend.breed">
          </div>

          <div>
            <label>Sexo</label>
            <label>Macho</label><input type="radio" v-model="selectedFriend.gender" value="m">
            <label>Hembra</label><input type="radio" v-model="selectedFriend.gender" value="f">
          </div>

          <div>
            <label>Tamano</label>
            <select v-model="selectedFriend.size">
              <option value="small" default>Pequeno</option>
              <option value="medium">Mediano</option>
              <option value="big">Grande</option>
            </select>
          </div>

          <div>
            <label>Fecha de nacimiento</label>
            <input type="text" v-model="selectedFriend.birthdate">
          </div>

          <div>
            <label>Estado</label>
            <select v-model="selectedFriend.state">
              <option value="no_adopted">No adoptado</option>
              <option value="adopted">Adoptado</option>
            </select>
          </div>

          <div>
            <label>Descripcion</label>
            <textarea v-model="selectedFriend.description"></textarea>
          </div>

          <button v-on:click="saveFriend(selectedFriend)">Guardar</button>
          <button v-on:click="cancel">Cancel</button>
        </div>

        <table v-if="friendsCount">
            <tr>
                <th>Nombre</th>
                <th>Raza</th>
                <th>Sexo</th>
                <th>Tamano</th>
                <th>Fecha de nacimiento</th>
                <th>Estado</th>
                <th>Creado</th>
                <th>Opciones</th>
            </tr>
            <tr v-for="friend of friends" v-bind:key="friend">
                <td>{{ friend.name }}</td>
                <td>{{ friend.breed }}</td>
                <td><template v-if="friend.gender === 'm'">Macho</template><template v-else>Hembra</template></td>
                <td>
                  <template v-if="friend.size === 'small'">Pequeno</template>
                  <template v-else-if="friend.size === 'medium'">Mediano</template>
                  <template v-else>Grande</template>
                </td>
                <td>{{ friend.birthdate }}</td>
                <td>
                  <template v-if="friend.state === 'no_adopted'">No adoptado</template>
                  <template v-else-if="friend.state === 'adopted'">Adoptado</template>
                <td></td>
                <td>
                  <button v-on:click="viewFriend(friend.id)">Ver</button>
                  <button v-on:click="deleteFriend(friend.id)">Eliminar</button>
                </td>
            </tr>
        </table>
        <p v-else>There are not friends</p>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'AnimalShelter',
  data: function() {
    return {}
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
