import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'calendar-view',
      component: (resolve) => require(['@/view/CalendarView'], resolve)
    },
    {
      path: '/:competition/:game/match/:matchId',
      name: 'match-view',
      component: (resolve) => require(['@/view/MatchView'], resolve),
      props: true
    }
  ]
})
