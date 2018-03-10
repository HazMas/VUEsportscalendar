import Vue from 'vue'
import Vuex from 'vuex'

import {UPDATE_MATCHES, FILTER_MATCHES} from './mutation-types'
import lvp from '../api/lvp'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    matches: []
  },
  getters: {
    matches (state) {
      return state.matches
    }
  },
  mutations: {
    [UPDATE_MATCHES] (state, {matches}) {
      state.matches = matches
    },
    [FILTER_MATCHES] (state) {
      state.matches = state.matches.filter((match) => {
        return new Date(match.start_date).getTime() > new Date().getTime()
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
        })
    }
  },
  strict: process.env.NODE_ENV !== 'production'
})
