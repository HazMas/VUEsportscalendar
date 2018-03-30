<template>
  <div>
    <loader v-if="loading">
    </loader>
    <div class="players" v-else>
      <div v-for="player in team.players" :key="player.id" class="player-row">
        <div class="player-picname">
          <div class="player">
            <img v-if="player.image_url" class="player-img" v-lazy="player.image_url" :alt="player.name">
            <img v-else class="team-img" v-lazy="team.image_url" :alt="player.name">
          </div>
          <span class="player-name">
            {{player.name}}
            <span class="player-nick">
              "{{player.nick}}"
            </span>
          </span>
        </div>

        <span class="player-position">
          {{player.position}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import lvp from '@/api/lvp'
import esl from '@/api/esl'

import Loader from '@/components/Loader'

export default {
  name: 'team',
  props: ['competition', 'game', 'teamData'],
  created () {
    this.fetchData()
  },
  data () {
    return {
      team: undefined,
      loading: true
    }
  },
  methods: {
    fetchData () {
      if (!this.teamData.players) {
        if (this.competition === 'superliga-orange') {
          lvp.getTeam(this.game, this.teamData.id)
            .then((team) => {
              this.team = team
              this.loading = false
            })
        } else if (this.competition === 'esl-masters') {
          esl.getTeam(this.game, this.teamData.id)
            .then((team) => {
              this.team = team
              this.loading = false
            })
        }
      } else {
        this.loading = false
        this.team = this.teamData
      }
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  components: {
    Loader
  }
}
</script>

<style lang="scss" scoped>
.players {
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 0 6%;
}
.player-row {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255,255,255,.2)
}
.player {
  height: 50px;
  width: 50px;
  min-width: 50px;
  overflow: hidden;
  border-radius: 100px;
  border: 3px solid white;
  background-color: #667098;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.50);
}
.player-picname{
  display: flex;
  align-items: center;
}
.player-nick {
  font-weight: lighter;
}
.player-img {
  width: 100%;
  background-color: #fff;
}
.team-img {
  width: 90%;
  filter: grayscale(100%);
  opacity:0.7;
  padding-left: 5%;
  padding-top: 5%;
}
.player-name {
  display: flex;
  flex-direction: column;
  padding-left: 15px;
}
</style>
