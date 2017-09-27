import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
// import StoreDemo from '@/components/StoreDemo'
// import PromiseDemo from '@/components/PromiseDemo'
// import ImportFuncDemo from '@/components/ImportFuncDemo'

// 下面2行代码，没有指定webpackChunkName，每个组件打包成一个js文件。
const ImportFuncDemo1 = () => import('../components/ImportFuncDemo1')
const ImportFuncDemo2 = () => import('../components/ImportFuncDemo2')

// 下面2行代码，指定了相同的webpackChunkName，会合并打包成一个js文件。
// const ImportFuncDemo = () => import(/* webpackChunkName: 'ImportFuncDemo' */ '../components/ImportFuncDemo')
// const ImportFuncDemo2 = () => import(/* webpackChunkName: 'ImportFuncDemo' */ '../components/ImportFuncDemo2')

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
        },
        {
            path: '/importfuncdemo1',
            name: 'ImportFuncDemo1',
            component: ImportFuncDemo1
        },
        {
            path: '/importfuncdemo2',
            name: 'ImportFuncDemo2',
            component: ImportFuncDemo2
        }
    ]
})
