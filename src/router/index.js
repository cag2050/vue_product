import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import StoreDemo from '@/components/StoreDemo'
import PromiseDemo from '@/components/PromiseDemo'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'StoreDemo',
            component: StoreDemo
        },
        {
            path: '/promisedemo',
            name: 'PromiseDemo',
            component: PromiseDemo
        },
        {
            path: '/hello',
            name: 'Hello',
            component: Hello
        }
    ]
})
