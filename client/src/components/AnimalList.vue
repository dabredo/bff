<template>
  <v-data-table
    :headers="headers"
    :items="friends"
  >
    <template v-slot:no-data>
      <v-alert
        :value="true"
        outline
        color="info"
        icon="info"
        class="text-xs-center"
      >
        No hay ningun animal : (
      </v-alert>
    </template>

    <template v-slot:items="props">
      <tr>
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.breed }}</td>
        <td>
          <template
            v-if="props.item.gender === 'm'"
          >
            Macho
          </template><template
            v-else
          >
            Hembra
          </template>
        </td>
        <td>
          <AnimalSize :size="props.item.size" />
        </td>
        <td v-if="props.item.birthdate">
          {{ props.item.birthdate | moment("DD/MM/YYYY") }}
        </td>
        <td v-else>
          -
        </td>
        <td>
          <template
            v-if="props.item.state === 'not_adopted'"
          >
            No adoptado
          </template>
          <template
            v-else-if="props.item.state === 'adopted'"
          >
            Adoptado
          </template>
        </td>
        <td>{{ props.item.createdAt | moment("DD/MM/YYYY") }}</td>
        <td class="text-xs-right">
          <v-icon
            small
            class="mr-2"
            @click="viewFriend(props.item.id)"
          >
            edit
          </v-icon>
          <v-icon
            small
            class="mr-2"
            @click="deleteFriend(props.item.id)"
          >
            delete
          </v-icon>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
import { mapState } from "vuex";

import AnimalSize from "../components/AnimalSize";

export default {
  name: "AnimalList",
  components: {
    AnimalSize
  },
  data: function() {
    return {
      headers: [
        { text: "Nombre", value: "name" },
        { text: "Raza", value: "breed" },
        { text: "Sexo", value: "gender" },
        { text: "Tamano", value: "size" },
        { text: "Fecha de nacimiento", value: "birthdate" },
        { text: "Estado", value: "state" },
        { text: "Creado", value: "createdAt" },
        { text: "Opciones", sortable: false }
      ],
      states: [
        { value: "not_adopted", text: "No adoptado" },
        { value: "adopted", text: "doptado" }
      ]
    };
  },
  computed: {
    ...mapState("animalShelter", ["friends"]),
  },
  created() {
    this.$store.dispatch("animalShelter/getFriends");
  },
  methods: {
    async viewFriend(friendId) {
      this.$store.dispatch("animalShelter/getFriend", friendId);
    },
    async deleteFriend(friendId) {
      if (confirm("Are you sure?")) {
        this.$store.commit("animalShelter/unselectFriend");

        //TODO: Delete images of deleted friends

        await this.$store.dispatch("animalShelter/deleteFriend", friendId);
        this.$store.commit("notification/displaySuccess", "Animal eliminado");
      }
    }
  }
};
</script>
