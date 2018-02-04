<template>
  <div>
    <match-item v-for="match in matches" :key="match.id" :match="match"></match-item>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import MatchItem from '../components/MatchItem'

export default {
  name: 'Home',
  created () {
    this.$store.dispatch('getMatches')
  },
  computed: {
    ...mapGetters(['matches'])
  },
  components: {
    MatchItem
  }
}
</script>

<style>

</style>


