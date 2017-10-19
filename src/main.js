// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Resource from 'vue-resource'
import store from './store'
import router from './router'
import {sync} from 'vuex-router-sync'
import ProgressBar from 'vue-progressbar'
import ElementUI from 'element-ui'

import 'normalize.css'
import './assets/theme/index.css'

Vue.config.productionTip = false

sync(store, router)

// 全局路由控制，每个路由权限验证
router.beforeEach((to, from, next) => {
    if (!to.matched.some(record => record.meta.requireAuth === false)) {
        checkAuth(from, to, next)
    } else {
        next()
    }
})
function checkAuth (from, to, next) {
    next()
}

Vue.use(Resource)
Vue.http.options.emulateJSON = true
Vue.http.interceptors.push(function (request, next) {
    // development environment http proxy setting, in order to solve the cross-site request problem
    let token = sessionStorage.getItem('site_token') || localStorage.getItem('site_token') || ''
    if (process.env.NODE_ENV === 'development') {
        // request.url = '/api/' + request.url
    }
    token !== '' && request.headers.set('Authorization', 'Bearer ' + token)

    let {globalLoading = true} = request
    if (request.method === 'POST') {
        globalLoading = false
    }
    globalLoading && store.commit('request', request.url)

    // continue to next interceptor
    next(function (response) {
        if (response.body === null) {
            response.body = {code: 204, msg: 'No content found'}
        }
        if (response.status === 200) {
            globalLoading && store.commit('success', request.url)
        } else {
            store.commit('error', {api: request.url, error: response})
        }
    })
    // next()
})

const options = {
    color: '#77b6ff'
}
Vue.use(ProgressBar, options)

Vue.use(ElementUI)

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
        Bus: new Vue() // 用作event-bus总线
    },
    render: h => h(App)
}).$mount('#app')

