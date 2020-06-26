// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'es6-promise/auto'

import Vue from 'vue'
import { store } from './store/store.js'
import VueRouter from 'vue-router'
import App from './App'
import Routes from './routes'


//Vue.config.productionTip = false

// Use packages
Vue.use(VueRouter)

// Register routes
const router = new VueRouter({
  routes:  Routes,
  mode: 'history',
});

/* eslint-disable no-new */
new Vue({
  store: store, // becomes available for the #app
  el: '#app',
  components: { App },
  template: '<App/>',
  router: router, //let the app uses the routes we defined above and in routes.js
  render: h => h(App)
})
