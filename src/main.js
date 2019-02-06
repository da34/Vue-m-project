// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../static/css/global.css'
import '../static/fonts/iconfont'
import headNav from './components/common/headNav'


//引入vuex
import Vuex from 'vuex'

Vue.use(Vuex)

import shopTools from './components/common/shopTools'

let store = new Vuex.Store({
  state: {
    num: shopTools.getShopCount()
  },
  mutations: {
    addshop(state) {
      state.num++
    },
    reduceshop(state) {
      if(state.num<=0) return
      state.num--
    }
  }
})


Vue.component('headNav', headNav)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
