import Vue from 'vue'
import Vuex from 'vuex'

import {UPDATE_MATCHES} from './mutation-types'
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
    }
  },
  actions: {
    getMatches ({commit}, matches) {
      lvp.getMatches()
        .then((response) => {
          const payload = {
            'matches': response.data
          }
          commit(UPDATE_MATCHES, payload)
        })
    }
  },
  strict: process.env.NODE_ENV !== 'production'
})
