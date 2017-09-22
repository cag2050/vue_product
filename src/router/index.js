import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Demo from '@/components/Demo'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Demo',
            component: Demo
        },
        {
            path: '/hello',
            name: 'Hello',
            component: Hello
        }
    ]
})
