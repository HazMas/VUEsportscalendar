<template>
  <button @click="filter" :disabled="isDisabled">
      {{tab.title}} ({{numberOfMatches}})
  </button>
</template>

<script>
import { FILTER_MATCHES } from '../store/mutation-types'

export default {
  name: 'calendar-tab',
  props: ['tab'],
  computed: {
    numberOfMatches () {
      return this.$store.getters.getNumberOfMatchesByDate(this.tab.date)
    },
    isDisabled () {
      return this.numberOfMatches === 0
    }
  },
  methods: {
    filter () {
      const payload = {
        'date': this.tab.date
      }

      this.$store.commit(FILTER_MATCHES, payload)
    }
  }
}
</script>

<style>
</style>

