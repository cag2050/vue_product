# vue_product_demo

> A Vue.js project

### 基于vue init webpack [project_name]新加的功能：
1. vue-resource(添加全局拦截器[interceptors](https://github.com/pagekit/vue-resource/blob/develop/docs/http.md#interceptors))
1. vuex
1. vuex-router-sync
1. vue-progressbar
1. normalize.css
1. element-ui
1. vue-router(添加[按需加载的3种方式](http://www.jianshu.com/p/fc82c8000add)、全局路由控制[beforeEach](https://router.vuejs.org/zh-cn/advanced/navigation-guards.html)、[scrollBehavior](https://router.vuejs.org/zh-cn/advanced/scroll-behavior.html)）

### 从接口取数据后，有2种处理方式：
1. 将数据保存在store中，然后在组件中取store里state的值。
1. 返回一个promise，在组件中操作这个promise。  
第一种方式适合只要求取接口值的情况。  
第二种方式适合对返回的数据再做一些处理的情况，灵活性高。

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
