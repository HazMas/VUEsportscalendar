import axios from 'axios'

const API_MATCHES_URL = 'https://cdn1.api.esl.tv/v1/match/perday?parentpid=10703&pids=&lang=es&status=&type=undefined&offset=-1&rematches=undefined&maxdays=undefined&'
const API_TEAM_URL = 'https://cdn1.api.esl.tv/v1/team/detail?pids=10703&lang=es&uid='

export default {
  getMatches () {
    const promises = [
      axios.get(API_MATCHES_URL)
    ]
    return Promise.all(promises)
      .then((responses) => {
        const matches = responses[0].data.items.reduce((matches, matchDayData) => {
          matches = [
            ...matches,
            ...this.parseMatchesFromMatchDay(matchDayData)
          ]
          return matches
        }, [])

        return matches
      })
  },
  getMatch (game, matchId) {
    return this.getMatches()
      .then((matches) => {
        return matches.find((match) => {
          return match.game === game && match.id === matchId
        })
      })
  },
  parseMatchesFromMatchDay ({matches, matchday}) { // eslint-disable-line camelcase
    return matches.map(
      (match) => {
        return {
          'id': match.uid,
          'round': matchday,
          'competition': 'esl-masters',
          'game': 'csgo',
          'start_date': new Date(match.playdate * 1000), // eslint-disable-line camelcase
          'result_a': match.result_team1, // eslint-disable-line camelcase
          'result_b': match.result_team2, // eslint-disable-line camelcase
          'team_a': {
            ...this.parseMatchTeamInfo(match.team1)
          },
          'team_b': {
            ...this.parseMatchTeamInfo(match.team2)
          },
          'status': this.parseMatchStatus(match),
          'live': this.getLive('csgo')
        }
      })
  },
  parseMatchTeamInfo (team) {
    return {
      'id': team.uid,
      'name': team.name,
      'image_url': team.logo_small
    }
  },
  parseMatchStatus ({winner, islive}) {
    if (winner !== '0' && islive === '0') {
      return 'finished'
    } else if (winner === '0' && islive === '0') {
      return 'scheduled'
    }
  },
  getLive (game) {
    if (game === 'csgo') {
      return [
        {
          'platform': 'twitch',
          'url': 'https://www.twitch.tv/ESL_csgo_es'
        }
      ]
    }
  },
  getTeam (game, teamId) {
    return axios.get(API_TEAM_URL + teamId)
      .then((response) => {
        console.log(response.data)
        return parseTeamData(response.data.items[0])
      })
  }
}

function parseTeamData (teamData) {
  return {
    'game': 'csgo',
    'competition': 'esl-masters',
    'id': teamData['uid'],
    'name': teamData['name'],
    'image_url': teamData['logo_small'],
    'social': parseSocialData(teamData),
    'players': parsePlayeresData(teamData['players'])
  }
}

function parseSocialData (teamData) {
  return {
    'facebook': teamData['facebook'],
    'twitter': 'https://twitter.com/' + teamData['twitter'],
    'homepage': teamData['homepage'],
    'twitch': teamData['twitch_chanel'],
    'youtube': teamData['youtube_chanel']
  }
}

function parsePlayeresData (playersData) {
  return playersData.map((playerData) => {
    return {
      'name': playerData['firstname'] + ' ' + playerData['lastname'],
      'image_url': playerData['photo'],
      'nick': playerData['nickname'],
      'position': playerData['position']
    }
  })
}
