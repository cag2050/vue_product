import Vue from 'vue'

export default {
    getUser (cb, errorCb, catchCb) {
        return Vue.http.get('https://api.github.com/users/cag2050')
        // return Vue.http.get('https://api.github.com/users/cag2050', {timeout: 100})
            .then((response) => {
                // success callback
                // response.status = 300
                if (response.status === 200) {
                    // console.log('=== 200')
                    // console.log(response)
                    cb(response.body)
                } else {
                    // console.log('!== 200')
                    // console.log(response)
                    errorCb(response)
                }
            })
            // 网络错误、url地址错误、请求超时，能被catch捕获
            // 在此处理这些错误
            .catch(error => {
                // console.log('catch error')
                // console.log(error)
                catchCb(error)
            })
    }
}

