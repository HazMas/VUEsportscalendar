<template>
  <div>
    <loader v-if="loading">
    </loader>
    <div v-else>
      <div class="competition-view__info">
        <router-link :to="{name: 'competition-view', params: {competition: ladders.competition, game: ladders.game}}" tag="div" class="competition-view__event-competition">
          <img :src="'/static/img/leagues/' + ladders.competition + '.png'" :alt="ladders.competition">
        </router-link>
        <span class="competition-view__event-game">
          <img :src="'/static/img/games/' + ladders.game + '.png'" :alt="ladders.game">
        </span>
      </div>
      <div class="competition-view__ladders">
        <router-link tag="div" :to="{name: 'team-view', params: {competition: ladders.competition, game: ladders.game, teamId: ladder.team.id}}" class="competition-view__ladder-item" v-for="ladder in ladders.info" :key="ladder.team.id">
          {{ladder.rank}}
          <img class="competition-view__shield-img" v-lazy="ladder.team.image_url" :alt="ladder.team.name">
          {{ladder.team.name}}
          {{ladder.win}}
          {{ladder.loss}}
          {{ladder.draw}}
          {{ladder.streak}}
          {{ladder.points}}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import lvp from '@/api/lvp'
import esl from '@/api/esl'
import Loader from '@/components/Loader'

export default {
  name: 'competition-view',
  props: ['competition', 'game'],
  created () {
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
  },
  data () {
    return {
      loading: true,
      ladders: undefined
    }
  },
  components: {
    Loader
  }
}
</script>

<style lang="scss">

.competition-view__ladder-item{
  cursor: pointer;
}

</style>


