<template>
  <div>
    <header>
      <span></span>
      <h1>
        <img class="header__logo" src="../assets/img/logotype-esc.svg" alt="Esports calendar, calendario de e-sports">
      </h1>
      <detect-network class="offline-dino">
        <div slot="offline">
          <img src="@/assets/img/dino.svg" alt="Offline dinosaur">
        </div>
      </detect-network>
    </header>
    <div class="calendar-view">
      <div class="month-item" @click="showCalendar = !showCalendar">
        {{month}}
        <span class="icon-select-down"></span>
      </div>
      <div class="calendar-tabs">
        <calendar-tab v-for="tab in tabs" :key="tab.title" :tab="tab"></calendar-tab>
      </div>
    </div>
    <v-date-picker class="calendar-view__date-picker" mode="single" @input="updateDate" :is-inline="true" v-if="showCalendar" :value="selectedDate">
    </v-date-picker>
    <div v-if="areNoMatches" class="no-match-text">
      No hay partidos 😱
    </div>
    <loader v-if="isLoading" class="no-match-text"></loader>
    <component :is="selectItem(match)" class="match-item" v-for="match in matches" :key="match.id" :match="match"></component>
  </div>
</template>

<script>
import Vue from 'vue'
import detectNetwork from 'v-offline'

import VCalendar from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'

import { mapGetters } from 'vuex'
import moment from 'moment'

import { FILTER_MATCHES } from '@/store/mutation-types'
import CalendarMatchItem from '@/components/calendar/CalendarMatchItem'
import CalendarMatchNullItem from '@/components/calendar/CalendarMatchNullItem'
import CalendarTab from '@/components/calendar/CalendarTab'
import Loader from '@/components/Loader'

Vue.use(VCalendar)

export default {
  name: 'calendar-view',
  created () {
    this.$store.dispatch('getMatches')
  },
  computed: {
    tabs () {
      const numberOfTabs = 7

      return (new Array(numberOfTabs)).fill(this.selectedDate).map((date, index) => {
        date = moment(date).add(index - 3, 'day')
        return {
          date
        }
      })
    },
    month () {
      return moment(this.selectedDate).locale('es').format('MMMM')
    },
    areNoMatches () {
      return this.matches.length === 0 && !this.isLoading
    },
    isLoading () {
      return this.loading
    },
    ...mapGetters(['matches', 'selectedDate', 'loading'])
  },
  components: {
    CalendarMatchItem,
    CalendarMatchNullItem,
    CalendarTab,
    detectNetwork,
    Loader
  },
  metaInfo: {
    title: 'Calendario'
  },
  methods: {
    updateDate (date) {
      const payload = {
        'date': date
      }

      this.$store.commit(FILTER_MATCHES, payload)
      this.showCalendar = false
    },

    selectItem (match) {
      if (!match.team_a || !match.team_b) {
        return 'calendar-match-null-item'
      } else {
        return 'calendar-match-item'
      }
    }
  },
  data () {
    return {
      'showCalendar': false
    }
  }
}
</script>

<style lang="scss">
  .calendar-view {
    display: flex;
    padding:0 6% 0 6%;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid rgba(255,255,255,.2);
  }
  .calendar-tabs {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
.month-item {
  font-size: 1.3em;
  padding: 2%;
  margin-right: 2%;
  display: flex;
  align-items: center;
  cursor:pointer;
  &:Hover {
    background-image: linear-gradient(180deg, #19213F 0%, #12152B 45%, #101328 100%);
    border-radius: 6px;
  }
  &:active {
    transform: translateY(1px);
  }
}
.icon-select-down {
    font-size: 0.4em;
    margin-top: 1em;
    padding-left: 0.3em;
}
  .match-item {
    margin:0 0 0 6%;
  }
  .no-match-text {
    text-align: center;
  }
  .calendar-view__selected-date {
    text-align: center;
  }
.calendar-view__date-picker {
  display: block;
  display: flex;
  width: 100%;
  padding: 0 6%;
  background-image: linear-gradient(180deg, #19213F 0%, #12152B 45%, #101328 100%);
  border: none !important;
  color: #fff !important;
  font-family: 'Oswald', sans-serif !important;
}
</style>


