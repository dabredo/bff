<template>
  <v-container>
    <h2 class="headline font-weight-bold mb-2">
      Login
    </h2>

    <LoginForm />

    <v-btn
      flat
      to="/registration"
    >
      Crear una cuenta
    </v-btn>
  </v-container>
</template>

<script>
import LoginForm from "../components/LoginForm";

export default {
  components: {
    LoginForm
  }
};
</script>
