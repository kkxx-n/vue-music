import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'

import fastclick from 'fastclick'

import 'common/stylus/index.styl'

Vue.use(VueLazyLoad, {
    loading: require('common/image/default.png')
})

Vue.config.productionTip = false

fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    render: h => h(App),
    store,
    router
})