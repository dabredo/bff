<template>
  <span>
    <template v-if="size === 'small'">Pequeno</template>
    <template v-else-if="size === 'medium'">Mediano</template>
    <template v-else-if="size === 'big'">Grande</template>
    <template v-else>Desconocido</template>
  </span>
</template>

<script>
export default {
  props: ['size']
}
</script>
