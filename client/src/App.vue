<template>
  <component :is="layout"></component>
</template>

<script>
  const defaultLayout = 'public'

  export default {
    computed: {
      layout() {
        return (this.$route.meta.layout || defaultLayout) + '-layout'
      }
    }
  }
</script>
