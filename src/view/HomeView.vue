<template>
  <div>
    <button v-for="tab in tabs" :key="tab.title" @click="filter(tab.date)" >
      {{tab.title}}
    </button>
    <match-item v-for="match in matches" :key="match.id" :match="match"></match-item>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'

import { FILTER_MATCHES } from '../store/mutation-types'
import MatchItem from '../components/MatchItem'

export default {
  name: 'Home',
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
    MatchItem
  },
  methods: {
    filter (date) {
      this.$store.commit(FILTER_MATCHES, {date})
    }
  }
}
</script>

<style>

</style>


