<template lang='pug'>
div 返回一个Promise，对promise再进行操作。
    div 接口返回用户信息：
    div {{ this.userInfo }}
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: '',
    data () {
        return {
            userInfo: ''
        }
    },
    created () {
        this.fetch()
            .then(response => {
                if (response.status === 200) {
                    // console.log('=== 200')
                    // console.log(response)
                    this.userInfo = response.body
                } else {
                    // console.log('!== 200')
                    // console.log(response)
                }
            })
            // 网络错误、url地址错误、请求超时，能被catch捕获
            // 在此处理这些错误
            .catch(error => {
                // console.log('catch error')
                console.log(error)
            })
    },
    computed: {
    },
    methods: {
        ...mapActions({
            fetch: 'promise/getUser'
        })
    }
}
</script>

<style lang='stylus'>

</style>
