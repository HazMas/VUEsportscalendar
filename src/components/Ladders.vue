<template>
  <div>
    <loader v-if="loading">
    </loader>
    <div class="ladders" v-else>
      <router-link tag="div" :to="{name: 'team-view', params: {competition: competition, game: game, teamId: ladder.team.id}}" class="ladder-item" v-for="ladder in ladders.info" :key="ladder.team.id">
        <span class="ladder-team">
          <span>
            {{ladder.rank}}
            </span>
          <img class="ladders__shield-img" v-lazy="{ 'src': ladder.team.image_url, 'loading': require('@/assets/img/skeleton-shield.svg')}" :alt="ladder.team.name">
          <span class="ladders__team-name">
            {{ladder.team.name}}
          </span>
        </span>
        <span class="ladder-data">
          <span class="ladder-data-title">
            Ganados
          </span>
          {{ladder.win}}
        </span>
        <span class="ladder-data">
          <span class="ladder-data-title">
            Perdidos
          </span>
          {{ladder.loss}}
        </span>
        <span class="ladder-data">
          <span class="ladder-data-title">
            Empates
          </span>
          {{ladder.draw}}
        </span>
        <!-- <span class="ladder-data">
          <span class="ladder-data-title">
            Racha
          </span>
          {{ladder.streak}}
        </span> -->
        <span class="ladder-data">
          <span class="ladder-data-title">
            Puntos
          </span>
          {{ladder.points}}
        </span>
      </router-link>
    </div>
  </div>
</template>

<script>
import lvp from '@/api/lvp'
import esl from '@/api/esl'

import Loader from '@/components/Loader'

export default {
  name: 'ladders',
  props: ['competition', 'game'],
  created () {
    this.fetchData()
  },
  data () {
    return {
      loading: true
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      if (this.competition === 'superliga-orange') {
        lvp.getLadders(this.game)
          .then((ladders) => {
            this.ladders = ladders
            this.loading = false
          })
      } else if (this.competition === 'esl-masters') {
        esl.getLadders(this.game)
          .then((ladders) => {
            this.ladders = ladders
            this.loading = false
          })
      }
    }
  },
  components: {
    Loader
  }
}
</script>

<style lang="scss" scoped>
.ladders {
  margin-top: 30px;
  margin-bottom: 30px;
}
.ladder-item {
  cursor: pointer;
  display:flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 6%;
  border-bottom: 1px solid rgba(255,255,255,.2);
  &:hover {
    background-color: rgba(255,255,255,0.1);
  }
}
.ladder-item--active {
  background-image: linear-gradient(180deg, #19213F 0%, #12152B 45%, #101328 100%);
}
.ladder-team {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50%;
}
.ladder-data {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.ladder-data-title {
  font-size: 10px;
}
.ladders__shield-img {
  width: 50px;
  margin: 0 10px;
}
.ladders__team-name{
  width:60%;
  padding-right: 3px;
}

</style>
