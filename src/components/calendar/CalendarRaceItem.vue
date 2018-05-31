<template>
  <router-link tag="div" :to="{ name: 'race-view', params: { competition: match.competition, game: match.game, matchId: match.id }}" class="race-item">
     <div class="race-item__event race-item__event--copa-apertura">
      <span class="race-item__event-round race-item__event-round--copa-apertura">
        R{{match.round}}
      </span>
      <span class="race-item__event-competition">
        <img src='/static/img/leagues/copa-apertura.png'>
      </span>
      <span class="race-item__event-game">
        <img src='/static/img/games/granturismo.png'>
      </span>
    </div>
    <div class="race-item__circuit-description">
      <div class="race-item__circuit-name">
        <span>Nurburgring</span>
      </div>
      <div class="race-item__hour">
        03:45
      </div>
    </div>
    <div class="race-item__circuit-path">
      <img src='/static/img/paths/nurburgring.png'>
    </div>
  </router-link>
</template>

<script>
import {isScheduled, isLive, isFinished, startTime, isTeamLoser} from '@/helpers/MatchHelpers'

export default {
  name: 'CalendarRaceItem',
  props: ['match'],
  computed: {
    raceItemEventClasses () {
      return {
        'race-item__event': true,
        'race-item__event--clash': this.race.game === 'granturismo'
      }
    },
    raceItemEventRoundClasses () {
      return {
        'race-item__event-round': true,
        'race-item__event-round--clash': this.race.game === 'granturismo'
      }
    }
  },
  methods: {
    isScheduled,
    isLive,
    isFinished,
    isTeamLoser
  },
  filters: {
    startTime
  }
}
</script>

<style lang="scss" scoped>
  .race-item {
    // display: flex;
    display: grid;
    // justify-content: space-around;
    grid-template-columns: 1fr 4fr 4fr;
    grid-template-rows: 100px;
    height: 100px;
    margin-top: 25px;
    background-image: linear-gradient(140deg, #5F7890 0%, #4B5579 0%, #323D62 100%);
    box-shadow: 0 2px 10px 0 rgba(0,0,0,0.2);
    border-radius: 6px 0 0 6px;
    cursor: pointer;
  }
  .race-item__event {
    background: #354065;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: transparent;
    min-width: 50px;
  }
  .race-item__live {
    display:flex;
    align-items: center;
  }
  .race-item__event--copa-apertura {
    box-shadow: inset -3px 0 0 0 #E20A17;
  }
  .race-item__event-round {
    position: absolute;
    font-size: 14px;
    font-weight: bold;
    color: #fff;
    padding: 3px 5px;
    border-radius: 3px;
    left:calc(100% - 3px);
    top:-5px;
    white-space: nowrap;
  }
  .race-item__event-round--copa-apertura {
    background-color: #E20A17;
  }
  .race-item__event-competition, .race-item__event-game {
    width: 80%;
    max-width: 50px;
    height: auto;
    background-size: cover;
    display: inline-block;
  }
  .race-item__event-competition img, .race-item__event-game img {
    height: auto;
    max-width: 50px;
    width: 80%;
  }
  .dot-live{
    padding-right: 5px;
  }
  .race-item__circuit-description {
    padding-left: 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #fff;
    white-space: nowrap;
  }
  .race-item__circuit-path {
    padding-right: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .race-item__circuit-name {
    font-size: 1.7em;
    text-transform: uppercase;
    white-space: nowrap;
  }
</style>

