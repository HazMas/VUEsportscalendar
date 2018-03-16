<template>
  <div>
    <div class="calendar-tabs">
      <calendar-tab v-for="tab in tabs" :key="tab.title" :tab="tab"></calendar-tab>
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

import MatchItem from '../components/MatchItem'
import CalendarTab from '../components/CalendarTab'

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
          'title': date.format('D MMM.'),
          date
        }
      })
    },
    ...mapGetters(['matches'])
  },
  components: {
    MatchItem,
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
  .calendar-tabs {
    padding:0 6% 0 6%;
    display: flex;
    justify-content: space-between;
  }
  .match-item {
    margin:0 0 0 6%;
  }
  .no-match-text {
    text-align: center;
  }
</style>


