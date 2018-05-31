export default {
  getMatches () {
    return new Promise((resolve, reject) => {
      const matches = [
        {
          round: 1,
          circuit: 'span',
          game: 'gran-turismo',
          competition: 'sce',
          id: 1,
          live: this.getLive(),
          start_date: new Date()
        }
      ]
      return resolve(matches)
    })
  },
  getLive () {
    return [
      {
        'platform': 'youtube',
        'url': 'https://www.youtube.com/channel/UCrSBYzKfhlN0tXXZRyEaFvQ'
      }
    ]
  },
  getMatch (game, matchId) {
    return {
      'game': game,
      'competition': 'superliga-orange',
      'live': this.getLive(game)
    }
  }
}
