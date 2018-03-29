<template>
  <div>
    <loader v-if="loading">
    </loader>
    <div class="players" v-else>
      <next-match-item v-for="match in matches" :key="match.id" :match="match" class="player-row">
      </next-match-item>
    </div>
  </div>
</template>

<script>
import lvp from '@/api/lvp'
import esl from '@/api/esl'

import Loader from '@/components/Loader'
import NextMatchItem from '@/components/NextMatchItem'

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
            this.matches = matches
            this.loading = false
          })
      } else if (this.competition === 'esl-masters') {
        esl.getNextMatchesByTeam(this.game, this.team.id)
          .then((matches) => {
            this.matches = matches
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
    NextMatchItem
  }
}
</script>

<style lang="scss" scoped>
.players {
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 0 6%;
}
.player-row {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255,255,255,.2)
}
.player {
  height: 50px;
  width: 50px;
  overflow: hidden;
  border-radius: 100px;
  border: 3px solid white;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.50);
}
.player-picname{
  display: flex;
  align-items: center;
}
.player-nick {
  font-weight: lighter;
}
.player-img {
  width: 100%;
}
.player-name {
  display: flex;
  flex-direction: column;
  padding-left: 15px;
}
</style>
