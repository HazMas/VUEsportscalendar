<template>
  <div class="match-item">
    <p>
      {{match.round}} - {{match.game}} - {{match.competition}}
    </p>
    <img v-lazy="match.team_a.image_url" :alt="match.team_a.name">
    <div class="match-item_info" v-show="isFinished">
      {{match.result_a}}
      :
      {{match.result_b}}
    </div>
    <div class="match-item_info" v-show="isPlaying">
      {{match.result_a}}
      :
      {{match.result_b}}
      <br>
      En juego
    </div>
    <div class="match-item_info" v-show="isScheduled">
      - : -
      <br>
      {{date}}
    </div>
    <img v-lazy="match.team_b.image_url" :alt="match.team_a.name">
  </div>
</template>

<script>
export default {
  name: 'match-item',
  props: ['match'],
  computed: {
    isScheduled () {
      return this.match.status === 'scheduled'
    },
    isFinished () {
      return this.match.status === 'finished'
    },
    isPlaying () {
      return !this.isScheduled && !this.isFinished
    },
    date () {
      return this.match.start_date
    }
  }
}
</script>

<style>
.match-item_info {
  display: inline-block
}
</style>

