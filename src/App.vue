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
        .tip(key='tip') ============以下是内容=============
        router-view.view(key='router-view' v-loading='loading' element-loading-text='数据加载中，请稍候...')
</template>

<script>
import { mapState, mapGetters } from 'vuex'
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
    },
    computed: {
        loading () {
            // return true
            return this.isLoading
        },
        ...mapState({
            error: state => state.error
        }),
        ...mapGetters({
            isLoading: 'isLoading',
            hasError: 'hasError'
        })
    },
    watch: {
        hasError: function (hasError) {
            if (hasError) {
                let message = null
                let cb = null
                let vm = this
                switch (this.error.status) {
                    // 此处根据接口返回码进行各种验证，比如：登录过期、路由跳转
                    case 100002:
                        message = '登录过期请重新登录～'
                        cb = function () {
                            vm.$router.push('/login')
                        }
                        break
                    case 404:
                        message = this.error.statusText && this.error.statusText !== '' ? this.error.statusText : '网络好像有问题哦，请刷新重试～'
                        cb = function () {
                            console.log(message)
                        }
                        break
                    default:
                        message = this.error.statusText && this.error.statusText !== '' ? this.error.statusText : '网络好像有问题哦，请刷新重试～'
                }
                let callback = function () {
                    vm.$store.commit('resetError')
                    if (typeof cb === 'function') {
                        cb()
                    }
                }
                if (message !== null) {
                    this.$message({
                        type: 'error',
                        message: message,
                        duration: 0,
                        showClose: true,
                        onClose: callback
                    })
                } else {
                    callback()
                }
            }
        }
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
