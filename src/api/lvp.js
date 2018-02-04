import axios from 'axios'

const API_BASE = 'http://pro.lvp.es/api/superliga/lol/temporada/'

export default {
  getMatches () {
    return axios.get(API_BASE + 'matches')
  }
}
