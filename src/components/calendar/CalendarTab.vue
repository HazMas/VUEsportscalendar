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

<style lang="scss" scoped>
.calendar-tab__day {
  color: #fff;
  padding: 2px 2% 10px 2%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: -2px;
  &:Hover {
    background-image: linear-gradient(180deg, #19213F 0%, #12152B 45%, #101328 100%);
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
  display: block;
}
.calendar-tab__day-month {
  font-size: 1.8em;
}
.calendar-tab--active {
  border-bottom: 3px solid #FFCF54;
}
</style>

