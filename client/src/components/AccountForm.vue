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

    <v-switch
      v-model="isAnimalShelter"
      class="ma-2"
      label="Soy una casa de adopction"
    ></v-switch>

    <div v-if="isAnimalShelter">
      <h2>Detalles de la casa de adopcion</h2>

      <v-text-field
        v-model="cif"
        v-validate="'required|max:10'"
        :error-messages="errors.collect('cif')"
        data-vv-name="cif"
        data-vv-as="CIF"
        :counter="200"
        label="CIF"
        required
      ></v-text-field>

      <v-text-field
        v-model="name"
        v-validate="'required|max:200'"
        :error-messages="errors.collect('name')"
        data-vv-name="name"
        data-vv-as="Nombre"
        :counter="200"
        label="Nombre"
        required
      ></v-text-field>

      <v-text-field
        v-model="address"
        v-validate="'required|max:200'"
        :error-messages="errors.collect('address')"
        data-vv-name="address"
        data-vv-as="Direcction"
        :counter="200"
        label="Direcction"
        required
      ></v-text-field>
    </div>

    <v-btn
      color="primary"
      :disabled="!valid"
      v-on:click="register(fullname, name, cif, address, isAnimalShelter)"
      >Aceptar</v-btn
    >
  </v-form>
</template>

<script>
export default {
  name: "AccountForm",
  data: function() {
    return {
      fullname: "",
      name: "",
      cif: "",
      address: "",
      isAnimalShelter: false,
      valid: false
    };
  },
  methods: {
    register(fullname, name, cif, address, isAnimalShelter) {
      this.$validator.validate().then(valid => {
        if (valid) {
          let user = {
            fullname: fullname,
            cif: cif,
            name: name,
            address: address,
            type: isAnimalShelter ? "animal-shelter" : "user"
          };

          this.$store.dispatch("user/registerAccount", user).then(() => {
            this.$router.push("/private/dashboard");
          });
        }
      });
    }
  }
};
</script>
