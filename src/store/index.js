import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'

import {UPDATE_MATCHES, FILTER_MATCHES} from './mutation-types'
import lvp from '../api/lvp'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    matches: [],
    _matches: []
  },
  getters: {
    matches (state) {
      return state.matches
    },
    getNumberOfMatchesByDate (state) {
      return (date) => {
        return state._matches.filter((match) => {
          return moment(match.start_date).isSame(date, 'day')
        }).length
      }
    }
  },
  mutations: {
    [UPDATE_MATCHES] (state, {matches}) {
      state._matches = matches
      state.matches = matches
    },
    [FILTER_MATCHES] (state, {date}) {
      state.matches = state._matches.filter((match) => {
        return moment(match.start_date).isSame(date, 'day')
      })
    }
  },
  actions: {
    getMatches ({commit}, matches) {
      lvp.getMatches()
        .then((response) => {
          const payload = {
            'matches': response
          }
          commit(UPDATE_MATCHES, payload)
          commit(FILTER_MATCHES, {'date': new Date()})
        })
    }
  },
  strict: process.env.NODE_ENV !== 'production'
})
