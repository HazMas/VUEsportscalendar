<template>
  <div>
    <loader v-if="loading">
    </loader>
    <div v-else>
      <h1 class="match-view">
        {{match | startFullDate}}
      </h1>
      <div class="match-view__teams">
        <div class="match-view__team">
          <img class="match-view__team-shield-img" v-lazy="match.team_a.image_url" :alt="match.team_a.name">
        </div>
        <div class="match-view__result" v-if="isFinished(match) || isLive(match)">
          <div class="match-view__result-a">
            {{match.result_a}}
          </div>
          <span class="match-view__separator">
            vs
          </span>
          <div class="match-view__result-b">
            {{match.result_b}}
          </div>
          <span v-if="isLive(match)">
            En juego
          </span>
        </div>
        <div class="match-view__result" v-if="isScheduled(match)">
          {{match | startTime}} h
        </div>
        <div class="match-view__team">
          <img class="match-view__team-shield-img" v-lazy="match.team_b.image_url" :alt="match.team_b.name">
        </div>
      </div>
      <div class="match-view__competition-info">
        <span class="match-view__event-competition">
          <img :src="'/static/img/leagues/' + match.competition + '.png'" :alt="match.competition">
        </span>
        <span class="match-view__event-game">
          <img :src="'/static/img/games/' + match.game + '.png'" :alt="match.game">
        </span>
        <span :class="matchItemEventRoundClasses">
          J{{match.round}}
        </span>
      </div>
      <div class="match-view__live" v-if="!isFinished(match) && match.live">
        <h2>
          Donde ver
        </h2>
        <a class="match-view__live-info" v-for="live in match.live" :key="live.url" :href="live.url">
          <img :src="'/static/img/live/' + live.platform + '.svg'" :alt="live.platform">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import lvp from '@/api/lvp'
import Loader from '@/components/Loader'
import {isScheduled, isFinished, isLive, startTime, startFullDate} from '@/helpers/MatchHelpers'

export default {
  name: 'match-view',
  props: ['competition', 'game', 'matchId'],
  created () {
    if (this.competition === 'superliga-orange') {
      lvp.getMatch(this.game, this.matchId)
        .then((match) => {
          this.match = match
          this.loading = false
        })
    }
  },
  data () {
    return {
      loading: true,
      match: undefined
    }
  },
  computed: {
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
    isLive
  },
  filters: {
    startTime,
    startFullDate
  },
  components: {
    Loader
  }
}
</script>

<style lang="scss">
.match-view__teams {
  display: flex;
  justify-content: center;
  align-items: center;
}

.match-view__competition-info {
  display: flex;
  justify-content: center;
  align-items: center;
}

.match-view__team {
  display: inline-block;
}

.match-view__result {
  display: inline-block;
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

</style>


