<template>
  <v-container>
    <h2 class="headline font-weight-bold mb-2">
      Registrarse
    </h2>

    <RegistrationForm />
  </v-container>
</template>

<script>
import RegistrationForm from "../components/RegistrationForm";

export default {
  components: {
    RegistrationForm
  }
};
</script>
