<template>
  <div>
    <div class="calendar-view">
      <div class="month-item" @click="showCalendar = !showCalendar">
        {{month}}
      </div>
      <div class="calendar-tabs">
        <calendar-tab v-for="tab in tabs" :key="tab.title" :tab="tab"></calendar-tab>
      </div>
    </div>
    <v-date-picker class="calendar-view__date-picker" mode="single" @input="updateDate" :is-inline="true" v-if="showCalendar" :value="selectedDate">
    </v-date-picker>
    <div v-if="areNoMatches" class="no-match-text">
      No hay partidos 😱
    </div>
    <loader v-if="isLoading" class="no-match-text"></loader>
    <component :is="'calendar-match-null-item'" class="match-item" v-for="match in matches" :key="match.id" :match="match"></component>
  </div>
</template>

<script>
import Vue from 'vue'
import VCalendar from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'
import { mapGetters } from 'vuex'
import moment from 'moment'

import { FILTER_MATCHES } from '@/store/mutation-types'
import CalendarMatchItem from '@/components/calendar/CalendarMatchItem'
import CalendarMatchNullItem from '@/components/calendar/CalendarMatchNullItem'
import CalendarTab from '@/components/calendar/CalendarTab'
import Loader from '@/components/Loader'

Vue.use(VCalendar)

export default {
  name: 'calendar-view',
  created () {
    this.$store.dispatch('getMatches')
  },
  computed: {
    tabs () {
      const numberOfTabs = 7

      return (new Array(numberOfTabs)).fill(this.selectedDate).map((date, index) => {
        date = moment(date).add(index - 3, 'day')
        return {
          date
        }
      })
    },
    month () {
      return moment(this.selectedDate).locale('es').format('MMMM')
    },
    areNoMatches () {
      return this.matches.length === 0 && !this.isLoading
    },
    isLoading () {
      return this.loading
    },
    ...mapGetters(['matches', 'selectedDate', 'loading'])
  },
  components: {
    CalendarMatchItem,
    CalendarMatchNullItem,
    CalendarTab,
    Loader
  },
  methods: {
    updateDate (date) {
      const payload = {
        'date': date
      }

      this.$store.commit(FILTER_MATCHES, payload)
      this.showCalendar = false
    }
  },
  data () {
    return {
      'showCalendar': false
    }
  }
}
</script>

<style lang="scss">
  body {
    background-image: linear-gradient(135deg, #424E75 0%, #282949 45%, #262C4A 100%);
    margin: 0;
    height: 100vh;
    background-repeat: no-repeat;
    background-attachment: fixed;
    font-family: 'Oswald', sans-serif;
     color: #fff;
  }
  .calendar-view {
    display: flex;
    padding:0 6% 0 6%;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid rgba(255,255,255,.2);
  }
  .calendar-tabs {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .month-item {
    font-size: 1.8em;
    padding-right: 2%;
  }
  .match-item {
    margin:0 0 0 6%;
  }
  .no-match-text {
    text-align: center;
  }
  .calendar-view__selected-date {
    text-align: center;
  }
  .calendar-view__date-picker {
    display: block;
  }
</style>


