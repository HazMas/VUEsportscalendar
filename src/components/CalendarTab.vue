<template>
      <!-- {{month}} -->
      <button class="calendar-tab__day" :class="{'calendar-tab--active': isActive}"  @click="filter" :disabled="isDisabled">
          <span class="calendar-tab__day-week">{{dayOfWeek}}</span>
          <span class="calendar-tab__day-month">{{dayOfMonth}}</span>
      </button>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'

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
    dayOfMonth () {
      return moment(this.tab.date).locale('es').format('DD')
    },
    isActive () {
      return moment(this.tab.date).isSame(this.selectedDate, 'day')
    },
    ...mapGetters(['selectedDate'])
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
  margin-bottom: -2px;
}
button:disabled .calendar-tab__day-month {
  opacity: 0.3;
  cursor: auto;
}
.calendar-tab__day-week {
  font-size: 0.7em;
  text-transform: uppercase;
  color: #7E8BBC;
}
.calendar-tab__day-month {
  font-size: 1.8em;
}
.calendar-tab--active {
  border-bottom: 3px solid #FFCF54;
}
</style>

