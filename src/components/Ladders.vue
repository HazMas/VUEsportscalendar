<template>
  <div>
    <loader v-if="loading">
    </loader>
    <div class="ladders" v-else>
      <router-link tag="div" :to="{name: 'team-view', params: {competition: competition, game: game, teamId: ladder.team.id}}" class="ladder-item" v-for="ladder in ladders.info" :key="ladder.team.id">
        {{ladder.rank}}
        <img class="ladders__shield-img" v-lazy="ladder.team.image_url" :alt="ladder.team.name">
        {{ladder.team.name}}
        {{ladder.win}}
        {{ladder.loss}}
        {{ladder.draw}}
        {{ladder.streak}}
        {{ladder.points}}
      </router-link>
    </div>
  </div>
</template>

<script>
import lvp from '@/api/lvp'
import esl from '@/api/esl'

import Loader from '@/components/Loader'

export default {
  name: 'ladders',
  props: ['competition', 'game'],
  created () {
    this.fetchData()
  },
  data () {
    return {
      loading: true
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      if (this.competition === 'superliga-orange') {
        lvp.getLadders(this.game)
          .then((ladders) => {
            this.ladders = ladders
            this.loading = false
          })
      } else if (this.competition === 'esl-masters') {
        esl.getLadders(this.game)
          .then((ladders) => {
            this.ladders = ladders
            this.loading = false
          })
      }
    }
  },
  components: {
    Loader
  }
}
</script>

<style lang="scss" scoped>

</style>
