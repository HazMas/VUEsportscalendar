<template>
  <div>
    <loader v-if="loading">
    </loader>
    <div v-else>
      <div class="match-view__head-description">
        <div class="match-view__header">
          <div @click="$router.back()" class="match-view__back">
            <span class="icon-back"></span>
          </div>
          <h1 class="match-view">
            {{match | startFullDate}}
          </h1>
          <span>
            <add-to-calendar class="match-view__notification" v-if="!isFinished(match)" :title="match.team_a.name + ' vs ' + match.team_b.name" :start="startDate" :end="endDate" :details="'Jornada ' + match.round + '\npowered by E-Sports Calendar'" inline-template>
                <google-calendar class="match-view__calendar-link">
                  <span class="icon-bell-line"></span>
                </google-calendar>
            </add-to-calendar>
          </span>
        </div>

        <div class="match-view__teams">
          <router-link :to="{name: 'team-view', params: {teamId: match.team_a.id}}" tag="div" class="match-view__team match-view__team--left">
            <img class="match-view__team-shield-img" v-lazy="match.team_a.image_url" :alt="match.team_a.name">
          </router-link>
          <div class="match-view__result" v-if="isFinished(match) || isLive(match)">
            <div class="match-view__result-a">
              {{match.result_a}}
            </div>
            <span class="match-view__separator">
              -
            </span>
            <div class="match-view__result-b">
              {{match.result_b}}
            </div>
            <span v-if="isLive(match)">
              &nbsp;<img src=/static/img/live/dot.svg alt="en directo">
            </span>
          </div>
          <div class="match-view__result" v-if="isScheduled(match)">
            {{match | startTime}} h
          </div>
          <router-link :to="{name: 'team-view', params: {teamId: match.team_b.id}}" tag="div" class="match-view__team match-view__team--right">
            <img class="match-view__team-shield-img" v-lazy="match.team_b.image_url" :alt="match.team_b.name">
          </router-link>
        </div>
      </div>
      <div class="match-view__competition-info">
        <router-link :to="{name: 'competition-view', params: {competition: competition, game: game}}" class="match-view__event-competition">
          <img :src="'/static/img/leagues/' + competition + '.png'" :alt="competition">
        </router-link>
        <span class="match-view__event-game">
          <img :src="'/static/img/games/' + game + '.png'" :alt="game">
        </span>
        <span :class="matchItemEventRoundClasses">
          J{{match.round}}
        </span>
      </div>
      <vue-countdown :time="timeToStart" v-if="isScheduled(match)">
        <template slot-scope="props">
          <div class="match-view__competition-info-time"><span class="match-view__competition-info-time-title">El partido comenzará en:</span> <span class="match-view__competition-info-time-countdown">{{ props.days }}d - {{ props.hours }}h - {{ props.minutes }}m - {{ props.seconds }}s.</span></div>
        </template>
      </vue-countdown>
      <div class="match-view__live" v-if="!isFinished(match) && match.live">
        <h2 class="match-view__live-title">
          Donde ver
        </h2>
        <a class="match-view__live-link" v-for="live in match.live" :key="live.url" :href="live.url" target="_blank">
          <div>
            <div class="match-view__live-link-live" v-if="isLive(match)">
              <span>
                <img src=/static/img/live/dot.svg alt="en directo">
              </span>
              <span>
                En directo
              </span>
            </div>
            <img class="match-view__live-link-img" :src="'/static/img/live/' + live.platform + '.svg'" :alt="live.platform">
          </div>
        </a>
      </div>
      <h2 class="match-view__live-title">
        Clasificación
      </h2>
      <ladders :competition="competition" :game="game"></ladders>
      <h2 class="match-view__live-title">
        {{match.team_a.name}}
      </h2>
      <players :competition="competition" :game="game" :teamData="match.team_a"></players>
      <h2 class="match-view__live-title">
        {{match.team_b.name}}
      </h2>
      <players :competition="competition" :game="game" :teamData="match.team_b"></players>
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

import {isScheduled, isFinished, isLive, startTime, startFullDate} from '@/helpers/MatchHelpers'

export default {
  name: 'match-view',
  props: ['competition', 'game', 'matchId'],
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
      match: undefined
    }
  },
  computed: {
    timeToStart () {
      return this.startDate - (new Date()).getTime()
    },
    startDate () {
      return moment(this.match.start_date).toDate()
    },
    endDate () {
      return moment(this.match.start_date).add(2, 'hours').toDate()
    },
    matchItemEventRoundClasses () {
      return {
        'match-view__event-round': true,
        'match-view__event-round--clash': this.match.game === 'clash',
        'match-view__event-round--lol': this.match.game === 'lol',
        'match-view__event-round--csgo': this.match.game === 'csgo'
      }
    }
  },
  methods: {
    isScheduled,
    isFinished,
    isLive,
    fetchData () {
      if (this.competition === 'superliga-orange') {
        lvp.getMatch(this.game, this.matchId)
          .then((match) => {
            this.match = match
            this.loading = false
            this.title = match.team_a.name + ' vs ' + this.match.team_b.name
          })
      } else if (this.competition === 'esl-masters') {
        esl.getMatch(this.game, this.matchId)
          .then((match) => {
            this.match = match
            this.loading = false
            this.title = match.team_a.name + ' vs ' + this.match.team_b.name
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

<style lang="scss">
.match-view__head-description {
  background-image: linear-gradient(180deg, #19213F 0%, #12152B 45%, #101328 100%);
}
.match-view__header {
  display:flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 6%;

}
.match-view__notification {
  display: flex;
  justify-content: flex-end;
  text-decoration: none;
  color: white;
  font-size: 20px;
  color: #7E8BBC;
}
.match-view__teams {
  display: flex;
  justify-content:space-between;
  align-items: center;
  padding-bottom: 70px;
}

.match-view__team {
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 10;
}
.match-view__team--left  {
  margin-right: -15%;
}
.match-view__team--right {
  margin-left: -15%;
}
.match-view__result {
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

.match-view__team-shield-img {
  width: 70%;
  max-width: 150px;
}
.match-view__competition-info {
  margin-top: -50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.match-view__event-round {
  font-size: 48px;
  font-weight: bold;
  color: #fff;
  padding: 3px 5px;
  border-radius: 3px;
  white-space: nowrap;
}
.match-view__event-round--clash {
  background-color: #5185E0;
}

.match-view__event-round--lol {
  background-color: #05D4BE;
}

.match-view__event-round--csgo {
  background-color: #FFAD63;
}

.match-view__event-competition {
  cursor: pointer;
}
.match-view__competition-info-time {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  padding: 20px 0 20px 0;
  margin: 0 16px 0 16px;
  border-bottom: 1px solid rgba(255,255,255,0.2);
}
.match-view__competition-info-time-title{
}
.match-view__competition-info-time-countdown {
  font-weight: lighter;
}

.match-view__live-title {
  text-align: center;
}
.match-view__live-link {
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

}
.match-view__live-link-live {
  color:#fff;
  margin-bottom: 5px;
}
.match-view__live-link-img {
  width: 100%;
}

.match-view__back {
  cursor: pointer;
}

</style>


