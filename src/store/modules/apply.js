import apply from '../../api/apply'

export default {
    namespaced: true,
    state: {
        data: null,
        status: null,
        message: null
    },
    getters: {},
    actions: {
        // 将值设置在vuex的state中，然后组件中读取state中的值
        // 还有一种方式是返回一个Promise，下个接口进行说明
        getUser ({commit}) {
            commit('request')
            apply.getUser(
                data => commit('success', data),
                error => commit('failure', error),
                catchError => commit('failure', catchError)
            )
        }
    },
    mutations: {
        request (state) {
            state.data = null
            state.status = null
            state.message = null
        },

        success (state, data) {
            state.data = data
            state.status = 200
            state.message = '请求成功'
        },

        failure (state, error) {
            state.status = error.status
            state.message = error.statusText
            state.message = '请求失败'
        }
    }
}
