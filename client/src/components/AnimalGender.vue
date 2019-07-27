<template>
  <span>
    <template v-if="gender == 'm'">Macho</template>
    <template v-else-if="gender == 'f'">Hembra</template>
    <template v-else>Desconocido</template>
  </span>
</template>

<script>
export default {
  props: ['gender']
}
</script>
