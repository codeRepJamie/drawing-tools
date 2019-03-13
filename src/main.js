import Vue from 'vue'
import App from './App.vue'

import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCqsXGeGltYxHMlOGyadORfCDU-tg_b2p4',
    language: 'en',
    libraries: 'places'
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    //// If you want to set the version, you can do so:
    // v: '3.26',
  },
})

new Vue({
  render: h => h(App),
}).$mount('#app')
