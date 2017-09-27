import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
// import StoreDemo from '@/components/StoreDemo'
// import PromiseDemo from '@/components/PromiseDemo'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'StoreDemo',
            // 使用vue的[异步组件](https://cn.vuejs.org/v2/guide/components.html#异步组件)技术，可以实现按需加载
            // 但是，这种情况下一个组件生成一个js文件
            component: resolve => require(['../components/StoreDemo'], resolve)
        },
        {
            path: '/promisedemo',
            name: 'PromiseDemo',
            // 使用webpack的[require.ensure](https://doc.webpack-china.org/api/module-methods#require-ensure)技术，也可以实现按需加载。
            // 这种情况下，多个路由指定相同的chunkName，会合并打包成一个js文件；如果不指定chunkName，则和使用vue的异步组件一样，每个组件生产打包成一个js文件。
            // 这个组件PromiseDemo 和下面的 Hello 组件，指定了相同的chunkName，因此会合并打包成一个js文件。
            component: r => require.ensure([], () => r(require('../components/PromiseDemo')), 'demo')
        },
        {
            path: '/hello',
            name: 'Hello',
            // component: Hello
            component: r => require.ensure([], () => r(require('../components/Hello')), 'demo')
        }
    ]
})
