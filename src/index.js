import Vue from 'vue'
import VueRouter from 'vue-router'
import FastClick from 'fastclick'
import store from '@store'
import route from './router'
import App from './App'
import '@asset/style/index.less'

FastClick.attach(document.body)

Vue.use(VueRouter)

const router = new VueRouter(route)

new Vue({
  el: '#root',
  router,
  store,
  render: h => h(App)
});