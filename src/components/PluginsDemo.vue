<template lang='pug'>
div
    h3 全局plugin的测试（在console也有测试）
    ol
        li
            p 全局 Vue.directive 测试(input框默认获得焦点):
            input(v-myfocus='true')
        li
            p 全局 Vue.filter 测试:
            p {{ number | vcntFormat }}
        li
            p 全局 mixin的directive 测试:
            p(:class="bgColor === 'yellow' ? 'bgYellow' : 'bgBlue'" v-clickoutside='clickOutside') 点击此区域外，此区域背景颜色会交替变换黄、蓝色
</template>

<script>
export default {
    name: '',
    data () {
        return {
            number: 120000,
            bgColor: 'yellow'
        }
    },
    mounted () {
        console.log('mixin中全局data数据 的测试：' + this.someValue1)
        console.log('Vue.prototype上的值 的测试：' + this.someValue2)
        console.log('Vue.prototype.getDate 全局函数 的测试：' + this.getDate())
    },
    computed: {

    },
    methods: {
        clickOutside () {
            console.log('clickOutside 事件触发')
            this.bgColor === 'yellow' ? this.bgColor = 'blue' : this.bgColor = 'yellow'
        }
    }
}
</script>

<style lang='stylus'>
div
    ol
        li
            text-align left
            .bgYellow
                background-color yellow
            .bgBlue
                background-color blue
</style>
