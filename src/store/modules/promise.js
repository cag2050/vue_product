import promise from '../../api/promise'

export default {
    namespaced: true,
    state: {
    },
    getters: {},
    actions: {
        // 这种方式是返回一个Promise
        // 还有一种方式是:将值设置在vuex的state中，然后组件中读取state中的值
        getUser () {
            return promise.getUser()
        }
    },
    mutations: {
    }
}
