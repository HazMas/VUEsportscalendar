import axios from 'axios'
import moment from 'moment'

const API_BASE = 'https://esportscalendar.herokuapp.com/superliga/'

export default {
  getMatches () {
    const promises = [
      axios.get(API_BASE + 'lol/temporada/matches'),
      axios.get(API_BASE + 'clash/temporada/matches'),
      axios.get(API_BASE + 'csgo/temporada/matches'),
      axios.get(API_BASE + 'cod/temporada/matches')
      // axios.get(API_BASE + 'lol/copa/matches'),
      // axios.get(API_BASE + 'lolsegunda/temporada/matches')
    ]
    return Promise.all(promises)
      .then((responses) => {
        const matches = [
          ...responses[0].data.map((match) => {
            match.game = 'lol'
            match.competition = 'superliga-orange'
            match.live = this.getLive(match.game)
            return match
          }),
          ...responses[1].data.map((match) => {
            match.game = 'clash'
            match.competition = 'superliga-orange'
            match.live = this.getLive(match.game)
            return match
          }),
          ...responses[2].data.map((match) => {
            match.game = 'csgo'
            match.competition = 'superliga-orange'
            match.live = this.getLive(match.game)
            return match
          }),
          ...responses[3].data.map((match) => {
            match.game = 'cod'
            match.competition = 'superliga-orange'
            match.live = this.getLive(match.game)
            return match
          })
        ]
        return matches
      })
  },
  getLive (game) {
    if (game === 'csgo') {
      return [
        {
          'platform': 'twitch',
          'url': 'https://www.twitch.tv/lvpes2'
        }
      ]
    } else if (game === 'clash') {
      return [
        {
          'platform': 'twitch',
          'url': 'https://www.twitch.tv/lvpes3'
        }
      ]
    } else if (game === 'lol') {
      return [
        {
          'platform': 'twitch',
          'url': 'https://www.twitch.tv/lvpes'
        }
      ]
    } else if (game === 'cod') {
      return [
        {
          'platform': 'twitch',
          'url': 'https://www.twitch.tv/lvpes2'
        }
      ]
    }
  },
  getMatch (game, matchId) {
    return axios.get(API_BASE + game + '/temporada/match/' + matchId)
      .then((response) => {
        let match = {
          'game': game,
          'competition': 'superliga-orange',
          'live': this.getLive(game),
          ...response.data
        }
        return match
      })
  },
  getTeam (game, teamId) {
    return axios.get(API_BASE + game + '/temporada/team/' + teamId)
      .then((response) => {
        let team = {
          'game': game,
          'competition': 'superliga-orange',
          ...response.data
        }
        return team
      })
  },
  getLadders (game) {
    return axios.get(API_BASE + game + '/temporada/ladder')
      .then((response) => {
        let ladder = {
          'game': game,
          'competition': 'superliga-orange',
          'info': response.data
        }
        return ladder
      })
  },
  getNextMatchesByTeam (game, teamId) {
    return this.getMatches()
      .then((matches) => {
        return matches.filter((match) => {
          return match.game === game && (match.team_a.id === teamId || match.team_b.id === teamId) && moment(match.start_date).isAfter(moment(), 'days')
        })
      })
  },
  getPreviousMatchesByTeam (game, teamId) {
    return this.getMatches()
      .then((matches) => {
        return matches.filter((match) => {
          return match.game === game && (match.team_a.id === teamId || match.team_b.id === teamId) && moment(match.start_date).isBefore(moment(), 'days')
        })
      })
  }
}
