<template>
  <div>
    <loader v-if="loading">
    </loader>
    <div class="team-view__players" v-else>
      <div v-for="player in team.players" :key="player.id" class="team-view__player">
        <img class="team-view__player-img" v-lazy="player.image_url" :alt="player.name">          
        <span>
          {{player.name}} {{player.nick}} {{player.position}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import lvp from '@/api/lvp'
import esl from '@/api/esl'

import Loader from '@/components/Loader'

export default {
  name: 'team',
  props: ['competition', 'game', 'teamData'],
  created () {
    this.fetchData()
  },
  data () {
    return {
      team: undefined,
      loading: true
    }
  },
  methods: {
    fetchData () {
      if (!this.teamData.players) {
        if (this.competition === 'superliga-orange') {
          lvp.getTeam(this.game, this.teamData.id)
            .then((team) => {
              this.team = team
              this.loading = false
            })
        } else if (this.competition === 'esl-masters') {
          esl.getTeam(this.game, this.teamData.id)
            .then((team) => {
              this.team = team
              this.loading = false
            })
        }
      } else {
        this.loading = false
        this.team = this.teamData
      }
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  components: {
    Loader
  }
}
</script>

<style lang="scss" scoped>

</style>
