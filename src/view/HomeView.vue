<template>
  <div>
    <button @click="filter">
      <span v-show="filtered">No</span> jugados
    </button>
    <match-item v-for="match in matches" :key="match.id" :match="match"></match-item>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { FILTER_MATCHES } from '../store/mutation-types'
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
  },
  data () {
    return {
      filtered: true
    }
  },
  methods: {
    filter () {
      this.filtered = !this.filtered

      if (!this.filtered) {
        this.$store.commit(FILTER_MATCHES)
      } else {
        this.$store.dispatch('getMatches')
      }
    }
  }
}
</script>

<style>

</style>


