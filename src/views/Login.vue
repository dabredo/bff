<template>
    <v-container>
        <h2 class="headline font-weight-bold mb-2">
            Login
        </h2>

        <LoginForm />
    </v-container>
</template>

<script>
  import LoginForm from '../components/LoginForm'

  export default {
    components: {
      LoginForm
    }
  }
</script>
