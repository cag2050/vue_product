<template lang='pug'>
div 将接口返回的数据保存在store中，组件从store中读取state值的例子。
    div 接口返回用户信息：
    div(v-show='show') {{ this.userInfo }}
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: '',
    data () {
        return {

        }
    },
    created () {
        this.fetch()
    },
    computed: {
        show () {
            return this.userInfo !== null
        },
        ...mapState({
            userInfo: state => state.store.data
        })
    },
    methods: {
        ...mapActions({
            fetch: 'store/getUser'
        })
    }
}
</script>

<style lang='stylus'>

</style>
