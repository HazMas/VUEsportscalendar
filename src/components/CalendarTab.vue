<template>
    <button class="calendar-tab__day" @click="filter" :disabled="isDisabled">
        {{dayOfWeek}} {{dayOfMonth}} {{month}} ({{numberOfMatches}})
    </button>
</template>

<script>
import moment from 'moment'

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
    },
    dayOfWeek () {
      return moment(this.tab.date).locale('es').format('ddd')
    },
    month () {
      return moment(this.tab.date).locale('es').format('MMM')
    },
    dayOfMonth () {
      return moment(this.tab.date).locale('es').format('DD')
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

<style lang="scss">
.calendar-tab__day {
  color: #fff;
}
</style>

