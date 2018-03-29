import axios from 'axios'
import moment from 'moment'

const API_MATCHES_URL = 'https://cdn1.api.esl.tv/v1/match/perday?parentpid=10703&pids=&lang=es&status=&type=undefined&offset=-1&rematches=undefined&maxdays=undefined&'
const API_TEAM_URL = 'https://cdn1.api.esl.tv/v1/team/detail?pids=10703&lang=es&uid='
const API_LADDER_URL = 'https://cdn1.api.esl.tv/v1/teamranking/list?pid=10703&lang=undefined&'

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
            ...parseTeamInfo(match.team1)
          },
          'team_b': {
            ...parseTeamInfo(match.team2)
          },
          'status': this.parseMatchStatus(match),
          'live': this.getLive('csgo')
        }
      })
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
        return parseTeamData(response.data.items[0])
      })
  },
  getLadders (game) {
    return axios.get(API_LADDER_URL)
      .then((response) => {
        let ladder = {
          'game': game,
          'competition': 'esl-masters',
          'info': parseLadderData(response.data.items[0].groups[0].teams)
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
  }
}

function parseLadderData (laddersData) {
  return laddersData.map((ladderData) => {
    return {
      'id': ladderData['pid'],
      'rank': ladderData['position'],
      'points': ladderData['points'],
      'win': ladderData['matches_won'],
      'loss': ladderData['matches_lost'],
      'draw': ladderData['matches_draw'],
      'team': parseTeamLadderInfo(ladderData['team'])
    }
  })
}

function parseTeamInfo (team) {
  return {
    'id': parseInt(team.uid),
    'name': team.name,
    'image_url': team.logo_small
  }
}

function parseTeamLadderInfo (team) {
  team = parseTeamInfo(team)
  team['image_url'] = 'http://es.pro.eslgaming.com/' + team['image_url']

  return team
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
