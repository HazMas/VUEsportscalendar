<template>
  <div class="loader">
    <pacman-loader></pacman-loader>
  </div>
</template>

<script>
import 'vue-loaders/dist/vue-loaders.css'
import { PacmanLoader } from 'vue-loaders'

export default {
  name: 'loader',
  components: {
    PacmanLoader
  }
}
</script>

<style lang="scss" scoped>
.loader {
  margin-top: 20px;
  text-align: center;
}
</style>
