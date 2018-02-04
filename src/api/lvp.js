import axios from 'axios'

const API_BASE = 'https://pro.lvp.es/api/superliga/lol/temporada/'

export default {
  getMatches () {
    return axios.get(API_BASE + 'matches')
  }
}
