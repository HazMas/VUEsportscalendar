// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'
import VueAnalytics from 'vue-analytics'
import App from './App'
import router from './router'
import store from './store'

Raven
  .config('https://6cd7675eb707419da77b95b4a380b5c6@sentry.io/840495')
  .addPlugin(RavenVue, Vue)
  .install()

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
