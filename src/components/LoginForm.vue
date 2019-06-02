<template>
    <v-form class="mb-2" v-model="valid">
        <v-text-field
            v-model="email"
            v-validate="'required|max:200|email'"
            :error-messages="errors.collect('email')"
            data-vv-name="email"
            data-vv-as="Email"
            label="Email"
            required
        ></v-text-field>

        <v-text-field
            v-model="password"
            v-validate="'required'"
            :append-icon="show ? 'visibility' : 'visibility_off'"
            @click:append="show = !show"
            :type="show ? 'text' : 'password'"
            :error-messages="errors.collect('password')"
            data-vv-name="password"
            data-vv-as="Password"
            label="Password"
            required
        ></v-text-field>

        <v-btn color="primary" :disabled="!valid" v-on:click="login(email, password)">Aceptar</v-btn>
    </v-form>
</template>

<script>
export default {
  name: 'LoginForm',
  data: function() {
      return {
        show: false,
        valid: false,
        email: '',
        password: '',
      }
  },
  methods: {
    login(email, password) {
      this.$validator.validate()
        .then(valid => {

          if (valid) {
            let credentials = {
              email: email,
              password: password
            }

            this.$store.dispatch('user/login', credentials)
              .then(()=> {
                let toPath = localStorage.getItem('path')
                if (!toPath) {
                  toPath = '/private/dashboard'
                }

                this.$router.push(toPath)
              })
          }
        })
    }
  }
}
</script>
