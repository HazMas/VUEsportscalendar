<template>
  <div>
    <div class="competition-view__info">
      <router-link :to="{name: 'competition-view', params: {competition: competition, game: game}}" tag="div" class="competition-view__event-competition">
        <img :src="'/static/img/leagues/' + competition + '.png'" :alt="competition">
      </router-link>
      <span class="competition-view__event-game">
        <img :src="'/static/img/games/' + game + '.png'" :alt="game">
      </span>
    </div>
    <ladders :competition="competition" :game="game"></ladders>
  </div>
</template>

<script>
import Ladders from '@/components/Ladders'

export default {
  name: 'competition-view',
  props: ['competition', 'game'],
  metaInfo () {
    return {
      title: 'Clasificación'
    }
  },
  data () {
    return {
      ladders: undefined
    }
  },
  components: {
    Ladders
  }
}
</script>

<style lang="scss" scoped>

.competition-view__ladder-item{
  cursor: pointer;
}

</style>


