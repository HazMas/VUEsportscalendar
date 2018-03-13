<template>
  <div class="match-item">
    <div class="match-item__event">
      <span class="match-item__event-round">
        J {{match.round}}
      </span>
      <span class="match-item__event-competition">
        {{match.competition}}
      </span>
      <span class="match-item__event-game">
        {{match.game}}
      </span>
    </div>
    <div class="match-item__team-shield">
      <img class="match-item__team-shield-img" v-lazy="match.team_a.image_url" :alt="match.team_a.name">
    </div>
    <div class="match-item__result" v-if="isFinished || isPlaying">
      <div class="match-item__result-a">{{match.result_a}}</div>
      <span class="match-item__separator">·</span>
      <div class="match-item__result-b">{{match.result_b}}</div>
      <span v-if="isPlaying">En juego</span>
    </div>
    <div class="match-item__result" v-if="isScheduled">
      {{date}} h
    </div>
    <div class="match-item__team-shield">
      <img class="match-item__team-shield-img" v-lazy="match.team_b.image_url" :alt="match.team_a.name">
    </div>
  </div>
</template>

<script>
import moment from 'moment'

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
      return moment(this.match.start_date).format('HH:mm')
    }
  }
}
</script>

<style lang="scss">
  .match-item {
    // display: flex;
    display: grid;
    // justify-content: space-around;
    grid-template-columns: 1fr 3fr 2fr 3fr;
    grid-template-rows: 100px;
    height: 100px;
    margin-top: 25px;
    background-image: linear-gradient(140deg, #5F7890 0%, #4B5579 0%, #323D62 100%);
    box-shadow: 0 2px 10px 0 rgba(0,0,0,0.2);
    border-radius: 6px 0 0 6px;
  }
  .match-item__event {
  background: #354065;
  box-shadow: inset -3px 0 0 0 #00A269;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: transparent;
  }
  .match-item__event-round {
    position: absolute;
    background-color: #00A269;
    font-size: 14px;
    font-weight: bold;
    color: #fff;
    padding: 3px 5px;
    border-radius: 3px;
    left:calc(100% - 3px);
    top:-5px;
    white-space: nowrap;
  }
  .match-item__event-competition, .match-item__event-game {
    width: 45px;
    height: 45px;
    background-size: cover;
    display: inline-block;
  }
  .match-item__event-competition {
    background-image: url(../assets/ligas/superliga-orange.png);
  }
  .match-item__event-game {
    background-image: url(../assets/juegos/clash-royale.png);
  }
  .match-item__team-shield {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .match-item__team-shield-img {
    height: 76px;
     -webkit-filter: drop-shadow(0px 5px 5px rgba(0,0,0,0.5));
  }
  .match-item__result {
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: #fff;
    font-size: 2em;
    white-space: nowrap;
  }
</style>

