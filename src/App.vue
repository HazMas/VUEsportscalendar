<template>
  <div id="app">
    <main>
      <router-view :key="$route.fullPath"></router-view>
    </main>
    <web-footer class="web-footer"></web-footer>
  </div>
</template>

<script>
import '@/assets/css/icons.css'
import WebFooter from '@/components/WebFooter'

export default {
  name: 'app',
  metaInfo: {
    title: 'Inicio',
    titleTemplate: '%s | E-Sports Calendar'
  },
  components: {
    WebFooter
  }
}
</script>

<style lang="scss">
header {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  padding:0 6% 0 6%;
}
.header__logo {
  width: 100%;
  max-width: 200px;
}
body {
  background-image: linear-gradient(135deg, #424E75 0%, #282949 45%, #262C4A 100%);
  margin: 0;
  height: 100vh;
  background-repeat: no-repeat;
  background-attachment: fixed;
  font-family: 'Oswald', sans-serif;
  color: #fff;
}
h1 {
  text-align: center;
  white-space: nowrap;
}
.offline-dino {
  display: flex;
  justify-content:flex-end;
  align-items: center;
}
button {
  background: none;
  color: inherit;
  border: none;
  font: inherit;
  cursor: pointer;
  outline: inherit;
}
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.web-footer {
  margin-top: auto;
  padding-top: 16px;
  padding-bottom: 16px;
}
</style>
