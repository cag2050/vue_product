import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 下面2行代码，没有指定webpackChunkName，每个组件打包成一个js文件。
const ImportFuncDemo1 = () => import('../components/ImportFuncDemo1')
const ImportFuncDemo2 = () => import('../components/ImportFuncDemo2')

// 下面2行代码，指定了相同的webpackChunkName，会合并打包成一个js文件。
// const ImportFuncDemo1 = () => import(/* webpackChunkName: 'ImportFuncDemo' */ '../components/ImportFuncDemo1')
// const ImportFuncDemo2 = () => import(/* webpackChunkName: 'ImportFuncDemo' */ '../components/ImportFuncDemo2')

// scrollBehavior:
// - only available in html5 history mode
// - defaults to no scroll behavior
// - return false to prevent scroll
const scrollBehavior = (to, from, savedPosition) => {
    if (savedPosition) {
        // savedPosition is only available for popstate navigations.
        return savedPosition
    } else {
        const position = {}
        // new navigation.
        // scroll to anchor by returning the selector
        if (to.hash) {
            position.selector = to.hash
        }
        // check if any matched route config has meta that requires scrolling to top
        if (to.matched.some(m => m.meta.scrollToTop)) {
            // cords will be used if no selector is provided,
            // or if the selector didn't match any element.
            position.x = 0
            position.y = 0
        }
        // if the returned position is falsy or an empty object,
        // will retain current scroll position.
        return position
    }
}

export default new Router({
    mode: 'history',
    scrollBehavior,
    routes: [
        {
            path: '/',
            name: 'StoreDemo',
            // 使用vue的[异步组件](https://cn.vuejs.org/v2/guide/components.html#异步组件)技术，可以实现按需加载
            // 但是，这种情况下一个组件生成一个js文件
            component: resolve => require(['../components/StoreDemo'], resolve),
            // 配置了scrollToTop为true，点击这个路由，页面会滚到顶部
            // 如果没配置scrollToTop或配置scrollToTop为false，点击这个路由，页面保持原先的滚动位置
            // 效果说明：点击这个路由后，滚动页面隐藏顶部的一部分，再点击路由：/promisedemo,页面保持原先的滚动位置;再点击这个路由,页面会滚动到顶部，因为配置了scrollToTop为true
            meta: { scrollToTop: true }
        },
        {
            path: '/promisedemo',
            name: 'PromiseDemo',
            // 使用webpack的[require.ensure](https://doc.webpack-china.org/api/module-methods#require-ensure)技术，也可以实现按需加载。
            // 这种情况下，多个路由指定相同的chunkName，会合并打包成一个js文件；如果不指定chunkName，则和使用vue的异步组件一样，每个组件生产打包成一个js文件。
            // 这个组件PromiseDemo 和下面的 Hello 组件，指定了相同的chunkName(名字为：demo)，因此会合并打包成一个js文件。
            component: resolve => require.ensure([], () => resolve(require('../components/PromiseDemo')), 'demo')
        },
        {
            path: '/hello',
            name: 'Hello',
            component: resolve => require.ensure([], () => resolve(require('../components/Hello')), 'demo')
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
        },
        {
            path: '/pluginsdemo',
            name: 'PluginsDemo',
            component: resolve => require.ensure([], () => resolve(require('../components/PluginsDemo')), 'PluginsDemo')
        }
    ]
})
