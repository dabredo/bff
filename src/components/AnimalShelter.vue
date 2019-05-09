<template>
    <div>
        <h2>Amigos</h2>
        <button v-on:click="displayAddFriend">Anadir</button>

        <form v-if="addFriendDisplayed">
          <div>
            <label>Nombre</label>
            <input type="text" v-model="newFriend.name">
          </div>

          <div>
            <label>Raza</label>
            <input type="text" v-model="newFriend.breed">
          </div>

          <div>
            <label>Sexo</label>
            Macho <input type="radio" v-model="newFriend.gender" value="m">
            Hembra <input type="radio" v-model="newFriend.gender" value="f">
          </div>

          <div>
            <label>Tamano</label>
            <select v-model="newFriend.size">
              <option value="small" default>Pequeno</option>
              <option value="medium">Mediano</option>
              <option value="big">Grande</option>
            </select>
          </div>

          <div>
            <label>Fecha de nacimiento</label>
            <input type="text" v-model="newFriend.birthdate">
          </div>

          <div>
            <label>Estado</label>
            <input type="text" v-model="newFriend.state">
          </div>

          <button v-on:click="addFriend">Guardar</button>
        </form>

        <table v-if="friends.length">
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
            <tr v-for="friend of friends">
                <td>{{ friend.name }}</td>
                <td>{{ friend.breed }}</td>
                <td>
                  <template v-if="friend.size === 'small'">Pequeno</template>
                  <template v-else-if="friend.size === 'medium'">Mediano</template>
                  <template v-else>Grande</template>
                </td>
                <td><template v-if="friend.gender === 'm'">Macho</template><template v-else>Hembra</template></td>
                <td>{{ friend.birthdate }}</td>
                <td>{{ friend.state }}</td>
                <td></td>
                <td>
                  <button v-on:click="displayEditFriend">Editar</button>
                  <button v-on:click="deleteFriend">Eliminar</button>
                </td>
            </tr>
        </table>
        <p v-else>There are not friends</p>
    </div>
</template>

<script>
export default {
  name: 'AnimalShelter',
  data: function() {
    return {
      newFriend: {
        name: '',
        breed: '',
        gender: 'm',
        size: 'small',
        birthdate: '',
        state: '',
      },
      addFriendDisplayed: false,
      friends: []
    }
  },
  methods: {
    displayAddFriend() {
      this.addFriendDisplayed = true;
    },

    addFriend() {
      this.friends.push(Object.assign({}, this.newFriend))

      this.newFriend.name = ''
      this.newFriend.breed = ''
      this.newFriend.gender = 'm'
      this.newFriend.size = 'small'
      this.newFriend.birthdate = ''
      this.newFriend.state = ''

      this.addFriendDisplayed = false;
    },

    displayEditFriend() {
      console.log('soon display edit')
    },

    deleteFriend() {
      console.log('soon delete')
    }
  }
}
</script>
