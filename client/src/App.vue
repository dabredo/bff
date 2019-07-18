<template>
  <component :is="layout" />
</template>

<script>
const defaultLayout = "public";

export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || defaultLayout) + "-layout";
    }
  },
  created() {
    this.$store.dispatch("user/isLoggedIn");
  }
};
</script>
