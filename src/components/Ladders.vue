<template>
  <div>
    <loader v-if="loading">
    </loader>
    <div class="ladders" v-else>
      <router-link tag="div" :to="{name: 'team-view', params: {competition: competition, game: game, teamId: ladder.team.id}}" class="ladder-item" v-for="ladder in ladders.info" :key="ladder.team.id">
        <span class="ladder-team">
          {{ladder.rank}}
          <img class="ladders__shield-img" v-lazy="ladder.team.image_url" :alt="ladder.team.name">
          {{ladder.team.name}}
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
  margin: 0 6%;
  padding: 7px ;
  border-bottom: 1px solid rgba(255,255,255,.2);
  &:hover {
    background-color: rgba(255,255,255,0.1);
  }
}
.ladder-team {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  height: 50px;
  margin: 0 15px;
}

</style>
