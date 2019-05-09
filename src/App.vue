<template>
  <div id="app">
    <ul>
      <li><router-link to="/">Inicio</router-link></li>
      <li><router-link to="/animal-shelter">Protectora de animales</router-link></li>
      <li><router-link to="/adoption">Adopcion</router-link></li>
    </ul>

    <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
