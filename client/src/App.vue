<template>
  <component
    :is="layout"
    v-if="!isUserLoading"
  />
</template>

<script>
import { mapGetters } from "vuex";

const defaultLayout = "public";

export default {
  computed: {
    ...mapGetters({
      'isUserLoading': 'user/isLoading',
    }),
    layout() {
      return (this.$route.meta.layout || defaultLayout) + "-layout";
    }
  },
  async created() {
    await this.$store.dispatch("user/loadLoggedUser");
  }
};
</script>
