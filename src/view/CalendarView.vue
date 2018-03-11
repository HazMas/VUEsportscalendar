<template>
  <div>
    <calendar-tab v-for="tab in tabs" :key="tab.title" :tab="tab"></calendar-tab>
    <match-item v-for="match in matches" :key="match.id" :match="match"></match-item>
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
    padding:0 0 0 8%;
    height: 100vh;
    background-repeat: no-repeat;
    background-attachment: fixed;
    font-family: 'Oswald', sans-serif;
  }
</style>


