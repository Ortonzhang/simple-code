import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import store from './store/index'
import App from './components/App'

Vue.use(ElementUI)
Vue.use(Vuex)

new Vue({
    el: '#app',
    store,
    render: h => h(App)
})