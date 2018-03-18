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
            return match
          }),
          ...responses[1].data.map((match) => {
            match.game = 'clash'
            match.competition = 'superliga-orange'
            return match
          }),
          ...responses[2].data.map((match) => {
            match.game = 'csgo'
            match.competition = 'superliga-orange'
            return match
          }),
          ...responses[3].data.map((match) => {
            match.game = 'lol'
            match.competition = 'lacopa-elcorteingles'
            return match
          }),
          ...responses[4].data.map((match) => {
            match.game = 'lol'
            match.competition = 'lvp-segunda'
            return match
          })
        ]
        return matches
      })
  }
}
