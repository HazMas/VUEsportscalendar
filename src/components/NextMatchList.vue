<template>
  <div>
    <loader v-if="loading">
    </loader>
    <div class="players" v-else>
      <h1>
        Próximos partidos
      </h1>
      <match-item v-for="match in matches" :key="match.id" :match="match" class="player-row">
      </match-item>
    </div>
  </div>
</template>

<script>
import lvp from '@/api/lvp'
import esl from '@/api/esl'

import Loader from '@/components/Loader'
import MatchItem from '@/components/MatchItem'

export default {
  name: 'next-match-list',
  props: ['competition', 'game', 'team'],
  created () {
    this.fetchData()
  },
  data () {
    return {
      matches: undefined,
      loading: true
    }
  },
  methods: {
    fetchData () {
      if (this.competition === 'superliga-orange') {
        lvp.getNextMatchesByTeam(this.game, this.team.id)
          .then((matches) => {
            this.matches = matches.slice(0, 5)
            this.loading = false
          })
      } else if (this.competition === 'esl-masters') {
        esl.getNextMatchesByTeam(this.game, this.team.id)
          .then((matches) => {
            this.matches = matches.slice(0, 5)
            this.loading = false
          })
      }
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  components: {
    Loader,
    MatchItem
  }
}
</script>

<style lang="scss" scoped>
.players {
  margin-top: 30px;
  margin-bottom: 30px;
  padding:0 6%;
}
.player-row {
  overflow: hidden;
  border-radius: 10px;
  margin-left: 0;
}
</style>
