<template>
  <div>
    <loader v-if="loading">
    </loader>
    <div v-else>
      <div class="team-view__head-description">
        <div class="team-view__header">
          <div @click="$router.back()" class="team-view__back">
            <span class="icon-back"></span>
          </div>
          <h1 class="team-view">
            {{team.name}}
          </h1>
          <span></span>
        </div>
        <div class="team-view__team">
          <img class="team-view__shield-img" v-lazy="{ 'src': team.image_url, 'loading': require('@/assets/img/skeleton-shield.svg')}" :alt="team.name">
        </div>
      </div>
      <div class="team-view__competition-info">
        <div class="team-view__event-competition">
          <img :src="'/static/img/leagues/' + competition + '.png'" :alt="competition">
        </div>
         <span class="team-view__event-game">
          <img :src="'/static/img/games/' + game + '.png'" :alt="game">
        </span>
      </div>

      <div class="team-view__social">
        <div v-for="social in teamSocial" :key="social.name" class="team-view__social-item">
          <a :href="social.url" class="team-view__social-item-link" :alt="social.name">
            <span v-if="social.name !== 'homepage'" :class="'icon-'+social.name"></span>
            <img v-else :src="'http://www.google.com/s2/favicons?domain_url='+social.url"/>
          </a>
        </div>
      </div>
      <h1>
        Jugadores
      </h1>
      <players :competition="competition" :game="game" :teamData="team"></players>
      <next-match-list :competition="competition" :game="game" :team="team"></next-match-list>
      <previous-match-list :competition="competition" :game="game" :team="team"></previous-match-list>
      <h1>
        Clasificación
      </h1>
      <ladders :competition="competition" :game="game" :activeTeams="[team.id]"></ladders>
      
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
import PreviousMatchList from '@/components/PreviousMatchList'

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
  computed: {
    teamSocial () {
      return Object.keys(this.team.social)
        .filter((social) => {
          return this.team.social[social]
        })
        .map((social) => {
          return {
            'name': social,
            'url': this.team.social[social]
          }
        })
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
    NextMatchList,
    PreviousMatchList
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
.team-view__shield-img {
  width:70%;
  max-width: 200px;
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

.team-view__back {
  cursor: pointer;
}

</style>


