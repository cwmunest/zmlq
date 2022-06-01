import Vue from 'vue'
import App from './App'
import VueJsonp from 'vue-jsonp'
Vue.use(VueJsonp)

Vue.config.productionTip = false

App.mpType = 'app'

window.Shell={};
window.Shell.UserInfo={};
window.Shell.IsTest=false;

const app = new Vue({
    ...App
})
app.$mount()
