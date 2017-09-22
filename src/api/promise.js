import Vue from 'vue'

export default {
    getUser () {
        return Vue.http.get('https://api.github.com/users/cag2050')
        // return Vue.http.get('https://api.github.com/users/cag2050', { timeout: 100 })
    }
}

