<template>
    <v-form class="mb-2" v-model="valid">
        <v-text-field
            v-model="email"
            :counter="100"
            :rules="emailRules"
            label="Email address"
            required
        ></v-text-field>

        <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Password"
            required
        ></v-text-field>

        <v-btn color="primary" :disabled="!valid" v-on:click="login(email, password)">Ok</v-btn>
    </v-form>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'LoginForm',
  data: function() {
      return {
        email: '',
        password: '',
        valid: true,
        emailRules: [
            v => !!v || 'Email address is required',
            v => (v && v.length <= 100) || 'Email address must be less than 100 characters'
        ],
        passwordRules: [
            v => !!v || 'Password is required',
        ],
      }
  },
  methods: {
    login(email, password) {
        console.log(email, password)

        this.$store.dispatch('user/login', { email: email, password: password })
    },
  }
}
</script>
