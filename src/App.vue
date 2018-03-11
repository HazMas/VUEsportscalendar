<template>
  <div id="app">
    <header>
      <h1>VUE-Sports Calendar</h1>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer>

    </footer>
  </div>
</template>

<script>
export default {
  name: 'app'
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
