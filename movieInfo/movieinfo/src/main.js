import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import axios from 'axios'
import Scroller from '@/components/Scroller'
import Loading from '@/components/Loading'

// 在原型链中添加 axios 以便在之后的开发中可以使用 this.axios
Vue.prototype.axios = axios

Vue.config.productionTip = false

Vue.use(MintUI);

// 注册全局组件
Vue.component("Scroller",Scroller);
Vue.component("Loading",Loading);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
