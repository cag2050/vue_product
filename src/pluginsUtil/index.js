import Clickoutside from 'element-ui/lib/utils/clickoutside'

export default {
    install (Vue, options) {
        Vue.mixin({
            directives: {
                Clickoutside
            },
            data () {
                return {
                    someValue: 'some value'
                }
            }
        })
        Vue.prototype.getDate = function () {
            let dateNew = new Date()
            return dateNew
        }
        Vue.filter('vcntFormat', function (cnt) {
            return cnt >= 100000 ? Math.floor(cnt / 10000) + '万' : cnt
        })
        Vue.directive('myfocus', {
            // 当绑定元素插入到 DOM 中。
            inserted: function (el) {
                // 聚焦元素
                el.focus()
            }
        })
    }
}
