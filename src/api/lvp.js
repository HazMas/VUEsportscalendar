import axios from 'axios'

const API_BASE = 'https://esportscalendar.herokuapp.com/superliga/'

export default {
  getMatches () {
    const promises = [
      axios.get(API_BASE + 'lol/temporada/matches'),
      axios.get(API_BASE + 'clash/temporada/matches'),
      axios.get(API_BASE + 'csgo/temporada/matches')
    ]
    return Promise.all(promises)
      .then((responses) => {
        const matches = [
          ...responses[0].data.map((match) => {
            match.game = 'lol'
            match.competition = 'superliga'
            return match
          }),
          ...responses[1].data.map((match) => {
            match.game = 'clash'
            match.competition = 'superliga'
            return match
          }),
          ...responses[2].data.map((match) => {
            match.game = 'csgo'
            match.competition = 'superliga'
            return match
          })
        ]
        return matches
      })
  }
}
