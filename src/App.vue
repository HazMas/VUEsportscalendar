<template>
  <div id="app">
    <header>
      <span></span>
      <h1>
        E-Sports Calendar
      </h1>
      <detect-network class="offline-dino">
        <div slot="offline">
          <img src="static/img/icons/dino.svg" alt="Offline dinosaur">
        </div>
      </detect-network>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <web-footer class="web-footer"></web-footer>
  </div>
</template>

<script>
import detectNetwork from 'v-offline'

import WebFooter from './components/WebFooter'

export default {
  name: 'app',
  components: {
    detectNetwork,
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
  padding: 0;
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
