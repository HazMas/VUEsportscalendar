<template>
  <div>
    <div class="calendar-view">
      <div class="month-item">
        {{month}}
      </div>
      <div class="calendar-tabs">
        <calendar-tab v-for="tab in tabs" :key="tab.title" :tab="tab"></calendar-tab>
      </div>
    </div>
    <div v-if="matches.length === 0" class="no-match-text">
      No hay partidos 😱
    </div>
    <match-item class="match-item" v-for="match in matches" :key="match.id" :match="match"></match-item>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'

import CalendarMatchItem from '@/components/calendar/CalendarMatchItem'
import CalendarTab from '@/components/calendar/CalendarTab'

export default {
  name: 'calendar-view',
  created () {
    this.$store.dispatch('getMatches')
  },
  computed: {
    tabs () {
      const numberOfTabs = 7

      return (new Array(numberOfTabs)).fill(new Date()).map((date, index) => {
        date = moment(date).add(index, 'day')
        return {
          date
        }
      })
    },
    month () {
      return moment(this.selectedDate).locale('es').format('MMMM')
    },
    ...mapGetters(['matches', 'selectedDate'])
  },
  components: {
    CalendarMatchItem,
    CalendarTab
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
</style>


