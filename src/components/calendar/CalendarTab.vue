<template>
  <button class="calendar-tab__day" :class="{'calendar-tab--active': isActive}"  @click="filter">
    <span class="calendar-tab__day-week" :class="{'calendar-tab__day-month--disabled': isDisabled}">
      {{dayOfWeek}}
    </span>
    <span class="calendar-tab__day-month" :class="{'calendar-tab__day-month--disabled': isDisabled}">
      {{dayOfMonth}}
    </span>
  </button>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'

import { FILTER_MATCHES } from '@/store/mutation-types'

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
  padding-left: 2%;
  padding-right: 2%;
  padding-top: 2px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
  margin-bottom: -2px;
  &:Hover {
    background-color: rgba(255,255,255,.1);
    border-radius: 6px 6px 0 0;
  }
  &:active {
    transform: translateY(1px);
  }
}
.calendar-tab__day-month--disabled {
  opacity: 0.3;
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

