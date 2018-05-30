<template>
  <div>
    <loader v-if="loading">
    </loader>
    <div v-else>
      <div class="race-view__head-description">
        <div class="race-view__header">
          <div @click="$router.back()" class="race-view__back">
            <span class="icon-back"></span>
          </div>
          <h1 class="race-view">
            {{race | startFullDate}}
          </h1>
          <span @click="sendNotification">
            <add-to-calendar class="race-view__notification" v-if="!isFinished(race)" :title="race" :start="startDate" :end="endDate" :details="'Jornada ' + race.round + '\npowered by E-Sports Calendar'" inline-template>
              <google-calendar class="race-view__calendar-link">
                <span class="icon-bell-line"></span>
              </google-calendar>
            </add-to-calendar>
          </span>
        </div>

        <div class="race-view__teams">
          <router-link :to="{name: 'team-view', params: {teamId: race.team_a.id}}" tag="div" class="race-view__team race-view__team--left">
            <img class="race-view__team-shield-img" :class="{'race-item__team-shield-img--loser': isTeamLoser(race, race.team_a.id)}" v-lazy="{ 'src': race.team_a.image_url, 'loading': require('@/assets/img/skeleton-shield.svg')}" :alt="race.team_a.name">
          </router-link>
          <div class="race-view__result" v-if="isFinished(race) || isLive(race)">
            <div class="race-view__result-a">
              {{race.result_a}}
            </div>
            <span class="race-view__separator">
              -
            </span>
            <div class="race-view__result-b">
              {{race.result_b}}
            </div>
            <span v-if="isLive(race)">
              &nbsp;<img src=/static/img/live/dot.svg alt="en directo">
            </span>
          </div>
          <div class="race-view__result" v-if="isScheduled(race)">
            {{race | startTime}} h
          </div>
          <router-link :to="{name: 'team-view', params: {teamId: race.team_b.id}}" tag="div" class="race-view__team race-view__team--right">
            <img class="race-view__team-shield-img" :class="{'race-item__team-shield-img--loser': isTeamLoser(race, race.team_b.id)}" v-lazy="{ 'src': race.team_b.image_url, 'loading': require('@/assets/img/skeleton-shield.svg')}" :alt="race.team_b.name">
          </router-link>
        </div>
      </div>
      <div class="race-view__competition-info">
        <router-link :to="{name: 'competition-view', params: {competition: competition, game: game}}" class="race-view__event-competition">
          <img class="race-view__competition-img" :src="'/static/img/leagues/' + competition + '.png'" :alt="competition">
        </router-link>
        <span class="race-view__event-game">
          <img :src="'/static/img/games/' + game + '.png'" :alt="game">
        </span>
        <span :class="raceItemEventRoundClasses">
          J{{race.round}}
        </span>
      </div>
      <vue-countdown :time="timeToStart" v-if="isScheduled(race)">
        <template slot-scope="props">
          <div class="race-view__competition-info-time"><span class="race-view__competition-info-time-title">El partido comenzará en:</span> <span class="race-view__competition-info-time-countdown">{{ props.days }}d - {{ props.hours }}h - {{ props.minutes }}m - {{ props.seconds }}s.</span></div>
        </template>
      </vue-countdown>
      <div class="race-view__live" v-if="!isFinished(race) && race.live">
        <h2 class="race-view__live-title">
          Donde ver
        </h2>
        <a class="race-view__live-link" v-for="live in race.live" :key="live.url" :href="live.url" target="_blank">
          <div>
            <div class="race-view__live-link-live" v-if="isLive(race)">
              <span>
                <img src=/static/img/live/dot.svg alt="en directo">
              </span>
              <span>
                En directo
              </span>
            </div>
            <img class="race-view__live-link-img" :src="'/static/img/live/' + live.platform + '.svg'" :alt="live.platform">
          </div>
        </a>
      </div>
      <h2 class="race-view__live-title">
        Clasificación
      </h2>
      <ladders :competition="competition" :game="game" :activeTeams="[race.team_a.id, race.team_b.id]"></ladders>
      <h2 class="race-view__live-title">
        {{race.team_a.name}}
      </h2>
      <players :competition="competition" :game="game" :teamData="race.team_a"></players>
      <h2 class="race-view__live-title">
        {{race.team_b.name}}
      </h2>
      <players :competition="competition" :game="game" :teamData="race.team_b"></players>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import AddToCalendar from 'vue-add-to-calendar'
