<template>
  <div>
    <div class="competition-view__head-description">
      <div class="competition-view__header">
        <div @click="$router.back()" class="competition-view__back">
          <span class="icon-back"></span>
        </div>
        <h1 class="competition-view">
          {{competition}}
        </h1>
        <span></span>
      </div>
      <div class="competition-view__competition">
        <img class="competition-view__shield-img" :src="'/static/img/leagues/' + competition + '.png'" :alt="competition">
      </div>
    </div>
    <div class="competition-view__game-info">
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
.competition-view__head-description {
  background-image: linear-gradient(180deg, #19213F 0%, #12152B 45%, #101328 100%);
}
.competition-view__header {
  display:flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 6%;
}
.competition-view__competition {
  display: flex;
  justify-content:center;
  align-items: center;
  padding-bottom: 70px;
}
.competition-view__shield-img {
  width:70%;
  max-width: 200px;
}
.competition-view__ladder-item{
  cursor: pointer;
}
.competition-view__game-info {
  margin-top: -50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

</style>


