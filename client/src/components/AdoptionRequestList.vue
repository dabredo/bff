<template>
  <div>
    <h2 class="headline font-weight-bold mb-2">
      Solicitudes de adopcion
    </h2>

    <v-data-table
      :headers="headers"
      :items="adoptions"
    >
      <template v-slot:no-data>
        <v-alert
          :value="true"
          outline
          color="info"
          icon="info"
          class="text-xs-center"
        >
          No hay ninguna solicitud : (
        </v-alert>
      </template>

      <template v-slot:items="props">
        <tr>
          <td>{{ props.item.animalName }}</td>
          <td v-if="isAnimalShelter">
            {{ props.item.username }}
          </td>
          <td v-else>
            {{ props.item.animalShelterName }}
          </td>
          <td>{{ states[props.item.state] }}</td>
          <td>{{ props.item.createdAt | moment("DD/MM/YYYY hh:mm:ss") }}</td>
          <td class="text-xs-right">
            <template v-if="isAnimalShelter">
              <v-btn
                v-if="props.item.state === 'requested'"
                small
                color="success"
                @click="approveRequest(props.item.animalId, props.item.user)"
              >
                Aceptar
              </v-btn>

              <v-btn
                v-if="props.item.state === 'requested'"
                small
                color="error"
                @click="declineRequest(props.item.animalId, props.item.user)"
              >
                Rechazar
              </v-btn>
            </template>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  data: function() {
    return {
      states: {
        requested: 'Solicitado',
        declined: 'Rechazado',
        approved: 'Aceptado',
      },
    };
  },
  computed: {
    ...mapState("adoption", ["adoptions"]),
    ...mapState("user", ["user"]),
    ...mapGetters({ 'isAnimalShelter': 'user/isAnimalShelter' }),
    headers() {
        return [
            { text: "Animal", value: "animalName" },
            this.isAnimalShelter
                ? { text: 'Usuario', value: "username" }
                : { text: "Protectora", value: "animalShelterName" },
            { text: "Estado", value: "state" },
            { text: "Fecha", value: "createdAt" },
            { text: "", sortable: false},
        ]
    },
  },
  async created() {
      if (this.isAnimalShelter) {
        this.$store.dispatch("adoption/loadRequestsForAnimalShelter", this.user.id);
      } else {
        this.$store.dispatch("adoption/loadRequestsForUser", this.user.id);
      }
  },
  methods: {
    declineRequest(animalId, userId) {
      let request = {
        animalId: animalId,
        userId: userId
      };

      this.$store.dispatch("adoption/declineRequest", request);
    },
    approveRequest(animalId, userId) {
      let request = {
        animalId: animalId,
        userId: userId
      };

      this.$store.dispatch("adoption/approveRequest", request);
    }
  }
};
</script>
