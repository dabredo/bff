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
          <td>{{ props.item.username }}</td>

          <td>{{ states[props.item.state] }}</td>
          <td>{{ props.item.createdAt | moment("DD/MM/YYYY hh:mm:ss") }}</td>
          <td class="text-xs-right">
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
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: function() {
    return {
      headers: [
        { text: "Animal", value: "animalName" },
        { text: "Usuario", value: "username" },
        { text: "Estado", value: "state" },
        { text: "Fecha", value: "createdAt" },
        { text: "", sortable: false},
      ],
      states: {
        requested: 'Solicitado',
        declined: 'Rechazado',
        approved: 'Aceptado',
      },
    };
  },
  computed: {
    ...mapState("animalShelter", ["adoptions"]),
  },
  async created() {
    this.$store.dispatch("animalShelter/getAdoptions");
  },
  methods: {
    declineRequest(animalId, userId) {
      let request = {
        animalId: animalId,
        userId: userId
      };

      this.$store.dispatch("animalShelter/declineAdoptionRequest", request);
    },
    approveRequest(animalId, userId) {
      let request = {
        animalId: animalId,
        userId: userId
      };

      this.$store.dispatch("animalShelter/approveAdoptionRequest", request);
    }
  }
};
</script>
