import axios from 'axios'

const API_BASE = 'https://esportscalendar.herokuapp.com/superliga/'

export default {
  getMatches () {
    const promises = [
      axios.get(API_BASE + 'lol/temporada/matches'),
      axios.get(API_BASE + 'clash/temporada/matches'),
      axios.get(API_BASE + 'csgo/temporada/matches'),
      axios.get(API_BASE + 'lol/copa/matches'),
      axios.get(API_BASE + 'lolsegunda/temporada/matches')
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
    }
  }
}
