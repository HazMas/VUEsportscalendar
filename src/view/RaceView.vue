<template>
  <div>
    <loader v-if="loading">
    </loader>
    <div v-else>
    </div>
    <div class="race-view__head-description">
      <div class="race-view__header">
        <div @click="$router.back()" class="match-view__back">
          <span class="icon-back"></span>
        </div>
        <h1 class="Race-view">
          jueves 31 de mayo
        </h1>
          <span class="icon-bell-line"></span>
      </div>
      <div class="race-view__circuit">
        <div class="race-view__circuit-data">
          <span class="race-view__circuit-data-name">Nurburgring<br></span>
          <span class="race-view__circuit-data-wind"><span class="race-view-data-name">Wind</span> 3.2km/h<br></span>
          <span class="race-view__circuit-data-name-fog"><span class="race-view-data-name">Fog</span> 0%<br></span>
        </div>
        <div class="race-view__circuit-path">
          <img src='/static/img/paths/nurburgring.png'>
        </div>
      </div>
    </div>
    <div class="race-view__competition-info">
      <img class="race-view__competition-img" src='/static/img/leagues/copa-apertura.png'>
      <img class="race-view__event-game-img" src='/static/img/games/granturismo.png'>
      <span class="match-view__event-round match-view__event-round--granturismo">
        R{{race.round}}
      </span>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import AddToCalendar from 'vue-add-to-calendar'
import VueCountdown from '@xkeshi/vue-countdown'

import Loader from '@/components/Loader'
import Ladders from '@/components/Ladders'
import Players from '@/components/Players'

import {isScheduled, isFinished, isLive, startTime, startFullDate, isTeamLoser} from '@/helpers/MatchHelpers'

export default {
  name: 'race-view',
  props: ['competition', 'game', 'raceId'],
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
      loading: false,
      race: {
        round: 1,
        circuit: 'span',
        game: 'gran-turismo',
        competition: 'sce',
        id: 1,
        live: [
          {
            'platform': 'youtube',
            'url': 'https://www.youtube.com/channel/UCrSBYzKfhlN0tXXZRyEaFvQ'
          }
        ],
        start_date: new Date()
      }
    }
  },
  computed: {
    timeToStart () {
      return this.startDate - (new Date()).getTime()
    },
    startDate () {
      return moment(this.race.start_date).toDate()
    },
    endDate () {
      return moment(this.race.start_date).add(2, 'hours').toDate()
    },
    raceItemEventRoundClasses () {
      return {
        'race-view__event-round': true,
        'race-view__event-round--clash': this.race.game === 'clash',
        'race-view__event-round--lol': this.race.game === 'lol',
        'race-view__event-round--csgo': this.race.game === 'csgo',
        'race-view__event-round--cod': this.race.game === 'cod'
      }
    }
  },
  methods: {
    isScheduled,
    isFinished,
    isLive,
    isTeamLoser,
    sendNotification () {
      // this.$ga.event('notification', 'crear', this.race.team_a.name + ' vs ' + this.race.team_b.name, 1)
    },
    fetchData () {
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  filters: {
    startTime,
    startFullDate
  },
  components: {
    Loader,
    AddToCalendar,
    Ladders,
    Players,
    VueCountdown
  }
}
</script>

<style lang="scss" scoped>
.race-view__head-description {
  background-image: linear-gradient(180deg, #19213F 0%, #12152B 45%, #101328 100%);
}
.race-view__header {
  display:flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 6%;
}
.race-view__circuit {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding-bottom: 70px;
}
.race-view__circuit-path img{
min-width: 150px;
}
.race-view-data-name {
  opacity: 0.5;
  margin-right: 10px;
}
.race-view__circuit-data-name {
  text-transform: uppercase;
  font-size: 24px;
}
.race-view__competition-info {
  margin-top: -50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.race-view__competition-img {
  max-width: 90px;
}
.race-view__event-game-img {
  max-width: 90px;
}
.match-view__event-round {
  font-size: 48px;
  font-weight: bold;
  color: #fff;
  padding: 3px 5px;
  border-radius: 3px;
  white-space: nowrap;
}
.match-view__event-round--granturismo {
  background-color: #E20A17;
}
</style>


