<template>
  <router-link tag="div" :to="{ name: 'race-view', params: { competition: match.competition, game: match.game, matchId: match.id }}" class="match-item">
    test
  </router-link>
</template>

<script>
import {isScheduled, isLive, isFinished, startTime, isTeamLoser} from '@/helpers/MatchHelpers'

export default {
  name: 'CalendarRaceItem',
  props: ['match'],
  computed: {
    matchItemEventClasses () {
      return {
        'match-item__event': true,
        'match-item__event--clash': this.match.game === 'clash',
        'match-item__event--lol': this.match.game === 'lol',
        'match-item__event--csgo': this.match.game === 'csgo',
        'match-item__event--cod': this.match.game === 'cod'
      }
    },
    matchItemEventRoundClasses () {
      return {
        'match-item__event-round': true,
        'match-item__event-round--clash': this.match.game === 'clash',
        'match-item__event-round--lol': this.match.game === 'lol',
        'match-item__event-round--csgo': this.match.game === 'csgo',
        'match-item__event-round--cod': this.match.game === 'cod'
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
    cursor: pointer;
  }
  .match-item__event {
    background: #354065;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: transparent;
  }
  .match-item__live {
    display:flex;
    align-items: center;
  }
  .match-item__event--clash {
    box-shadow: inset -3px 0 0 0 #5185E0;
  }
  .match-item__event--lol {
    box-shadow: inset -3px 0 0 0 #05D4BE;
  }
  .match-item__event--csgo {
    box-shadow: inset -3px 0 0 0 #FFAD63;
  }
  .match-item__event--cod {
    box-shadow: inset -3px 0 0 0 #b467cf;
  }
  .match-item__event-round {
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
  .match-item__event-round--clash {
    background-color: #5185E0;
  }
  .match-item__event-round--lol {
    background-color: #05D4BE;
  }
  .match-item__event-round--csgo {
    background-color: #FFAD63;
  }
  .match-item__event-round--cod {
    background-color: #b467cf;
  }
  .match-item__event-competition, .match-item__event-game {
    width: 45px;
    height: 45px;
    background-size: cover;
    display: inline-block;
  }
  .match-item__event-competition img, .match-item__event-game img {
    height: 45px;
    width: 45px;
  }
  .match-item__team-shield {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .match-item__team-shield-img {
    height: 76px;
    filter: drop-shadow(0px 5px 5px rgba(0,0,0,0.5));
  }
  .match-item__scoreboard {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
  .dot-live{
    padding-right: 5px;
  }
  .match-item__result {
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: #fff;
    font-size: 2em;
    white-space: nowrap;
  }

  .match-item__team-shield-img--loser {
    filter: grayscale(100%) brightness(.8);

  }
</style>