import VueCountdown from '@xkeshi/vue-countdown'

import lvp from '@/api/lvp'
import esl from '@/api/esl'

import Loader from '@/components/Loader'
import Ladders from '@/components/Ladders'
import Players from '@/components/Players'

import {isScheduled, isFinished, isLive, startTime, startFullDate, isTeamLoser} from '@/helpers/raceHelpers'

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
      loading: true,
      race: undefined
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
      this.$ga.event('notification', 'crear', this.race.team_a.name + ' vs ' + this.race.team_b.name, 1)
    },
    fetchData () {
      if (this.competition === 'superliga-orange') {
        lvp.getrace(this.game, this.raceId)
          .then((race) => {
            this.race = race
            this.loading = false
            this.title = race.team_a.name + ' vs ' + this.race.team_b.name
          })
      } else if (this.competition === 'esl-masters') {
        esl.getrace(this.game, this.raceId)
          .then((race) => {
            this.race = race
            this.loading = false
            this.title = race.team_a.name + ' vs ' + this.race.team_b.name
          })
      }
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
.race-view__notification {
  display: flex;
  justify-content: flex-end;
  text-decoration: none;
  color: white;
  font-size: 20px;
  color: #7E8BBC;
}
.race-view__teams {
  display: flex;
  justify-content:space-between;
  align-items: center;
  padding-bottom: 70px;
}

.race-view__team {
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 10;
}
.race-view__team--left  {
  margin-right: -15%;
}
.race-view__team--right {
  margin-left: -15%;
}
.race-view__result {
  background-image: linear-gradient(140deg, #5F7890 0%, #4B5579 0%, #323D62 100%);
  box-shadow: 0 2px 10px 0 rgba(0,0,0,0.2);
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  font-size:22px;
  padding-top: 3px;
  padding-bottom: 3px;
}

.race-view__team-shield-img {
  width: 70%;
  max-width: 150px;
  filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.5));
  transition: all .3s;
  &:hover{
    filter: drop-shadow(0px 6px 6px rgba(#5F7890, 1));
    transform: translateY(-2px);
  }
  &:active{
    transform: translateY(0px);
  }
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
.race-view__event-round {
  font-size: 48px;
  font-weight: bold;
  color: #fff;
  padding: 3px 5px;
  border-radius: 3px;
  white-space: nowrap;
}
.race-view__event-round--clash {
  background-color: #5185E0;
}

.race-view__event-round--lol {
  background-color: #05D4BE;
}

.race-view__event-round--csgo {
  background-color: #FFAD63;
}

.race-view__event-round--cod {
  background-color: #b467cf;
}

.race-view__event-competition {
  cursor: pointer;
  transition: all .3s;
  &:hover{
    filter: drop-shadow(0px 10px 10px rgba(0, 0, 0, 0.5));
    transform: translateY(-2px);
  }
  &:active{
    transform: translateY(0px);
  }
}
.race-view__competition-info-time {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  padding: 20px 0 20px 0;
  margin: 0 16px 0 16px;
  border-bottom: 1px solid rgba(255,255,255,0.2);
}
.race-view__competition-info-time-countdown {
  font-weight: lighter;
}

.race-view__live-title {
  text-align: center;
}
.race-view__live-link {
  background-image: linear-gradient(140deg, #5F7890 0%, #4B5579 0%, #323D62 100%);
  box-shadow: 0 2px 10px 0 rgba(0,0,0,0.2);
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 6px;
  margin: 0 6% 0 6%;
  padding-top: 18px;
  padding-bottom: 18px;
  text-decoration: none;
  transition: all .3s;
  &:hover {
    background-image: linear-gradient(140deg, #5F7890 0%, #4B5579 50%, #323D62 100%);
    transform: translateY(-2px);
    box-shadow: 0 4px 10px 0 rgba(0,0,0,0.2);
  }
  &:active {
    transform: translateY(1px);
  }

}
.race-view__live-link-live {
  color:#fff;
  margin-bottom: 5px;
}
.race-view__live-link-img {
  width: 100%;
}

.race-view__back {
  cursor: pointer;
  transition: all .3s;
  &:hover {
    transform: translateX(-2px);
  }
  &:active {
    transform: translateX(-2px) translateY(1px);
  }
}

.race-item__team-shield-img--loser {
  filter: grayscale(100%) brightness(.8);
}

</style>


