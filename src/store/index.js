import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'

import {UPDATE_MATCHES, FILTER_MATCHES, UPDATE_LOADING} from './mutation-types'
import lvp from '../api/lvp'
import esl from '../api/esl'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    matches: [],
    _matches: [],
    selectedDate: new Date(),
    loading: true
  },
  getters: {
    matches (state) {
      let matches = [
        ...state.matches
      ]
      return matches.sort((matchA, matchB) => {
        return moment(matchA.start_date).isAfter(moment(matchB.start_date))
      })
    },
    selectedDate (state) {
      return moment(state.selectedDate).toDate()
    },
    loading (state) {
      return state.loading
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
      state.selectedDate = date
      state.matches = state._matches.filter((match) => {
        return moment(match.start_date).isSame(date, 'day')
      })
    },
    [UPDATE_LOADING] (state, {loading}) {
      state.loading = loading
    }
  },
  actions: {
    getMatches ({commit, state}, matches) {
      Promise.all([
        lvp.getMatches(),
        esl.getMatches()
      ]).then((responses) => {
        const payload = {
          'matches': [
            ...responses[0],
            ...responses[1]
          ]
        }
        commit(UPDATE_MATCHES, payload)
        commit(FILTER_MATCHES, {'date': state.selectedDate})
        commit(UPDATE_LOADING, {'loading': false})
      })
    }
  },
  strict: process.env.NODE_ENV !== 'production'
})
