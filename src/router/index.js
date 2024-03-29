import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'

Vue.use(Router)
Vue.use(Meta)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'calendar-view',
      component: (resolve) => require(['@/view/CalendarView'], resolve)
    },
    {
      path: '/:competition/:game/info',
      name: 'competition-view',
      component: (resolve) => require(['@/view/CompetitionView'], resolve),
      props: true
    },
    {
      path: '/:competition/:game/match/:matchId',
      name: 'match-view',
      component: (resolve) => require(['@/view/MatchView'], resolve),
      props: true
    },
    // {
    //   path: '/:competition/:game/race/:raceId',
    //   name: 'race-view',
    //   component: (resolve) => require(['@/view/RaceView'], resolve),
    //   props: true
    // },
    {
      path: '/:competition/:game/team/:teamId',
      name: 'team-view',
      component: (resolve) => require(['@/view/TeamView'], resolve),
      props: true
    },
    {
      path: '/*',
      name: 'not-found-view',
      component: (resolve) => require(['@/view/NotFoundView'], resolve),
      props: true
    }
  ]
})
