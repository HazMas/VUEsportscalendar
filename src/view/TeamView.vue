<template>
  <div>
    <loader v-if="loading">
    </loader>
    <div v-else>

      <div class="team-view__head-description">
        <div class="match-view__header">
          <div>
            <span class="icon-back"></span>
          </div>
          <h1 class="team-view">
            {{team.name}}
          </h1>
          <span></span>
        </div>
        <div class="team-view__team">
          <img class="team-view__shield-img" v-lazy="team.image_url" :alt="team.name">
        </div>
      </div>
      <div class="team-view__competition-info">
        <router-link :to="{name: 'competition-view', params: {competition: competition, game: game}}" tag="div" class="team-view__event-competition">
          <img :src="'/static/img/leagues/' + competition + '.png'" :alt="competition">
        </router-link>
         <span class="team-view__event-game">
          <img :src="'/static/img/games/' + game + '.png'" :alt="game">
        </span>
      </div>

      <div class="team-view__social">
        <div v-for="(url, social) in team.social" :key="social" class="team-view__social-item">
          <a :href="url" v-if="url" class="team-view__social-item-link">
            <span v-if="social !== 'homepage'" :class="'icon-'+social"></span>
            <img v-else :src="'http://www.google.com/s2/favicons?domain_url='+url"/>
          </a>
        </div>
      </div>

      <ladders :competition="competition" :game="game"></ladders>
      <players :competition="competition" :game="game" :teamData="team"></players>
      <next-match-list :competition="competition" :game="game" :team="team"></next-match-list>
    </div>
  </div>
</template>

<script>
import lvp from '@/api/lvp'
import esl from '@/api/esl'

import Loader from '@/components/Loader'
import Ladders from '@/components/Ladders'
import Players from '@/components/Players'
import NextMatchList from '@/components/NextMatchList'

export default {
  name: 'team-view',
  props: ['competition', 'game', 'teamId'],
  created () {
    this.fetchData()
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
  methods: {
    fetchData () {
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
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  components: {
    Loader,
    Ladders,
    Players,
    NextMatchList
  }
}
</script>

<style lang="scss">
.team-view__head-description {
  background-image: linear-gradient(180deg, #19213F 0%, #12152B 45%, #101328 100%);
}
.team-view__header {
  display:flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 6%;
}
.team-view__team {
  display: flex;
  justify-content:center;
  align-items: center;
  padding-bottom: 70px;
}
.team-view__competition-info {
  margin-top: -50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.team-view__social{
  margin: 0 auto;
  width: 70%;
  max-width: 300px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.team-view__event-competition {
  cursor: pointer;
}

.team-view__social-item-link {
  color: white;
  text-decoration: none;
}

</style>


