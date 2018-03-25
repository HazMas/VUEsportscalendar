<template>
  <div>
    <loader v-if="loading">
    </loader>
    <div v-else>
      <div class="team-view__info">
        <img class="team-view__shield-img" v-lazy="team.image_url" :alt="team.name">
        <span>
          {{team.name}}
        </span>
        <router-link :to="{name: 'competition-view', params: {competition: competition, game: game}}" tag="div" class="team-view__event-competition">
          <img :src="'/static/img/leagues/' + competition + '.png'" :alt="competition">
        </router-link>
        <span class="team-view__event-game">
          <img :src="'/static/img/games/' + game + '.png'" :alt="game">
        </span>
      </div>
      <div class="team-view__players">
        <div v-for="player in team.players" :key="player.id" class="team-view__player">
          <img class="team-view__player-img" v-lazy="player.image_url" :alt="player.name">          
          <span>
            {{player.name}} {{player.nick}} {{player.position}}
          </span>
        </div>
      </div>
      <div class="team-view__social">
        <div v-for="(url, social) in team.social" :key="social" class="team-view__social-item">
          <a :href="url">
            {{social}}
          </a>
        </div>
      </div>
      <ladders :competition="competition" :game="game"></ladders>
    </div>
  </div>
</template>

<script>
import lvp from '@/api/lvp'
import esl from '@/api/esl'

import Loader from '@/components/Loader'
import Ladders from '@/components/Ladders'

export default {
  name: 'team-view',
  props: ['competition', 'game', 'teamId'],
  created () {
    if (this.competition === 'superliga-orange') {
      lvp.getTeam(this.game, this.teamId)
        .then((team) => {
          this.team = team
          this.loading = false
          this.title = team.name
        })
    } else if (this.competition === 'esl-masters') {
      esl.getTeam(this.game, this.teamId)
        .then((team) => {
          this.team = team
          this.loading = false
          this.title = team.name
        })
    }
  },
  metaInfo () {
    return {
      title: this.title
    }
  },
  data () {
    return {
      title: 'cargando...',
      loading: true,
      team: undefined
    }
  },
  components: {
    Loader,
    Ladders
  }
}
</script>

<style lang="scss">

.team-view__event-competition {
  cursor: pointer;
}

</style>


