/**
 * Created by yh on 2021/7/19
 */
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router';
import routes from './routes.config'

Vue.use(VueRouter);
Vue.config.productionTip = false
const router = new VueRouter({
    mode: 'hash',
    base: __dirname,
    routes
});

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')