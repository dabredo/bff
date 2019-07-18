<template>
  <v-form
    v-if="selectedFriend"
    v-model="valid"
    class="mb-2"
  >
    <v-text-field
      v-model="selectedFriend.name"
      v-validate="'required|max:100'"
      :counter="100"
      :error-messages="errors.collect('name')"
      data-vv-name="name"
      data-vv-as="Nombre"
      label="Nombre"
    />

    <v-text-field
      v-model="selectedFriend.breed"
      label="Raza"
      required
    />

    <v-radio-group
      v-model="selectedFriend.gender"
      label="Sexo"
    >
      <v-radio
        label="Macho"
        value="m"
      />
      <v-radio
        label="Hembra"
        value="f"
      />
    </v-radio-group>

    <v-select
      v-model="selectedFriend.size"
      :items="sizes"
      label="Tamano"
    />

    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-right="40"
      lazy
      transition="scale-transition"
      offset-y
      full-width
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          :value="dateFormatted"
          label="Fecha de nacimiento"
          prepend-icon="event"
          clearable
          readonly
          v-on="on"
        />
      </template>
      <v-date-picker
        v-model="selectedFriend.birthdate"
        no-title
        @input="menu = false"
      />
    </v-menu>

    <v-select
      v-model="selectedFriend.state"
      :items="states"
      label="Estado"
    />

    <v-textarea
      v-model="selectedFriend.description"
      v-validate="'max:1000'"
      :counter="1000"
      :error-messages="errors.collect('description')"
      data-vv-name="description"
      data-vv-as="Descripcion"
      label="Descripcion"
      data-vv-validate-on="change"
    />

    <v-btn
      block
      color="warning"
      prepend-icon="attach_file"
      @click="uploadImage"
    >
      Anadir imagen
      <v-icon
        dark
        right
      >
        add_a_photo
      </v-icon>
    </v-btn>
    <input
      ref="image"
      type="file"
      style="display: none"
      accept="image/*"
      @change="onImageUpload"
    >

    <v-container fluid>
      <v-layout
        row
        wrap
      >
        <v-flex
          v-for="(image, index) in selectedImages"
          :key="index"
          xs12
          sm6
          md4
          lg3
        >
          <v-card v-if="image.url">
            <v-img
              :src="image.url"
              :alt="image.name"
            />
            <v-card-title>{{ image.name }}</v-card-title>
            <v-card-actions>
              <v-btn
                flat
                @click="deleteImage(index)"
              >
                Borrar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-btn
      color="primary"
      :disabled="!valid"
      class="primar"
      @click="saveFriend(selectedFriend)"
    >
      Guardar
    </v-btn>
    <v-btn @click="cancel()">
      Cancelar
    </v-btn>
  </v-form>
</template>

<script>
import { mapState } from "vuex";
import Vue from "vue";

export default {
  name: "AnimalForm",
  data: function() {
    return {
      // images: [],
      valid: true,
      menu: false,
      states: [
        { value: "not_adopted", text: "No adoptado" },
        { value: "adopted", text: "Adoptado" }
      ]
    };
  },
  computed: {
    ...mapState("animalShelter", ["selectedFriend", "sizes", "selectedImages"]),
    dateFormatted() {
      return this.selectedFriend.birthdate
        ? this.$moment(this.selectedFriend.birthdate).format("DD/MM/YYYY")
        : "";
    }
  },
  methods: {
    deleteImage(index) {
      this.selectedImages.splice(index, 1);
    },
    uploadImage() {
      this.$refs.image.click();
    },
    async onImageUpload(event) {
      const file = event.dataTransfer
        ? event.dataTransfer.files[0]
        : event.target.files[0];
      const pattern = /image.(png|jpe?g|gif|svg)/;

      if (file === undefined) {
        this.$store.commit(
          "notification/displayError",
          "La imagen no se pude anadir"
        );
        return;
      }

      if (!file.type.match(pattern)) {
        this.$store.commit(
          "notification/displayError",
          "Los formatos de imagen permitidos son png, jpg, gif y svg"
        );
        return;
      }

      if (file.size > 1048576) {
        this.$store.commit(
          "notification/displayError",
          "La imagen es demasiado grande"
        );
        return;
      }

      const fr = new FileReader();
      fr.readAsDataURL(file);

      fr.addEventListener("load", () => {
        this.selectedImages.push({
          url: fr.result,
          file: file,
          name: file.name
        });

        this.$store.commit(
          "notification/displaySuccess",
          "La imagen se ha anadido correctamente"
        );
      });
    },
    async saveFriend(friend) {
      let valid = await this.$validator.validate();
      if (!valid) {
        return;
      }

      let app = await Vue.$auth1;

      for (let i = 0; i < friend.images.length; i++) {
        let image = friend.images[i];

        let found = this.selectedImages.find(value => {
          return value.id === image.id;
        });

        if (!found) {
          await app.image.removeFile({
            id: image.id
          });
        }
      }

      friend.images = [];

      for (let i = 0; i < this.selectedImages.length; i++) {
        let image = this.selectedImages[i];
        if (image.id === undefined) {
          const id = await app.image.addFile({
            content: image.file,
            fileName: image.name,
            isAuthorized: {
              queries: {
                getFile: { forAuthenticated: true, forPublic: true }
              }
            }
          });

          image.id = id;
        }

        await friend.images.push({
          id: image.id,
          name: image.name
        });
      }

      if (friend.id) {
        await this.$store.dispatch("animalShelter/updateFriend", friend);
      } else {
        await this.$store.dispatch("animalShelter/createFriend", friend);
      }

      this.$store.commit("notification/displaySuccess", "Friend was saved");
    },

    async cancel() {
      this.$validator.detach("name");
      this.$store.commit("animalShelter/unselectFriend");
    }
  }
};
</script>
