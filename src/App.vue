<template>
  <div id="app">
    <header>
      <h1>
        VUE-Sports Calendar
      </h1>
        <detect-network>
          <div slot="online">
            [online] ✔️
          </div>
          <div slot="offline">
            [Offine] 🚫
          </div>
        </detect-network>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <web-footer></web-footer>
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
  button {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }
</style>
