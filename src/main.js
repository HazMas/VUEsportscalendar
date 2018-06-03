// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import VueAnalytics from 'vue-analytics'
import bugsnag from 'bugsnag-js'
import bugsnagVue from 'bugsnag-vue'
import App from './App'
import router from './router'
import store from './store'

// Initialize Bugsnag
const bugsnagClient = bugsnag('aa27e83d89b844c2dd4a0decb911845f')
bugsnagClient.use(bugsnagVue(Vue))

Vue.config.productionTip = false
Vue.use(VueLazyload)

Vue.use(VueAnalytics, {
  id: 'UA-109251415-4',
  router,
  debug: {
    sendHitTask: process.env.NODE_ENV === 'production'
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
