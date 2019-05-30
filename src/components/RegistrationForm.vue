<template>
    <v-form class="mb-2" v-model="valid">
        <v-text-field
            v-model="fullname"
            v-validate="'required|max:200'"
            :error-messages="errors.collect('fullname')"
            data-vv-name="fullname"
            data-vv-as="Nombre completo"
            :counter="200"
            label="Nombre completo"
            required
        ></v-text-field>

        <v-text-field
            v-model="email"
            v-validate="'required|max:200|email'"
            :error-messages="errors.collect('email')"
            data-vv-name="email"
            data-vv-as="Email"
            :counter="200"
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

        <v-btn color="primary" :disabled="!valid" v-on:click="register(fullname, email, password)">Aceptar</v-btn>
    </v-form>
</template>

<script>
export default {
  name: 'RegistrationForm',
  data: function() {
      return {
        show: false,
        fullname: '',
        email: '',
        password: '',
        valid: false,
      }
  },
  methods: {
    register(fullname, email, password) {
      this.$validator.validate()
        .then(valid => {
          if (valid) {
            let user = {
              fullname: fullname,
              email: email,
              password: password
            }

            this.$store.dispatch('user/register', user)
              .then(()=> {
                this.$router.push('/dashboard')
              })
          }
        })
    }
  }
}
</script>
