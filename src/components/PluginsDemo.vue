<template lang='pug'>
div
    h3 全局plugin的测试（在console也有测试）
    ol
        li
            p 全局 Vue.directive 测试(input框默认获得焦点):
            input(class='b' v-myfocus='true')
        li
            p 全局 Vue.filter 测试:
            p {{ number | vcntFormat }}
</template>

<script>
export default {
    name: '',
    data () {
        return {
            number: 120000
        }
    },
    mounted () {
        console.log('mixin中全局data数据的测试：' + this.someValue)
        console.log('Vue.prototype.getDate 全局函数的测试：' + this.getDate())
    },
    computed: {

    },
    methods: {

    }
}
</script>

<style lang='stylus'>
div
    ol
        li
            text-align left
</style>
