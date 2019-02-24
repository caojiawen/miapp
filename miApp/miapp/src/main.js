import Vue from 'vue'
import App from './App'
import router from './router'

// vuex
import myStore from "./vuex/basic"

//axios 
import axios from "axios"
// axios.defaults.baseURL = 'https://miapp.applinzi.com/'
axios.defaults.baseURL = 'http://localhost:5060/'
Vue.prototype.$axios = axios;

// qs
import qs from "qs"

// vue-lazyload
import VueLazyLoad from "vue-lazyload"
Vue.use(VueLazyLoad, {
  error: "./static/error.png",
  loading: "./static/loading.gif"
})

// 全局样式
import "./lib/public.css"

// mui
import "./lib/mui/css/mui.css"
import "./lib/mui/css/icons-extra.css"
import "./lib/mui/css/iconfont.css"
import mui from "./lib/mui/js/mui.js";
Vue.prototype.mui = mui;

// Element-ui
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
Vue.use(ElementUI)

// LyTab
import LyTab from "ly-tab"
Vue.use(LyTab)


// Mint-ui
import Mint from "mint-ui";
import "mint-ui/lib/style.css"
Vue.use(Mint);

// vue-touch
// import VueTouch from 'vue-touch'
// Vue.use(VueTouch, { name: 'v-touch' })

// better-scroll
/* eslint-disable no-new */
// Vue.config.productionTip = false



new Vue({
  el: '#app',
  store:myStore,
  router,
  render: h => h(App)
})
