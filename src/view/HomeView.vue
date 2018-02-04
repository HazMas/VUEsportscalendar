<template>
  <div>
    <match-item v-for="match in matches" :key="match.id" :match="match"></match-item>
  </div>
</template>

<script>
import lvp from '../api/lvp'
import MatchItem from '../components/MatchItem'

export default {
  name: 'Home',
  created () {
    lvp.getMatches()
      .then((response) => { this.matches = response.data })
  },
  data () {
    return {
      'matches': []
    }
  },
  components: {
    MatchItem
  }
}
</script>

<style>

</style>


