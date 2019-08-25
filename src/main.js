// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import i18n from '@/assets/lang/lang';
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Element from 'element-ui'
import echarts from 'echarts'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(Element)
Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts
    // Vue.prototype.$host = 'http://192.168.11.232:8000/'
Vue.prototype.$host = 'http://' + location.hostname + ':8000/'

router.beforeEach((to, from, next) => { // 路由守卫
        var name = sessionStorage.getItem('user');
        if (to.meta.requiresAuth) {
            // var name = sessionStorage.getItem('user');
            if (name) {
                next();
            } else {
                next('/');
            }
        } else {
            next();
        }
        if (from.name == 'HelloWorld' && name == null || from.name == '*' && name == null) {
            next('/')
        }
        if (to.name == 'HelloWorld' && name || from.name == '*' && name) {
            sessionStorage.removeItem('user')
            next('/')
        }
    })
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    i18n,
    components: { App },
    template: '<App/>'
})