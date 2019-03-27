import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import 'swiper/dist/css/swiper.css'
import animated from 'animate.css'

Vue.use(iView)
Vue.use(animated)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
