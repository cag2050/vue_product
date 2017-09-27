<template lang='pug'>
#app
    vue-progress-bar
    transition-group(name='fade' mode='out-in')
        .routers(key='router') 路由列表:<br/>
            router-link(to='/') StoreDemo页面 <br/>
            router-link(to='/promisedemo') PromiseDemo页面 <br/>
            router-link(to='/hello') Hello页面 <br/>
            router-link(to='/importfuncdemo1') ImportFuncDemo1页面 <br/>
            router-link(to='/importfuncdemo2') ImportFuncDemo2页面 <br/>
        div.tip(key='tip') ============以下是内容=============
        router-view.view(key='router-view')
</template>

<script>
export default {
    name: 'app',
    created () {
        //  [App.vue specific] When App.vue is first loaded start the progress bar
        this.$Progress.start()
        //  hook the progress bar to start before we move router-view
        this.$router.beforeEach((to, from, next) => {
        //  does the page we want to go to have a meta.progress object
            if (to.meta.progress !== undefined) {
                let meta = to.meta.progress
                // parse meta tags
                this.$Progress.parseMeta(meta)
            }
            //  start the progress bar
            this.$Progress.start()
            //  continue to next page
            next()
        })

        //  hook the progress bar to finish after we've finished moving router-view
        this.$router.afterEach((to, from) => {
            //  finish the progress bar
            this.$Progress.finish()
        })
    },
    mounted () {
        //  [App.vue specific] When App.vue is finish loading finish the progress bar
        this.$Progress.finish()
    }
}
</script>

<style lang='stylus'>
#app
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

    .routers
        position fixed

    .tip, .view
        padding-left 200px


// 定义 transition-group 的过渡效果。
// 一定时间内，针对opacity的transition完成。如果不想要这个效果，可以将时间设置为0
.fade-enter-active
.fade-leave-active
    transition opacity .1s ease
// 开始enter的时候，透明度为0，变为1；开始leave的时候，透明度为1，变为0
// 此处只需要写进入元素的开始enter:v-enter、离开元素的leave结束:v-leave-to(v-是这些过渡类名的前缀)
.fade-enter
.fade-leave-to
    opacity 0
</style>
