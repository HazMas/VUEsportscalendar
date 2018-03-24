<template>
  <div>
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
          ·
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
    <div>
      {{match}}
    </div>
  </div>
</template>

<script>
import {isScheduled, isFinished, isLive, startTime, startFullDate} from '@/helpers/MatchHelpers'

export default {
  name: 'match-view',
  props: ['competition', 'game', 'matchId'],
  computed: {
    match () {
      return this.$store.getters.getMatchByCompetitonGameAndId(this.competition, this.game, this.matchId)
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
  }
}
</script>

<style lang="scss">



</style>


