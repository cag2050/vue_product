// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Resource from 'vue-resource'
import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'

Vue.config.productionTip = false

sync(store, router)

Vue.use(Resource)
Vue.http.options.emulateJSON = true

/* eslint-disable no-new */
// new Vue({
//     el: '#app',
//     router,
//     template: '<App/>',
//     components: { App }
// })

new Vue({
    store,
    router,
    data: {
        Bus: new Vue()
    },
    render: h => h(App)
}).$mount('#app')
